import React from 'react'

function LicenseBadge ({align}) {
  return (
    <span className={align ? 'col text--right' : ''}>
      <a href="https://opensource.org/licenses/Apache-2.0" rel="nofollow">
	<img src="https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg" alt="License" data-canonical-src="https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg" className="max-width:100%;" />
	</a>
    </span>
  )
}

export default LicenseBadge
