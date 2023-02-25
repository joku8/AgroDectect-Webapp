import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Banner from './Banner';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = event => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    // Implement file upload logic here
    console.log(selectedFile);
  };

  return (
    <div className="App">
      <Banner 
        background="#e9edc9" 
        color="#000000" 
        title="Welcome to AgroDetect!" 
        subtitle="Detect the problem and find the solution."
      />
      <Sidebar />
      <h1>Upload your crop images</h1>
      <input type="file" onChange={fileSelectedHandler} />
      <button className="upload-btn" onClick={fileUploadHandler}>Upload</button>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">AgroDetect</h2>
      <ul className="sidebar__list">
        <li className="sidebar__item"><a href="#" className="sidebar__link">Home</a></li>
        <li className="sidebar__item"><a href="#" className="sidebar__link">About</a></li>
        <li className="sidebar__item"><a href="#" className="sidebar__link">Contact</a></li>
      </ul>
    </aside>
  );
}

export default App;
