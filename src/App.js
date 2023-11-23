import React from 'react'
import { Route, Routes } from 'react-router-dom'
import District from './District'
import Place from './Place'
import 'bootstrap/dist/css/bootstrap.min.css';
import Employee from './Employee';
import EmployeeTable from './EmployeeTable';
import Allpages from './Allpages';




const App = () => {
  return (
    <div>
      <Allpages />
      <Routes>
        <Route path='District' element={<District />} />
        <Route path='Place' element={<Place />} />
        <Route path='Employee' element={<Employee />} />
        <Route path='EmployeeTable' element={<EmployeeTable />} />
      </Routes>
    </div>
  )
}

export default App