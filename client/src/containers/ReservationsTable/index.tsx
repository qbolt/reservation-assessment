import * as React from 'react'
import Query from 'react-apollo/Query'
// import moment from 'moment'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment'

import { RESERVATIONS } from '../../graphql/queries'
import SearchForm from '../../components/SearchForm'

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
    return (
      <div>
        <Link to='create'>Create Reservation</Link>
        <h2>Search</h2>
        <SearchForm onChange={this.onInputChange} query={this.state.query}/>
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
