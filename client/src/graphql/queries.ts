import { gql } from 'apollo-boost'

export const CREATE_RESERVATION = gql`
  mutation CreateReservation(
    $firstName: String!,
    $lastName: String!,
    $to: DateTime!,
    $from: DateTime!,
    $brand: String!,
    $hotelName: String!,
    $location: String!
  ) {
    createReservation(input: {
      firstName: $firstName,
      lastName: $lastName,
      to: $to,
      from: $from,
      brand: $brand,
      hotelName: $hotelName,
      location: $location
    }) {
      _id
    }
  }
`

export const HOTEL_NAMES_AND_BRAND = gql`
  query hotelNames($location: String, $brand: String){
    hotels(location: $location, brand: $brand) {
      hotelName
      brand
    }
  }
`

export const RESERVATIONS = gql`
  query Reservations(
    $_id: String,
    $location: String,
    $firstName: String,
    $lastName: String
  ) {
    reservations(_id: $_id, location: $location, firstName: $firstName, lastName: $lastName) {
      _id
      fullName
      hotelName
      from
      to
    }
  }
`

export const LOCATIONS = gql`
  {
    locations {
      location
    }
  }
`

export const BRANDS = gql`
  {
    brands {
      brand
    }
  }
`
