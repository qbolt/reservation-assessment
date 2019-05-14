import * as React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from 'react-apollo/test-utils'
import wait from 'waait'

import { LOCATIONS } from '../../../graphql/queries'
import LocationSelect from '../LocationSelect'

const mock = [
  {
    request: {
      query: LOCATIONS
    },
    result: {
      data: {
        locations: [
          { location: 'a' },
          { location: 'b' },
          { location: 'c' }
        ]
      }
    }
  }
]

const errorMock = [
  {
    request: {
      query: LOCATIONS
    },
    error: new Error()
  }
]

const onChange = jest.fn()

const render = (error: boolean = false) => (
  <BrowserRouter>
    <MockedProvider addTypename={false} mocks={error ? errorMock : mock}>
      <LocationSelect location='' onChange={onChange}/>
    </MockedProvider>
  </BrowserRouter>
)

describe('<LocationSelect />', () => {
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
