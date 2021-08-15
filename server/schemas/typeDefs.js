const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type ItemPrices {
    data_points: Int
    item_id: Int
    lowest_price: Float
    average_price: Float
    highest_price: Float
    item_name: String
  }

  type CostOfLiving {
    cpi_and_rent_index: Float
    prices: [ItemPrices]
    # crime_index: Float
    # purchasing_power_incl_rent_index: Float
    # property_price_to_income_ratio: Float
    # contributors_healthcare: Float
    # safety_index: Float
    # traffic_co2_index: Float
    # traffic_inefficiency_index: Float
    # contributors_traffic: Int
    # rent_index: Float
    # health_care_index: Float
    # groceries_index: Float
    # contributors_property: Int
    # pollution_index: Float
    # traffic_time_index: Float
    # restaurant_price_index: Float
    # contributors_cost_of_living: Int
    # climate_index: Float
    # cpi_index: Float
    # quality_of_life_index: Float
    # contributors_pollution: Int
    # contributors_crime: Int
    # traffic_index: Float
    # name: String
    # city_id: Int
  }

  type Query {
    getCostOfLiving(city: String!): CostOfLiving
  }
`
module.exports = { typeDefs }
