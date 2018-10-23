import React from 'react'
import { shallow } from 'enzyme'
import FoundElement from '../FoundElement'

describe('FoundElement', () => {
  describe('constructor', () => {
    it('assigns the given object to element', () => {
      const element = <div />
      const foundElement = new FoundElement(element)

      const result = foundElement.element

      expect(result).toEqual(element)
    })
  })

  describe('#change', () => {
    describe('when called on a text input', () => {
      const wrapper = shallow(<input value="Old Value" type="text" />)
      const spy = jest.spyOn(wrapper, 'simulate')

      it('calls simulate "change" on the element', () => {
        const foundElement = new FoundElement(wrapper)

        foundElement.change('New Value')

        expect(spy).toHaveBeenCalledTimes(1)
      })

      it('merges the given options to simulate', () => {
        const foundElement = new FoundElement(wrapper)
        const value = 'New Value'
        const options = { target: { name: 'superman' } }
        const expectedOptions = {
          target: { name: 'superman', value }
        }

        foundElement.change(value, options)

        expect(spy).toHaveBeenCalledWith('change', expectedOptions)
      })

      it('does not accept target value given in options', () => {
        const foundElement = new FoundElement(wrapper)
        const value = 'New Value'
        const options = { target: { value: 'Old Value' } }
        const expectedOptions = {
          target: { value, }
        }

        foundElement.change(value, options)

        expect(spy).toHaveBeenCalledWith('change', expectedOptions)
      })
    })

    describe('when called on a checkbox', () => {
      const wrapper = shallow(<input checked="false" type="checkbox" />)
      const spy = jest.spyOn(wrapper, 'simulate')

      it('calls simulate "change" on the element', () => {
        const foundElement = new FoundElement(wrapper)

        foundElement.change(true)

        expect(spy).toHaveBeenCalledTimes(1)
      })

      it('merges the given options to simulate', () => {
        const foundElement = new FoundElement(wrapper)
        const value = true
        const options = { target: { name: 'superman' } }
        const expectedOptions = {
          target: { name: 'superman', checked: value }
        }

        foundElement.change(value, options)

        expect(spy).toHaveBeenCalledWith('change', expectedOptions)
      })

      it('does not accept target checked given in options', () => {
        const foundElement = new FoundElement(wrapper)
        const value = true
        const options = { target: { checked: false } }
        const expectedOptions = {
          target: { checked: value }
        }

        foundElement.change(value, options)

        expect(spy).toHaveBeenCalledWith('change', expectedOptions)
      })
    })
  })

  describe('#click', () => {
    const wrapper = shallow(<div className="my-klass">My Div</div>)
    const spy = jest.spyOn(wrapper, 'simulate')

    it('calls simulate "click" on the element', () => {
      const foundElement = new FoundElement(wrapper)

      foundElement.click('.my-klass')

      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('passes the given options to simulate', () => {
      const foundElement = new FoundElement(wrapper)
      const options = { target: 'new' }

      foundElement.click(options)

      expect(spy).toHaveBeenCalledWith('click', options)
    })
  })

  describe('#debug', () => {
    it('returns enzyme debug', () => {
      const wrapper = shallow(<div foo="bar">My Div</div>)
      const foundElement = new FoundElement(wrapper)

      const expected = wrapper.debug()
      const result = foundElement.debug()

      expect(result).toEqual(expected)
    })
  })

  describe('#find', () => {
    it('calls find on the wrapper', () => {
      const wrapper = shallow(<div className="my-klass">My Div</div>)
      const spy = jest.spyOn(wrapper, 'find')
      const foundElement = new FoundElement(wrapper)

      foundElement.find('.my-klass')

      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('passes the given selector to find', () => {
      const wrapper = shallow(<div className="my-klass">My Div</div>)
      const spy = jest.spyOn(wrapper, 'find')
      const foundElement = new FoundElement(wrapper)
      const selector = '.my-klass'

      foundElement.find(selector)

      expect(spy).toHaveBeenCalledWith(selector)
    })

    it('replaces element with the result of the find', () => {
      const selector = '.my-klass'
      const wrapper = shallow(<div className="my-klass">My Div</div>)
      const expected = wrapper.find(selector)
      const foundElement = new FoundElement(wrapper)

      foundElement.find(selector)

      expect(foundElement.element).toEqual(expected)
    })

    it('returns itself', () => {
      const wrapper = shallow(<div className="my-klass">My Div</div>)
      const foundElement = new FoundElement(wrapper)

      const result = foundElement.find('.my-klass')

      expect(result).toBe(foundElement)
    })
  })

  describe('#filter', () => {
    it('calls filter on the element', () => {
      const wrapper = shallow(<div className="my-klass">My Div</div>)
      const spy = jest.spyOn(wrapper, 'filter')
      const foundElement = new FoundElement(wrapper)

      foundElement.filter('.my-klass')

      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('passes the given selector to filter', () => {
      const wrapper = shallow(<div className="my-klass">My Div</div>)
      const spy = jest.spyOn(wrapper, 'filter')
      const foundElement = new FoundElement(wrapper)
      const selector = '.my-klass'

      foundElement.filter(selector)

      expect(spy).toHaveBeenCalledWith(selector)
    })

    it('replaces element with the result of the filter', () => {
      const selector = '.my-klass'
      const wrapper = shallow(<div className="my-klass">My Div</div>)
      const expected = wrapper.find(selector)
      const foundElement = new FoundElement(wrapper)

      foundElement.filter(selector)

      expect(foundElement.element).toEqual(expected)
    })

    it('returns itself', () => {
      const wrapper = shallow(<div className="my-klass">My Div</div>)
      const foundElement = new FoundElement(wrapper)

      const result = foundElement.filter('.my-klass')

      expect(result).toBe(foundElement)
    })
  })

  describe('#first', () => {
    it('returns the first enzyme element', () => {
      const element1 = <div className="bar">My Div</div>
      const element2 = <div className="bar">My Other Div</div>
      const elements = (
        <div>
          {element1}
          {element2}
        </div>
      )
      const wrapper = shallow(elements)
      const foundElement = new FoundElement(wrapper)
      const expected = wrapper.find('.bar').first()

      const result = foundElement.find('.bar').first()

      expect(result).toEqual(expected)
    })
  })

  describe('#instance', () => {
    class MyInstanceKlass extends React.Component {
      constructor(props) {
        super(props)

        this.state = { working: true };
      }

      render() {
        return <div />;
      }
    }

    it('returns enzyme instance', () => {
      const wrapper = shallow(<MyInstanceKlass />);
      const foundElement = new FoundElement(wrapper);

      const expected = wrapper.instance();
      const result = foundElement.instance();

      expect(result).toEqual(expected);
    });
  });

  describe('#last', () => {
    it('returns the last enzyme element', () => {
      const element1 = <div className="bar">My Div</div>
      const element2 = <div className="bar">My Other Div</div>
      const elements = (
        <div>
          {element1}
          {element2}
        </div>
      )
      const wrapper = shallow(elements)
      const foundElement = new FoundElement(wrapper)
      const expected = wrapper.find('.bar').last()

      const result = foundElement.find('.bar').last()

      expect(result).toEqual(expected)
    })
  })

  describe('#length', () => {
    it('returns the length', () => {
      const wrapper = shallow(<div>My Div</div>)
      const foundElement = new FoundElement(wrapper)

      const result = foundElement.length

      expect(result).toBe(1)
    })
  })

  describe('#map', () => {
    describe('when wrap option is not defined', () => {
      it('returns array of results wrapped in FoundElements', () => {
        const myKlass = <div className="my-klass">My Div</div>
        const otherKlass = <div className="other-klass">My Div</div>
        const wrapper = shallow(<div>{myKlass}{otherKlass}</div>)
        const foundElement = new FoundElement(wrapper)
        const expected = new FoundElement(shallow(myKlass))

        const result = foundElement.map(node => node.find('.my-klass'))

        expect(result).toEqual([expected])
      })
    })

    describe('when wrap option is true', () => {
      it('returns array of results wrapped in FoundElements', () => {
        const myKlass = <div className="my-klass">My Div</div>
        const otherKlass = <div className="other-klass">My Div</div>
        const wrapped = shallow(<div>{myKlass}{otherKlass}</div>)
        const foundElement = new FoundElement(wrapped)
        const expected = new FoundElement(shallow(myKlass))

        const result = foundElement.map((node) => node.find('.my-klass'), true)

        expect(result).toEqual([expected])
      })
    })

    describe('when wrap option is false', () => {
      it('returns array of results not wrapped in FoundElements', () => {
        const myKlass = <div className="my-klass">My Div</div>
        const otherKlass = <div className="other-klass">My Div</div>
        const wrapper = shallow(<div>{myKlass}{otherKlass}</div>)
        const foundElement = new FoundElement(wrapper)
        const expected = shallow(myKlass)

        const result = foundElement.map(node => node.find('.my-klass'), false)

        expect(result).toEqual([expected])
      })
    })
  })

  describe('#prop', () => {
    it('returns the specific prop', () => {
      const wrapper = shallow(<div foo="bar">My Div</div>)
      const foundElement = new FoundElement(wrapper)

      const result = foundElement.prop('foo')

      expect(result).toBe('bar')
    })
  })

  describe('#props', () => {
    it('returns the props', () => {
      const wrapper = shallow(<div foo="bar">My Div</div>)
      const foundElement = new FoundElement(wrapper)

      const result = foundElement.props()

      expect(result).toEqual({ children: 'My Div', foo: 'bar' })
    })
  })

  describe('#state', () => {
    it('calls enzyme state()', () => {
      // TODO: https://trello.com/c/WyUn1AF3/18-mock-enzyme-instead-of-testing-directly
    })

    it('passes given key to enzyme state', () => {
      // TODO: https://trello.com/c/WyUn1AF3/18-mock-enzyme-instead-of-testing-directly
    })
  })

  describe('#text', () => {
    it('returns the text', () => {
      const wrapper = shallow(<div>My Div</div>)
      const foundElement = new FoundElement(wrapper)

      const result = foundElement.text()

      expect(result).toEqual('My Div')
    })
  })

  describe('#type', () => {
    it('returns the type from enzyme wrapper', () => {
      const wrapper = shallow(<div>My Div</div>)
      const foundElement = new FoundElement(wrapper)
      const expected = wrapper.type()

      const result = foundElement.type()

      expect(result).toEqual(expected)
    })
  })

  describe('#update', () => {
    it('calls enzyme update()', () => {
      // TODO: https://trello.com/c/WyUn1AF3/18-mock-enzyme-instead-of-testing-directly
    });
  });
})
