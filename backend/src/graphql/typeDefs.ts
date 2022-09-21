import { gql } from "apollo-server";

const typeDefs = gql`
  type ExchangeQuery {
    btcAmount: Float
    usdAmount: Float
    exchange: String
    exchangesCheckedAgainst: [String]
  }

  type Query {
    exchangeQuery(amount: Float!): ExchangeQuery
  }
`;

export default typeDefs;