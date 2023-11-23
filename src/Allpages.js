import React from 'react'
import "./Allpages.css"
import {Link} from 'react-router-dom'


const Allpages = () => {
  return (
    
    <div className='divmain'>
    <div className='divContainer'>

       <div className='Container'>
        <Link to={'District'} style={{textDecoration:"none",color: "white"}}>DistrictPage</Link>
        </div>
        <div className='Container'>
        <Link to={'./Place'} style={{textDecoration:"none",color: "white"}}>PlacePage</Link>
        </div>
        <div className='Container'>
        <Link to={'./Employee'} style={{textDecoration:"none",color: "white"}}>EmployeePage</Link>
        </div>
        <div className='Container'>
        <Link to={'./EmployeeTable'} style={{textDecoration:"none",color: "white"}}>EmployeeTablePage</Link>
        </div>

        </div>
        
        <hr/>
    </div>
    
  )
}

export default Allpages