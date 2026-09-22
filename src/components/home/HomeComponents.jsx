import React from 'react'
import Layout from '../Layout/Layout'
import Banner from './banner/Banner'
import FeaturedProduct from './featured-product/FeaturedProduct'
import Overview from './overview/Overview'
import WhyChoose from './why-choose/WhyChoose'
import TrustedCountries from './trusted-countries/TrustedCountries'

const HomeComponents = () => {
  return (
    <Layout>
      <Banner />
      <FeaturedProduct />
      <Overview />
      <WhyChoose />
      <TrustedCountries />
    </Layout>
  )
}

export default HomeComponents