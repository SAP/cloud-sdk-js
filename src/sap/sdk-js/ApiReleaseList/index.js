import React from 'react'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import versions from './versions.js'

function ApiReleaseList () {
  return (
    <ul>
      {versions.map(ver => (
        <li key={`${ver}`}>
          <a href={useBaseUrl(`api/${ver}/`)}>{`${ver}`}</a>
        </li>
      ))}
    </ul>
  )
}

export default ApiReleaseList
