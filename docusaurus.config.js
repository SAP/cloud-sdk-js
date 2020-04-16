module.exports = {
  title: 'SAP Cloud SDK',
  tagline:
    'A one stop shop for developing and extending SAP application in a Cloud.',
  url: 'https://artemkovalyov.github.io/ph-stone',
  baseUrl: '/ph-stone/',
  favicon: 'img/favicon.ico',
  organizationName: 'artemkovalyov', // Usually your GitHub org/user name.
  projectName: 'ph-stone', // Usually your repo name.
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
          to: 'blog',
          label: 'Blog',
          position: 'left'
        },
        {
          to: 'support',
          label: 'Support',
          position: 'left'
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
              to: 'docs/introduction'
            },
            {
              label: 'Clod SDK for Java',
              to: 'docs/intro-java-sdk'
            },
            {
              label: 'Clod SDK for JS',
              to: 'docs/intro-javascript-sdk'
            },
            {
              label: 'Clod SDK for CI/CD',
              href: 'https://sap.github.io/jenkins-library/'
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
              to: 'blog'
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
          sidebarPath: require.resolve('./sidebars.js')
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
