# SAP Cloud SDK documentation portal

## Currently deployed version ##

[SAP Cloud SDK Documentation](https://sap.github.io/cloud-sdk/ )

## Requirements ##

- [Node.js](https://nodejs.org/en/download/) version >= 10.9.0 or above (which can be checked by running `node -v`). You can use [nvm](https://github.com/nvm-sh/nvm)  for managing multiple Node versions on a single machine installed

## Getting started ##

- Clone this repository
- Change to the root directory of the cloned project
- Run `npm install`
- Run `npm start`
- You should now see a browser window with SAP Cloud SDK documentation portal open
- Open [How to write documentation](https://sap.github.io/cloud-sdk/docs/dzen/how-to-write-documentation )


### Docker alternative

- Consider the following commands (1) to install node dependencies and (2) to serve the continuously generated site:
  ```
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
