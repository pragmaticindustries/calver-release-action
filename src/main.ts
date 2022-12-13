import * as core from '@actions/core'
import {createRelease, listTags} from './github'
import {generateVersionPrefix, matchVersionPattern} from './utils'

async function run(): Promise<void> {
  try {
    const isDryRun = /true/i.test(core.getInput('dry_run'))

    const tags = await listTags()
    const versionPrefix = generateVersionPrefix()
    const matchedVersions = tags
      .map(it => it.name)
      .filter(it => matchVersionPattern(it))
      .filter(it => it.startsWith(versionPrefix))
    let newVersion: string
    if (matchedVersions.length > 0) {
      const descSortFn = (a: number, b: number): number => b - a
      const newMinor =
        matchedVersions
          .map(it => Number(it.replace(versionPrefix, '')))
          .sort(descSortFn)[0] + 1
      newVersion = `${versionPrefix}${newMinor}`
    } else {
      newVersion = `${versionPrefix}1`
    }
    core.info(`New version: ${newVersion}`)

    if (!isDryRun) {
      const releaseUrl = await createRelease(newVersion)
      core.setOutput('url', releaseUrl)
    }
  } catch (e) {
    if (e instanceof Error) core.setFailed(e.message)
  }
}

run()
