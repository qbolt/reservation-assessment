
Reservation Assessment
===============================
Here are links to the deployed application as well as the GraphQL playground

*Initial loading may be slow (and even timeout) due to Heroku's free tier. It spins down servers after no requests are made for a while.*

[Web App](https://reservations-client-qbolt.herokuapp.com/)

[GraphQL API/Playground](https://reservations-api-qbolt.herokuapp.com/)

This document serves as an overview of the project including the features, explanations of technologies, miscellaneous notes, and a future wishlist of challenges to tackle.

## Features
* All base features listed in requirements
* Live searching/querying within UI based on partial matching firstname/lastname, hotel, location, hotel brand, guest name, and id
* GraphQL API supports querying based on dates as well as date ranges for check-in/check-out
* During reservation creation, filter hotels by location with live GraphQL queries

## Technologies Used

Below is a brief explanation of additional technologies that were utilized along with brief explanations of what they are.

#### Server
* GraphQL
* MongoDB - Easy to use NoSQL Datastore
* [Mongoose](https://mongoosejs.com/docs/) - 'ORM'
* [typegoose](https://github.com/szokodiakos/typegoose) - Allows annotated typescript classes to serve as entity models
* [type-graphql](https://typegraphql.ml/) - Similar to typegoose, allows additional annotations for creating GraphQL schema

#### Client
* [Apollo Client](https://www.apollographql.com/) - Easy to use components that provide easy access to GraphQL queries and mutations through components utilizing the render props pattern
* [styled-components](https://www.styled-components.com/) - Flexible styled components that allow scoping css to individual reusable components
* [react-dates](https://github.com/airbnb/react-dates) - React date picker component - made implementing the client-side date range easy!
* [react-table](https://www.npmjs.com/package/react-table) - React table component - Sortable, pageable, clean table with an easy-to-use API

## Notes
* `hotelName`s are currently just a concatenation of the 'brand' and 'location' but are not tied to either in order to take full advantage of a schema-less database
* GraphQL API has support for getting reservations that are from *or* to a specific date as well as any that are within given *range*
* There is a small seeding library that was used to generate dummy data and populate the database in `server/src/seed.ts`

## A few things I would have liked to tackle

* Enhance user experience - primarily navigation and the 'Create reservation' form
* Implement pagination using GraphQL as opposed to fetching all reservations initially
* Create more robust searching capabilities - incorporate check-in/check-out dates
* Consider breaking down the containers into more manageable components that don't share as much responsibility
