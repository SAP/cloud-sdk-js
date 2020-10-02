import React from 'react';
import TopContent from './top.mdx'
import SkipContent from './skip.mdx'
import FilterContent from './filter.mdx'
import FilterOneToOneContent from './filter-one-to-one.mdx'
import FilterFunctionsContent from './filter-functions.mdx'

export function Top(){
  return <TopContent/>
}

export function Skip(){
  return <SkipContent/>
}

export function Filter(){
  return <FilterContent/>
}

export function FilterOneToOne(){
  return <FilterOneToOneContent/>
}

export function FilterFunctions(){
  return <FilterFunctionsContent/>
}


