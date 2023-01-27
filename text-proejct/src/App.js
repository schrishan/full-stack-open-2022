import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState('')

    useEffect(() => {
      const fetchData = async () =>{
      setLoading(true);
      await axios.get('https://restcountries.com/v3.1/all').then((response) => response.json()).then(data => {
        setCountries(data);
        console.log('data',data);
        console.log('countries',countries);
      }).catch(err => {
        console.log('error',err);
      })
      setLoading(false);
    }
    fetchData();

    },[]);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
