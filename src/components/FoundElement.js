class FoundElement {
  constructor(element) {
    this.element = element
  }

  click(options) {
    this.element.simulate('click', options)
  }

  change(value, options = {}) {
    const checkbox = this.element.prop('checked')
    const newValue = checkbox !== undefined ? { checked: value } : { value }
    const mergedOptions = {
      ...options,
      target: {
        ...options.target,
        ...newValue,
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
