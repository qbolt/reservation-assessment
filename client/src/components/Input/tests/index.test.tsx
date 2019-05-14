import * as React from 'react'
import { mount, shallow } from 'enzyme'
import Input from '../index'

const onChange = jest.fn()

describe('<Input />', () => {
  it('renders without crashing', () => {
    shallow(<Input name='test' onChange={onChange}/>)
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
