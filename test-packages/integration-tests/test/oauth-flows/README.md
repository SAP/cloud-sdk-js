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
