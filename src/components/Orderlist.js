import React, { Component } from "react";
import AdminHeader from './headers/Adminheader';
import { Route } from "react-router-dom";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";
import Axios from "axios";


export default class Orderlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderlists: [],
            config: {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            },
            selectedOrderlist: {}
        }
    }

    componentDidMount() {
        Axios.get(
            "http://localhost:3012/bookorder/list",
            this.state.config
        ).then((response) => {
            this.setState({
                orderlists: response.data
            });
            console.log(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    deleteHandler = (orderid) => {
        const orderlistfilter = this.state.orderlists.filter((orderlist) => {
            return orderlist._id !== orderid
        })
        this.setState({
            orderlists: orderlistfilter
        })
        Axios.delete(
            `http://localhost:3012/bookorder/list/${orderid}`,
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
                <Route component={AdminHeader} />
                <Container>
                    <div>
                        <h1>Order Lists</h1>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Categories</th>
                                <th>Buyer</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.orderlists.map((orderlist) => {
                                    return (
                                        <tr key={orderlist._id}>
                                            <td>{orderlist.title}</td>
                                            <td>{orderlist.price}</td>
                                            <td>{orderlist.categories}</td>
                                            <td>{orderlist.buyer}</td>
                                            <td>
                                                <Button onClick={() => this.deleteHandler(orderlist._id)}>Delete</Button>
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