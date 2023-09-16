import React, { useEffect, useRef, useState } from 'react';
import './styles/App.css';
import Admit from './components/Admit';
import PriorityNumber from './components/PriorityNumber';

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

  const handleGenerate = () => {
    priorityNumber.current = priorityNumber.current + 1;
  }

  const handleAdmit = (entity) => {
    /* Finds the queue with the least total duration */
    let shortestQueue = 0;
    for (let i = 1; i < queues.length; i++) {
      if (getTotalDuration(queues[i]) < getTotalDuration(queues[shortestQueue]))
        shortestQueue = i;
    }

    /* Update queues state */
    const updatedQueues = [...queues];
    if (entity.isHighPriority) {
      updatedQueues[shortestQueue].splice(0, 0, entity);
    } else {
      updatedQueues[shortestQueue].push(entity);
    }
    setQueues(updatedQueues);
  }

  const processQueue = () => {
    const updatedQueues = [...queues];

    /* Decrements the first item in each queue */
    for (let x = 0; x < updatedQueues.length; x++) {
      if (updatedQueues[x].length === 0) continue;
      else if (updatedQueues[x][0].duration <= 0.1) {
        /* Removes the first item if duration runs out */
        updatedQueues[x].splice(0, 1);
      } else {
        updatedQueues[x][0] = {
          ...updatedQueues[x][0],
          "duration": updatedQueues[x][0].duration - 0.1
        }
      }

    }

    setQueues(updatedQueues);
  }

  useEffect(() => {
    /* Handles decrementing of duration */
    const intervalId = setInterval(() => {
      processQueue();
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <div className="col1">
        <Admit
          queues={queues}
          callback={handleAdmit} />
      </div>
      <div className="col2" >
        {queues.map((queue, queueIndex) => (
          <div className="queue-block">
            <h4>Queue #{queueIndex + 1} ({Math.round(getTotalDuration(queue))}) s.</h4>
            {queue.map((entity) => (
              <PriorityNumber
                number={entity.priorityNumber}
                duration={entity.duration}
                initialDuration={entity.initialDuration}
                isHighPriority={entity.isHighPriority} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
