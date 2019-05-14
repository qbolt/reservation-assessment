import * as React from 'react'
import { LOCATIONS } from '../../graphql/queries'
import Select from '../../components/Select'
import { Query } from 'react-apollo'

interface Props {
  location: string
  onChange: (event: React.FormEvent<HTMLSelectElement>) => void
}

interface LocationData {
  locations: Array<{ location: string }>
}

const LocationSelect = (props: Props) => {
  return (
    <Query<LocationData> query={LOCATIONS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error...</p>
        if (data) {
          return (
            <Select
              required
              value={props.location}
              onChange={props.onChange}
              name='location'
              id='location'
            >
              {[
                <option key='default' value='' disabled>Select one</option>,
                ...data.locations.map(({ location }) => (
                  <option key={location} value={location}>{location}</option>
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

export default LocationSelect
