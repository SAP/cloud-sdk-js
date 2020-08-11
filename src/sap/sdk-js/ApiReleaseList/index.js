import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { jsReleases } from '../../utils'

function ApiReleaseList () {
  return (
    <ul>
      {jsReleases.map((ver, ind) => (
        <li key={`${ver}`}>
          <a href={useBaseUrl(`api/${ver}/`)}>{`${ver}`}</a>{ind ? '' : <strong><em> - latest </em></strong>}
        </li>
      ))}
    </ul>
  )
}

export default ApiReleaseList
