import React from 'react'
import enzyme, { shallow, mount } from 'enzyme'

import Page from '../../Page'

describe('Page.js', () => {
  describe('constructor', () => {
    describe('validations', () => {
      describe('on type', () => {
        console.error = jest.fn()

        it('throws if type is not given', () => {
          expect(() => { new Page() }).toThrow(TypeError)
        })

        it('throws if type is undefined', () => {
          expect(() => { new Page(undefined) }).toThrow(TypeError)
        })

        it('throws if type is null', () => {
          expect(() => { new Page(null) }).toThrow(TypeError)
        })

        it('throws if type is not shallow or mount', () => {
          expect(() => { new Page('smount') }).toThrow(TypeError)
        })

        it('does not throw if type is shallow', () => {
          const element = React.createElement('div')

          expect(() => { new Page('shallow', element) }).not.toThrow()
        })

        it('does not throw if type is mount', () => {
          const element = React.createElement('div')

          expect(() => { new Page('mount', element) }).not.toThrow()
        })
      })

      describe('on component', () => {
        it('throws if component is undefined', () => {
          expect(() => { new Page('shallow', undefined) }).toThrow(TypeError)
        })

        it('throws if component is null', () => {
          expect(() => { new Page('shallow', null) }).toThrow(TypeError)
        })

        it('throws if component is not an object', () => {
          expect(() => { new Page('shallow', 'my dude') }).toThrow(TypeError)
        })

        it('throws if component is an empty object', () => {
          expect(() => { new Page('shallow', { type: 'div' }) }).toThrow(TypeError)
        })

        it('does not throw if component is a React object', () => {
          const element = React.createElement('div')

          expect(() => { new Page('shallow', element) }).not.toThrow(TypeError)
        })
      })

      describe('on options', () => {
        const type = 'shallow'
        const element = React.createElement('div')

        describe('when dive is not given', () => {
          expect( () => { new Page(type, element, {}) }).not.toThrow()
        })

        describe('when dive is null', () => {
          expect(() => { new Page(type, element, { dive: null }) }).not.toThrow()
        })

        describe('when dive is not a number', () => {
          console.error = jest.fn()

          expect(() => { new Page('shallow', element, { dive: 'yes' }) }).toThrow(TypeError)
        })
      })
    })
  })
})
