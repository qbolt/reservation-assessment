import mongoose = require('mongoose')
import moment = require('moment')
import { Reservation as ReservationEntity, ReservationModel } from './graphql/entities/Reservation'
import { Hotel as HotelEntity, HotelModel } from './graphql/entities/Hotel'
import { Brand as BrandEntity, BrandModel } from './graphql/entities/Brand'
import { Location as LocationEntity, LocationModel } from './graphql/entities/Location'

class DateRange {
  constructor (from: Date, to: Date) {
    this.from = from
    this.to = to
  }
  from: Date
  to: Date
}

class Hotel {
  constructor (brand: string, location: string) {
    this.brand = brand
    this.location = location
  }
  brand: string
  location: string
}

class Name {
  constructor (firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
  }
  firstName: string
  lastName: string
}

const permutations = (arr1: string[], arr2: string[]): string[][] => {
  const permutations: string[][] = []
  for (const a of arr1) {
    for (const b of arr2) {
      permutations.push([a, b])
    }
  }
  return permutations
}

const generateHotels = (brands: string[], locations: string[]): Hotel[] => {
  return permutations(brands, locations).map(([ brand, location ]) => new Hotel(brand, location))
}

const generateNames = (): Name[] => {
  const firstNames: string[] = ['May', 'Jack', 'Bob', 'Janice', 'Steve', 'Arthur', 'Sally', 'Will', 'Meredith']
  const lastNames: string[] = ['Jackson', 'Roberts', 'Branson', 'Myers', 'Bryant', 'Steve', 'Williamson', 'Walker']
  return permutations(firstNames, lastNames).map(([ firstName, lastName ]) => new Name(firstName, lastName))
}

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const getDateFromNow = (fromNow: number, units: string): Date => {
  return moment().utc().add(convertToDuration(units), fromNow).toDate()
}

const convertToDuration = (unit: string): moment.unitOfTime.DurationConstructor => {
  return (unit === 'seconds' || unit === 'minutes' || unit === 'hours' || unit === 'days' || unit === 'weeks' || unit === 'months')
    ? unit
    : 'hours'
}

const dateRangeGenerator = (maxDaysOffset: number) => (): DateRange => {
  const fromOffset = getRandomInt(1, maxDaysOffset - 1)
  const toOffset = getRandomInt(fromOffset, maxDaysOffset)
  const from = getDateFromNow(fromOffset, 'days')
  const to = getDateFromNow(toOffset, 'days')

  return new DateRange(from, to)
}

const dropCollections = (): void => {
  ReservationModel.remove({}, () => console.log('dropped reservations'))
  HotelModel.remove({}, () => console.log('dropped hotels'))
  BrandModel.remove({}, () => console.log('dropped brands'))
  LocationModel.remove({}, () => console.log('dropped locations'))
}

const seed = async (count: number) => {

  await mongoose.connect('mongodb://localhost/reservations')
  dropCollections()

  const brands: string[] = ['Doubletree', 'Hilton Inn & Suites', 'Hilton Garden Inn', 'Hampton', 'Home2 Suites']
  const locations: string[] = ['Memphis', 'Nashville', 'Franklin', 'Southaven']

  const names = generateNames()

  // Generating dummy hotel names in format `${brand} - ${location}`
  const hotelNames = generateHotels(brands, locations)

  // Generating reservations within the next year
  const getDateRange = dateRangeGenerator(365)
  const reservations: ReservationEntity[] = []
  for (let i = 0; i < count; i++) {
    const reservation: ReservationEntity = new ReservationEntity()
    const dateRange: DateRange = getDateRange()
    const hotel = hotelNames[getRandomInt(0, hotelNames.length - 1)]
    reservation.firstName = names[getRandomInt(0, names.length - 1)].firstName
    reservation.lastName = names[getRandomInt(0, names.length - 1)].lastName
    reservation.hotelName = `${hotel.brand} - ${hotel.location}`
    reservation.brand = hotel.brand
    reservation.location = hotel.location
    reservation.from = dateRange.from
    reservation.to = dateRange.to
    reservation.created = new Date()
    reservations.push(reservation)
  }

  const hotelEntities = hotelNames.map(({ brand, location }) => {
    const hotel: HotelEntity = new HotelEntity()
    hotel.hotelName = `${brand} - ${location}`
    hotel.location = location
    hotel.brand = brand
    hotel.created = new Date()
    return hotel
  })

  const brandEntities = brands.map((brand) => {
    const brandEntity: BrandEntity = new BrandEntity()
    brandEntity.brand = brand
    brandEntity.created = new Date()
    return brandEntity
  })

  const locationEntities = locations.map((location) => {
    const locationEntity: LocationEntity = new LocationEntity()
    locationEntity.location = location
    locationEntity.created = new Date()
    return locationEntity
  })

  // Persisting hotels, brands, and locations to DB to allow for more dynamic querying on web application
  return await Promise.all([
    HotelModel.insertMany(hotelEntities),
    BrandModel.insertMany(brandEntities),
    LocationModel.insertMany(locationEntities),
    ReservationModel.insertMany(reservations)
  ])

}

seed(100)
  .then(() => console.log('Done seeding'))
  .catch(err => console.log(err))
