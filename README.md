# CalVer Release Action

## CalVer

> CalVer is a versioning convention based on your project's release calendar, instead of arbitrary numbers. 
 
[Source](https://calver.org/)

## Usage

### Inputs

- github_token (*REQUIRED*): GitHub token to be used for this action
- dry_run (*OPTIONAL*): Whether to publish a release or just print supposed version (default: false)
- generate_release_notes: (*OPTIONAL*): Whether to generate release notes (default: true)

### Outputs

- version: generated version string (currently only `YYYY.0M.0D.MINOR` is supported and GitHub Action Runner's timezone is used)
- url: GitHub url for the published release

### Example

```yaml
name: Publish

on:
  workflow_dispatch:
concurrency:
  publish_version
jobs:
  publish:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v3
      - uses: cho0o0/calver-release-action@2022.12.13.1
        with:
          generate_release_notes: true
          dry_run: false
          # Do not use GITHUB_TOKEN if you want to trigger other workflows
          github_token: ${{secrets.GITHUB_TOKEN}}
```

## Development

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test
```

### Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  dry_run: true
  github_token: ${{secrets.GITHUB_TOKEN}}
```
