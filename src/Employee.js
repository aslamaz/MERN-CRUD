import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "./Employee.css"
import axios from 'axios';


const Employee = () => {
    const [employee, setEmployee] = useState('');
   
    const [designation, setDesignation] = useState('');
    const [company, setCompany] = useState('');
    const [Place, setPlace] = useState('');
    const [mobile, setMobile] = useState('');
    const [showDistrict, setShowDistrict] = useState([]);
    const [showPlace, setShowPlace] = useState([]);

    const InsertData = () => {
        const data = {
            employeeName: employee,
            designation: designation,
            company: company,
            place: Place,
            mobile: mobile
        }

        axios.post('http://localhost:5000/insertEmployee', data).then((response) => {
            console.log(response);
            


        })
    }
   
    const fetchDistrict = () => {
        axios.get('http://localhost:5000/districts').then((responce) => {
            console.log(responce.data);
            const data = responce.data;
            setShowDistrict(data);
        })

    }

    const fetchPlace = (id) => {
        axios.get(`http://localhost:5000/placeWithdistrict/${id}`).then((response) => {
            console.log(response.data);
            setShowPlace(response.data)
        })
    }
    

    useEffect(() => {
        fetchDistrict()

    }, [])



    return (

        <div className='mainDiv1'>

            <div className='container1'>

                <h1>Employee Details</h1>
                <hr></hr>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>EmployeeName</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" onChange={(event) => setEmployee(event.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>designation</Form.Label>
                        <Form.Control type="text" placeholder="Enter designation" onChange={(event) => setDesignation(event.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>company</Form.Label>
                        <Form.Control type="text" placeholder="Enter companyname" onChange={(event) => setCompany(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>District</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(event) => fetchPlace(event.target.value)}>
                            <option>Select District Here</option>
                            {showDistrict.map((districts, key) => (
                                <option value={districts._id}>{districts.name}</option>

                            ))}


                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Place</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(event) => setPlace(event.target.value)}>
                            <option>Select place Here</option>
                            {showPlace.map((places, key) => (
                                <option key={key} value={places._id}>{places.Place}</option>

                            ))}


                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>mobile</Form.Label>
                        <Form.Control type="text" placeholder="Enter mobilenumber" onChange={(event) => setMobile(event.target.value)} />
                    </Form.Group>
                </Form>
               
                <Button variant="primary" onClick={InsertData}>Submit</Button>
    
                
            </div>
        </div>
    )
}

export default Employee