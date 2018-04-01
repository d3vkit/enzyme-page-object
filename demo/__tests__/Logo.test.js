import React from 'react'
import LogoPage from './pages/logo.page'
import Logo from '../Logo'

describe('rendering the logo', () => {
  it('renders the image /my/logo.png', () => {
    const page = new LogoPage(<Logo />)

    const result = page.image

    expect(result).toBe('/my/logo.png')
  })
})
