import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../assets/img/logo.png";
import { UilUsersAlt, UilBedDouble, UilFileInfoAlt, UilSetting } from '@iconscout/react-unicons'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Link className="brand" to="/"><img src={Logo} alt="Logo" /></Link>
            </div>
            <nav className="sidebar-content">
                        <Link className="menu-link" to="/place">
                            <UilBedDouble className="icon" size="20" color="#fff" /><span>Места</span>
                        </Link>
                        <Link className="menu-link" to={"/type"}>
                            <UilUsersAlt className="icon" size="20" color="#fff" /><span>Типы</span>
                        </Link>
                        <Link className="menu-link" to={"/client"}>
                            <UilUsersAlt className="icon" size="20" color="#fff" /><span>Клиенты</span>
                        </Link>
                        <Link className="menu-link" to={"/"}>
                            <UilFileInfoAlt className="icon" size="20" color="#fff" /><span>Orders</span>
                        </Link>
                        <Link className="menu-link" to={"/"}>
                            <UilSetting className="icon" size="20" color="#fff" /><span>Settings</span>
                        </Link>
                        <Link className="menu-link" to={"/"}>
                            <UilUsersAlt className="icon" size="20" color="#fff" /><span>Users</span>
                        </Link>
            </nav>

        </div>
    );
};

export default Sidebar;