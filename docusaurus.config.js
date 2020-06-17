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
      algoliaOptions: {}, // Optional, if provided by Algolia
    },
    // ***************************************************************
    // Activate this announcement bar for global urgent notifications
    // ***************************************************************
    //
    // announcementBar: {
    //   id: 'WIP', // Any value that will identify this message
    //   content:
    //     '~~~WIP~~~ Cloud SDK Documentation is work in progress. Use on your own discretion.',
    //   backgroundColor: '#ed2939', // Defaults to `#fff`
    //   textColor: '#000' // Defaults to `#000`
    // },
    navbar: {
      title: 'SAP Cloud SDK',
      logo: {
        alt: 'SAP Cloud SDK',
        src: 'img/logo.svg'
      },
      links: [
        {
          to: 'docs/overview/about',
          label: 'Docs',
          position: 'left'
        },
        {
          href: 'https://blogs.sap.com/',
          label: 'Blog',
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
              label: 'GitHub JS/TS',
              href: 'https://github.com/SAP/cloud-sdk/issues'
            },
            {
              label: ' GitHub Java',
              href: 'https://github.wdf.sap.corp/MA/sdk'
            }
          ]
        },
        {
          label: 'Release notes',
          position: 'left',
          items: [
            {
              label: 'Java SDK',
              href:
                'https://help.sap.com/doc/6c02295dfa8f47cf9c08a19f2e172901/1.0/en-US/index.html'
            },
            {
              label: 'JS SDK',
              href:
                'https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html'
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
              href: 'docs/devops/getting-started'
            },
            {
              label: 'Cloud SDK Tutorials',
              href:
                'https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk'
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
          // Equivalent to `enableUpdateBy`.
          showLastUpdateAuthor: true,
          // Equivalent to `enableUpdateTime`.
          showLastUpdateTime: true,
          editUrl:
          'https://github.com/SAP/cloud-sdk/edit/documentation',
          routeBasePath: 'docs'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        },
        sitempa: {
          cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: 'weekly',
          priority: 0.5
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
