import React, { useState } from 'react';
import './quests.css';

const Quests = () => {
  const [quests, setQuests] = useState([]);

  return (
    <div className="quests-container">
      <h2>Quests</h2>
      <ul>
        <li>quest 1</li>
        <li>quest 2</li>
        <li>quest 3</li>
      </ul>
    </div>
  )
};

export default Quests;