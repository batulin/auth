import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleSidebar} from "../store/sidebarSlice";
import {Outlet} from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AuthLayout = () => {
    const isOpen = useSelector((state) => state.sidebar.isOpen)
    const dispatch = useDispatch();

    return (
        <div id="wrapper" className={isOpen ? "App wrapper" : "App wrapper collapsed"}>
            <Sidebar />
            <div className="content">
                <Header />
                <main>
                    {<Outlet />}
                </main>
                <footer></footer>
            </div>
        </div>
    );
};

export default AuthLayout;