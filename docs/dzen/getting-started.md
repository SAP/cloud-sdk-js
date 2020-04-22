---
id: getting-started
title: Getting started with Documentation
hide_title: false
hide_table_of_contents: false
sidebar_label: Getting Started
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


## What you'll need?  ##
> Great attitude and a bit of inspiration

### Follow this steps (approx. 5 min) ###

- [x] **Be The Best You**
- [ ] Install [Node.js](https://nodejs.org/en/download/ ) version 12.x
- [ ] Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git )
- [ ] Clone [Documentation repository](https://github.com/SAP/cloud-sdk/tree/documentation ). Mind, use `documentation` branch.
- [ ] Open it with you favorite Markdown or code editor
- [ ] Proceed to the next step

:::tip Use Online GitHub editor if you can't clone things locally
Open documentation branch and [checking files in browser](https://github.com/SAP/cloud-sdk/tree/documentation )
:::

## Running documentation locally (approx. 5-7 min) ##

Check `Node.js` and `npm` are installed
```bash
node -v
v12.16.1
npm -v
6.14.4
```
Clone the documentation branch
```bash
git clone -b documentation git@github.com:SAP/cloud-sdk.git documentation
```

Run documentation locally
```bash
cd documentation
npm ci
npm start

```

You should see the following output in your console and documentation should automatically open in your browser
```bash
> ph-stone@0.0.0 start /home/i531196/dev/docu
> docusaurus start

Starting the development server...

✔ Client
  Compiled successfully in 3.13s

ℹ ｢wds｣: Project is running at http://localhost:3000/
ℹ ｢wds｣: webpack output is served from /cloud-sdk/
ℹ ｢wds｣: Content not from webpack is served from /home/i531196/dev/docu
ℹ ｢wds｣: 404s will fallback to /index.html

```

Try opening [http://localhost:3000/](http://localhost:3000/ ) in case browser tab was not created automatically.

:::note
Congratulation! You achieved **white belt** in mastery or the docs Kung Fu. Please, proceed to the next level!
:::

## Getting Creative ##
:::info Most of the people using word `Creative` forget about `create` side of it.
Creativity is the ability to generate innovative ideas and manifest them from thought into reality. The process involves original thinking and then producing.

**Creative** without producing is just **Imaginative**
:::

### Where are our BLIs [^1] for DCIs [^2]? ###

You'll find backlog items for documentation items [here](https://github.wdf.sap.corp/MA/scp-rocket/projects/12 ). VPN
access is required.

I encourage you to make a bookmark and every time you have an `Eureka` about DCI to note it quickly.

Remember to:
- Tag is with `content`
- Assign yourself to the item if you're planning to write it
- Add enough context to explain your idea for anyone working on it

#### What about team's backlogs? ####
- I'll be sourcing items there from the GitHub project to be taken in the respective delivery process
- Things like fixing typos and minor updates do not need BLIs
- Editing FAQ, adding a very quick How To or a section to an existing article should not require having a BLI in team's
  backlog, but I ask to log it in the GitHub project for now to keep it trackable.

:::tip Rule of thumb:
- less then 5 mins? - **don't log**
- 15 mins - 2hr - **BLI on GitHub**
- \> 2hr - **Tracked via backlog of respective team**
:::

### Getting hands dirty (approx. 15-20 mins) ###

Create a branch for the thing you document

```bash
git checkout -b java-client-generator-how-to
```

1. All the documentation resides in `docs` folder.
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
custom_edit_url: https://github.com --- can be removed
description: You'll learn how to convert your service definition into a Java project containing type-safe Odata V4 lient to consume it
keywords: --- can be removed or standard template
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
image: --- only for blog
---
```
5. Let's publish it locally to enable prview
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
- [ ] Start you project by running `npm start`, it should recompile automatically on every change afterward
- [ ] Make sure you can access you article via [http://localhost:3000/cloud-sdk/docs/java/how-to/generate-odata-client-with-cloud-sdk-for-java-how-to](http://localhost:3000/cloud-sdk/docs/java/how-to/generate-odata-client-with-cloud-sdk-for-java-how-to )`
6. Showcase your knowledge, creativity and markdown skills by delivering a concise but useful documentation. Please,
   check [this material on good writing practices](how-to-write-documentation).
7. Be proud of yourself!

:::caution You made it to Orange Belt of Documentation Kung Fu
Great Job and stay curious!
:::

### Go Live! ###
Time to show you amazing work to the world! But first you have to pass your final exam.

- [ ] Make sure your documentation builds
```bash
npm run build
```
- [ ] Please, `commit` you work and create a `pull-request`.

Because our **Documentation** shares home with **SDK for JavaScript** you have to make you `pull-request` against
`documentation` branch.

<img alt="pull-request" src={useBaseUrl('img/docs/pull-request.png')}/>

#### Review ####
Ask someone to review you work. Please, make sure you followed [this best practices](how-to-write-documentation) or at lease ran you writing through
the spell checker.

#### Publish ####
Pipeline should do it for you after `pull-request` is merged. It's still work in progress. Please, contact Artem Kovalov
to push the changes to GitHub pages in the meanwhile.

## Conventions ##
- Static content resides in the `static` folder
- Linking to files and images from Markdown starts from the folder where you file is located. In this case if I want to
  link anything in `docs` folder I'll have to go with [my-link](../java/getting-started). You can react up until `docs`
  with this approach.
- To make dynamic link to the `static` folder content you'll need smth like this:
```javascript
import useBaseUrl from '@docusaurus/useBaseUrl'
<img alt="pull-request" src={useBaseUrl('img/docs/pull-request.png')}/>
```
- Of course you can link with `your-link/your-path#your-heading`, check the right-side menu for the links like [sending
  you to the top](http://localhost:3000/cloud-sdk/docs/dzen/getting-started#what-youll-need ).

## Advanced topics ##
**Tabs? Admonitions? Advanced code blocks? You own plugin?**
Docusaurus support additional markup to extend markdown.
Please, refer to the official documentation:
- [Tabs](https://v2.docusaurus.io/docs/markdown-features/#tabs )
- [Admonitions](https://v2.docusaurus.io/docs/markdown-features/#calloutsadmonitions )
- [Coding you own component with React and MDX](https://v2.docusaurus.io/docs/markdown-features/#embedding-react-components-with-mdx )

## Where to get help? ##
- Ask me anything if in doubt or feeling stuck. Really **ANYTHING**
- Check [Docusaurus documentation](https://v2.docusaurus.io/docs/markdown-features/ )
- Read good documentation to write good documentation

## What to do next? ##
- Think of a `How To`, `FAQ`, `Article`, `Manual`, `Snippet` or simply `DCI` and put it into work!
- Get you first item delivered ~~this~~ next week!
- Share ideas and feedback about improving our documentation

## Useful resources ##

- [Markdown Guide](https://www.markdownguide.org/) - officially supported by Docusaurus
- [Kung Fu belt system](https://www.kungfuwestisland.com/kung-fu-belt-system/) - you'll need a Kimono to look cool in
  the office

## Questions? ##


[^1]: Backlog Item
[^2]: Documentation Item
