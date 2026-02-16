import React from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/Menu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import Footer from '../../components/Footer/Footer'

const Home = () => {

  const [category, setCategory] = React.useState('All');

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
      <Footer />
    </div>
  )
}

export default Home
