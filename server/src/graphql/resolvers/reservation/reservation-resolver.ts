import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'

import { Reservation, ReservationModel } from '../../entities/Reservation'
import ReservationsArgs from './reservation-args'
import ReservationInput from './reservation-input'
import { HotelModel } from '../../entities/Hotel'
import moment = require('moment')

@Resolver(Reservation)
class ReservationResolver {

  @Query(_ => Reservation)
  async reservation (@Arg('id') id: string) {
    return ReservationModel.findById(id)
  }

  @Query(_ => [Reservation])
  async reservations (@Args() { to, from, range, firstName, lastName, ...args }: ReservationsArgs): Promise<Reservation[]> {

    // Initialize query container with non-date args
    const query: any = { $or: [], $and: [], ...args }

    // Query for specific to/from dates
    const toDateQuery = to
      ? { to: { $gte: to, $lte: moment(to).utc().endOf('day').toDate() } }
      : null
    const fromDateQuery = from
      ? { from: { $gte: from, $lte: moment(from).utc().endOf('day').toDate() } }
      : null

    // Query for date range
    const rangeQuery = range
      ? {
        $or: [
          { from: { $gte: range.from } },
          { to: { $lte: range.to } }
        ]
      }
      : null

    // Filter out null date queries that weren't requested
    const dateQueries = [ rangeQuery, toDateQuery, fromDateQuery ].filter(q => q)

    // Append queries looking for either range or specific dates
    if (dateQueries.length > 0) {
      query.$or = dateQueries
    }

    // Append first/last name regex query
    if (firstName) query.$and.push({ firstName: { $regex: firstName, $options: 'i' } })
    if (lastName) query.$and.push({ lastName: { $regex: lastName, $options: 'i' } })

    // If no 'or/and' operations have been created, remove 'or/and' array
    if (query.$or.length === 0) delete query.$or
    if (query.$and.length === 0) delete query.$and

    console.log(query)

    return ReservationModel.find(query)
  }

  @Mutation(_ => Reservation)
  async createReservation (
    @Arg('input') { firstName, lastName, hotelName, location, brand, to, from }: ReservationInput
  ): Promise<Reservation> {
    const hotels = await HotelModel.find({ hotelName })

    if (!hotels || hotels.length <= 0) {
      throw new Error('Hotel does not exist')
    }

    const reservation: Reservation = new Reservation()
    reservation.firstName = firstName
    reservation.lastName = lastName
    reservation.hotelName = hotelName
    reservation.location = location
    reservation.brand = brand
    reservation.to = to
    reservation.from = from
    reservation.created = new Date()
    return ReservationModel.create(reservation)
  }
}

export default ReservationResolver
