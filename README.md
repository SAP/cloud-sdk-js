# SAP Cloud SDK documentation portal

## Currently deployed documentation ##

[SAP Cloud SDK Documentation](https://sap.github.io/cloud-sdk/ )

## Requirements ##

- [Node.js](https://nodejs.org/en/download/). The latest LTS is recommended. Check you version with `node -v`. You can use [nvm](https://github.com/nvm-sh/nvm) for managing multiple Node versions on a single machine.

## Getting started ##

- Clone this repository
- Change to the root directory of the cloned project
- Run `npm install`
- Run `npm start`
- You should now see a browser window with SAP Cloud SDK documentation portal open

### How to document
- Read this [getting started guide](https://sap.github.io/cloud-sdk/docs/dzen/getting-started )
- Also check this [guide on mindful witting](https://sap.github.io/cloud-sdk/docs/dzen/how-to-write-documentation )


### Docker alternative

- Consider the following commands (1) to install node dependencies and (2) to serve the continuously generated site:
  ```bash
  docker run -it --rm -v "${pwd}:/doc" -w "/doc" --entrypoint "/bin/sh" node:alpine3.10 -c "npm ci"
  docker run -it --rm -v "${pwd}:/doc" -w "/doc" --entrypoint "/bin/sh" -p 3000:3000 node:alpine3.10 -c "npm run start -- --port 3000 --host 0.0.0.0"
  ```
  Windows users can use PowerShell.

## How to start documenting ##

- Open your favorite text editor with Markdown support
- Navigate to the `docs` folder inside of the cloned project
- Find a reasonable place for the item you want to document in the hierarchy
- Make additional hierarchy if needed
- Create required Markdown files
- Be eloquent but concise making you point
- Save you work and make a pull request
- Enjoy love and appreciation from community

Check our additional materials and our documentation guide [here](https://sap.github.io/cloud-sdk/docs/dzen/getting-started )

## How we write

- Being concise is a virtue. Write short and on purpose.
- Provide only relevant context. Make a good assumption of readers' knowledge and make it your starting point for context.
- Give a link whenever you mention 3rd party resources, library, concept, abbreviation, reference, etc.
- Avoid abbreviations or introduce them unless it's absolutely obvious and widely adopted.
- Build upon already available content and use it for reference. Create materials that could be leveraged by others.
  - Think modular. Extract logically independent parts and link to them from larger scope materials.
  - Use the same approach you do with coding when structuring your application
  - Increase scalability so that others can leverage your work
  - Generalize up to the level where it makes sense but not more
- Ask if your peers understood what you meant
- Be your reader, make it a candy
- Don't sell, don't do marketing, the value comes from the content itself, not you words of accolade to our work. Leave that for Blogs and even there be humble.
- Write incrementally. Every little update counts. It saves you time. Editing is easier than writing from scratch in most cases.
- Use simple vocabulary and the most frequent words. Try thesaurus for matching your vocabulary.
- Use spell checker at all times
- Get inspiration from good documentation! Check documentation from the best companies in the area, prominent startups, and other quality sources to collect ideas and set yourself for success.
- Give quality feedback to your colleagues. Suggest changes that improve our documentation quality.

## Adding yourself to SAP organization

1. Navigate to: https://opensource-portal.tools.sap.corp/
2. Authenticate
3. Search for`cloud-sdk-team` and ask to be added
4. Now you're a part of the team and can submit you `Pull requests` without mandatory forking of the repository
5. You can get assigned to your colleagues pull requests.
