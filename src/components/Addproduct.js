import React, { Component } from "react";

import Adminheader from './headers/Adminheader';
import { Route } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { Container, Form, Table, Button, Modal } from "react-bootstrap";
import Axios from "axios";
import './userdashboard.css';

export default class Addproduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            price: "",
            categories: "",
            image: null,
            config: {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            }
        }
    }

    titleHandler = (e) => {
        this.setState({ title: e.target.value })
    }
    descriptionHandler = (e) => {
        this.setState({ description: e.target.value })
    }
    priceHandler = (e) => {
        this.setState({ price: e.target.value })
    }
    categoryHandler = (e) => {
        this.setState({ categories: e.target.value })
    }

    handelFileSelect = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }


    submitHandler = (e) => {
        // debugger;
        let uploaddata = new FormData();
        uploaddata.append('imageFile', this.state.file)
        Axios.post(
            "http://localhost:3012/upload",
            uploaddata,
            this.state.config
        ).then((response) => {
            e.preventDefault();
        
            console.log(response.data.filename)

            var addProduct = {
                title: this.state.title,
                description: this.state.description,
                price: this.state.price,
                categories: this.state.categories,
                image: response.data.filename
            }
            console.log(addProduct);
            Axios.post('http://localhost:3012/book', addProduct, this.state.config)
                .then((response) => {
                    console.log(response.data);
                    // location.href = "/addproduct"
                }).catch((err) => {
                    console.log(err)
                })
        }).catch((err) => {
            console.log(err)
        })

    }

    render() {
        return (
            <React.Fragment>
                <Route component={Adminheader} />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="8">
                            <Form onSubmit={this.submitHandler} className="center">
                                <p className="h5 text-center mb-4">Add Product</p>
                                <MDBInput label="Book Title" type="text" value={this.state.title} onChange={this.titleHandler} required />
                                <MDBInput label="Description" type="text" value={this.state.description} onChange={this.descriptionHandler} required />
                                <MDBInput label="Price" type="text" value={this.state.price} onChange={this.priceHandler} required />
                                <p>Choose a Category :</p>
                                <input type="radio" name="comic" value="comic" checked={this.state.categories === 'comic'} onChange={this.categoryHandler} /> comic<br></br>
                                <input type="radio" name="thriller" value="thriller" checked={this.state.categories === 'thriller'} onChange={this.categoryHandler} /> thriller<br></br>
                                <input type="radio" name="novel" value="novel" checked={this.state.categories === 'novel'} onChange={this.categoryHandler} /> novel<br></br>
                                <input type="radio" name="romantic" value="romantic" checked={this.state.categories === 'romantic'} onChange={this.categoryHandler} />romantic<br></br>
                                <input type="file" name="image" onChange={this.handelFileSelect} /><br></br>
                                <Button type="submit" color="primary">Post</Button>
                            </Form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        )
    }
}