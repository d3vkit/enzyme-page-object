import Page from './Page'

class Section {
  constructor({ page, type, component }) {
    let context = page

    if (typeof page === 'undefined') {
      context = new Page(type, component)
    }

    this.context = context
  }
}

export default Section
