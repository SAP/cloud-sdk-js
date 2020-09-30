import React from 'react';
import CountContent from './count.mdx'
import CreateContent from './create.mdx'
import CreateAsChildOfContent from './create-as-child-of.mdx'
import DeepCreateContent from './deep-create.mdx'
import DeleteContent from './delete.mdx'
import GetAllContent from './get-all.mdx'
import GetByKeyContent from './get-by-key.mdx'
import UpdateContent from './update.mdx'

export function Count(){
  return <CountContent/>
}

export function Create() {
  return<CreateContent/>
}

export function CreateAsChildOf(){
  return <CreateAsChildOfContent/>
}

export function DeepCreate(){
  return <DeepCreateContent/>
}

export function Delete(){
  return <DeleteContent/>
}

export function GetAll(){
  return <GetAllContent/>
}

export function GetByKey(){
  return <GetByKeyContent/>
}

export function Update(){
  return <UpdateContent/>
}


