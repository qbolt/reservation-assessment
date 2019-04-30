import * as React from 'react'
import Query from 'react-apollo/Query'
// import moment from 'moment'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment'

import { RESERVATIONS } from '../../graphql/queries'
import Input from '../../components/Input'
import { SearchWrapper } from './styled'

const dateFormat = 'MM-DD-Y'

interface ReservationData {
  reservations: Array<{ fullName: string, hotelName: string, from: Date, to: Date }>
}

interface IFormState {
  [key: string]: any
}

interface IState {
  query: IFormState
}

const formatDate = (d: any) => {
  return moment(d).format(dateFormat)
}

class ReservationsTable extends React.Component<any, IState> {
  constructor (props: any) {
    super(props)
    this.state = {
      query: {
        _id: '',
        firstName: '',
        lastName: '',
        location: '',
        hotelName: '',
        brand: '',
        to: null,
        from: null
      }
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.getQuery = this.getQuery.bind(this)
  }

  onInputChange (event: React.FormEvent) {
    const { value, name } = event.target as HTMLInputElement
    this.setState({ query: { ...this.state.query, [name]: value } })
  }

  getQuery (): any {
    return Object.entries(this.state.query)
      .filter(([_, val]) => val)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
  }

  render () {
    const columns = [{
      Header: 'Reservation Id',
      accessor: '_id'
    }, {
      Header: 'Guest',
      accessor: 'fullName'
    }, {
      Header: 'Hotel',
      accessor: 'hotelName'
    }, {
      Header: 'Check-in',
      accessor: 'from'
    }, {
      Header: 'Check-out',
      accessor: 'to'
    }]

    return (
      <div>
        <Link to='create'>Create Reservation</Link>
        <h2>Search</h2>
        <SearchWrapper>
          <Input placeholder='Reservation Id' name='_id' type='text' onChange={this.onInputChange} value={this.state.query._id}/>
          <Input placeholder='Guest First Name' name='firstName' type='text' onChange={this.onInputChange} value={this.state.query.firstName}/>
          <Input placeholder='Guest Last Name' name='lastName' type='text' onChange={this.onInputChange} value={this.state.query.lastName}/>
          <Input placeholder='Brand' name='brand' type='text' onChange={this.onInputChange} value={this.state.query.brand}/>
          <Input placeholder='Location' name='location' type='text' onChange={this.onInputChange} value={this.state.query.location}/>
        </SearchWrapper>
        <Query<ReservationData> query={RESERVATIONS} variables={this.getQuery()}>
          {({ loading, error, data }) => {
            if (error) return <p>Error</p>
            if (data) {
              let reservations: any = []
              if (data.reservations) {
                reservations =
                  data.reservations
                    .map(({ to, from, ...rest }) =>
                      ({ to: formatDate(to), from: formatDate(from), ...rest }))
              }
              return (
                <div>
                  <ReactTable
                    data={reservations}
                    columns={columns}
                  />
                </div>
              )
            }
            return null
          }}
        </Query>
      </div>
    )
  }
}

export default ReservationsTable
