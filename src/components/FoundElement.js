class FoundElement {
  constructor(element) {
    this.element = element
  }

  click(options) {
    this.element.simulate('click', options)
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
