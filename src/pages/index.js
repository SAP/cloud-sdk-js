import React from 'react'
import classnames from 'classnames'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

const features = [
  {
    title: <>SAP Cloud SDK for Java</>,
    imageUrl:
      'https://help.sap.com/doc/6c02295dfa8f47cf9c08a19f2e172901/1.0/en-US/logo-for-java.svg',
    description: (
      <>
        SAP Cloud SDK for Java allows you develop, extend, and communicate wiht
        SAP solutions SAP S/4HANA Cloud, SAP SuccessFactors, and many others.{' '}
        <br />
        <a href='docs/java/getting-started'>Get started with SDK for Java.</a>
      </>
    )
  },
  {
    title: <>SAP Cloud SDK for JavaScript</>,
    imageUrl:
      'https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg',
    description: (
      <>
        SAP Cloud SDK for JavaScript leverages popularity and flexibility of
        Node.js ecosystem for building Apps and extensions on top of SAP
        solutions and deploy them to cloud. <br />
        <a href='docs/js/getting-started'>
          Get started with SDK for JavaScript
        </a>
      </>
    )
  },
  {
    title: <>SAP Cloud SDK for CI\CD</>,
    imageUrl:
      'https://help.sap.com/doc/6c02295dfa8f47cf9c08a19f2e172901/1.0/en-US/logo-for-cd.svg',
    description: (
      <>
        The goal of project "Piper" is to substantially ease setting up
        continuous delivery in your project using SAP technologies. <br />
        <a href='docs/devops/getting-started'>
          Get started with best CI/CD practices
        </a>
      </>
    )
  }
]

function Feature ({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className='text--center'>
          <a href='docs/java/getting-started'>
            <img className={styles.featureImage} src={imgUrl} alt={title} />
          </a>
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home () {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout
      title={`${siteConfig.title}`}
      description='SAP Cloud SDK is a one stop shop for developing and extending SAP applications in a Cloud <head />'
    >
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className='container'>
          <h1 className='hero__title'>{siteConfig.title}</h1>
          <p className='hero__subtitle'>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('docs/overview/getting-started')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className='container'>
              <div className='row'>
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Home
