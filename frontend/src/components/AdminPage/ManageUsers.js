import React, {Component} from 'react';
import styled from "styled-components";
import {getAllUsers} from "../../api/admin";
import Loading from "../Loading";
import Error from "../Error";

class ManageUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            loading: true,
            errorMessage: ""
        };
    }

    componentDidMount() {
        getAllUsers().then(response => {
            console.log(response);
            if (response) {
                if (response.data) {

                    this.setState({
                        users: response.data,
                        loading: false,
                        errorMessage: ""
                    });
                }
            }
        })
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false,
                    errorMessage: `${error.response.data.error}`
                })
            });
    }

    render() {
        if (this.state.loading) {
            return <Loading/>
        }
        if (this.state.errorMessage.length > 0) {
            return <Error errorMessage={this.state.errorMessage}/>
        } else return (
            <UsersWrapper>
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
                {this.state.users.map(item =>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                    </tr>
                )}
                </tbody>
            </UsersWrapper>
        );
    }
}

const UsersWrapper = styled.table`
 width: 100%;
 background: var(--mainWhite);
 border-collapse: collapse;

 th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: var(--primaryColorDark);
  color: white;
}
 
 tr:nth-child(even){background-color: #f2f2f2;}
 tr:hover {background-color: #ddd;}
`;

export default ManageUsers;