import * as React from 'react'
import { shallow, mount } from 'enzyme'
import Button from '../index'

const onClick = jest.fn()

describe('<Button />', () => {
  it('renders without crashing', () => {
    const button = shallow(<Button />)

    // Interaction demo
    expect(button).toBeDefined()
  })

  it('renders children', () => {
    const children = <span>hello</span>
    const button = mount(<Button>{children}</Button>)

    expect(button.find('span').length).toEqual(1)
    expect(button.find('span').text()).toEqual('hello')
  })

  it('button click should call onClick prop function', () => {
    const button = mount(<Button onClick={onClick}/>)
    button
      .find('button')
      .simulate('click')
    expect(onClick).toBeCalled()
  })
})
