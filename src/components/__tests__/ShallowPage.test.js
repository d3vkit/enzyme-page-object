import React from 'react'
import ShallowPage from '../ShallowPage'

describe('ShallowPage', () => {
  const component = React.createElement('div')

  it('returns a Page that is shallow', () => {
    const page = new ShallowPage(component)

    expect(page.type).toBe('shallow')
  })

  it('can be extended', () => {
    class MyShallowPage extends ShallowPage { }

    expect(() => { new MyShallowPage(component) }).not.toThrow()
  })
})
