import Page from './Page'

class Section {
  constructor({ page, type, component, ...options }) {
    let context = page

    if (typeof page === 'undefined') {
      context = new Page(type, component, options)
    }

    this.context = context
  }
}

export default Section
