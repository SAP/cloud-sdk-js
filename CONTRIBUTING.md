# Contributing to the SAP Cloud SDK documentation portal

## Prerequisites
- [Node.js](https://nodejs.org/en/download/). The latest LTS is recommended. Check you version with `node -v`. You can use [nvm](https://github.com/nvm-sh/nvm) for managing multiple Node versions on a single machine.

## Hosting the documentation locally
- Run `npm install`
- Run `npm start`
- The SAP Cloud SDK documentation portal should open in a new browser window

### How to document
Read the [getting started guide](https://sap.github.io/cloud-sdk/docs/dzen/getting-started).
The documentation articles are located in the `docs` directory.
Add or modify an article and create a pull request.
Feel free to also check this [guide on mindful witting](https://sap.github.io/cloud-sdk/docs/dzen/how-to-write-documentation).

### Docker alternative
- Consider the following commands (1) to install node dependencies and (2) to serve the continuously generated site:
  ```bash
  docker run -it --rm -v "${pwd}:/doc" -w "/doc" --entrypoint "/bin/sh" node:alpine3.10 -c "npm ci"
  docker run -it --rm -v "${pwd}:/doc" -w "/doc" --entrypoint "/bin/sh" -p 3000:3000 node:alpine3.10 -c "npm run start -- --port 3000 --host 0.0.0.0"
  ```
Windows users can use PowerShell.

## Dos and don'ts
- Be concise.
- Avoid abbreviations or introduce them unless it's absolutely obvious and widely adopted.
- Don't sell your features, explain them.
- Use simple vocabulary and the most frequent words. Try thesaurus for matching your vocabulary.
- Provide links whenever you mention 3rd party resources.
- Build upon already available content and use it for reference.
- Write incrementally.
- Use spell checker at all times

## Contributing as a team member

1. Go to: https://opensource-portal.tools.sap.corp/
2. Search for the `cloud-sdk-team` and ask to be added.

Once you are added to the team you can submit `Pull requests` without forking the repository.
