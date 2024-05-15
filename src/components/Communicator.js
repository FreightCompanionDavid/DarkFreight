import './Communicator.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  fetchRealTimeUpdates,
  sendVoiceCommand,
} from '../store/actions';

const Communicator = () => {
  const dispatch = useDispatch();
  const [voiceCommand, setVoiceCommand] = useState('');
  const realTimeUpdates = useSelector(state => state.realTimeUpdates);

  useEffect(() => {
    // Fetch real-time updates when the component mounts
    dispatch(fetchRealTimeUpdates());
  }, [dispatch]);

  const handleVoiceCommand = (event) => {
    event.preventDefault();
    if (voiceCommand.trim()) {
      dispatch(sendVoiceCommand(voiceCommand));
      setVoiceCommand('');
    }
  };

  return (
    <div className="communicator">
      <h2>2>
      <form onSubmit={handleVoiceCommand}>
        <input
          type="text"
          value={voiceCommand}
          onChange={(e) => setVoiceCommand(e.target.value)}
          placeholder="Enter voice command"
        />
        <button type="submit">Send</button>
      </form>
      <div className="real-time-updates">
        <h3>Real-Time Updates</h3>
        <ul>
          {realTimeUpdates.map((update, index) => (
            <li key={index}>{update}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Communicator;
</h3>Communicator</h