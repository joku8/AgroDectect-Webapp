import React, { useState, useEffect } from "react";
import './App.css';
import Banner from './Banner';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// import USmap from "./USmap";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [corn, setCorn] = useState(false);
  const [soybean, setSoybean] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [description, setDescription] = useState('');

  useEffect(()=> {
    fetch('http://127.0.0.1:5000/get',{
      'method': 'GET'
    })
    .then(response => {
      // Handle response from the backend
      console.log(response);
    })
    .then(response => setSelectedFile(response))

  },[])

  const fileSelectedHandler = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === 'corn' && checked) {
      setCorn(true);
      setSoybean(false);
    } else if (name === 'soybean' && checked) {
      setCorn(false);
      setSoybean(true);
    } else {
      setCorn(false);
      setSoybean(false);
    }
  };

  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    const cropData = {
      corn: corn,
      soybean: soybean
    }

    fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        console.log(response);
        return response.json(); // Parse the response as JSON
      })
      .then(data => {
        console.log(data); // Verify that the response contains the prediction property
        setPrediction(data.prediction); // Set the prediction state
        setDescription(data.description)
      })
      // .then(data=> {
      //   console.log(data); // Verify that the response contains the prediction property
      //   setDescription(data.description);
      // })
      .catch(error => {
        console.error(error);    
      });

    fetch('http://127.0.0.1:5000/crop', {
      method: 'POST',
      body: JSON.stringify(cropData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };
  
  return (
    <div className="App">
      <Banner 
        background="#e9edc9" 
        color="#000000" 
        title="Welcome to AgroDetect!" 
        subtitle="Detect the problem and find the solution."
      />
      <h1>Upload your crop images</h1>
      <div>
          <label htmlFor="corn">Corn</label>
          <input type="checkbox" id="corn" name="corn" checked={corn} onChange={handleCheckboxChange} />
        </div>
        <div>
          <label htmlFor="soybean">Soybean</label>
          <input type="checkbox" id="soybean" name="soybean" checked={soybean} onChange={handleCheckboxChange} />
        </div>
      <input type="file" onChange={fileSelectedHandler} />
      <button className="upload-btn" onClick={fileUploadHandler}>Upload</button>
      <PredictionDisplay prediction={prediction} description={description} />
      {/* {description && <p>Description: {description}</p>} */}
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

function PredictionDisplay({ prediction, description }) {
  return (
    <div className="prediction-box">
      <h2 className="prediction-title">Result from scanning:</h2>
      <p className="prediction-text">{prediction}</p>
      {description && (
        <div className="description-box">
          {/* <h2 className="description-title">What you can do:</h2> */}
          <p className="description-text">{description}</p>
        </div>
      )}
    </div>
  );
}


// function DescriptionDisplay({prediction}) {
//   return (
//     <div className="prediction-box">
//       <h2 className="prediction-title">what you can do:</h2>
//       <p className="prediction-text">{prediction}</p>
//     </div>
//   );
// }

export default App;
