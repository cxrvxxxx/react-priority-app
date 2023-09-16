import React from "react";
import "../styles/PriorityNumber.css";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const PriorityNumber = ({ number, duration, initialDuration, isHighPriority }) => {
    const elementClass = (isHighPriority) ? "entity high-priority" : "entity";

    return (
        <Box >
            <div className={elementClass}>
                <h1>{number}</h1>
                <LinearProgress
                    className="progress"
                    variant="determinate"
                    style={{
                        height: "10px",
                        borderRadius: "0px 0px 5px 5px"
                    }}
                    value={(duration / initialDuration) * 100} />
            </div>
        </Box>

    );
}

export default PriorityNumber;