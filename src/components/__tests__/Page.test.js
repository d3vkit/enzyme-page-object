import React from 'react'
import { shallow } from 'enzyme'
import Page from '../Page'
import FoundElement from '../FoundElement';

describe('Page', () => {
  const component = <div />

  it('can be extended', () => {
    class MyPage extends Page { }

    expect(() => { new MyPage('shallow', component) }).not.toThrow()
  })

  describe('#element', () => {
    it('returns itself as a FoundElement', () => {
      const myPage = new Page('shallow', component)
      const wrapped = shallow(component)
      const expected = new FoundElement(wrapped)

      const result = myPage.element

      expect(result).toEqual(expected)
    })
  })
})
