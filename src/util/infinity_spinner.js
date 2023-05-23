import React, { useEffect, useState } from 'react';

const InfinitySpinner = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRotation((prevRotation) => prevRotation + 1);
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [rotation]);

  const spinnerStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '5px solid #1C7AD9',
    borderTopColor: '#F2EDEB',
    animation: 'spin 5s infinite linear',
    transform: `rotate(${rotation}deg)`,
  };

  const keyframes = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  return (
    <div>
      <style>{keyframes}</style>
      <div style={spinnerStyle} align="center"></div>
    </div>
  );
};

export default InfinitySpinner;