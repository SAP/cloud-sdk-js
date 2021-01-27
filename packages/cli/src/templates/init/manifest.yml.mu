applications:
  - name: {{ projectName }}
    path: deployment/
    buildpacks:
      - nodejs_buildpack
    memory: 256M
    command: {{ command }}
    random-route: true
