---
id: getting-started
title: Getting started with Documentation
hide_title: false
hide_table_of_contents: false
sidebar_label: Getting Started
description: This is a getting started guide for anyone willing to contributio to the Cloud SDK documentation.
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
image:
---

import useBaseUrl from '@docusaurus/useBaseUrl'


## 0. What you'll need?  ##
> A great attitude and a bit of inspiration

### Follow these steps (approx. 5 min) ###

- [x] **Be The Best You**
- [ ] Install [Node.js](https://nodejs.org/en/download/ )
- [ ] Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git )
- [ ] Clone [Documentation repository](https://github.com/SAP/cloud-sdk/ ). Mind to switch to `documentation` branch.
- [ ] Open it with you favorite Markdown editor
- [ ] Proceed to the next step

:::tip Use Online Gitub editor if you can't clone things locally
<img alt="" src={useBaseUrl('img/edit-article.png')}/>
:::

## 1. Running documentation locally (approx. 5-7 min) ##

Check `Node.js` and `npm` are installed. You can use the latest LTS release.

```bash
node -v
v12.16.1
npm -v
6.14.4
```
Clone the repository

```bash
git clone git@github.com:SAP/cloud-sdk.git
git checkout documentation
```

Run documentation locally
```bash
cd documentation
npm install
npm start
```

You should see the following output in your console and documentation should automatically open in your browser
```bash
> sap-cloud-sdk-documentation@0.1.0 start /home/USERNAME/dev/documentation
> docusaurus start

Starting the development server...

✔ Client
  Compiled successfully in 3.13s

ℹ ｢wds｣: Project is running at http://localhost:3000/
ℹ ｢wds｣: webpack output is served from /cloud-sdk/
ℹ ｢wds｣: Content not from webpack is served from /home/USERNAME/dev/documentation
ℹ ｢wds｣: 404s will fallback to /index.html

```
A browser tab with the starting page of documentation portal should open automatically. Try navigating to [http://localhost:3000/](http://localhost:3000/) as a fall back opiton.


## 2. Documenting ##
:::info Most of the people using the word `creative` forget about the `create` side of it.
Creativity is the ability to generate innovative ideas and manifest them from thought into reality. The process involves original thinking and then producing.

**Creative** without producing is just **Imaginative**
:::

:::tip Rule of thumb:
- less then 5 mins? - **just do it, no need for backlog item**
- 15 mins - 2hr - **depending on your and team's preferences add it to the backlog or to you personal ToDo**
- \> 2hr - **Add to backlog and track together with the team**
:::

### Getting hands dirty (approx. 15-20 mins) ###

Create a branch for the thing you document

```bash
git checkout -b java-client-generator-how-to
```

1. All the documentation resides in the `docs` folder.
2. Let's start with creating a file containing our _How To_. In my case it will be `java/how-to/generate-client.md`
3. Use content from this internal [generator how-to](https://github.wdf.sap.corp/MA/sdk/edit/develop/docs/how-to/use-odata-v4.md )
4. Add the meta-header and update the fields
```markdown
---
id: generate-odata-client-with-cloud-sdk-for-java-how-to
title: Generate OData client
hide_title: false
hide_table_of_contents: false
sidebar_label: Generate Odata client
description: You'll learn how to convert your service definition into a Java project containing type-safe Odata V4 lient to consume it
keywords: --- can be removed or standard template
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
---
```
5. Try it locally to enable preview
- [ ] Open `sidebar.js` from project root
- [ ] Find this code snippet in `Java` section
```javascript
        type: 'category',
        label: 'How To',
        items: [...]
```
- [ ] Add your file to `How To` category
```javascript
        type: 'category',
        label: 'How To',
        items: [
          'java/how-to/generate-odata-client-with-cloud-sdk-for-java-how-to',
          'java/how-to/sap-cloud-sdk-linux-how-to',
          'java/how-to/cf-cli',
		  '...'
		  ]
```
- [ ] Start your project by running `npm start`, it should recompile automatically on every change afterward
- [ ] Make sure you can access you article via [http://localhost:3000/cloud-sdk/docs/java/how-to/generate-odata-client-with-cloud-sdk-for-java-how-to](http://localhost:3000/cloud-sdk/docs/java/how-to/generate-odata-client-with-cloud-sdk-for-java-how-to )`
6. Showcase your knowledge, creativity and markdown skills by delivering a concise but useful documentation. Please,
   check [this material on good writing practices](how-to-write-documentation).
7. Be proud of yourself!

### Go Live! ###
Time to show you amazing work to the world!

- [ ] Make sure your documentation builds
```bash
npm run build
```
- [ ] Please, `commit` you work and create a `pull-request`.

Because our **Documentation** shares its home with the **SAP Cloud SDK for JavaScript** you have to make your `pull-request` against the `documentation` branch.

<img alt="pull-request" src={useBaseUrl('img/docs/pull-request.png')}/>

#### Review ####
Ask someone to review you work.
Please, make sure you followed [this best practices](how-to-write-documentation) or at lease run you writing through the spell checker.

#### Publish ####
After your `Pull request` successfully merged, pipeline will automatically publish new version of the documentation. You can check [GitHub actions](https://github.com/SAP/cloud-sdk/actions?query=workflow%3A%22Release+Cloud+SDK+documentation%22) for Documentation or simply navigate to live documentation portal and check if your changes applied.

:::tip Clear cache
I recommend reloading the page without cache.
:::
## 3. Conventions ##
- Static content resides in the `static` folder
- Linking to files and images from Markdown starts from the folder where you file is located.
  In this case if I want to link anything in `docs` folder I'll have to go with [my-link](../java/getting-started).
  You can reach up until root `docs` folder level with this approach.
- To make dynamic link to the `static` folder content you'll need to use a snippet similar to the one below:

```js
import useBaseUrl from '@docusaurus/useBaseUrl'
<img alt="pull-request" src={useBaseUrl('img/docs/pull-request.png')}/>
```

- Of course you can link with `your-link/your-path#your-heading`,
  check the right-side menu for the links like [sending you to the top](http://localhost:3000/cloud-sdk/docs/dzen/getting-started#what-youll-need ).

## 4. Advanced topics ##
**Tabs? Admonitions? Advanced code blocks? You own plugin?**
Docusaurus support additional markup to extend markdown.
Please, refer to the official documentation:
- [Tabs](https://v2.docusaurus.io/docs/markdown-features/#tabs )
- [Admonitions](https://v2.docusaurus.io/docs/markdown-features/#calloutsadmonitions )
- [Coding you own component with React and MDX](https://v2.docusaurus.io/docs/markdown-features/#embedding-react-components-with-mdx )

## 5. Where to get help? ##
- Check [Docusaurus documentation](https://v2.docusaurus.io/docs/markdown-features/ )
- Read good documentation to write good documentation
- Ask your experienced colleague

## 6. What to do next? ##
- Deliver your great documentation item now.
- Share ideas and feedback about improving Cloud SDK documentation

## 7. Useful resources ##

- [Markdown Guide](https://www.markdownguide.org/) - officially supported by Docusaurus
