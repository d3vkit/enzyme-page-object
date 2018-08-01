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
    const element = { find: jest.fn() }
    const foundElement = new FoundElement(element)

    foundElement.find('.my-klass')

    expect(element.find).toHaveBeenCalledTimes(1)
  })

  it('passes the given selector to find', () => {
    const element = { find: jest.fn() }
    const foundElement = new FoundElement(element)
    const selector = '.my-klass'

    foundElement.find(selector)

    expect(element.find).toHaveBeenCalledWith(selector)
  })

  it('replaces element with the result of the find', () => {
    const expected = 'You found me!'
    const element = { find: jest.fn(() => expected) }
    const foundElement = new FoundElement(element)

    foundElement.find('.my-klass')

    expect(foundElement.element).toBe(expected)
  })

  it('returns itself', () => {
    const element = { find: jest.fn() }
    const foundElement = new FoundElement(element)

    const result = foundElement.find('.my-klass')

    expect(result).toBe(foundElement)
  })
})

describe('#filter', () => {
  it('calls filter on the element', () => {
    const element = { filter: jest.fn() }
    const foundElement = new FoundElement(element)

    foundElement.filter('.my-klass')

    expect(element.filter).toHaveBeenCalledTimes(1)
  })

  it('passes the given selector to filter', () => {
    const element = { filter: jest.fn() }
    const foundElement = new FoundElement(element)
    const selector = '.my-klass'

    foundElement.filter(selector)

    expect(element.filter).toHaveBeenCalledWith(selector)
  })

  it('replaces element with the result of the filter', () => {
    const expected = 'You found me!'
    const element = { filter: jest.fn(() => expected) }
    const foundElement = new FoundElement(element)

    foundElement.filter('.my-klass')

    expect(foundElement.element).toBe(expected)
  })

  it('returns itself', () => {
    const element = { filter: jest.fn() }
    const foundElement = new FoundElement(element)

    const result = foundElement.filter('.my-klass')

    expect(result).toBe(foundElement)
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
  const element = { simulate: jest.fn(() => { }) }

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
