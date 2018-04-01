import React from 'react'
import index from '../index'
import Page from '../components/Page'

describe('index', () => {
  const component = React.createElement('div')

  it('exports a Page', () => {
    const page = new index('shallow', component)

    expect(page).toBeInstanceOf(Page)
  })
})
