import React from 'react'
import MountedPage from '../MountedPage'

describe('MountedPage', () => {
  const component = React.createElement('div')

  it('returns a Page that is mounted', () => {
    const page = new MountedPage(component)

    expect(page.type).toBe('mount')
  })

  it('can be extended', () => {
    class MyMountedPage extends MountedPage { }

    expect(() => { new MyMountedPage(component) }).not.toThrow()
  })
})
