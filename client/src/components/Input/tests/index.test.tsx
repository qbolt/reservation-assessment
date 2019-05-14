import * as React from 'react'
import { mount } from 'enzyme'
import Input from '../index'

const onChange = jest.fn()

describe('<Input />', () => {
  it('renders without crashing', () => {
    const input = mount(<Input name='test' onChange={onChange}/>)

    expect(input).toBeDefined()
    expect(input.find('input').length).toEqual(1)
  })

  it('maps props correctly', () => {
    const input = mount(<Input name='test' type='select' onChange={onChange}/>)

    expect(input.find('input').first().props()['type']).toEqual('select')
    expect(input.find('input').first().props()['name']).toEqual('test')
  })

  it('calls onChange prop when input is changed', () => {
    const input = mount(<Input name='test' type='select' onChange={onChange}/>)

    input.find('input').simulate('change')

    expect(onChange).toBeCalled()
  })

})
