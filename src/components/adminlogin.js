import React from "react";
import { Route } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import Header from "./headers/Header";
import './userdashboard.css';


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: ''
        }
    }

    usernameHandler = (e) => {
        this.setState({ name: e.target.value });
    }
    passwordHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    loginHandler = (e) => {
        e.preventDefault();
        var adminData = {
            name: this.state.name,
            password: this.state.password,
            isOneline: true
        }
        console.log(adminData);
        axios.post('http://localhost:3012/admin/loginadmin', adminData)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token)
                location.href = "/productlist"
            }).catch((err) => { console.log(err) })

    }

    render() {
        return (
            <React.Fragment>
                <Route component={Header} />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="8">
                            <form onSubmit={this.loginHandler} className="center">
                                <p className="h5 text-center mb-4">Sign in</p>
                                <div className="grey-text">
                                    <MDBInput label="Type your username" type="text" onChange={this.usernameHandler} required />
                                    <MDBInput label="Type your password" type="password" onChange={this.passwordHandler} required />
                                </div>
                                <div className="text-center">
                                    <Button type="submit" color="primary" onClick={this.login}>Login</Button>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        )
    }

}
