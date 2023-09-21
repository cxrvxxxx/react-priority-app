import React from "react";
import "../styles/PriorityNumber.css";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const PriorityNumber = ({ number, duration, initialDuration, isHighPriority }) => {
    const percentDuration = (duration / initialDuration) * 100;
    const elementClass = (isHighPriority) ? "entity high-priority" : "entity";
    const barColor = (percentDuration < 30) ? 'error' : 'success';

    return (
        <Box >
            <div className={elementClass}>
                <h1>{number}</h1>
                <LinearProgress
                    className="progress"
                    variant="determinate"
                    color={barColor}
                    style={{
                        height: "10px",
                        borderRadius: "0px 0px 5px 5px",
                    }}
                    value={percentDuration} />
            </div>
        </Box>

    );
}

export default PriorityNumber;