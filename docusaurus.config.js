module.exports = {
  title: 'SAP Cloud SDK',
  tagline:
    'A one stop shop for developing and extending SAP applications in a Cloud.',
  url: 'https://github.com/SAP/cloud-sdk',
  baseUrl: '/cloud-sdk/',
  favicon: 'img/favicon.ico',
  organizationName: 'SAP', // Usually your GitHub org/user name.
  projectName: 'cloud-sdk', // Usually your repo name.
  themeConfig: {
    announcementBar: {
      id: 'WIP', // Any value that will identify this message
      content:
        '~~~WIP~~~ Cloud SDK Documentation is work in progress. Use on your own discretion.',
      backgroundColor: '#ed2939', // Defaults to `#fff`
      textColor: '#000' // Defaults to `#000`
    },
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
          href: 'https://blogs.sap.com/tag/sap-cloud-sdk/',
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
              label: 'GitHub JavaScript',
              href: 'https://github.com/SAP/cloud-sdk/issues'
            },
            {
              label: 'SAP GitHub Java',
              href: 'https://github.wdf.sap.corp/MA/sdk'
            }
          ]
        },
        {
          href: 'https://api.sap.com/',
          label: 'SAP API Hub',
          position: 'left'
        },
        {
          position: 'right',
          label: 'SDK Java Release Notes',
          href:
            'https://help.sap.com/doc/6c02295dfa8f47cf9c08a19f2e172901/1.0/en-US/index.html'
        },
        {
          position: 'right',
          label: 'SDK JS Release Notes',
          href:
            'https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html'
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
      logo: {
        alt: 'SAP Cloud SDK',
        src: 'img/sap.svg'
      },
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
              href: 'https://blogs.sap.com/tag/sap-cloud-sdk/'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/sap'
            },
            {
              label: 'Facebook',
              href: 'https://twitter.com/docusaurus'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/sapdevs'
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/user/sapdevs'
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/sap-developers'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SAP Cloud SDK`
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
          showLastUpdateTime: true
          // editUrl:
          // 'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],
  customFields: {
    logo: {
      alt: 'SAP Developers',
      src: 'img/sap.svg'
    }
  }
}
