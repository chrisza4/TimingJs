import { expect } from 'chai'
import Sinon from 'sinon'

import { timing } from './timing'

describe('Timing js', () => {
  it('should log promise time', async () => {
    const mockModules = {
      func1: () => Promise.resolve({ }),
      func2: () => Promise.resolve({ })
    }
    const time = Sinon.stub()
    const timeEnd = Sinon.stub()
    const moduleWithTiming = timing(mockModules, time, timeEnd)
    await moduleWithTiming.func1()
    expect(time.calledWith('func1 use')).to.be.true
    expect(timeEnd.calledWith('func1 use')).to.be.true
  })
})