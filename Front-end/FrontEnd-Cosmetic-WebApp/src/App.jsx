// import { useState } from 'react'
import './App.css'
import NavBar from './Component/NavBar'
import Carousel from './Component/Carousel'
import Footer from './Component/Footer'
function App() {


  return (
    <div id='app-body'>
      <NavBar></NavBar>
      <Carousel title="Bán chạy"></Carousel>
      <Carousel title="Bạn đã xem gì"></Carousel>
      <Carousel title="Giành riêng cho bạn"></Carousel>
      <Footer></Footer>
    </div>
  )
}

export default App
