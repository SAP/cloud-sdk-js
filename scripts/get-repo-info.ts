import axios, { AxiosResponse } from 'axios';
import { stringify } from 'uuid';
import { basicHeader } from '@sap-cloud-sdk/core';
import moment from 'moment'

import { Octokit } from "@octokit/rest"
import {
  IssuesGetCommentResponseData,
  IssuesGetResponseData,
} from '@octokit/types';
const octokit = new Octokit();


if(!process.env.user){
  throw new Error('Please set you github user as process.env.user')
}

if(!process.env.token){
  throw new Error('Please set your github access token as process.env.toke')
}

const baseUrl = 'https://api.github.com/'
const owner = 'SAP'
const repo = 'cloud-sdk'
const sinceDate = '2020-07-01'
const headers = {'Authorization': basicHeader(process.env.user!,process.env.token!)}
const allowedResponseTime = 2 * 24 * 3600 * 1000;

interface ResponseTime{
  url:string,
  number:number,
  title:string,
  timeInMilliSec:number
}

async function getAllIssues(sinceDate:string):Promise<IssuesGetResponseData[]>{
  const result:IssuesGetResponseData[] =  await octokit.paginate("/repos/:owner/:repo/issues",{headers,repo,owner,state:'all',since:sinceDate}) as any;
  return result;
}

async function excludePRissue(issues:Promise<IssuesGetResponseData[]>)
{
  return (await issues).filter(issue=>!issue.pull_request)
}

async function getResponseTime(issue:IssuesGetResponseData):Promise<ResponseTime>{
  const comments = await getSortedComments(issue)
  return toResponseTime(issue,comments)
}

function toResponseTime(issue:IssuesGetResponseData,comments:IssuesGetCommentResponseData[]):ResponseTime{
  let timeInMilliSec:number;
  const created = moment.utc(issue.created_at)
    if(comments && comments.length >0){
      const firstResponse = moment.utc(comments[0].created_at)
      timeInMilliSec = firstResponse.valueOf() - created.valueOf();
    }else{
      timeInMilliSec = Date.now() - created.valueOf();
    }

    return{
      ...issue,
      timeInMilliSec
    }
}
async function getSortedComments(issue:IssuesGetResponseData):Promise<IssuesGetCommentResponseData[]>{
  const foo =  await octokit.issues.listComments({headers,owner,repo,issue_number:issue.number,page:1,sort:'created',direction:'asc'})
  return foo.data;
}

async function getResponseTimes(issues:Promise<IssuesGetResponseData[]>):Promise<ResponseTime[]>{
  const foo = (await issues).map(issue=>getResponseTime(issue))
  return Promise.all(foo)
}

const allIssues = getAllIssues(sinceDate)
const issues = excludePRissue(allIssues)
const reponseTimes = getResponseTimes(issues)

async function evaluateResult(reponseTimes: Promise<ResponseTime[]>) {
  const responseTimeViolated = (await reponseTimes).filter(reponseTime=>reponseTime.timeInMilliSec > allowedResponseTime)
  const responseTimeOk = (await reponseTimes).filter(reponseTime=>reponseTime.timeInMilliSec <= allowedResponseTime)

  const totalNumber = responseTimeViolated.length + responseTimeOk.length;
  console.log(`We had: ${totalNumber} issues in total since ${sinceDate}`)
  console.log(`Of which we answered ${responseTimeOk.length} in time. ${responseTimeOk.length*100/totalNumber}%`)
  console.log(`Of which we answered ${responseTimeOk.length} not in time. ${responseTimeViolated.length*100/totalNumber}%`)
  const averageResponseTimeHours = (await reponseTimes).reduce((sum,curr)=>sum+=curr.timeInMilliSec,0)/(3600 * 1000 * totalNumber)
  console.log(`We had an average response time of ${averageResponseTimeHours} hours.`)
}

evaluateResult(reponseTimes)
