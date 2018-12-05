import React from 'react'
import { shallow, mount } from 'enzyme'

import Page from '../../Page'

describe('Page.js', () => {
  describe('setup', () => {
    describe('sets type for Page', () => {
      describe('when type is shallow', () => {
        it('sets the Page objects type', () => {
          const element = React.createElement('div')

          const page = new Page('shallow', element)

          expect(page.type).toBe('shallow')
        })
      })

      describe('when type is mount', () => {
        it('sets the Page objects type', () => {
          const element = React.createElement('div')

          const page = new Page('mount', element)

          expect(page.type).toBe('mount')
        })
      })
    })

    describe('sets component for Page', () => {
      describe('when component is a react element', () => {
        it('sets the originalComponent to the given component', () => {
          const element = React.createElement('div')

          const page = new Page('shallow', element)

          expect(page.originalComponent).toBe(element)
        })

        describe('when type is shallow', () => {
          const type = 'shallow'
          const element = React.createElement('div')

          it('sets the wrapped component to Page.component', () => {
            const page = new Page(type, element)

            const wrapped = shallow(element)

            expect(page.component).toEqual(wrapped)
          })
        })

        describe('when type is mount', () => {
          const type = 'mount'
          const element = React.createElement('div')

          it('sets the wrapped component to Page.component', () => {
            const page = new Page(type, element)

            const wrapped = mount(element)

            expect(page.component).toEqual(wrapped)
          })
        })
      })
    })

    describe('accepts options', () => {
      describe('when type is shallow', () => {
        const type = 'shallow'
        const InnerDOM = () => <div>First Level</div>
        const OuterDOM = () => <InnerDOM />

        describe('when dive is not given', () => {
          const page = new Page(type, <OuterDOM />, {})

          const wrapped = shallow(<OuterDOM />)

          expect(page.component).toEqual(wrapped)
        })

        describe('when dive is null', () => {
          const page = new Page(type, <OuterDOM />, { dive: null })

          const wrapped = shallow(<OuterDOM />)

          expect(page.component).toEqual(wrapped)
        })

        describe('when dive is 0', () => {
          const page = new Page(type, <OuterDOM />, { dive: 0 })

          const wrapped = shallow(<OuterDOM />)

          expect(page.component).toEqual(wrapped)
        })

        describe('when dive is 1', () => {
          const page = new Page(type, <OuterDOM />, { dive: 1 })

          const wrapped = shallow(<InnerDOM />)

          expect(page.component).toEqual(wrapped)
        })
      })
    })
  })
})
