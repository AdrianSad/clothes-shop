import React, {Component} from 'react';
import AdminSidebar from "../components/AdminPage/AdminSidebar";
import {Route} from "react-router-dom";
import ManageUsers from "../components/AdminPage/ManageUsers";
import ManageProducts from "../components/AdminPage/ManageProducts";

class AdminPage extends Component {
    render() {
        return (
            <div className="row mt-navbar">
                <div className="col-sm-4 col-md-2">
                    <AdminSidebar/>
                </div>
                <div className="col-sm-8 col-md-10">
                    <Route path={`${this.props.match.path}/users`} component={ManageUsers}/>
                    <Route path={`${this.props.match.path}/products`} component={ManageProducts}/>
                </div>
            </div>
        );
    }
}

export default AdminPage;