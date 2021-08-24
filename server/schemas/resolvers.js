const axios = require('axios')
require('dotenv').config()
const User = require('../models/User')
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} = require('../utils/auth')

const numbeoKey = process.env.NUMBEO_KEY
const zipKey = process.env.ZIP_RECRUITER_KEY

const resolvers = {
  ZipRecruiter: {
    // resolve field of HiringCompany
    hiring_company: (parent) => {
      return parent.hiring_company
    },
  },
  CostOfLiving: {
    // resolve field of Itemprices
    prices: (parent) => {
      return parent.prices
    },
    jobs: (parent) => {
      return parent.jobs
    },
  },
  Query: {
    getCostOfLiving: async (
      parent,
      { city, search, radius, daysAgo, page }
    ) => {
      try {
        // numbeo api for cost of living indices in each city
        const costOfLivingIndex = axios.get(
          `https://www.numbeo.com/api/indices?api_key=${numbeoKey}&query=${city}`
        )

        // numbeo api for item prices of each city
        const itemPrices = axios.get(
          `https://www.numbeo.com/api/city_prices?api_key=${numbeoKey}&query=${city}`
        )
        // ziprecruiter api for jobs
        // TODO: should probably cache cost of living and item prices if they call different page with same parameters
        const zipRecruiterJobs = axios.get(
          `https://api.ziprecruiter.com/jobs/v1?search=${search}&location=${city}&radius_miles=${radius}&days_ago=${daysAgo}&jobs_per_page=25&page=${page}&api_key=${zipKey}`
        )

        // wait for promise reponses into index, prices, and jobs
        const [index, prices, jobs] = await Promise.all([
          costOfLivingIndex,
          itemPrices,
          zipRecruiterJobs,
        ])

        // normalize data into fields
        return {
          cpi_and_rent_index: index.data.cpi_and_rent_index,
          prices: prices.data.prices,
          jobs: jobs.data.jobs,
          total_jobs: jobs.data.total_jobs,
          num_paginable_jobs: jobs.data.num_paginable_jobs,
        }
      } catch (error) {
        console.log(error)
      }
    },
    getMe: async (parent, args, { decoded }) => {
      //get decoded id from authmiddleware context
      if (decoded.id) {
        const user = await User.findOne({ _id: decoded.id }).select(
          '-__v -password'
        )
        return user
      }
    },
  },
  Mutation: {
    register: async (parent, { email, password }) => {
      try {
        const user = await User.create({ email, password })
        return user
      } catch (error) {
        console.log(error)
      }
    },
    login: async (parent, { email, password }, { req, res }) => {
      const user = await User.findOne({ email }).select('+password') //grab password

      if (!user) throw new Error('user does not exist')

      const validUser = await user.matchPassword(password)

      if (!validUser) throw new Error('invalid password')

      //login success
      sendRefreshToken(res, createRefreshToken(user))

      return {
        accessToken: createAccessToken(user),
      }
    },
  },
}

module.exports = { resolvers }
