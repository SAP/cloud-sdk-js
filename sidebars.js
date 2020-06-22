
module.exports = {
  someSidebar: {
    // Dzen: ['dzen/getting-started', 'dzen/how-to-write-documentation'],
    Overview: [
      'overview/about',
      'overview/getting-started',
      'overview/benefits'
      // 'overview/key-features'
      // 'overview/what-is-new'
    ],
    Java: [
      'java/introduction',
      'java/getting-started',
      {
        type: 'category',
        label: 'Features',
        items: [
          // authorization & authentication
          // resilience & caching
          {
            type: 'category',
            label: 'OData',
            items: [
              'java/features/odata/overview',
              'java/features/odata/generate-typed-odata-v2-and-v4-client-for-java',
              'java/features/odata/use-typed-odata-v2-and-v4-client-for-java'
            ]
          },
          {
            type: 'category',
            label: 'REST',
            items: [
              'java/features/rest/overview',
              {
                type: 'category',
                label: 'Released clients',
                items: ['java/features/rest/clients/scp-workflow-rest-api']
              }
            ]
          },
          {
            type: 'category',
            label: 'Connectivity',
            items: [
              'java/features/connectivity/sdk-connectivity-destination-service'
            ]
          },
          {
            type: 'category',
            label: 'Multitenancy',
            items: [
              'java/features/multi-tenancy/multi-tenancy-thread-context'
            ]
          }
        ]
      },
      //   {
      //     type: 'category',
      //     label: 'Features',
      //     items: [
      //       'cli',
      //       'project-archetype',
      //       'vdm',
      //       'odata',
      //       'generate-client',
      //       'cloud-abstractions',
      //       'pipeline',
      //       'caching',
      //       'resilience'
      //     ]
      //   },
      //   {
      //     type: 'category',
      //     label: 'Advanced features',
      //     items: [
      //       'untyped-client',
      //       'odata-helper-classes',
      //       'utility-classes',
      //       'open-api-client',
      //       'sdk-as-a-service',
      //       ''
      //     ]
      //   },
      //   'client-libraries',
      {
        type: 'category',
        label: 'Tips & Tricks',
        items: [
          'java/tips-and-tricks/change-log-level',
          'java/tips-and-tricks/sdk-java-troubleshooting-frequent-problems',
          'java/tips-and-tricks/use-bapi-with-cloud-sdk-for-java'
        ]
      },
      {
        type: 'category',
        label: 'Guides',
        items: [
          'java/guides/sap-cloud-sdk-linux-how-to',
          'java/guides/cf-cli',
          'java/guides/cf-deploy',
          'java/guides/logging-overview',
          'java/guides/tutorial-overview-sdk-java'
          //       'java/how-to/test-odata-service',
          //       'java/how-to/build-client-for-cap',
          //       'java/how-to/cap-with-client-sdk',
          //       'java/how-to/generate-open-api-client',
          //       'java/how-to/workflow-api',
          //       'java/how-to/s4hana-api',
          //       'java/how-to/business-logging',
          //       'java/how-to/sap-graph',
          //       'java/how-to/xsuaa-broker',
          //       'java/how-to/sdk-with-mocked-xsuaa',
          //       'java/how-to/jwt-handling',
          //       'java/how-to/app-router',
          //       'java/how-to/configure-ide'
        ]
      },
      {
        type: 'category',
        label: 'Video tutorials',
        items: [
          'java/video/video-tutorial-about-getting-started-with-sap-cloudsdk-for-java',
          'java/video/video-tutorial-about-type-safe-client-generator-for-odata-with-sap-cloudsdk-for-java',
          'java/video/video-tutorial-about-connectivity--for-odata-with-sap-cloudsdk-for-java'
        ],
      },
      'java/api-reference-java',
      'java/frequently-asked-questions'
    ],
    JavaScript: [
      'js/introduction',
      'js/getting-started',
      {
        type: 'category',
        label: 'Features',
        items: [
          {
            type: 'category',
            label: 'Connectivity',
            items: [
              'js/features/connectivity/proxy-js-sdk',
              'js/features/connectivity/destination-js-sdk'
            ]
          },
          {
            type: 'category',
            label: 'OData',
            items: [
              'js/features/odata/generator-js-sdk',
              'js/features/odata/use-typed-odata-client-for-js'
            ]
          }
        ]
      },
      {
        type: 'category',
        label: 'Guides',
        items: [
          'js/guides/migrate-to-open-source-version-of-cloud-sdk-for-javascript-typescript'
        ],
      },
      'js/api-reference-js-ts'
    ],
    'Continuous Delivery': ['devops/getting-started'],
    // FAQ: ['faq/frequently-asked-questions'],
    // Support: ['support/support'],
    'Community': ['community/community-call'],
    'Related projects': [
      'related-projects/cloud-application-model'
      //   'related-projects/sap-cloud-for-realestate',
      //   'related-projects/sap-s4-hana',
      //   'related-projects/sap-xsuaa-cf'
    ]
  }
}
