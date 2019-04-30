import * as React from 'react'
import { Wrapper, StyledButton } from './styled'
// tslint:disable-next-line

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

class Button extends React.Component<IProps> {
  render () {
    return (
      <Wrapper>
        <StyledButton {...this.props}>
          {this.props.children}
        </StyledButton>
      </Wrapper>
    )
  }
}

export default Button
