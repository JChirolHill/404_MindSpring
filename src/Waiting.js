import React from 'react';
import './Loader.css';
import PlayerLeaves from './PlayerLeaves';

export default function Waiting(props) {
  return (
    <div>
      <h2 className="text-center mt-5">Waiting for Players to Join</h2>
      <div className="loader">Loading...</div>
      <div className="text-center">
        <PlayerLeaves value={3} size="2x" clickable={false} leafCount={4}/>
      </div>
    </div>
  );
}
