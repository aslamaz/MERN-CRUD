import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';
import './Place.css'

const Place = () => {
    const [place, setPlace] = useState();
    const [showPlace, setShowPlace] = useState([]);
    const [district, setDistrict] = useState();
    const [showDistrict, setShowDistrict] = useState([]);
    const [editPlace, setEditPlace] = useState('');


    const insertPlace = () => {
        const data = {
            Place: place,
            district_id: district
        }
        if (editPlace === "") {
            axios.post("http://localhost:5000/Postplaces/", data).then((response) => {
                console.log(response);
                fetchData()
                setPlace("")

            })
        }
        else {
            axios.put(`http://localhost:5000/updatePlace/${editPlace}`, data).then((response) => {
                console.log(response);
                fetchData()
                setPlace("")
            })
        }

    }


    const fetchData = () => {
        axios.get("http://localhost:5000/places").then((response) => {
            console.log(response.data)
            const data = (response.data)
            setShowPlace(data)
        })

    }

    const fetchDistrict = () => {

        axios.get('http://localhost:5000/districts').then((responce) => {
            console.log(responce.data);
            const data = responce.data;
            setShowDistrict(data);
            fetchData();
        });
    }
    const deleteData = (id) => {
        axios.delete(`http://localhost:5000/delPlaces/${id}`).then((response) => {
            console.log(response);
            fetchData()

        })
    }
    const updatePlace = (id) => {
        axios.put(`http://localhost:5000/updatePlace/${id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setPlace(data.Place);
            setDistrict(data.district_id);
            setEditPlace(data._id);
            fetchData();


        })
    }

    useEffect(() => {
        fetchData();
        fetchDistrict();

    },[])

    return (
        <div className='maindiv2'>
            <div className='container2'>
                <Form>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>District</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(event) => setDistrict(event.target.value)}>
                            <option>Select District Here</option>
                            {showDistrict.map((districts, key) => (
                                districts._id === district
                                    ? <option value={districts._id} selected>{districts.name}</option>
                                    : <option value={districts._id}>{districts.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>PlaceName</Form.Label>
                        <Form.Control type="text" placeholder="Enter place" value={place} onChange={(event) => setPlace(event.target.value)} />
                    </Form.Group>


                </Form>
                <Button variant="primary" onClick={insertPlace}>Submit</Button>
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                <Table striped bordered hover size="sm" style={{ width: "60%" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>places</th>
                            <th>District</th>
                            <th>Action</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>

                        {showPlace.map((places, key) => (

                            <tr>
                                <td>{key + 1}</td>
                                <td>{places.Place}</td>
                                <td>{places.district_id.name}</td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteData(places._id)}>delete</Button>
                                </td>
                                <td><td> <Button variant="success" onClick={() => updatePlace(places._id)}>Update</Button></td></td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Place