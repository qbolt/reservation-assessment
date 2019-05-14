import * as React from 'react'
import { shallow } from 'enzyme'
import Search from '../index'

// Most inner functionality is tested by Input
describe('<Search />', () => {
  it('renders without crashing', () => {
    shallow(<Search query={{ _id: '', firstName: '', lastName: '', brand: '', location: '' }} onChange={jest.fn()}/>)
  })
})
