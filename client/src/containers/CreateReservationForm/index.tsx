import * as React from 'react'
import { Mutation, Query } from 'react-apollo'

import { CREATE_RESERVATION, HOTEL_NAMES_AND_BRAND, LOCATIONS, RESERVATIONS } from '../../graphql/queries'
import DateRangePickerWrapper from '../../components/DateRangePickerWrapper'
import Input from '../../components/Input'
import Select from '../../components/Select'
import { SubmitButton } from './styled'
import { Link } from 'react-router-dom'

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

interface LocationData {
  locations: Array<{ location: string }>
}

interface HotelData {
  hotels: Array<{ hotelName: string, brand: string }>
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

    this.onInputChange = this.onInputChange.bind(this)
    this.onDatesChange = this.onDatesChange.bind(this)
    this.onSelectHotel = this.onSelectHotel.bind(this)

  }

  onInputChange (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) {
    const { value, name } = event.currentTarget as HTMLInputElement
    this.setState({ form: { ...this.state.form, [name]: value } })
  }

  onSelectHotel (event: React.FormEvent<HTMLSelectElement>) {
    const element = event.target as HTMLSelectElement
    const brand = element[element.selectedIndex].getAttribute('data-brand')
    const { value, name } = element
    this.setState({ form: { ...this.state.form, brand: brand, [name]: value } })
  }

  onDatesChange (dates: any) {
    console.log('changed dates')
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
              <Query<LocationData> query={LOCATIONS}>
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error</p>
                    if (data) {
                      return (
                        <Select
                          required
                          value={this.state.form.location}
                          onChange={this.onInputChange}
                          name='location'
                          id='location'
                        >
                          {
                            [
                              <option key='default' value='' disabled>Select one</option>,
                              ...data.locations.map(({ location }) => (
                                <option key={location} value={location}>{location}</option>
                              ))
                            ]
                          }
                        </Select>
                      )
                    }
                    return null
                  }}
              </Query>
              {this.state.form.location
                ? (
                  <Query<HotelData>
                    query={HOTEL_NAMES_AND_BRAND}
                    variables={{ location: this.state.form.location }}
                  >
                      {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error</p>
                        if (data) {
                          if (data.hotels.length === 0) return <span>No hotels available based on your selection</span>
                          if (data.hotels.length === 1) {
                            const [ hotel ] = data.hotels
                            const { hotelName } = hotel
                            return <option selected disabled value={hotelName}>{hotelName}</option>
                          }
                          return (
                            <Select
                              name='hotelName'
                              id='hotelName'
                              onChange={this.onSelectHotel}
                              value={this.state.form.hotelName}
                              required
                            >
                              {
                                [
                                  <option key='default' value='' disabled>Select one</option>,
                                  ...data.hotels.map(({ hotelName, brand }) => (
                                    <option key={hotelName} value={hotelName} data-brand={brand}>{hotelName}</option>
                                  ))
                                ]
                              }
                            </Select>
                          )
                        }
                        return null
                      }}
                  </Query>
                )
                : null
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
              { result.error ? <span>Error creating reservation</span> : null }
              { this.state.successCreating ? <span>Created reservation successfully</span> : null }
            </form>
          </div>
        )}
      </Mutation>

    )
  }

}

export default CreateReservationForm
