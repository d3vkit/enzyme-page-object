import React from 'react'
import Page from '../Page'

describe('Page', () => {
  const component = React.createElement('div')

  it('can be extended', () => {
    class NewPage extends Page { }

    expect(() => { new NewPage('shallow', component) }).not.toThrow()
  })
})
