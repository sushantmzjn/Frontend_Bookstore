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

    render () {
        return (
            <div>
                <>
                    <Navbar bg="dark" variant="dark">
                        <Nav className="mr-auto">
                  
                            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/adminlogin">Admin login</Nav.Link>
                        </Nav>
                    </Navbar>
                </>
            </div>
        )
    }

 
}

export default Body1;