---
id: getting-started
title: Getting started - SDK for Java
hide_title: false
hide_table_of_contents: false
sidebar_label: Getting started
description: Get up to spead with SAP Cloud SDK for Java in no time
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
image:
---
import MvnBadge from '../../src/sap/sdk-java/MvnBadge'

<MvnBadge />

## Generating a project from a maven Archetype ##

To generate you project from `maven` archetype you have to provide:

- `groupId` - usually serves as your organization identifier, i.e. `foo.bar.cloud.app`
- `artifactId` - it's your application's name, i.e. `mydreamapp`
- `version` - we recommend keeping `1.0-SNAPSHOT` if you're just starting
- `package` - by default this equals to `groupId`. Change it only if you know what you're doing

Now run:

```bash
mvn archetype:generate "-DarchetypeGroupId=com.sap.cloud.sdk.archetypes" "-DarchetypeArtifactId=scp-cf-tomee" "-DarchetypeVersion=RELEASE"
```
After providing all the interactive values to the CLI it will generate you first Cloud SDK application
```bash
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------< org.apache.maven:standalone-pom >-------------------
[INFO] Building Maven Stub Project (No POM) 1
[INFO] --------------------------------[ pom ]---------------------------------
[INFO]
[INFO] >>> maven-archetype-plugin:3.1.2:generate (default-cli) > generate-sources @ standalone-pom >>>
[INFO]
[INFO] <<< maven-archetype-plugin:3.1.2:generate (default-cli) < generate-sources @ standalone-pom <<<
[INFO]
[INFO]
[INFO] --- maven-archetype-plugin:3.1.2:generate (default-cli) @ standalone-pom ---
[INFO] Generating project in Interactive mode
[INFO] Archetype repository not defined. Using the one from [com.sap.cloud.sdk.archetypes:scp-cf-tomee:3.0.0 -> http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.milestones] found in catalog remote
Downloading from scp-cf-tomee-repo: http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.milestones/com/sap/cloud/sdk/archetypes/scp-cf-tomee/maven-metadata.xml
Downloaded from scp-cf-tomee-repo: http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.milestones/com/sap/cloud/sdk/archetypes/scp-cf-tomee/maven-metadata.xml (1.9 kB at 6.7 kB/s)
Define value for property 'groupId': foo.bar.cloud.app
Define value for property 'artifactId' (should match expression '[^_]+'): mydreamapp
[INFO] Using property: artifactId = mydreamapp
Define value for property 'version' 1.0-SNAPSHOT: :
Define value for property 'package' foo.bar.cloud.app: :
[INFO] Using property: gitignore = .gitignore
[INFO] Using property: skipUsageAnalytics = false
Confirm properties configuration:
groupId: foo.bar.cloud.app
artifactId: mydreamapp
artifactId: mydreamapp
version: 1.0-SNAPSHOT
package: foo.bar.cloud.app
gitignore: .gitignore
skipUsageAnalytics: false
 Y: :
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Archetype: scp-cf-tomee:RELEASE
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: groupId, Value: foo.bar.cloud.app
[INFO] Parameter: artifactId, Value: mydreamapp
[INFO] Parameter: version, Value: 1.0-SNAPSHOT
[INFO] Parameter: package, Value: foo.bar.cloud.app
[INFO] Parameter: packageInPathFormat, Value: foo/bar/cloud/app
[INFO] Parameter: package, Value: foo.bar.cloud.app
[INFO] Parameter: version, Value: 1.0-SNAPSHOT
[INFO] Parameter: groupId, Value: foo.bar.cloud.app
[INFO] Parameter: skipUsageAnalytics, Value: false
[INFO] Parameter: gitignore, Value: .gitignore
[INFO] Parameter: artifactId, Value: mydreamapp
[INFO] Project created from Archetype in dir: /home/i531196/dev/temp/mydreamapp
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  02:28 min
[INFO] Finished at: 2020-04-19T19:25:33+02:00
[INFO] ------------------------------------------------------------------------
```

Change to you `mydreamapp` root directory by:
```bash
cd mydreamapp/

ls
application  cx-server  integration-tests  Jenkinsfile  manifest.yml  pom.xml  unit-tests

```

**Congratulations! You've just configured your application with Cloud SDK for Java.**

## Next steps ##
- [Configure you IDE](how-to/recommended-ide )
- [Get and bind SAP Cloud Foundry CLI](how-to/cf-cli )
- [Check tutorials for Cloud SDK for Java](https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk&tag=topic:java )
- Check our `How To` section from the menu
- Review [JavaDoc](api-documentation )
- Check [what's new](../overview/what-is-new ) and [release notes](https://help.sap.com/doc/6c02295dfa8f47cf9c08a19f2e172901/1.0/en-US/index.html )
