import React, { useState } from 'react';
import ToggleCell from './ToggleCell';

function ToggleTable(){
  const NUM_CELLS = 13;

  // Create an array of dummy components
  const items = Array.from({ length: NUM_CELLS }, (_, i) => (
    <ToggleCell key={i} index={i} />
  ));

  // Group items into rows with a max of 4 columns
  const rows = [];
  for (let i = 0; i < items.length; i += 4) {
    rows.push(items.slice(i, i + 4));
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', gap: '10px' }}>
            {row}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToggleTable;