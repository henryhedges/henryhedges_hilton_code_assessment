import React from 'react'
import { shallow } from 'enzyme'

import Layout from '..'

const defaultProps = {
  children: [<div key="1">Child1</div>, <div key="2">Child2</div>]
}

const setup = (customProps) => {
  const props = {
    ...defaultProps,
    ...customProps
  }

  return {
    props,
    shallowRender: shallow(<Layout {...props}/>)
  }
}

describe('Layout component', () => {
  describe('render output', () => {
    it('should render any children passed to it', () => {
      const { shallowRender } = setup()

      expect(shallowRender.text()).toMatch('Child1')
      expect(shallowRender.text()).toMatch('Child2')
    });
  });
})
