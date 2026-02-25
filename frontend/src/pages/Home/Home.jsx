import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/Menu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  const { category } = useSelector((state) => state.menu);

  return (
    <div>
      <Header />
      <ExploreMenu category={category} />
      <FoodDisplay category={category} />
      <AppDownload />
      <Footer />
    </div>
  )
}

export default Home
