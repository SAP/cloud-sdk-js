# Release Process
All SAP Cloud SDK modules will be published with the same version regardless whether there where changes within the particular packages or not.

## How to trigger a release
The release process can only be triggered by owners of the repository. It is triggered by bumping the version using `lerna`. For convenience we added two scripts for patch and minor version bumps (`bump:patch` and `bump:minor`).
Running one of those commands will increase the version and commit this change to master. It will also create a version tag (e. g. `v1.18.0`), which in turn triggers a build to run.
If this run is successful a Github release will be drafted. The name of the release will be the name of the tag.

You can now adjust the release notes on this tag. When you decide that you are ready for releasing, publish the release. This will trigger the release pipeline, that publishes all modules to npm.

### What to do when the build fails
You should only trigger a release, when the last master build succeeded. If the pipeline still fails for some reason, remove the tag locally and on Github, before fixing the issue.
Once the issue is fixed, you will have to create a tag manually. Creating the tag should trigger the process as described above.
