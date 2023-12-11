import React from 'react';
import {UilPlus} from "@iconscout/react-unicons";

const CreateButton = ({onClickButton}) => {
    return (
        <button
            onClick={onClickButton}
            className="create-button">
            <UilPlus size="30" color="#fff" />
        </button>
    );
};

export default CreateButton;