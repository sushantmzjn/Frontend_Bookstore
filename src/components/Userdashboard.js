import React, { Component } from "react";
import UserHeader from './headers/Userheader';
import { Route } from "react-router-dom";
import Image1 from "./images/book.jpg";
import Image2 from "./images/book2.jpg"
import { Carousel, Container, Table, Button, Modal, Form } from "react-bootstrap";
import './userdashboard.css';
import Axios from "axios";

export default class Userdashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            title: "",
            description: "",
            price: "",
            categories: "",
            config: { headers: { "Authorization": `Bearer ${localStorage.getItem("usertoken")}` } },
            show: false,
            selectedList: {}
        }
    }

    componentDidMount() {
        Axios.get(
            "http://localhost:3012/book",
            this.state.config
        ).then((response) => {
            this.setState({
                lists: response.data
            });
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    handleOpen = (productid) => {
        this.setState({
            show: true,
            selectedList: this.state.lists.find((list) => {
                return list._id === productid
            })
        })
    }
    handleClose = () => {
        this.setState({
            show: false
        })
    }

    orderHandler = (productorder) => {
        console.log(this.state.lists);
        Axios.post(
            `http://localhost:3012/bookorder`,
            this.state.selectedList,
            this.state.config
        )
            .then((response) => {
                location.href = "/userdashboard"
            })
            .catch((err) => {
                console.log(err)
            })
    }

    cartHandler = (productcart) => {
        console.log(this.state.lists);
        Axios.post(
            `http://localhost:3012/cart`,
            this.state.selectedList,
            this.state.config
        )
            .then((response) => {
                location.href = "/userdashboard"
            })
            .catch((err) => {
                console.log(err)
            })
    }



    render() {
        return (
            <React.Fragment>
                <Route component={UserHeader} />
                <Carousel className="maindiv"></Carousel>
                <Container>
                    <h1>Product List</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.lists.map((list) => {
                                    return (
                                        <tr key={list._id}>
                                            <td>{list.title}</td>
                                            <td>{list.description}</td>
                                            <td>{list.price}</td>
                                            <td>{list.categories}</td>
                                            <td>
                                                <Button onClick={() => this.handleOpen(list._id)}>Order</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Place an Order</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Control type="text" defaultValue={this.state.selectedList.title} /><br></br>
                                <Form.Control type="text" defaultValue={this.state.selectedList.description} /><br></br>
                                <Form.Control type="text" defaultValue={this.state.selectedList.price} /><br></br>
                                <Form.Control type="text" defaultValue={this.state.selectedList.categories} />
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                            <Button variant="success" onClick={() => this.orderHandler(this.state.selectedList._id)}>Order</Button>
                            <Button variant="success" onClick={() => this.cartHandler(this.state.selectedList._id)}>Add to Cart</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </React.Fragment>
        );
    }

}


