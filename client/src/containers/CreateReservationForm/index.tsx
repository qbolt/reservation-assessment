import * as React from 'react'
import { Mutation } from 'react-apollo'

import { CREATE_RESERVATION, RESERVATIONS } from '../../graphql/queries'
import DateRangePickerWrapper from '../../components/DateRangePickerWrapper'
import Input from '../../components/Input'
import { SubmitButton } from './styled'
import { Link } from 'react-router-dom'
import LocationSelect from './LocationSelect'
import HotelSelect from './HotelSelect'

interface IFormProps {
  action: string
}

export interface IValues {
  [key: string]: any
}

export interface IFormState {
  form: IValues
  errorCreating: boolean
  successCreating: boolean
}

class CreateReservationForm extends React.Component<any, IFormState> {

  initialFormState: IValues = {
    firstName: '',
    lastName: '',
    location: '',
    brand: '',
    hotelName: '',
    to: null,
    from: null
  }

  constructor (props: IFormProps) {
    super(props)

    this.state = {
      form: this.initialFormState,
      errorCreating: false,
      successCreating: false
    }

  }

  onInputChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = event.currentTarget as HTMLInputElement
    this.setState({ form: { ...this.state.form, [name]: value } })
  }

  onSelectLocation = (event: React.FormEvent<HTMLSelectElement>) => {
    const { value, name } = event.currentTarget
    this.setState({ form: { ...this.state.form, hotelName: '', brand: '', [name]: value } })
  }

  onSelectHotel = (event: React.FormEvent<HTMLSelectElement>) => {
    const element = event.target as HTMLSelectElement
    const brand = element[element.selectedIndex].getAttribute('data-brand')
    const { value, name } = element
    this.setState({ form: { ...this.state.form, brand: brand, [name]: value } })
  }

  onDatesChange = (dates: any) => {
    const { startDate, endDate } = dates
    this.setState({ form: { ...this.state.form, from: startDate, to: endDate } })
  }

  submit = (createReservation: any) => (event: React.FormEvent): void => {
    event.preventDefault()

    const { firstName, lastName, to, from, hotelName, location, brand } = this.state.form
    this.setState({ successCreating: false, errorCreating: false }, () => {
      createReservation({
        variables: {
          firstName: firstName,
          lastName: lastName,
          to: to,
          from: from,
          hotelName: hotelName,
          location: location,
          brand: brand
        }
      })
      this.setState({ successCreating: true, form: { ...this.initialFormState } })
    })
  }

  render () {
    return (
      <Mutation mutation={CREATE_RESERVATION} refetchQueries={[ { query: RESERVATIONS }]} >
        {(createReservation: any, result: any) => (
          <div>
            <Link to='/'>Search Reservations</Link>
            <h2>Create Reservation</h2>
            <form onSubmit={this.submit(createReservation)}>
              <Input required placeholder={'First name'} name='firstName' type='text' value={this.state.form.firstName} onChange={this.onInputChange}/>
              <Input required placeholder={'Last name'} name='lastName' type='text' value={this.state.form.lastName} onChange={this.onInputChange}/>
              <LocationSelect onChange={this.onSelectLocation} location={this.state.form.location}/>
              {this.state.form.location
                && <HotelSelect location={this.state.form.location} onChange={this.onSelectHotel} hotelName={this.state.form.hotelName}/>
              }
              <DateRangePickerWrapper
                onDatesChange={this.onDatesChange}
                startDate={this.state.form.from}
                endDate={this.state.form.to}
                startDateId='startDate'
                endDateId='endDate'
                startDatePlaceholderText='Check-in'
                endDatePlaceholderText='Check-out'
                required
              />
              <SubmitButton type='submit'>Create Reservation</SubmitButton>
              {result.error && <span>Error creating reservation</span>}
              {this.state.successCreating && <span>Created reservation successfully</span>}
            </form>
          </div>
        )}
      </Mutation>

    )
  }

}

export default CreateReservationForm
