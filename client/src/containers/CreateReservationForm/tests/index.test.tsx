import * as React from 'react'
import { shallow } from 'enzyme'
import CreateReservationForm from '../index'

describe('<CreateReservationForm />', () => {
  it('renders without crashing', () => {
    const component = shallow(<CreateReservationForm />)
    expect(component).toBeDefined()
  })

})
