import {expect, test} from '@jest/globals'
import {generateVersionPrefix, matchVersionPattern} from '../src/utils'

test('matchVersionPattern', async () => {
  expect(matchVersionPattern('2022.12.08.1')).toBe(true)
  expect(matchVersionPattern('1999.01.01.205')).toBe(true)
  expect(matchVersionPattern('999.01.01.205')).toBe(false)
  expect(matchVersionPattern('2022.1.01.1')).toBe(false)
  expect(matchVersionPattern('2022.01.1.1')).toBe(false)
  expect(matchVersionPattern('2022.01.05.a')).toBe(false)
})

test('generateVersionPrefix', async () => {
  expect(generateVersionPrefix()).toMatch(/\d{4}\.\d{2}\.\d{2}./)
})
