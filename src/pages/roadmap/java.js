import React from 'react'
import Layout from '@theme/Layout'
import Roadmap from '../../sap/roadmap/roadmap'
import classnames from 'classnames'
import styles from '../styles.module.css'
import { groups, items, keys } from './../../sap/roadmap/roadmap-java'

function RoadMap () {
  return (
    <Layout
      description='SAP Cloud SDK is a one stop shop for developing and extending SAP applications in a Cloud'
    >
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className='container'>
          <h1 className='hero__title'>Roadmap: Cloud SDK for Java </h1>
        </div>
      </header>
      <main>
        <Roadmap {...{ groups, items, keys }} />
      </main>
    </Layout>
  )
}

export default RoadMap
