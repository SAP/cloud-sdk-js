export const errorResponse = () => ({
  error: {
    code: 'ABC',
    message: {
      lang: 'en',
      value: 'Some error occured'
    },
    innererror: {
      application: {
        component_id: 'XYZ',
        service_namespace: '/SAP/',
        service_id: 'API_TEST_SRV',
        service_version: '0001'
      },
      transactionid: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
      timestamp: '20130410220202.0726600',
      Error_Resolution: {
        SAP_Transaction: 'You can do something!',
        SAP_Note: 'See SAP Note XXXX for error analysis.'
      },
      errordetails: [
        {
          code: 'ABC',
          message: 'Some error occured',
          longtext_url: 'URL',
          propertyref: '',
          severity: 'error',
          target: ''
        }
      ]
    }
  }
});
