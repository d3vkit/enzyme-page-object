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

  debug() {
    return this.element.debug()
  }

  filter(selector) {
    this.element = this.element.filter(selector)

    return this
  }

  find(selector) {
    this.element = this.element.find(selector)

    return this
  }

  first() {
    return this.element.first()
  }

  instance() {
    return this.element.instance()
  }

  last() {
    return this.element.last()
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

  state(key) {
    return this.element.state(key)
  }

  text() {
    return this.element.text()
  }

  type() {
    return this.element.type()
  }

  update() {
    this.element.update()
  }
}

export default FoundElement
