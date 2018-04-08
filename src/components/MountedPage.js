import Page from './Page'

class MountedPage extends Page {
  constructor(component, options) {
    super('mount', component, options)
  }
}

export default MountedPage
