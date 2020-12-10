import React, { Component } from "react";

import Userheader from './headers/Userheader';
import { Route } from "react-router-dom";
import { Container, Form, Table, Button, Modal } from "react-bootstrap";
import Axios from "axios";

export default class Cartlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carts: [],
            title: "",
            price: "",
            categories: "",
            config: {
                headers: { "Authorization": `Bearer ${localStorage.getItem("usertoken")}` }
            },
            selectedCart: {}
        }
    }

    componentDidMount() {
        Axios.get(
            "http://localhost:3012/cart",
            this.state.config
        ).then((response) => {
            this.setState({
                carts: response.data
            });
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    deleteHandler = (cartid) => {
        const cartfilter = this.state.carts.filter((cart) => {
            return cart._id !== cartid
        })
        this.setState({
            carts: cartfilter
        })

        Axios.delete(
            `http://localhost:3012/cart/i/${cartid}`,
            this.state.config
        ).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <React.Fragment>
                <Route component={Userheader} />
                <Container>
                    <h1>My Cart</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.carts.map((cart) => {
                                    return (
                                        <tr key={cart._id}>
                                            <td>{cart.title}</td>
                                            <td>{cart.price}</td>
                                            <td>{cart.categories}</td>
                                            <td>
                                                <Button onClick={() => this.deleteHandler(cart._id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Container>
            </React.Fragment>
        )
    }
}