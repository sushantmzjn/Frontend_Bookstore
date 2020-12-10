import React, { Component } from "react";

import Userheader from './headers/Userheader';
import { Route } from "react-router-dom";
import { Container, Form, Table, Button, Modal } from "react-bootstrap";
import Axios from "axios";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: {},
            fullName: "",
            address: "",
            username: "",
            gender: "",
            config: {
                headers: { "Authorization": `Bearer ${localStorage.getItem("usertoken")}` }
            },
            show: false
        }
    }
    handleOpen = (userprofile) => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    updateHandler = () => {
        console.log(this.state.profiles);
        Axios.put(
            `http://localhost:3012/users/updateuser`,
            this.state.profiles,
            this.state.config
        )
            .then((response) => {
                location.href = "/profile"
            })
            .catch((err) => {
                console.log(err)
            })
    }

    nameUpdateHandler = (e) => {
        this.setState({ profiles: { ...this.state.profiles, ["fullName"]: e.target.value } })
    }
    addressUpdateHandler = (e) => {
        this.setState({ profiles: { ...this.state.profiles, ["address"]: e.target.value } })
    }
    usernameUpdateHandler = (e) => {
        this.setState({ profiles: { ...this.state.profiles, ["username"]: e.target.value } })
    }
    genderpdateHandler = (e) => {
        this.setState({ profiles: { ...this.state.profiles, ["gender"]: e.target.value } })
    }


    componentDidMount() {
        Axios.get(
            "http://localhost:3012/users/me",
            this.state.config
        ).then((response) => {
            this.setState({
                profiles: response.data
            });
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <React.Fragment>
                <Route component={Userheader} />
                <Container>
                    <h1>Profile</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Fullname</th>
                                <th>Address</th>
                                <th>Username</th>
                                <th>Gender</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr key={this.state.profiles._id}>
                                <td>{this.state.profiles.fullName}</td>
                                <td>{this.state.profiles.address}</td>
                                <td>{this.state.profiles.username}</td>
                                <td>{this.state.profiles.gender}</td>
                                <td><Button onClick={() => this.handleOpen(this.state.profiles)}>Edit</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Profile Update</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Control type="text" value={this.state.profiles.fullName} onChange={this.nameUpdateHandler} /><br></br>
                                <Form.Control type="text" value={this.state.profiles.address} onChange={this.addressUpdateHandler} /><br></br>
                                <Form.Control type="text" value={this.state.profiles.username} onChange={this.usernameUpdateHandler} /><br></br>
                                <Form.Control type="text" value={this.state.profiles.gender} onChange={this.genderpdateHandler} /><br></br>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>Close </Button>
                            <Button variant="success" onClick={() => this.updateHandler(this.state.profiles._id)}>Update</Button>
                        </Modal.Footer>
                    </Modal>

                </Container>
            </React.Fragment>
        )
    }

}