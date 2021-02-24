applications:
  - name: {{ projectName }}-approuter
    routes:
      - route: >-
          {{ projectName }}-apps.cfapps.sap.hana.ondemand.com
    path: .
    memory: 128M
    buildpacks:
      - nodejs_buildpack
    env:
      TENANT_HOST_PATTERN: >-
        "{{ projectName }}-(.*).cfapps.sap.hana.ondemand.com"
      destinations: >-
        [{"name":"{{ projectName }}","url":"{{ projectName }}.cfapps.sap.hana.ondemand.com","forwardAuthToken":true}]
    services:
      - {{ projectName }}-xsuaa
