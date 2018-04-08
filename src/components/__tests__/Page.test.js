import React from 'react'
import Page from '../Page'

describe('Page', () => {
  const component = React.createElement('div')

  it('can be extended', () => {
    class MyPage extends Page { }

    expect(() => { new MyPage('shallow', component) }).not.toThrow()
  })
})
