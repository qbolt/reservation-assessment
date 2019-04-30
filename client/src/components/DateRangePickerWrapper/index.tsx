import * as React from 'react'
import { Moment } from 'moment'
import { omit } from 'lodash'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

import { Wrapper } from './styled'

interface IState {
  focusedInput: any
}

interface IProps {
  autoFocus?: boolean,
  autoFocusEndDate?: boolean,
  startDateId: string,
  endDateId: string,
  onDatesChange: (dates: any) => void
  required?: boolean
  startDate: Moment | null
  endDate: Moment | null
  startDatePlaceholderText: string
  endDatePlaceholderText: string
}

class DateRangePickerWrapper extends React.Component<IProps, IState> {
  constructor (props: any) {
    super(props)

    let focusedInput = null
    if (props.autoFocus) {
      focusedInput = 'startDate'
    } else if (props.autoFocusEndDate) {
      focusedInput = 'endDate'
    }

    this.state = {
      focusedInput
    }

    this.onDatesChange = this.onDatesChange.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
  }

  onDatesChange (dates: any) {
    this.props.onDatesChange(dates)
  }

  onFocusChange (focusedInput: any) {
    this.setState({ focusedInput })
  }

  render () {

    const props = omit(this.props, [
      'autoFocus',
      'autoFocusEndDate',
      'initialStartDate',
      'initialEndDate',
      'stateDateWrapper'
    ])

    return (
      <Wrapper>
        <DateRangePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={this.state.focusedInput}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          startDateId={props.startDateId}
          endDateId={props.endDateId}
          startDatePlaceholderText={props.startDatePlaceholderText}
          endDatePlaceholderText={props.endDatePlaceholderText}
          required={props.required}
          />
      </Wrapper>
    )
  }
}

export default DateRangePickerWrapper
