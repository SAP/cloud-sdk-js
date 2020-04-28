import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import versions from '../../../../static/api/versions'

function ApiReleaseList () {
  return (
    <ul>
      {versions.map((ver, ind) => (
        <li key={`${ver}`}>
          <a href={useBaseUrl(`api/${ver}/`)}>{`${ver}`}</a>{ind ? "" : <strong><em> - latest </em></strong>}
        </li>
      ))}
    </ul>
  )
}

export default ApiReleaseList
