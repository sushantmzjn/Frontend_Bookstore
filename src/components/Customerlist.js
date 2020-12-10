import React, { Component } from "react";
import AdminHeader from './headers/Adminheader';
import { Route } from "react-router-dom";
import Axios from "axios";
import { Table, Button, Container } from "react-bootstrap";


export default class Admindashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            config: {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            },
            selectedUser: {}
        }
    }

    deleteHandle = (userid) =>{
        const userfilter = this.state.users.filter((user) =>{
            return user._id !== userid
        })
        this.setState({
            users: userfilter
        })

        Axios.delete(
            `http://localhost:3012/admin/userlist/${userid}`,
            this.state.config
        ).then((response) =>{
            console.log(response)
        }).catch((err)=>{
            console.log(err)
        })
    }

    componentDidMount() {
        Axios.get(
            "http://localhost:3012/admin/userlist",
            this.state.config
        ).then((response) => {
            this.setState({
                users: response.data
            });
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <React.Fragment>
                <Route component={AdminHeader} />
                <Container>
                    <div>
                        <h1>User List</h1>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Fullname</th>
                                <th>Address</th>
                                <th>Username</th>
                                <th>Gender</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                this.state.users.map((user) => {
                                    return (
                                        <tr key={user._id}>
                                            <td>{user.fullName}</td>
                                            <td>{user.address}</td>
                                            <td>{user.username}</td>
                                            <td>{user.gender}</td>
                                            <td>
                                                <Button onClick={() => this.deleteHandle(user._id)} >Delete</Button>
                                            </td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Container>


            </React.Fragment>
        );
    }

}


