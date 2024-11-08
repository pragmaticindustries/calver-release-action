import {afterEach, beforeEach, describe, expect, it} from '@jest/globals'
import {
  generateReleaseTitle,
  generateVersionPrefix,
  matchVersionPattern,
  toBoolean
} from './utils'
import * as sinon from 'sinon'

describe('matchVersionPattern', () => {
  describe('supported CalVer', () => {
    it('CalVer matches YY.0M.MINOR pattern is supported', () => {
      expect(matchVersionPattern('22.10.10001')).toBe(true)
    })
  })
  describe('unsupported CalVer', () => {
    it('CalVer pattern with one-digit month is not supported', () => {
      expect(matchVersionPattern('22.1.10001')).toBe(false)
    })
    it('CalVer with six-digits minor is not supported', () => {
      expect(matchVersionPattern('22.12.100001')).toBe(false)
    })
    it('CalVer without minor', () => {
      expect(matchVersionPattern('22.12')).toBe(false)
    })
    it('CalVer with non-digit minor', () => {
      expect(matchVersionPattern('22.12.a')).toBe(false)
    })
    it('CalVer with year in YYYY format', () => {
      expect(matchVersionPattern('2024.12.1')).toBe(false)
    })
  })
})

describe('generateVersionPrefix', () => {
  let clock: sinon.SinonFakeTimers
  beforeEach(() => {
    clock = sinon.useFakeTimers({
      now: 1483228800000 // January 1st 2017
    })
  })
  afterEach(function () {
    clock.restore()
  })
  it('generates YY.MM.', () => {
    expect(generateVersionPrefix('utc')).toMatch(/\d{2}\.\d{2}./)
    expect(generateVersionPrefix('utc')).toBe('17.01.')
  })
  it('supports different timezones', () => {
    expect(generateVersionPrefix('America/Los_Angeles')).toBe('16.12.')
    expect(generateVersionPrefix('Australia/Sydney')).toBe('17.01.')
  })
})

describe('toBoolean', () => {
  it('true string should be converted to true', () => {
    expect(toBoolean('true')).toBe(true)
  })
  it('false string should be converted to false', () => {
    expect(toBoolean('false')).toBe(false)
  })
  it('any string except true should be converted to false', () => {
    expect(toBoolean('any')).toBe(false)
  })
})

describe('generateReleaseTitle', () => {
  it('returns string', () => {
    expect(generateReleaseTitle('Hello world')).toBe('Hello world')
  })
  it('replaces tag name', () => {
    expect(generateReleaseTitle('Release ${version}', '23.01.1')).toBe(
      'Release 23.01.1'
    )
    expect(generateReleaseTitle('Release ${version}')).toBe('Release ')
  })
  it('supports complex pattern', () => {
    expect(
      generateReleaseTitle('[${version}] リリース 📙 ${version}', '23.01.1')
    ).toBe('[23.01.1] リリース 📙 23.01.1')
  })
})
