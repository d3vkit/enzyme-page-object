import React from 'react'

import Page from '../../Page'
import FoundElement from '../../FoundElement'

describe('Page.js', () => {
  describe('#find()', () => {
    it('throws if no selector is given', () => {
      const element = React.createElement('div')
      const page = new Page('shallow', element)

      expect(() => { page.find() }).toThrow(TypeError)
    })

    it('returns a <FoundElement />', () => {
      const element = React.createElement('div')
      const page = new Page('shallow', element)

      const result = page.find('div')

      expect(result).toBeInstanceOf(FoundElement)
    })
  })

  describe('#getElement()', () => {
    it('returns the react component', () => {
      const element = React.createElement('div')
      const page = new Page('shallow', element)

      const result = page.getElement()

      expect(result).toEqual(element)
    })
  })
})
