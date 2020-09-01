/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { basicHeader } from '@sap-cloud-sdk/core';
import moment from 'moment';
import { Octokit } from '@octokit/rest';
import {
  IssuesGetCommentResponseData,
  IssuesGetResponseData
} from '@octokit/types';
import { createLogger } from '@sap-cloud-sdk/util';
const octokit = new Octokit();
const logger = createLogger({
  package: 'scripts',
  messageContext: 'repo-info'
});

if (!process.env.user) {
  throw new Error('Please set you github user as process.env.user');
}

if (!process.env.token) {
  throw new Error('Please set your github access token as process.env.token');
}

const owner = 'SAP';
const sinceDate = '2020-07-01';
const headers = {
  Authorization: basicHeader(process.env.user!, process.env.token!)
};

interface ResponseTime {
  url: string;
  number: number;
  title: string;
  timeInMilliSec: number;
}

async function getAllIssues(
  since: string,
  repo: string
): Promise<IssuesGetResponseData[]> {
  const result: IssuesGetResponseData[] = (await octokit.paginate(
    '/repos/:owner/:repo/issues',
    { headers, repo, owner, state: 'all', since }
  )) as any;
  return result;
}

async function excludePRissues(issues: Promise<IssuesGetResponseData[]>) {
  return (await issues).filter(issue => !issue.pull_request);
}

async function excludeMemberIssues(issues: Promise<IssuesGetResponseData[]>) {
  return (await issues).filter(
    issue => issue['author_association'] !== 'MEMBER'
  );
}

async function getResponseTime(
  issue: IssuesGetResponseData,
  repo: string
): Promise<ResponseTime> {
  const comments = await getSortedComments(issue, repo);
  return toResponseTime(issue, comments);
}

function toResponseTime(
  issue: IssuesGetResponseData,
  comments: IssuesGetCommentResponseData[]
): ResponseTime {
  let timeInMilliSec: number;
  const created = moment.utc(issue.created_at);
  if (comments && comments.length > 0) {
    const firstResponse = moment.utc(comments[0].created_at);
    timeInMilliSec = firstResponse.valueOf() - created.valueOf();
  } else {
    timeInMilliSec = Date.now() - created.valueOf();
  }

  return {
    ...issue,
    timeInMilliSec
  };
}
async function getSortedComments(
  issue: IssuesGetResponseData,
  repo: string
): Promise<IssuesGetCommentResponseData[]> {
  return (
    await octokit.issues.listComments({
      headers,
      owner,
      repo,
      issue_number: issue.number,
      page: 1,
      sort: 'created',
      direction: 'asc'
    })
  ).data;
}

async function printResults(
  reponseTimes: Promise<ResponseTime[]>,
  repo: string
) {
  const allowedResponseTime = 2 * 24 * 3600 * 1000; // Business days are not considered

  const responseTimeViolated = (await reponseTimes).filter(
    reponseTime => reponseTime.timeInMilliSec > allowedResponseTime
  );
  const responseTimeOk = (await reponseTimes).filter(
    reponseTime => reponseTime.timeInMilliSec <= allowedResponseTime
  );

  const totalNumber = responseTimeViolated.length + responseTimeOk.length;
  logger.info(
    `We had: ${totalNumber} issues in total since ${sinceDate} in repo: ${repo}`
  );
  logger.info(
    `Of which we answered ${responseTimeOk.length} in time. ${
      (responseTimeOk.length * 100) / totalNumber
    }%`
  );
  logger.info(
    `Of which we answered ${responseTimeOk.length} not in time. ${
      (responseTimeViolated.length * 100) / totalNumber
    }%`
  );
  const averageResponseTimeHours =
    (await reponseTimes).reduce(
      (sum, curr) => (sum += curr.timeInMilliSec),
      0
    ) /
    (3600 * 1000 * totalNumber);
  logger.info(
    `We had an average response time of ${averageResponseTimeHours} hours.`
  );
}

async function getResponseTimes(
  issues: Promise<IssuesGetResponseData[]>,
  repo: string
): Promise<ResponseTime[]> {
  const promises = (await issues).map(issue => getResponseTime(issue, repo));
  return Promise.all(promises);
}

['cloud-sdk', 'cloud-sdk-cli'].forEach(repo => {
  const allIssues = getAllIssues(sinceDate, repo);
  const issues = excludeMemberIssues(excludePRissues(allIssues));
  const responseTimes = getResponseTimes(issues, repo);
  printResults(responseTimes, repo);
});
