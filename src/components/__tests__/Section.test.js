import React from 'react'
import Page from '../../components/Page'
import Section from '../../components/Section'

describe('Section', () => {
  describe('when given a page', () => {
    it('returns a Section using that context', () => {
      const page = { test: true }
      const section = new Section({ page: page })

      const result = section.context

      expect(result).toEqual(page)
    })
  })

  describe('when given type and component', () => {
    it('returns a Section with a new Page for context', () => {
      const component = React.createElement('div')
      const page = new Page('shallow', component)
      const section = new Section({ type: 'shallow', component })

      const result = section.context

      expect(result).toEqual(page)
    })
  })
})
