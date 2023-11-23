import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

const EmployeeTable = () => {
    const [showEmployee,setShowEmployee]=useState([]);
   
    const fetchEmployee = ()=>{
        axios.get("http://localhost:5000/employees").then((response) => {
            console.log(response.data)
            const data = (response.data)
            setShowEmployee(data)
        })
    }

    const deleteData = (id) => {
        axios.delete(`http://localhost:5000/delEmployee/${id}`).then((response) => {
            console.log(response);
            fetchEmployee();

        })
    }
    useEffect(() => {
        fetchEmployee()

    }, [])



   
  return (
    <div style={{display: "flex", justifyContent: "center",marginTop:"80px" }}>
        <Table striped bordered hover size="sm" style={{ width: "60%" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>employeeName</th>
                            <th>designation</th>
                            <th>company</th>
                            <th>mobile</th>
                            <th>place</th>
                            <th>District</th>
                            <th>Action</th>
                           
                            
                        </tr>
                    </thead>
                    <tbody>

                        {showEmployee.map((employees, key) => (

                            <tr>
                                <td>{key + 1}</td>
                                <td>{employees.employeeName}</td>
                                <td>{employees.designation}</td>
                                <td>{employees.company}</td>
                                <td>{employees.mobile}</td>
                                <td>{employees.place.Place}</td>
                                <td>{employees.place.district_id.name}</td>
                                <td>
                                    <Button variant="danger" onClick={()=>deleteData(employees._id)} >delete</Button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
    </div>
  )
}

export default EmployeeTable