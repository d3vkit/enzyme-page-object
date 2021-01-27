I have long since stopped using enzyme, and do not use this package at all. It _probably_ still works, but I don't know that anyone else ever even used it. I am archiving this to make it clearer that it is no longer maintained.

----

Enzyme Page Object
=

A library to help write enzyme tests using the page-object pattern

## Installation

NPM:
```shell
$ npm install enzyme-page-object --save-dev
```

Yarn:

```shell
$ yarn add enzyme-page-object --dev
```

## Usage

`enzyme-page-object` is a simple wrapper around `enzyme` with the goal of making tests a little more readable and managable.

To use `enzyme-page-object`, create a `page` for the file you want to test and extend your `SpecificPage` class from `Page`.

To create a page, just pass the following arguments to the constructor:

- `shallow` or `mount`, depending on how you want to test your component
- the react component
- an options object

Available options:

- dive: (number of times to dive into shallow component)

So, something like this:

```javascript
new Page('shallow', <Component props={...props} />, { dive: 2 })
```

**Note**

Because this is a work in progress, not all aspects of Enzyme are currently represented. If you ever need to get to an underlying `enzyme` element, you can call `element` on the last returned `Page` object, and work with that as you would an `enzyme` object:

```javascript
page.find('a').filter('.my-class').element // returns enzyme element
```

---


Examples
=
Given a file Logo.js:

```javascript
// Logo.js

import React from 'react'

class Logo extends React.Component {
  render() {
    return (
      <img src="/my/logo.png" />
    )
  }
}

export default Logo
```

And a test originally written without page objects:

```javascript
// __tests__/Logo.test.js

import React from 'react'
import { shallow } from 'enzyme'
import Logo from '../Logo'

describe('rendering the logo', () => {
  it('renders the src /my/logo.png', () => {
    const wrapper = shallow(<Logo />)

    const result = wrapper.find('img').prop('src')

    expect(result).toBe('/my/logo.png')
  })
})

```

You can write a page object:

```javascript
// __tests__/pages/Logo.page.js

import Page from 'enzyme-page-object'

class LogoPage extends Page {
  constructor(component) {
    super('shallow', component)
  }

  get image() {
    return this.find('img').prop('src')
  }
}

export default LogoPage

```

And then convert your test to this:

```javascript
// __tests__/Logo.test.js

import React from 'react'
import LogoPage from './pages/logo.page'
import Logo from '../Logo'

describe('rendering the logo', () => {
  it('renders the image /my/logo.png', () => {
    const page = new LogoPage(<Logo />)

    const result = page.image

    expect(result).toBe('/my/logo.png')
  })
})
```

---

## Sections

A `Section` is part of a page that you may use in multiple places.

It accepts a `Page`, or `type` and `component` to create a `Page`.

It uses the given or created page as `context`.

Given a Section:

```javascript
import { Section } from 'enzyme-page-object'

class MenuSection extends Section {
  get dashboard() {
    // context here is the given or created page
    return this.context.find('a').filter('dashboard').element
  }
}
```

We can add the section to an existing page:

```javascript

import Page from 'enzyme-page-object'
import Home from './components/Home' // The page being tested

class HomePage extends Page {
  get menu() {
    return new MenuSection({ page: this })
  }
}

page = new HomePage('shallow', <Home />)

const dashboard = page.menu.dashboard
```

Or use the section to generate a new page on the fly:

```javascript
import Home from './components/Home' // The page being tested

// Options (like `dive`) are passed to the Page automatically
section = new MenuSection({ type: 'shallow', component: <Home />, dive: 1 })

const dashboard = section.dashboard
```

---

More Examples can be found at: https://github.com/d3vkit/enzyme-page-object-examples

---

API
=

### Page

---

*constructor(type, component, options = {})*

Returns a `Page` object. Accepts the following arguments:

- Type: One of `mount` or `shallow` (Required)
- Component: A React component that the `Page` will wrap (Required)
- Options: an options object
  - `dive`: When shallow rendering, the dive option to pass to enzyme
  - `context`: The context to pass to a shallow rendered or mounted enzyme object

---

*find(selector)*

Calls enzyme `find()` using the selector given. Returns a `FoundElement`

---

*getElement()*

Calls enzyme `getElement()`

---

### Section

---

*constructor({ page, type, component })*

Returns a `Section` object. Accepts the following arguments:

- Page: a `Page` context to be used for the section. If one is not provided, a new `Page` will be created.
- Type: If no `Page` is provided, the type of `Page` to generate (shallow or mount)
- Component: If no `Page` is provided, the React component to wrap the `Page` around

---

### FoundElement

---

*constructor(element)*

Returns `FoundElement` with `element` attached as property.

---

*click(options)*

Calls enzyme `simulate('click')`, passing the given options. Returns null.

---

*change(value, options = {})*

Calls enzyme `simulate('change')`. `value` will be merged into options, to result in a call like this:

```javascript
// textfield.change('New Value')

simulate('change', { target: { value: 'New Value' }})

// textfield.prop('value')
// => 'New Value'
```

If the underlying element has a property for `checked` (as a checkbox would), `checked` is set instead:

```javascript
// checkbox.change(false)

simulate('change', { target: { checked: false }})

// checkbox.prop('checked')
// => false
```

Returns null.

---

*filter(selector) => self*

Calls enzyme `filter(selector)`. Returns `self`.

---

*find(selector) => self*

Calls enzyme `find(selector)`. Returns `self`.

---

*instance() => enzyme.instance()*

Calls and returns enzyme `instance()`.

---

*map(fn, wrap) => []*

Calls enzyme `map(fn)`. If wrap is `true`, results are wrapped in `FoundElement`, else results are returned directly. Returns array.

---

*prop(key) => enzyme.prop(key)*

Calls and returns enzyme `prop(key)`

---

*props() => enzyme.props()*

Calls and returns enzyme `props()`

---

*setContext() => self*

Calls enzyme `setContext(context)`. Returns `self`.

*state(key) => enzyme.state(key)*

Calls and returns enzyme `state(key)`

---

*text() => enzyme.text()*

Calls and returns enzyme `text()`

---

*type() => enzyme.type()*

Calls and returns enzyme `type()`

---

*update() => enzyme.update()*

Calls enzyme `update()`

---

Tests
=
Tests are written with Jest and can be run with:

  `npm run test`

TODO
=
- Ensure parity to enzyme for shallow / mount
- Mock enzyme to stop testing functionality that is not from enzyme-page-object

License
=
MIT
