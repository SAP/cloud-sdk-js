import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { jsReleases } from '../../utils'

function ApiReleaseList () {
  return (
    <ul>
      {/* <li key="latest">
        <a href={useBaseUrl('api/latest')}>Latest</a>
      </li> */}
      {jsReleases.map((ver, i) => (
        <li key={`${ver}`}>
          <a href={useBaseUrl(`api/${ver}/`)}>{`${ver}`}</a>{i ? '' : <strong><em> - latest </em></strong>}
        </li>
      ))}
    </ul>
  )
}

export default ApiReleaseList
