import React from 'react'
import Menu from './assets/menulist.jpg'
import { useNavigate } from 'react-router-dom'


function Home() {

 const navigate = useNavigate()

 const handleClick = () => {
  navigate("/book")
 }

   
  return (
    <>

    <div className='d-flex'>
        <div className='col-4 p-2'>
            <img src={Menu} alt="" className='img-fluid' />
        </div>
        
  
        <div className='col-8 card ' style={{ width: "38rem" }}>
            <h2>WELCOME TO RUVEE NATURE SPA</h2>
        <div className="card-body">
            <p className="card-text">
            Come and relax at Ayurvedic Bliss Spa, where we offer treatments to
            help you feel calm and refreshed. Our spa, surrounded by beautiful
            gardens, has been loved by many visitors for its peaceful atmosphere
            and skilled therapists. Whether you need a deep massage or a full-body
            treatment, we’re here to give you a relaxing experience. Enjoy quality
            oils, soothing ginger tea, and a welcoming environment. Book your
            visit today and experience the healing power of Ayurveda.
            </p>
       
        <div>
            <button className='btn btn-success' onClick={handleClick} >Booking Now</button>
        </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Home