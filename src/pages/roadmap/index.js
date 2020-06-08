import React from 'react'
import Layout from '@theme/Layout'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import Roadmap from './roadmap'

const RoadMap = () => {
  return (
    <Layout
      title={`SDK for Java Roadmap'${moment().year()}`}
      description='SAP Cloud SDK is a one stop shop for developing and extending SAP applications in a Cloud'
    >
      <main>
        <Roadmap />
      </main>
    </Layout>
  )
}

export default RoadMap
