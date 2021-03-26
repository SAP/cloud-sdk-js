# SAP Cloud SDK CLI - Scaffolding

We want to provide users of the CLI a way to generate a functioning app scaffold that helps teams get started, highlight best practices and help when building a demo app.

The CLI can add all the necessary files to use the SDK and deploy to CF to any node.js based application with few to no manual adjustments.
Therefore the scaffold can be based on top of any existing scaffold or a custom scaffold which we maintain.

## Basic assumptions

To narrow down the options, we make the following assumptions:

- Testing setup provided
- Typescript based
- Express.js as web framework (due to popularity and better CAP support)

On top there are other "should-have" criteria:

- Not unnecessarily complex (to avoid support requests regarding the scaffold)
- Actively updated by trusted maintainer
- Works out-of-the-box (no manipulation by us or end-user needed)
- Easy to install (no additional global dependencies)

## Candidates

| Criteria     | [Microsoft Starter](https://github.com/microsoft/TypeScript-Node-Starter) | [Hello Node Typescript](https://github.com/larkintuckerllc/hello-nodejs-typescript) | [Express generator](https://github.com/expressjs/generator) | [W3TEC Starter](https://github.com/w3tecch/express-typescript-boilerplate) | [Nest CLI](https://github.com/nestjs/nest-cli) |
| ------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------- |
| Testing      | ✅                                                                        | ❌                                                                                  | ❌                                                          | ✅                                                                         | ✅                                             |
| Typescript   | ✅                                                                        | ✅                                                                                  | ❌                                                          | ✅                                                                         | ✅                                             |
| Express.js   | ✅                                                                        | ✅                                                                                  | ✅                                                          | ✅                                                                         | ❌                                             |
| Complexity   | high                                                                      | ✅                                                                                  | medium                                                      | very high                                                                  | medium                                         |
| Maintainance | ✅                                                                        | ❌                                                                                  | slow                                                        | ✅                                                                         | ✅                                             |
| Just works   | TBD                                                                       | TBD                                                                                 | ✅                                                          | TBD                                                                        | ✅                                             |
| Installing   | git                                                                       | git                                                                                 | npm                                                         | git                                                                        | npm                                            |

None of the options are obvious candidates due to different reasons.

Alternatively, we could create our own scaffold.
This should fulfill all our categories, but would be a bigger initial investment and would require on-going maintenance (especially if there are big shifts in dependency recommendations e.g. if jest is superseded by another testing lib).
A fully fledged scaffold might even be a separate "product" and we should consider to create a new open-source repo for it.

## Decision

After internal discussion we decided to use Nest for now.
