import React from 'react'
import { shallow } from 'enzyme'

import RoomCard from '..'

const defaultProps = {
  adults: '1',
  inputChange: jest.fn(),
  kids: '0',
  roomKey: 'room1', 
  roomNumber: 2, 
  selected: true,
  selectedChange: jest.fn(),
}

const setup = (customProps) => {
  const props = {
    ...defaultProps,
    ...customProps
  }

  return {
    props,
    shallowRender: shallow(<RoomCard {...props}/>)
  }
}

describe('RoomCard component', () => {
  describe('disable elements', () => { 
    it('should disable all elements except the input checkbox if unchecked (for rooms other than 1)', () => {
      const { shallowRender } = setup({ selected: false })

      const selectElms = shallowRender.find('select').length
      const inputElms = shallowRender.find('input').length
      const totalTargetElms = (selectElms + inputElms) - 1

      expect(shallowRender.find('[data-testcheckbox]').prop('checked')).toBe(false)
      expect(shallowRender.find('[disabled=true]').length).toEqual(totalTargetElms)
    })

    it('should not show checkbox input if room is first room', () => {
      const { shallowRender } = setup({ roomNumber: 1 })

      expect(shallowRender.find('[data-testcheckbox]').exists()).toBe(false)
    })
  })

  describe('available form inputs', () => {
    it('should have a checkbox (if not the first element)', () => {
      const { shallowRender: shallow1 } = setup({ roomNumber: 1 })
      const { shallowRender: shallow2 } = setup({ roomNumber: 2 })

      expect(shallow1.find('[data-testcheckbox]').exists()).toEqual(false)
      expect(shallow2.find('[data-testcheckbox]').exists()).toEqual(true)
    })

    it('should have an input for the number of kids', () => {
      const { shallowRender: shallow1 } = setup({ roomNumber: 1 })
      const { shallowRender: shallow2 } = setup({ roomNumber: 2 })

      expect(shallow1.find('[data-testkids]').exists()).toEqual(true)
      expect(shallow2.find('[data-testkids]').exists()).toEqual(true)
    })

    it('should have an input for the number of adults', () => {
      const { shallowRender: shallow1 } = setup({ roomNumber: 1 })
      const { shallowRender: shallow2 } = setup({ roomNumber: 2 })

      expect(shallow1.find('[data-testadults]').exists()).toEqual(true)
      expect(shallow2.find('[data-testadults]').exists()).toEqual(true)    
    })
  })
})
