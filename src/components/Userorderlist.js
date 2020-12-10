import React, { Component } from "react";
import UserHeader from './headers/Userheader';
import { Route } from "react-router-dom";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import Axios from "axios";

export default class Userorderlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lists: [],
            title: "",
            description: "",
            price: "",
            categories: "",
            config: { headers: { "Authorization": `Bearer ${localStorage.getItem("usertoken")}` } },
            show: false,
            selectedOrder: {}
        }
    }

    componentDidMount() {
        Axios.get(
            "http://localhost:3012/bookorder",
            this.state.config
        ).then((response) => {
            this.setState({
                lists: response.data
            });
            console.log(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <React.Fragment>
                <Route component={UserHeader} />
                <Container>
                    <h1>My Order Lists</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                
                                <th>Price</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.lists.map((list) => {
                                    return (
                                        <tr key={list._id}>
                                            <td>{list.title}</td>
                                            
                                            <td>{list.price}</td>
                                            <td>{list.categories}</td>
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