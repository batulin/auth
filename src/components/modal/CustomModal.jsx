import './modal.css';
import {UilTimes} from '@iconscout/react-unicons';
import React from "react";

const CustomModal = ({onClose, size="medium", children}) => {
    // size = "small" | "medium" | "large"
    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") {onClose()}
        }}>
            <div className={`modal ${size}`}>
                <div onClick={() => onClose('closed')} className="modal-header">
                    <UilTimes size="32" color="#777" />
                </div>
                <h3>fhfg</h3>
                <div className="modal-content">
                        {children}
                </div>
            </div>
        </div>
    );
};

export default CustomModal;