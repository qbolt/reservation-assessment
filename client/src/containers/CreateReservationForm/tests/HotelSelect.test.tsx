import * as React from 'react'
import { mount } from 'enzyme'
import wait from 'waait'
import { HOTEL_NAMES_AND_BRAND } from '../../../graphql/queries'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from 'react-apollo/test-utils'
import HotelSelect from '../HotelSelect'

const mock = [
  {
    request: {
      query: HOTEL_NAMES_AND_BRAND,
      variables: { location: 'a' }
    },
    result: {
      data: {
        hotels: [
          {
            hotelName: 'a',
            brand: '1'
          }, {
            hotelName: 'b',
            brand: '2'
          }, {
            hotelName: 'c',
            brand: '3'
          }
        ]
      }
    }
  }
]

const errorMock = [
  {
    request: {
      query: HOTEL_NAMES_AND_BRAND,
      variables: { location: 'a' }
    },
    error: new Error()
  }
]

const onChange = jest.fn()

const render = (error: boolean = false) => (
  <BrowserRouter>
    <MockedProvider addTypename={false} mocks={error ? errorMock : mock}>
      <HotelSelect location='a' hotelName='' onChange={onChange}/>
    </MockedProvider>
  </BrowserRouter>
)

describe('<HotelSelect />', () => {
  it('renders without error', () => {
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

  it('renders children components', async () => {
    const component = mount(render())
    await wait(0)

    // Includes default 'select one'
    expect(component.update().find('select').children().length).toEqual(4)
  })

})
