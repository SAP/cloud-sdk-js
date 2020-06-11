import React from 'react'
import Layout from '@theme/Layout'
import Roadmap from '../../sap/roadmap/roadmap'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'

function RoadMap () {
  return (
    <Layout
      description='SAP Cloud SDK is a one stop shop for developing and extending SAP applications in a Cloud'
    >
      <Roadmap />
    </Layout>
  )
}

export default RoadMap
