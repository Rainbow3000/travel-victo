import React from 'react'
import './home.scss'
import Feature from '../../components/feature/Feature'
import AboutUs from '../../components/about-us/AboutUs'
import Destinations from '../../components/destinations/Destinations'
import Hotels from '../../components/hotels/Hotels'
import TravelList from '../../components/travelList/TravelList'
import News from '../../components/news/News'

const Home = () => {
    return <>
         <Feature/> 
         <AboutUs/>
         <Destinations/>
         <Hotels/>
         <TravelList/>
         <News/>
    </> 

        
}

export default Home