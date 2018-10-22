import React from 'react'
import Page from '../../components/Page'
import Section from '../../components/Section'
import { shallow } from "enzyme";

describe('Section', () => {
  describe('when given a page', () => {
    it('returns a Section using that context', () => {
      const page = { test: true }
      const section = new Section({ page: page })

      const result = section.context

      expect(result).toEqual(page)
    })
  })

  describe('when given type and component', () => {
    it('returns a Section with a new Page for context', () => {
      const component = <div />
      const page = new Page('shallow', component)
      const section = new Section({ type: 'shallow', component })

      const result = section.context

      expect(result).toEqual(page)
    })
  })

  describe('when given dive', () => {
    it('renders a page using dive', () => {
      const InnerDOM = () => <div>First Level</div>
      const OuterDOM = () => <InnerDOM />;

      const wrapped = shallow(<InnerDOM />)
      const section = new Section({
        type: "shallow",
        component: <OuterDOM />,
        dive: 1,
      });

      const result = section.context.component;

      expect(result).toEqual(wrapped);
    })
  })
})
