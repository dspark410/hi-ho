const axios = require('axios')
require('dotenv').config()

// numbeo cost of living
// https://www.numbeo.com/api/indices?api_key=g1qic1xvvmr7h7&query=memphis

//cost of prices
//https://www.numbeo.com/api/city_prices?api_key=g1qic1xvvmr7h7&query=memphis

//ziprecruiter
// https://api.ziprecruiter.com/jobs/v1?search=frontend&location=sanfrancisco&radius_miles=50&days_ago=25&jobs_per_page=25&page=1&api_key=uh89jdqrc52qqaef6hwr7cme9gqpui74

const numbeoKey = process.env.NUMBEO_KEY
const zipKey = process.env.ZIP_RECRUITER_KEY

const resolvers = {
  Query: {
    getCostOfLiving: async (parent, { city }) => {
      try {
        // numbeo api for cost of living indices in each city
        const costOfLivingIndex = axios.get(
          `https://www.numbeo.com/api/indices?api_key=${numbeoKey}&query=${city}`
        )

        // numbeo api for item prices of each city
        const itemPrices = axios.get(
          `https://www.numbeo.com/api/city_prices?api_key=${numbeoKey}&query=${city}`
        )

        // wait for reponses into index and prices
        const [index, prices] = await Promise.all([
          costOfLivingIndex,
          itemPrices,
        ])

        // normalize data into fields
        return {
          cpi_and_rent_index: index.data.cpi_and_rent_index,
          prices: prices.data.prices,
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  CostOfLiving: {
    // resolve field of Itemprices
    prices: (parent) => {
      return parent.prices
    },
  },
}

module.exports = { resolvers }
