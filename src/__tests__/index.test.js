import React from 'react'
import IndexPage, {
  ShallowPage as IndexShallowPage,
  MountedPage as IndexMountedPage
} from '../index'
import Page from '../components/Page'
import ShallowPage from '../components/ShallowPage'
import MountedPage from '../components/MountedPage'

describe('index', () => {
  const component = React.createElement('div')

  it('exports a Page as default', () => {
    const page = new IndexPage('shallow', component)

    expect(page).toBeInstanceOf(Page)
  })

  it('exports a ShallowPage', () => {
    const page = new IndexShallowPage(component)

    expect(page).toBeInstanceOf(ShallowPage)
  })

  it('exports a MountedPage', () => {
    const page = new IndexMountedPage(component)

    expect(page).toBeInstanceOf(MountedPage)
  })
})
