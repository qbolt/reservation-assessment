import * as React from 'react'
import { mount } from 'enzyme'
import wait from 'waait'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from 'react-apollo/test-utils'

import { RESERVATIONS } from '../../../graphql/queries'
import ReservationsTable from '../index'

const mock = [
  {
    request: {
      query: RESERVATIONS
    },
    result: {
      data: {
        reservations: [
          {
            _id: '5cc842345cf6292f3485a67d',
            fullName: 'Arthur Williamson',
            hotelName: 'Hilton Garden Inn - Memphis',
            to: '2019-07-05T12:40:20.296Z',
            from: '2019-05-06T12:40:20.294Z'
          },
          {
            _id: '5cc842345cf6292f3485a67e',
            fullName: 'Bob Williamson',
            hotelName: 'Home2 Suites - Memphis',
            to: '2020-04-26T12:40:20.296Z',
            from: '2020-03-07T12:40:20.296Z'
          },
          {
            _id: '5cc842345cf6292f3485a67f',
            fullName: 'John Jack',
            hotelName: 'Hampton - Memphis',
            to: '2020-01-04T12:40:20.296Z',
            from: '2019-12-27T12:40:20.296Z'
          }
        ]
      }
    }
  }
]

const errorMock = [
  {
    request: {
      query: RESERVATIONS
    },
    error: new Error()
  }
]

const render = (error: boolean = false) => (
  <BrowserRouter>
    <MockedProvider addTypename={false} mocks={error ? errorMock : mock}>
      <ReservationsTable />
    </MockedProvider>
  </BrowserRouter>
)

describe('<ReservationsTable />', () => {
  it('renders without crashing', () => {
    mount(render())
  })

  it('renders loading component', () => {
    const component = mount(render())
    expect(component.html()).toContain('Loading')
  })

  it('renders error component', async () => {
    const component = mount(render(true))
    await wait(0)
    expect(component.html()).toContain('Error')
  })

  it('renders reservations elements', async () => {
    const component = mount(render())
    await wait(0)
    component.update()
    expect(component.find('.rt-tr-group').first().html()).toContain('Arthur')
  })
})
