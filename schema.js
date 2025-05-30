import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Flight {
    id: ID
    flight_code: String
    airline_name: String
    departure_time: String
    arrival_time: String
    price: Int
    from: String
    to: String
  }

  type Query {
    flights: [Flight]
    flight(id: ID!): Flight
  }

  type Mutation {
    addFlight(
      flight_code: String!
      airline_name: String!
      departure_time: String!
      arrival_time: String!
      price: Int!
      from: String!
      to: String!
    ): Flight
  }
`);

export default schema;