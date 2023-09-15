import React from "react";
import Button from "@mui/material/Button";

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const Admit = ({ callback }) => {
    const handleAdmit = () => {
        callback({
            "duration": getRandomInt(3, 10),
            "isHighPriority": (getRandomInt(1, 100) >= 75) ? true : false
        });
    }

    return (
        <div className="admitting" >
            <Button
                variant="contained"
                color="success"
                size="large"
                onClick={handleAdmit}>Admit</Button>
        </div>
    );
}

export default Admit;