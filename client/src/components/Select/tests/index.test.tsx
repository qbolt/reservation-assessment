import * as React from 'react'
import { shallow, mount } from 'enzyme'
import Select from '../index'

const onChange = jest.fn()

describe('<Select />', () => {
  it('renders without crashing', () => {
    const select = shallow(<Select onChange={onChange} name='test'>test</Select>)
    expect(select).toBeDefined()
  })

  it('renders children', () => {
    const children = <option>hello</option>
    const select = mount(<Select onChange={onChange} name='test'>{children}</Select>)

    expect(select.find('option').length).toEqual(1)
    expect(select.find('option').text()).toEqual('hello')
  })

  it('button click should call onClick prop function', () => {
    const select = mount(<Select name='test' onChange={onChange}>children</Select>)
    select
      .find('select')
      .simulate('change')
    expect(onChange).toBeCalled()
  })
})
