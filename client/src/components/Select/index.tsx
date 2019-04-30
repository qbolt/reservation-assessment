import * as React from 'react'
// tslint:disable-next-line
import { Component, ReactNode } from 'react'
import { Wrapper, StyledSelect } from './styled'

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onChange: (event: React.FormEvent<HTMLSelectElement>) => void
  name: string
  children: ReactNode[] | ReactNode
  value?: string
}

class Select extends Component<IProps> {
  render () {
    return (
      <Wrapper>
        <StyledSelect {...this.props}>
          {this.props.children}
        </StyledSelect>
      </Wrapper>
    )
  }
}

export default Select
