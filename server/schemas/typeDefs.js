const { gql } = require('apollo-server-express')
const { authMiddleware } = require('../middleware/authMiddleware')

const typeDefs = gql`
  type User {
    email: String
    password: String
  }

  type LoginResponse {
    accessToken: String
  }

  type HiringCompany {
    name: String
    #//////// the fields below usually return null most of the time/////////////
    # id: String
    # description: String
    # url: String
  }

  type ItemPrices {
    data_points: Int
    item_id: Int
    lowest_price: Float
    average_price: Float
    highest_price: Float
    item_name: String
  }

  type ZipRecruiter {
    name: String
    salary_min: Int
    salary_min_annual: Int
    id: String
    location: String
    posted_time_friendly: String
    industry_name: String
    city: String
    source: String
    url: String
    buyer_type: String
    category: String
    country: String
    salary_source: String
    hiring_company: HiringCompany
    snippet: String
    posted_time: String
    salary_max: Int
    has_zipapply: Boolean
    state: String
    salary_max_annual: Int
    job_age: Int
    salary_interval: String
  }

  type CostOfLiving {
    #numbeo indices api
    cpi_and_rent_index: Float

    #numbeo item prices api
    prices: [ItemPrices]

    #ziprcruiter api
    total_jobs: Int
    num_paginable_jobs: Int
    jobs: [ZipRecruiter]

    #////////////////numbeo indices api//////////////////

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
    getCostOfLiving(
      city: String!
      search: String!
      radius: String!
      daysAgo: String!
      page: String!
    ): CostOfLiving
    getMe: User
  }
  type Mutation {
    signup(email: String!, password: String!): User
    login(email: String!, password: String!): LoginResponse
  }
`
module.exports = { typeDefs }
