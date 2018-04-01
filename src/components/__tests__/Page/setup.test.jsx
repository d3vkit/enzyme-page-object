import React from 'react'
import enzyme, { shallow, mount } from 'enzyme'

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
        it('sets the unsetComponent to the given component', () => {
          const element = React.createElement('div')

          const page = new Page('shallow', element)

          expect(page.unsetComponent).toBe(element)
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

        class RendersDOM extends React.Component {
          render() {
            return <div>First Level</div>
          }
        }

        class RendersMultiple extends React.Component {
          render() {
            return <RendersDOM />
          }
        }

        const element = <RendersMultiple />

        describe('when dive is not given', () => {
          const page = new Page(type, element, {})

          const wrapped = shallow(element)

          expect(page.component).toEqual(wrapped)
        })

        describe('when dive is null', () => {
          const page = new Page(type, element, { dive: null })

          const wrapped = shallow(element)

          expect(page.component).toEqual(wrapped)
        })

        describe('when dive is 0', () => {
          const page = new Page(type, element, { dive: 0 })

          const wrapped = shallow(element)

          expect(page.component).toEqual(wrapped)
        })

        describe('when dive is 1', () => {
          const page = new Page(type, element, { dive: 1 })

          const wrapped = shallow(<RendersDOM />)

          expect(page.component).toEqual(wrapped)
        })
      })
    })
  })
})
