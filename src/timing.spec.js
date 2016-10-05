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

  it('should parse arguments correctly', async () => {
    const mockModules = {
      func1: (args1, args2) => {
        return Promise.resolve([ args1, args2 ])
      },
    }
    const time = Sinon.stub()
    const timeEnd = Sinon.stub()
    const moduleWithTiming = timing(mockModules, time, timeEnd)
    const result = await moduleWithTiming.func1('a', 'b')
    expect(result).to.deep.equal([ 'a' , 'b' ])
  })
})