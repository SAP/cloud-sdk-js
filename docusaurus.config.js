module.exports = {
  title: 'SAP Cloud SDK',
  tagline:
    'A one-stop shop for developing and extending SAP applications in a Cloud.',
  url: 'https://github.com/SAP/cloud-sdk',
  baseUrl: '/cloud-sdk/',
  favicon: 'img/favicon.ico',
  organizationName: 'SAP', // Usually your GitHub org/user name.
  projectName: 'cloud-sdk', // Usually your repo name.
  themeConfig: {
    prism: {
      additionalLanguages: ['powershell', 'java', 'groovy'],
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula')
    },
    algolia: {
      apiKey: '84d46c71e9f2445436400effad7c4e1b',
      indexName: 'sap_cloud-sdk',
      // appId: 'app-id', // Optional, if you run the DocSearch crawler on your own
      algoliaOptions: {} // Optional, if provided by Algolia
    },
    // ***************************************************************
    // Activate this announcement bar for global urgent notifications
    // ***************************************************************
    //
    // announcementBar: {
    //   id: 'survey', // Any value that will identify this message
    //   content:
    //      '&#11088;&#11088;&#11088; Please, help us improving Cloud SDK by taking <a target="_blank" rel="noopener noreferrer" href="https://sapinsights.eu.qualtrics.com/jfe/form/SV_0pUmWpCadpoLhyZ">our survey</a> &#11088;&#11088;&#11088;',
    //   backgroundColor: '#fff', // Defaults to `#fff`
    //   textColor: '#000', // Defaults to `#000`,
    //   isCloseable: false, // Defaults to `true`.

    // },
    navbar: {
      title: 'SAP Cloud SDK',
      logo: {
        alt: 'SAP Cloud SDK',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg'
      },
      items: [
        {
          to: 'docs/overview/about',
          label: 'Docs',
          position: 'left'
        },
        {
          label: 'Support',
          position: 'left',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/sap-cloud-sdk'
            },
            {
              label: 'GitHub JavaScript',
              href: 'https://github.com/SAP/cloud-sdk/issues/new/choose'
            },
            {
              label: ' GitHub Java',
              href: 'https://github.wdf.sap.corp/MA/sdk/issues/new/choose'
            }
          ]
        },
        {
          label: 'Release notes',
          position: 'left',
          items: [
            {
              label: 'Java',
              to:
                'docs/java/release-notes-sap-cloud-sdk-for-java'
            },
            {
              label: 'JavaScript',
              to:
                'docs/js/release-notes-sap-cloud-sdk-for-javascript-and-typescript'
            },
            {
              label: 'CI/CD Toolkit',
              href: 'https://github.com/SAP/cloud-s4-sdk-pipeline/releases'
            }
          ]
        },
        {
          href: 'https://api.sap.com/',
          label: 'SAP API Hub',
          position: 'right'
        },
        {
          href: 'https://github.com/SAP/cloud-sdk',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'SAP Cloud SDK overview',
              to: 'docs/overview/about'
            },
            {
              label: 'Cloud SDK for Java',
              to: 'docs/java/getting-started'
            },
            {
              label: 'Cloud SDK for JS',
              to: 'docs/js/getting-started'
            },
            {
              label: 'Cloud SDK for CI/CD',
              to: 'docs/devops/getting-started'
            },
            {
              label: 'Cloud SDK Tutorials',
              href: 'https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/sap-cloud-sdk'
            },
            {
              label: 'SAP Developers Portal',
              href: 'https://developers.sap.com/topics/cloud-sdk.html'
            },
            {
              label: 'Cloud SDK Community Page',
              href: 'https://community.sap.com/topics/cloud-sdk'
            },
            {
              label: 'Cloud SDK on SAP Help',
              href:
                'https://help.sap.com/viewer/product/SAP_CLOUD_SDK/1.0/en-US?task=discover_task'
            }
          ]
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              href: 'https://https://blogs.sap.com/'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/SAP/cloud-sdk'
            }
          ]
        },
        {
          title: 'Package repositories',
          items: [
            {
              label: 'Cloud SDK for JavaScript',
              href: 'https://www.npmjs.com/search?q=%40sap-cloud-sdk'
            },
            {
              label: 'JS client libraries for S/4HANA',
              href: 'https://www.npmjs.com/search?q=%40sap%2Fcloud-sdk-vdm-*'
            },
            {
              label: 'Cloud SDK for Java',
              href: 'https://search.maven.org/search?q=g:com.sap.cloud.sdk'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl:
          'https://github.com/SAP/cloud-sdk/edit/documentation',
          routeBasePath: 'docs'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        },
        sitemap: {
          cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: 'weekly',
          priority: 0.5,
          trailingSlash: false
        }
      }
    ]
  ],
  scripts: [
    {
      src: 'https://sap.github.io/cloud-sdk/js/swa.js'
    }
  ],
  customFields: {}
}
