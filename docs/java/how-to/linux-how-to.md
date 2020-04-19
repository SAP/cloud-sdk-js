---
id: sap-cloud-sdk-linux-how-to
title: Getting started on Linux
hide_title: false
hide_table_of_contents: false
sidebar_label: SAP Cloud SDK on Linux
custom_edit_url: https://github.com
description: Get up and started to build with SAP Cloud SDK on Linux
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
image:
---

## Get SAP Cloud SDK development environment for Java on Linux (Debian based distribution) ##

This tutorial will guide you through getting your SAP Cloud SDK development environment up and running on Linux. All the
steps were verified on Ubuntu 18.04 and should be in compliance with other Debian based distributions.

## Required knowledge

No initial knowledge is required.

## Let's install dependencies

### Installing JDK and Maven

SAP Cloud SDK supports Java 8 and Java 11

I'll base this example on Java 8

``` bash
sudo apt-get install openjdk-8-jdk
```

Updating alternatives to make sure right version of Java is used

Your distribution might have a different version of Java installed by default. You can check you Java version by
running:
``` bash
java -version
```
As you can see bellow, my laptop has Java 11 as default.
``` bash
openjdk 11.0.5 2019-10-15
OpenJDK Runtime Environment (build 11.0.5+10-post-Ubuntu-0ubuntu1.1)
OpenJDK 64-Bit Server VM (build 11.0.5+10-post-Ubuntu-0ubuntu1.1, mixed mode)
```
Check what Java versions you have on you machine with:
``` bash
update-java-alternatives --list
```
After installing OpenJDK 8 you should now have both Java 8 and Java 11
``` bash
java-1.11.0-openjdk-amd64      1111       /usr/lib/jvm/java-1.11.0-openjdk-amd64
java-1.8.0-openjdk-amd64       1081       /usr/lib/jvm/java-1.8.0-openjdk-amd64
 ```
To switch between Java versions run:
``` bash
sudo update-alternatives --config java
```
In my case I have to press **2** to make Java 8 default
``` bash
Selection    Path                                            Priority   Status
------------------------------------------------------------
0            /usr/lib/jvm/java-11-openjdk-amd64/bin/java      1111      auto mode
*1            /usr/lib/jvm/java-11-openjdk-amd64/bin/java      1111      manual mode
2            /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java   1081      manual mode
Press <enter> to keep the current choice[*], or type selection number:
```
Check Java version again. Mind, `version` parameter has just one hyphen for Java 8 CLI
``` bash
java -version
```
You have now switched to Java 8
``` bash
openjdk version "1.8.0_232"
OpenJDK Runtime Environment (build 1.8.0_232-8u232-b09-0ubuntu1.1-b09)
OpenJDK 64-Bit Server VM (build 25.232-b09, mixed mode)
```
### Use [maven](https://maven.apache.org/) to build and deploy your App

Install maven with:

``` bash
sudo apt-get install maven
```

To check if `maven` is installed correctly run:

``` bash
mvn --version
```
You'll see the maven version and build details

``` bash
Apache Maven 3.6.1
Maven home: /usr/share/maven
Java version: 1.8.0_232, vendor: Private Build, runtime: /usr/lib/jvm/java-8-openjdk-amd64/jre
Default locale: en_US, platform encoding: ANSI_X3.4-1968
OS name: "linux", version: "5.3.0-26-generic", arch: "amd64", family: "unix"
```

To find out more about Apache Maven, how to get it for your Linux distribution and detailed tutorials [follow the
official maven documentation](https://maven.apache.org/).

### Cloud Foundry Command Line Interface (CLI)

To deploy your App developed with SAP Cloud SDK to [SAP Cloud Platform](https://www.sap.com/products/cloud-platform.html)
you'll need Cloud Foundry CLI. You can download latest release of DEB package [from official CF GitHub
repository](https://github.com/cloudfoundry/cli/releases) or follow
[instructions](https://github.com/cloudfoundry/cli#installing-using-a-package-manager) to install it with you package
manager: apt-get, yum and homebrew are supported.

After installing the CLI you might need to reload you shell before it becomes available. To check if it works run:

``` bash
cf
```

### Installing IntelliJ Idea IDE

For best developer experience we recommend getting community version of **IntelliJ Idea**. Download gzip archive from the
[official site](https://www.jetbrains.com/idea/download/#section=linux) and follow installation instructions for you
system.

:::info
Another supported IDE is [Eclipse](https://www.eclipse.org/ide/).
:::

## Initialize and build your App

### To initialize your SAP Cloud SDK App from the maven archetype ###

``` bash
mvn archetype:generate -DarchetypeGroupId=com.sap.cloud.sdk.archetypes -DarchetypeArtifactId=scp-cf-tomee -DarchetypeVersion=RELEASE
```
The snippet above will create a Tomee App, you can also use archetype for Spring Boot.

### Building your App
Change directory to the root of the App you've just created

``` bash
cd /<app-root-directory>
```

To build your APP run

``` bash
mvn clean package
```

After a successful build you'll find a `target` folder within you App's root folder containing a `war` file
along with other build artifacts. This `war` file is a packaged version of your web-app that's going to be deployed to the
SAP Cloud Foundry environment.

### Bind your CLI to SAP Cloud Foundry

Let's associate you Cloud Foundry (CF) CLI to your SAP account by providing an API endpoint and logging in with your
account.

**Select endpoint depending on your region:**

  - Europe <https://api.cf.eu10.hana.ondemand.com>
  - US East: <https://api.cf.us10.hana.ondemand.com>
  - US CENTRAL: <https://api.cf.us20.hana.ondemand.com>

To use a snippet for Europe run:

```bash
    cf api https://api.cf.eu10.hana.ondemand.com
```

Provide your credential for SAP Cloud Foundry by running:

``` bash
cf login
```

### Deploying your App

To deploy your app run:

``` bash
cf push
```

After a successful deployment you'll see a status of just pushed App:

``` bash
Waiting for app to start...
name:                test-app
requested state:     started
isolation segment:   trial
routes:              test-app-shy-hyena-st.cfapps.eu10.hana.ondemand.com
last uploaded:       Sun 12 Jan 14:29:02 CET 2020
stack:               cflinuxfs3
buildpacks:          sap_java_buildpack
type:            web
instances:       1/1
memory usage:    1024M
start command:   JRE_HOME="META-INF/.sap_java_buildpack/sapjvm" JBP_CONFIG_SAPJVM_MEMORY_STACK_THREADS="250" JBP_CLASSPATH="" JBP_CONFIG_SAPJVM_MEMORY_CLASS_COUNT="" JAVA_HOME="META-INF/.sap_java_buildpack/sapjvm"
JBP_CONFIG_SAPJVM_MEMORY_HEADROOM="0" CATALINA_HOME="META-INF/.sap_java_buildpack/tomee7" JAVA_OPTS=" -Djava.io.tmpdir=$TMPDIR -Dhttp.port=$PORT -Daccess.logging.enabled=false
-Dlogback.configurationFile=file:META-INF/.sap_java_buildpack/tomee7/conf/logback.xml -DSAPJVM_EXTENSION_COMMAND_HANDLER=com.sap.xs2rt.dropletaddon.JvmExtensionCommandHandler
-Djava.protocol.handler.pkgs=com.sap.xs.statistics.stream.handling.protocols -agentpath:/app/META-INF/.sap_java_buildpack/jvm_kill/jvmkill-1.12.0.RELEASE-trusty.so=printHeapHistogram=1 -Dsun.net.inetaddr.ttl=0
-Dsun.net.inetaddr.negative.ttl=0" ./META-INF/.sap_java_buildpack/tomee7/bin/catalina.sh run
state     since                  cpu     memory         disk           details
#0   running   2020-01-12T13:30:29Z   69.0%   446.2M of 1G   191.1M of 1G
```

To verify your deployment take a `URL` indicated in `routes` section from deployment output above. Put it into your
browser and add `/hello` at the end. It should look similar to: `https://test-app-shy-hyena-st.cfapps.eu10.hana.ondemand.com/hello`
