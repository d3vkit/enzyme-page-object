import React from 'react'
import enzyme, { shallow } from 'enzyme'
import FoundElement from '../FoundElement'

describe('constructor', () => {
  it('assigns the element to itself', () => {
    const element = React.createElement('div')
    const foundElement = new FoundElement(element)

    const result = foundElement.element

    expect(result).toEqual(element)
  })
})

describe('#find', () => {
  it('calls find on the element', () => {
    const element = shallow(<div className="my-klass">My Div</div>)
    const spy = jest.spyOn(element, 'find')
    const foundElement = new FoundElement(element)

    foundElement.find('.my-klass')

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('passes the given selector to find', () => {
    const element = shallow(<div className="my-klass">My Div</div>)
    const spy = jest.spyOn(element, 'find')
    const foundElement = new FoundElement(element)
    const selector = '.my-klass'

    foundElement.find(selector)

    expect(spy).toHaveBeenCalledWith(selector)
  })

  it('replaces element with the result of the find', () => {
    const selector = '.my-klass'
    const element = shallow(<div className="my-klass">My Div</div>)
    const expected = element.find(selector)
    const foundElement = new FoundElement(element)

    foundElement.find(selector)

    expect(foundElement.element).toEqual(expected)
  })

  it('returns itself', () => {
    const element = shallow(<div className="my-klass">My Div</div>)
    const foundElement = new FoundElement(element)

    const result = foundElement.find('.my-klass')

    expect(result).toBe(foundElement)
  })
})

describe('#filter', () => {
  it('calls filter on the element', () => {
    const element = shallow(<div className="my-klass">My Div</div>)
    const spy = jest.spyOn(element, 'filter')
    const foundElement = new FoundElement(element)

    foundElement.filter('.my-klass')

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('passes the given selector to filter', () => {
    const element = shallow(<div className="my-klass">My Div</div>)
    const spy = jest.spyOn(element, 'filter')
    const foundElement = new FoundElement(element)
    const selector = '.my-klass'

    foundElement.filter(selector)

    expect(spy).toHaveBeenCalledWith(selector)
  })

  it('replaces element with the result of the filter', () => {
    const selector = '.my-klass'
    const element = shallow(<div className="my-klass">My Div</div>)
    const expected = element.find(selector)
    const foundElement = new FoundElement(element)

    foundElement.filter(selector)

    expect(foundElement.element).toEqual(expected)
  })

  it('returns itself', () => {
    const element = shallow(<div className="my-klass">My Div</div>)
    const foundElement = new FoundElement(element)

    const result = foundElement.filter('.my-klass')

    expect(result).toBe(foundElement)
  })
})

describe('#length', () => {
  it('returns the length', () => {
    const element = shallow(<div>My Div</div>)
    const foundElement = new FoundElement(element)

    const result = foundElement.length

    expect(result).toBe(1)
  })
})

describe('#map', () => {
  it('returns array of results', () => {
    const myKlass = <div className="my-klass">My Div</div>
    const otherKlass = <div className="other-klass">My Div</div>
    const element = shallow(<div>{myKlass}{otherKlass}</div>)
    const foundElement = new FoundElement(element)

    const result = foundElement.map(node => node.find('.my-klass'))

    expect(result).toEqual([shallow(myKlass)])
  })
})

describe('#prop', () => {
  it('returns the specific prop', () => {
    const element = shallow(<div foo="bar">My Div</div>)
    const foundElement = new FoundElement(element)

    const result = foundElement.prop('foo')

    expect(result).toBe('bar')
  })
})

describe('#props', () => {
  it('returns the props', () => {
    const element = shallow(<div foo="bar">My Div</div>)
    const foundElement = new FoundElement(element)

    const result = foundElement.props()

    expect(result).toEqual({ children: 'My Div', foo: 'bar' })
  })
})

describe('#click', () => {
  const element = { simulate: jest.fn(() => {}) }

  it('calls simulate "click" on the element', () => {
    const foundElement = new FoundElement(element)

    foundElement.click('.my-klass')

    expect(element.simulate).toHaveBeenCalledTimes(1)
  })

  it('passes the given options to simulate', () => {
    const foundElement = new FoundElement(element)
    const options = { target: 'new' }

    foundElement.click(options)

    expect(element.simulate).toHaveBeenCalledWith('click', options)
  })
})

describe('#change', () => {
  describe('when called on a text input', () => {
    const reactElement = React.createElement('input', {
      value: 'Old Value',
      type: 'text'
    })
    let element = shallow(reactElement)
    element.simulate = jest.fn(() => { })

    it('calls simulate "change" on the element', () => {
      const foundElement = new FoundElement(element)

      foundElement.change('New Value')

      expect(element.simulate).toHaveBeenCalledTimes(1)
    })

    it('merges the given options to simulate', () => {
      const foundElement = new FoundElement(element)
      const value = 'New Value'
      const options = { target: { name: 'superman' } }
      const expectedOptions = {
        target: { name: 'superman', value }
      }

      foundElement.change(value, options)

      expect(element.simulate).toHaveBeenCalledWith('change', expectedOptions)
    })

    it('does not accept target value given in options', () => {
      const foundElement = new FoundElement(element)
      const value = 'New Value'
      const options = { target: { value: 'Old Value' } }
      const expectedOptions = {
        target: { value, }
      }

      foundElement.change(value, options)

      expect(element.simulate).toHaveBeenCalledWith('change', expectedOptions)
    })
  })

  describe('when called on a checkbox', () => {
    const element = shallow(<input checked="false" type="checkbox" />)
    const spy = jest.spyOn(element, 'simulate')

    it('calls simulate "change" on the element', () => {
      const foundElement = new FoundElement(element)

      foundElement.change(true)

      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('merges the given options to simulate', () => {
      const foundElement = new FoundElement(element)
      const value = true
      const options = { target: { name: 'superman' } }
      const expectedOptions = {
        target: { name: 'superman', checked: value }
      }

      foundElement.change(value, options)

      expect(spy).toHaveBeenCalledWith('change', expectedOptions)
    })

    it('does not accept target checked given in options', () => {
      const foundElement = new FoundElement(element)
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
