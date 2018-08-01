class FoundElement {
  constructor(element) {
    this.element = element
  }

  click(options) {
    this.element.simulate('click', options)
  }

  change(value, options = {}) {
    const mergedOptions = {
      ...options,
      target: {
        ...options.target,
        value,
      }
    }

    this.element.simulate('change', mergedOptions)
  }

  filter(selector) {
    this.element = this.element.filter(selector)

    return this
  }

  find(selector) {
    this.element = this.element.find(selector)

    return this
  }

  prop(key) {
    return this.element.prop(key)
  }
}

export default FoundElement
