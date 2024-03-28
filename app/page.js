'use client'
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import FileResult from './components/FileResult';

const IndexPage = () => {
  const [result, setResult] = useState(null);

  const handleResultReceived = (data) => {
    setResult(data);
  };

  return (

    <div>
      <h1>Find the Chattiest User</h1>
      <div style={{display: 'flex'}}>
       <div style={{ flex: 1, margin: '10px' }}>
          <h3>Upload a log file (.txt)</h3>
          <FileUpload  onResultReceived={handleResultReceived} />
        </div>
        <div style={{ flex: 1, margin: '10px' }}>
          <h2>Result</h2>
          <FileResult  result={result} />    
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
