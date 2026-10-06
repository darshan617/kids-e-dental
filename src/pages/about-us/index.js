import AboutBanner from '@/components/about/about-banner/AboutBanner'
import BrandPromise from '@/components/about/brand-promise/BrandPromise'
import Leadership from '@/components/about/leadership/Leadership'
import VisionMission from '@/components/about/vision-mission/VisionMission'
import WhatDrives from '@/components/about/what-drives/WhatDrives'
import Layout from '@/components/Layout/Layout'
import React from 'react'

const index = () => {
  return (
    <Layout>
        <AboutBanner />
        <VisionMission />
        <BrandPromise />
        <WhatDrives />
        <Leadership />
    </Layout>
  )
}

export default index