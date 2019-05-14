import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './index.css'
import ReservationsTable from './containers/ReservationsTable'
import CreateReservationForm from './containers/CreateReservationForm'

const client = new ApolloClient({
  uri: 'https://reservations-api-qbolt.herokuapp.com/'
})

const rootNode = document.getElementById('root')

export const rootComponent = (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path='/' component={ReservationsTable}/>
        <Route exact path='/create' component={CreateReservationForm}/>
        <Route component={ReservationsTable}/>
      </Switch>
    </ApolloProvider>
  </BrowserRouter>

)

ReactDOM.render(rootComponent, rootNode)
