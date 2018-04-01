import PropTypes from 'prop-types'
import { shallow, mount } from 'enzyme'
import FoundElement from './FoundElement'

const propTypes = {
  type: PropTypes.oneOf(['shallow', 'mount']).isRequired,
  component: PropTypes.element.isRequired,
  options: PropTypes.shape({
    dive: PropTypes.number,
  }),
}

const objectIsEmpty = (object) => {
  return Object.keys(object).length === 0 && object.constructor === Object
}

class Page {
  constructor(type, component, options = {}) {
    this.validate(type, component, options)

    const { dive } = options

    this.type = type
    this.unsetComponent = component
    this.dive = dive

    this.setup()
  }

  validate(type, component, options) {
    if (typeof type === 'undefined' || type === null || (typeof type === 'string' && type.trim() === '')) {
      throw TypeError(`Can not setup without valid type of either \`shallow\` or \`mount\`. \`${this.type}\` given.`)
    }

    if (typeof component !== 'object' || objectIsEmpty(component)) {
      throw TypeError(`Can not setup without a React component.`)
    }

    if (!objectIsEmpty(options)) {
      if (options.hasOwnProperty('dive') && isNaN(options.dive)) {
        throw TypeError(`The option \`dive\` must be a number. \`${options.dive}\` given.`)
      }
    }

    PropTypes.checkPropTypes(Page.propTypes, { type, component, options }, 'prop', 'Page')
  }

  setup() {
    switch (this.type) {
      case 'shallow':
        this.component = shallow(this.unsetComponent)
        break
      case 'mount':
        this.component = mount(this.unsetComponent)
        break
      default:
        throw TypeError(`Can not setup without valid type of either \`shallow\` or \`mount\`. \`${this.type}\` given.`)
    }

    if (this.dive !== null && this.dive > 0) {
      for (let i = 0; i < this.dive; i++) {
        this.component = this.component.dive()
      }
    }

    return this
  }

  find(selector) {
    const element = this.component.find(selector)
    const foundElement = new FoundElement(element)

    return foundElement
  }

  getElement() {
    return this.component.getElement()
  }
}

Page.propTypes = propTypes

export default Page
