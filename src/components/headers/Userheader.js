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



class Body1 extends React.Component {
    constructor(props) {
        super(props);
    }

    logoutHandle = (e) =>{
        e.preventDefault();
        localStorage.removeItem('usertoken');
        location.href='/login'
    }

    render() {
        return (
            <div>
                <>
                    <Navbar bg="dark" variant="dark">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/userdashboard">Home</Nav.Link>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            <Nav.Link as={Link} to="/userorderlist">My Orders</Nav.Link>
                            <Nav.Link as={Link} to="/usercart">My Cart</Nav.Link>
                            <Nav.Link onClick={this.logoutHandle}>Logout</Nav.Link>
                        </Nav>
                    </Navbar>
                </>
            </div>
        )
    }


}

export default Body1;