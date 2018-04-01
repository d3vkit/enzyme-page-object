import Page from 'enzyme-page-object'

class LogoPage extends Page {
  constructor(component) {
    super('shallow', component)
  }

  get src() {
    return this.find('img').prop('src')
  }
}

export default LogoPage
