import * as React from 'react'
import { Wrapper, StyledInput } from './styled'

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void
  name: string
  type?: string
  value?: string
}

class Input extends React.Component<IProps> {
  static defaultProps = {
    type: 'text'
  }
  render () {
    return (
      <Wrapper>
        <StyledInput {...this.props}/>
      </Wrapper>
    )
  }
}

export default Input
