import {afterEach, beforeEach, describe, expect, it} from '@jest/globals'
import {generateVersionPrefix, matchVersionPattern} from './utils'
import * as sinon from 'sinon'

describe('matchVersionPattern', () => {
  describe('supported CalVer', () => {
    it('CalVer matches YYYY.0M.0D.MINOR pattern is supported', () => {
      expect(matchVersionPattern('2022.10.01.10001')).toBe(true)
    })
  })
  describe('unsupported CalVer', () => {
    it('CalVer pattern with one-digit month is not supported', () => {
      expect(matchVersionPattern('2022.1.10.10001')).toBe(false)
    })
    it('CalVer with one-digit day is not supported', () => {
      expect(matchVersionPattern('2022.10.1.10001')).toBe(false)
    })
    it('CalVer with six-digits minor is not supported', () => {
      expect(matchVersionPattern('2022.12.13.100001')).toBe(false)
    })
    it('CalVer without minor', () => {
      expect(matchVersionPattern('2022.12.13')).toBe(false)
    })
    it('CalVer with non-digit minor', () => {
      expect(matchVersionPattern('2022.12.13.a')).toBe(false)
    })
    it('CalVer with year-earlier-than-1000', () => {
      expect(matchVersionPattern('999.12.13.1')).toBe(false)
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
  it('generates YYYY.MM.DD.', () => {
    expect(generateVersionPrefix()).toMatch(/\d{4}\.\d{2}\.\d{2}./)
    expect(generateVersionPrefix()).toBe('2017.01.01.')
  })
})
