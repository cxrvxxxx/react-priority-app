import React, { useEffect, useRef, useState } from 'react';
import './styles/App.css';
import Admit from './components/Admit';

const getTotalDuration = (queue) => {
  if (queue.length === 0) return 0;

  let totalDuration = 0;

  for (let i = 0; i < queue.length; i++) {
    totalDuration = totalDuration + queue[i].duration;
  }

  return totalDuration;
}

const App = () => {
  const priorityNumber = useRef(0);

  const [queues, setQueues] = useState([[], [], [], []]);

  const handleAdmit = (priortyNumberData) => {
    /* Finds the queue with the least total duration */
    let shortestQueue = 0;
    for (let i = 1; i < queues.length; i++) {
      if (getTotalDuration(queues[i]) < getTotalDuration(queues[shortestQueue]))
        shortestQueue = i;
    }

    /* Append new priorty number from object generated by component */
    priorityNumber.current = priorityNumber.current + 1
    const newPriorityNumber = {
      "priorityNumber": priorityNumber.current,
      ...priortyNumberData
    }

    /* Update state */
    const updatedQueues = [...queues];
    updatedQueues[shortestQueue].push(newPriorityNumber);
    setQueues(updatedQueues);
  }

  const processQueue = () => {
    const updatedQueues = [...queues];

    for (let x = 0; x < updatedQueues.length; x++) {
      if (updatedQueues[x].length === 0) continue;
      else if (updatedQueues[x][0].duration === 0) {
        updatedQueues[x].splice(0, 1);
      } else {
        updatedQueues[x][0] = {
          ...updatedQueues[x][0],
          "duration": updatedQueues[x][0].duration - 1
        }
      }

    }

    setQueues(updatedQueues);
  }

  useEffect(() => {
    /* Handles decrementing of duration */
    const intervalId = setInterval(() => {
      processQueue();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <div className="col1">
        <Admit callback={handleAdmit} />
      </div>
      <div className="col2" >
        {queues.map((queue) => (
          <div className="queue-block">
            {queue.map((entity) => (
              <div className="entity">
                <h2>{entity.priorityNumber}<br /><h4>{entity.duration}</h4></h2>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
