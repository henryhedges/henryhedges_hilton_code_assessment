import React from 'react'
import { shallow, mount } from 'enzyme'

import Content from '..'

import { LOCAL_STORAGE_KEY } from '../../../../data/index/constants'

const testStorage = [
  { adults: '2', kids: '2', selected: true },
  { adults: '2', kids: '2', selected: true },
  { adults: '2', kids: '2', selected: true },
  { adults: '2', kids: '2', selected: true },
]

const defaultProps = {
  data: [],
  maxRooms: 4,
}

const setup = (customProps) => {
  const props = {
    ...defaultProps,
    ...customProps
  }

  return {
    props,
    shallowRender: shallow(<Content {...props} />),
    mountedRender: mount(<Content {...props} />),
  }
}

describe('Content component', () => {
  describe('form element', () => {
    beforeEach(() => {
      localStorage.clear();
      localStorage.setItem.mockClear();
      localStorage.getItem.mockClear();
    });

    const { shallowRender } = setup()

    it('should render a form element', () => {
      expect(shallowRender.find('form').exists()).toBe(true)
    })

    it('should contain an onSubmit handler', () => {
      expect(typeof shallowRender.find('form').prop('onSubmit')).toEqual('function')      
    })
  })

  describe('interaction with localstorage', () => {
    beforeEach(() => {
      localStorage.clear();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(testStorage));
      localStorage.setItem.mockClear();
      localStorage.getItem.mockClear();
    });

    it('should fetch data from local storage if available', () => {
      const { mountedRender } = setup()
      const testDataLen = testStorage.length;
      const adults = mountedRender.find('[data-testadults]')
      const kids = mountedRender.find('[data-testkids]')

      expect(adults.length).toEqual(testDataLen)
      expect(kids.length).toEqual(testDataLen)

      adults.forEach((adult) => {
        expect(adult.prop('value')).toEqual('2')
      })

      kids.forEach((kid) => {
        expect(kid.prop('value')).toEqual('2')
      })
    })

    it('should save data to local storage when save is clicked', () => {
      const { mountedRender } = setup()
      const checkbox = mountedRender.find('[data-testcheckbox]').at(1)

      checkbox.simulate('click')
      mountedRender.find('button[type="submit"]').simulate('submit')

      expect(localStorage.setItem).toHaveBeenCalled()
    })
  })

  describe('room rendering', () => {
    beforeEach(() => {
      localStorage.clear();
      localStorage.setItem.mockClear();
      localStorage.getItem.mockClear();
    });

    it('should render the amount of rooms as are in props.maxRoom', () => {
      // pass in data and maxrooms - same length, then check for the text
      const { mountedRender } = setup({ maxRooms: 3 })
      const { mountedRender: mountedRender2 } = setup({ maxRooms: 4 })


      expect(mountedRender.find('[data-testadults]').length).toEqual(3)
      expect(mountedRender.find('[data-testkids]').length).toEqual(3)

      expect(mountedRender2.find('[data-testadults]').length).toEqual(4)
      expect(mountedRender2.find('[data-testkids]').length).toEqual(4)
    })

    it('should render room elements even if the props.data is an empty array', () => {
      // pass in empty data array, see that there are the same amount of elements as before
      const { mountedRender } = setup({ data: [] })

      expect(mountedRender.find('[data-testadults]').length).toBeGreaterThan(0)
    })
  })

  describe('user interaction with rooms', () => {
    beforeEach(() => {
      localStorage.clear();
      localStorage.setItem.mockClear();
      localStorage.getItem.mockClear();
    });

    it('should check inputs in rooms prior to newly checked room', () => {
      const { mountedRender } = setup()
      const checkboxes = mountedRender.find('[data-testcheckbox]')

      expect(checkboxes.at(0).prop('checked')).toBe(false)
      expect(checkboxes.at(1).prop('checked')).toBe(false)
      expect(checkboxes.at(2).prop('checked')).toBe(false)

      checkboxes.at(1).simulate('change', {target: {checked: true}})

      expect(mountedRender.find('[data-testcheckbox]').at(0).prop('checked')).toBe(true)
      expect(mountedRender.find('[data-testcheckbox]').at(1).prop('checked')).toBe(true)
      expect(mountedRender.find('[data-testcheckbox]').at(2).prop('checked')).toBe(false)
    })

    it('should uncheck inputs in rooms after the newly unchecked room', () => {
      const { mountedRender } = setup()

      mountedRender.find('[data-testcheckbox]').at(1).simulate('change', {target: {checked: true}})

      expect(mountedRender.find('[data-testcheckbox]').at(0).prop('checked')).toBe(true)
      expect(mountedRender.find('[data-testcheckbox]').at(1).prop('checked')).toBe(true)
      expect(mountedRender.find('[data-testcheckbox]').at(2).prop('checked')).toBe(false)

      mountedRender.find('[data-testcheckbox]').at(1).simulate('change', {target: {checked: false}})

      expect(mountedRender.find('[data-testcheckbox]').at(0).prop('checked')).toBe(true)
      expect(mountedRender.find('[data-testcheckbox]').at(1).prop('checked')).toBe(false)
      expect(mountedRender.find('[data-testcheckbox]').at(2).prop('checked')).toBe(false)
    })

    it('should update selected adult rooms', () => {
      const { mountedRender } = setup()

      expect(mountedRender.find('[data-testcheckbox]').at(0).closest('[data-testroom]').find('select[data-testadults]').prop('disabled')).toBe(true)
      
      mountedRender.find('[data-testcheckbox]').at(0).simulate('change', {target: {checked: true}})
      
      expect(mountedRender.find('[data-testcheckbox]').at(0).closest('[data-testroom]').find('select[data-testadults]').prop('disabled')).toBe(false)
    })

    it('should update selected child rooms', () => {
      const { mountedRender } = setup()

      expect(mountedRender.find('[data-testcheckbox]').at(0).closest('[data-testroom]').find('select[data-testkids]').prop('disabled')).toBe(true)
      
      mountedRender.find('[data-testcheckbox]').at(0).simulate('change', {target: {checked: true}})
      
      expect(mountedRender.find('[data-testcheckbox]').at(0).closest('[data-testroom]').find('select[data-testkids]').prop('disabled')).toBe(false)
    })
  })
})