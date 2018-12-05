import React from 'react'
import PropTypes from 'prop-types'
import { shallow } from 'enzyme'
import Page from '../Page'
import FoundElement from '../FoundElement';

describe('Page', () => {
  const component = <div />

  it('can be extended', () => {
    class MyPage extends Page { }

    expect(() => { new MyPage('shallow', component) }).not.toThrow()
  })

  describe('when shallow rendering', () => {
    it('allows passing context option', () => {
      const ContextComponent = (_props, context) => {
        const { name } = context;

        return <div>{name}</div>;
      }

      ContextComponent.contextTypes = {
        name: PropTypes.string,
      }

      const context = { name: 'foo' }
      const myPage = new Page('shallow', <ContextComponent />, { context })

      expect(myPage.component.text()).toEqual('foo')
    })
  })

  describe('when mounting', () => {
    it('allows passing context option', () => {
      const ContextComponent = (_props, context) => {
        const { name } = context;

        return <div>{name}</div>;
      }

      ContextComponent.contextTypes = {
        name: PropTypes.string,
      }

      const context = { name: 'foo' }
      const myPage = new Page('mount', <ContextComponent />, { context })
      const result = myPage.component.text()

      expect(result).toEqual('foo')
    })
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
