Documentation:
- What are the files and how to fill them
- OAuth user access token from XSUAA via single click postmand with web login
    - do not check (authorize using browser)
    - callback URL path which brings up IdP 
    - Client ID and Client secret from vcap of XSUAA
    - auth URL : `https://<subdomain>.authentication.sap.hana.ondemand.com/oauth/authorize?redirect_uri=<redirectURL>`
    - token URL : `https://<subdomain>.authentication.sap.hana.ondemand.com/oauth/token`
    - Cookies will remember the user pwd 

TODO:
- Adjust existing provider app so that workflow is created
- workflow json (see API hub for scopes): {
                     "authorities": [
                         "WORKFLOW_INSTANCE_START",
                         "MESSAGE_SEND",
                         "WORKFLOW_DEFINITION_GET"
                     ]
                 }
- It should appear if you call the  dependencies endpooint given in the  `saas-registry-config.json` of the app
- Ask dennis why credentials for workflow under UUA in VCAP_SERVICES
- In the workflow destination for `OAuth2UserTokenExchange` the clientID and clientSecret from the workflow service are used provider provider works
- For provider provider it works already.

Here some docs I will sort in later:
Documentations

https://blogs.sap.com/2019/06/26/sap-cloud-platform-backend-service-tutorial-28-scenario-approuternodetokenexchangeapi/

OAuth User Token Exchange Authentication (placeholder in app)
https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/e3c333f9de6245fca326993f2397c13a.html

When which header
https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/39d42654093e4f8db20398a06f7eab2b.html

Workflow API doc with sample flows for workflow API:
https://help.sap.com/viewer/e157c391253b4ecd93647bf232d18a83/Cloud/en-US/df943e71122448caaf3c49f5ffd80627.html

