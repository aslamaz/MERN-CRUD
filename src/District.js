import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Form, InputGroup, Table } from 'react-bootstrap'



const District = () => {
    const [district, setDistrict] = useState('');
    const [showdistrict, setShowDistrict] = useState([]);
    const [editDistrict, setEditDistrict] = useState('');

    const InsertData = () => {
        const data = {
            name: district
        }

        if (editDistrict === "") {
            axios.post('http://localhost:5000/districts/', data).then((responce) => {
                console.log(responce);
                setDistrict("")
                fetchData();

            })
            
        }
        else {
            axios.put(`http://localhost:5000/districts/${editDistrict}`,data).then((responce) => {
                console.log(responce);
                fetchData();
                setDistrict("")
                setEditDistrict("")
            })
         }


    }
    const fetchData = () => {
        axios.get('http://localhost:5000/districts').then((responce) => {
            console.log(responce.data);
            const data = responce.data;
            setShowDistrict(data);
        })

    }
    const deleteData = (id) => {
        axios.delete(`http://localhost:5000/districts/${id}`).then((response) => {
            console.log(response);
            fetchData()

        })
    }
    const updateData = (id) => {
        axios.put(`http://localhost:5000/districts/${id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setDistrict(data.name)
            setEditDistrict(data._id)
        })
    }

    useEffect(() => {
        fetchData()

    }, [])

    return (
        <div style={{marginTop: "60px",}}>
            <div style={{ padding: "10px", display: "flex", alignItems: "center", justifyContent: "center", }}>
                <InputGroup style={{ width: "60%" }} onChange={(event) => setDistrict(event.target.value)}>
                    <Form.Control
                        placeholder="district name"
                        aria-label="district name"
                        aria-describedby="basic-addon2"
                        value={district}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={InsertData} >
                        Submit
                    </Button>
                </InputGroup>
            </div>


            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                <Table striped bordered hover size="sm" style={{ width: "60%" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Action</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>

                        {showdistrict.map((districts, key) => (

                            <tr>
                                <td>{key + 1}</td>
                                <td>{districts.name}</td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteData(districts._id)}>delete</Button>
                                </td>
                                <td> <Button variant="success" onClick={() => updateData(districts._id)}>Update</Button></td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            </div>
        </div>

    )
}

export default District