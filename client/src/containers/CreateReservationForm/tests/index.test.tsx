import * as React from 'react'
import { mount } from 'enzyme'
import CreateReservationForm from '../index'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from 'react-apollo/test-utils'

const render = () => (
  <BrowserRouter>
    <MockedProvider addTypename={false}>
      <CreateReservationForm />
    </MockedProvider>
  </BrowserRouter>
)

describe('<CreateReservationForm />', () => {
  it('renders without crashing', () => {
    const component = mount(render())
    expect(component).toBeDefined()
  })

  it('named inputs update state', () => {
    let component = mount(render()).find('CreateReservationForm')

    // Excluding custom date picker fields
    const exclude = ['startDate', 'endDate']

    const namedInputs: string[] = []
    component.find('input').forEach(input => {
      const name = input.prop('name')
      if (name && !exclude.includes(name)) {
        namedInputs.push(name)
      }
    })

    for (let name of namedInputs) {
      component.find(`input[name="${name}"]`).simulate('change', { target: { name, value: 'a' } })
    }

    namedInputs.forEach(name => expect(component.state().form[name]).toEqual('a'))
  })
})
