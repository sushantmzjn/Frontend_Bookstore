import React from "react";

import ReactDom from "react-dom";



import {

    Navbar, Nav, Form, FormControl, Button

} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css"
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from "react-router-dom";



export default class Adminheader extends React.Component {
    constructor(props) {
        super(props);
    }

    logoutHandle = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        location.href = '/login'
    }

    render() {
        return (
            <div>
                <>
                    <Navbar bg="dark" variant="dark">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/productlist">Product List</Nav.Link>
                            <Nav.Link as={Link} to="/addproduct">Add product</Nav.Link>
                            <Nav.Link as={Link} to="orderlist">Order List</Nav.Link>
                            <Nav.Link as={Link} to="/customerlist">Customer List</Nav.Link>
                            <Nav.Link onClick={this.logoutHandle}>Logout</Nav.Link>
                        </Nav>
                    </Navbar>
                </>
            </div>
        )
    }


}
