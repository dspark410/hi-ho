import { gql } from '@apollo/client'

export const GET_COST_OF_LIVING = gql`
  query getCostOfLiving(
    $city: String!
    $search: String!
    $radius: String!
    $daysAgo: String!
    $page: String!
  ) {
    getCostOfLiving(
      city: $city
      search: $search
      radius: $radius
      daysAgo: $daysAgo
      page: $page
    ) {
      cpi_and_rent_index
    }
  }
`
