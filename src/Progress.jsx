import React, { useState, useEffect } from "react";

const Progress = () => {

    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    
    const circleWidth = 200;
    const radius = 85;
    const dashArray = radius * Math.PI * 2
    const dashOffset = dashArray - (dashArray * progress) / 100
  
    useEffect(() => {
      let interval;
      if (loading) {
        interval = setInterval(() => {
          if (progress < 100) {
            setProgress(progress + 1);
          } else {
            clearInterval(interval);
            setLoading(false);
          }
        }, 50);
      }
  
      return () => clearInterval(interval);
    }, [progress, loading]);
  
    const handleStartClick = () => {
      setProgress(0);
      if(progress === 0) setLoading(!loading);
    };
  
    const handleStopClick = () => {
      if(progress !== 0) setLoading(!loading);
    };

  return (
    <div>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          className="circle-background"
        />
        

        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          className="circle-progress"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }}
          transform={`rotate(90 ${circleWidth/2} ${circleWidth/2})`}
        />
        <text style={{fontSize: '2rem'}} fill="white" x='50%' y="50%" dy="0.3em" textAnchor="middle">
            {progress}%
        </text>
      </svg>
      <div className="buttons">
        <button onClick={handleStartClick}>{progress === 0 ? `Start`: `Reset`

        }</button>
        <button onClick={handleStopClick}>{loading ? `Stop` : `Continue`}</button>
      </div>
    </div>
  );
};

export default Progress;
