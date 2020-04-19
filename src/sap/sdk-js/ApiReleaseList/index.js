import React from 'react'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import versions from './versions.js'

function ApiReleaseList () {
  return (
    <ul>
      {versions.map(ver => (
        <li key={`${ver}`}>
          <Link to={useBaseUrl(`api/${ver}/`)}>{`${ver}`}</Link>
        </li>
      ))}
    </ul>
  )
}

export default ApiReleaseList
