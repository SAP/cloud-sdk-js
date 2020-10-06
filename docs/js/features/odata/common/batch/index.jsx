import React from 'react';
import BatchIntroContent from './batch-intro.mdx'
import ChangeSetContent from './change-set.mdx'
import CombineChangeSetRetrieveContent from './combine-change-retrieve.mdx'
import MultiChangeSetsContent from './multiple-change-sets.mdx'
import RetrieveRequestsContent from './retrieve-request.mdx'

export function BatchIntro(){
  return <BatchIntroContent/>
}

export function ChangeSet() {
  return<ChangeSetContent/>
}

export function CombineChangeSetRetrieve(){
  return <CombineChangeSetRetrieveContent/>
}

export function MultiChangeSets(){
  return <MultiChangeSetsContent/>
}

export function RetrieveRequests(){
  return <RetrieveRequestsContent/>
}


