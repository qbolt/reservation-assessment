import * as React from 'react'
import { HOTEL_NAMES_AND_BRAND } from '../../graphql/queries'
import Select from '../../components/Select'
import { Query } from 'react-apollo'

interface Props {
  location: string
  hotelName: string
  onChange: (event: React.FormEvent<HTMLSelectElement>) => void
}

interface HotelData {
  hotels: Array<{ hotelName: string, brand: string }>
}

const HotelSelect = (props: Props) => {
  return (
    <Query<HotelData>
      query={HOTEL_NAMES_AND_BRAND}
      variables={{ location: props.location }}
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
            onChange={props.onChange}
            value={props.hotelName}
            required
          >
        {[
          <option key='default' value='' disabled>Select one</option>,
          ...data.hotels.map(({ hotelName, brand }) => (
            <option key={hotelName} value={hotelName} data-brand={brand}>{hotelName}</option>
          ))
        ]}
          </Select>
          )
        }
        return null
      }}
    </Query>
  )
}

export default HotelSelect
