import React from 'react'

import IndexPage, {
  ShallowPage as IndexShallowPage,
  MountedPage as IndexMountedPage,
  Section as IndexSection,
} from '../index'

import Page from '../components/Page'
import ShallowPage from '../components/ShallowPage'
import MountedPage from '../components/MountedPage'
import Section from '../components/Section'

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

  it('exports a Section', () => {
    const page = new IndexSection({ type: 'shallow', component })

    expect(page).toBeInstanceOf(Section)
  })
})
