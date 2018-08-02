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

  get length() {
    return this.element.length
  }

  map(callback, wrap = true) {
    return this.element.map(node => {
      if (wrap) {
        return new FoundElement(callback(node))
      } else {
        return callback(node)
      }
    })
  }

  prop(key) {
    return this.element.prop(key)
  }

  props() {
    return this.element.props()
  }
}

export default FoundElement
