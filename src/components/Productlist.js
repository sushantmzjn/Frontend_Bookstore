import React, { Component } from "react";
import AdminHeader from './headers/Adminheader';
import { Route } from "react-router-dom";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";
import Axios from "axios";


export default class Productlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            title: "",
            description: "",
            price: "",
            categories: "",
            config: { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } },

            show: false,
            selectedList: {}
        }
    }

    deleteProduct = (productid) => {
        const productFilter = this.state.lists.filter((list) => {
            return list._id !== productid
        })
        this.setState({
            lists: productFilter
        })

        Axios.delete(
            `http://localhost:3012/book/${productid}`,
            this.state.config
        ).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        Axios.get(
            "http://localhost:3012/book",
            this.state.config
        ).then((response) => {
            debugger;
            this.setState({
                lists: response.data
            });
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    handleClose = () => {
        this.setState({
            show: false
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

    updateHandler = (productUpdate) => {
        console.log(this.state.lists);
        Axios.put(
            `http://localhost:3012/book/${productUpdate}`,
            this.state.selectedList,
            this.state.config
        )
            .then((response) => {
                location.href = "/productlist"
            })
            .catch((err) => {
                console.log(err)
            })
    }

    titleUpdateHandler = (e) => {
        this.setState({ selectedList: { ...this.state.selectedList, ["title"]: e.target.value } })
    }
    descriptionUpdateHandler = (e) => {
        this.setState({ selectedList: { ...this.state.selectedList, ["description"]: e.target.value } })
    }

    priceUpdateHandler = (e) => {
        this.setState({ selectedList: { ...this.state.selectedList, ["price"]: e.target.value } })
    }

    categoriesUpdateHandler = (e) => {
        this.setState({ selectedList: { ...this.state.selectedList, ["categories"]: e.target.value } })
    }

    render() {
        return (
            <React.Fragment>
                <Route component={AdminHeader} />
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
                                                <Button onClick={() => this.deleteProduct(list._id)} >Delete</Button>
                                                <Button onClick={() => this.handleOpen(list._id)} >Edit</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Control type="text" value={this.state.selectedList.title} onChange={this.titleUpdateHandler} /><br></br>
                                <Form.Control type="text" value={this.state.selectedList.description} onChange={this.descriptionUpdateHandler} /><br></br>
                                <Form.Control type="text" value={this.state.selectedList.price} onChange={this.priceUpdateHandler} /><br></br>
                                <Form.Control type="text" value={this.state.selectedList.categories} onChange={this.categoriesUpdateHandler} />
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>Close </Button>
                            <Button variant="success" onClick={() => this.updateHandler(this.state.selectedList._id)}>Update</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>

            </React.Fragment>
        );
    }

}


