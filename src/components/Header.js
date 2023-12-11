import React from 'react';
import {Link} from "react-router-dom";
import {toggleSidebar} from "../store/sidebarSlice";
import {useDispatch} from "react-redux";

const Header = () => {
    const dispatch = useDispatch();
    return (
        <header className="header">
            <span onClick={() => dispatch(toggleSidebar())} className="sidebar-toggle">
                <i className="hamburger align-self-center"></i>
            </span>
            <nav>
                <Link to="/">Home</Link>
                <Link to="place">Place</Link>
            </nav>
        </header>
    );
};

export default Header;