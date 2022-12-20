import React from 'react'
import {BsCalendar} from 'react-icons/bs'

const Home = () => {
  return (
    <div className='home'>
      <div className='meals'>
        <div className='meals-header'>
          <h2>Meals eaten</h2>
          <button>Today<BsCalendar/></button>
        </div>
        <ul>
          <li>Egg sandwitch</li>
          <li>Pasta</li>
          <li>Sun chips</li>
          <li>Dinch wet</li>
        </ul>
      </div>

      <div className='buttons'>
        <button>BREAKFAST <span>+</span></button>
        <button>LUNCH <span>+</span></button>
        <button>SNACKS <span>+</span></button>
        <button>DINNER <span>+</span></button>

      </div>
    </div>
  )
}

export default Home