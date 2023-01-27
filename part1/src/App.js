import { useEffect, useState} from 'react'
import axios from 'axios';
import Weather from './components/Weather';


const App = () => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
          setLoading(false);
        }).catch(err => {
          console.log('error', err);
          setLoading(false);
        });
    }
    fetchData();
  }, [])

  console.log('countries', countries);

  const [searchText, setSearchText] = useState("");

  const filteredCountries = Object.values(countries).filter(
    ({ name }) =>
      name.common.toLowerCase().includes(searchText.toLowerCase())
  );

  const showContent = (id) => {
    let el = document.getElementById('id-'+id);
    let btn = document.getElementById('btn-'+id);

    if(el.classList.contains('show')) {
      el.style.display = 'none';
      el.classList.remove('show');
      btn.innerHTML  = 'show';
    } else{
      el.classList.add('show');
    el.style.display = 'block';
    btn.innerHTML  = 'hide';
    }
  }
  console.log('filteredCountries', filteredCountries)
  return (
    <div>
      {loading && <div>Loading...</div>}
      <label>Find countries </label><input
        type="text"
        value={searchText}
        onChange={({ target }) => setSearchText(target.value)}
      />
      <p> </p>
      {searchText.length > 0 && filteredCountries.length >= 10 && <div>Too many matches, specify another filter.</div>}

      {searchText.length > 0 && filteredCountries.length < 10 && filteredCountries.length > 1 && filteredCountries.map((country) => (
        <>
        <div key={country.name.common}>{country.name.common} <button id={`btn-${country.area}`} onClick={() => showContent(country.area)}>show</button>
          <div  className="country-details" key={country.name.common} style={{display: "none"}} id={`id-${country.area}`}>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}
              <br />area {country.area}</p>
            <div><b>languages:</b></div>
            <ul>
              {Object.keys(country.languages).map(key => {
                return <li>{country.languages[key]}</li>
              })}
            </ul>
            <img src={country.flags.png} alt={country.name.common}/>
              <Weather capital={country.capital}></Weather>
          </div>
        </div>
        <br/>
        </>
      ))}

      {searchText.length > 0 && filteredCountries.length === 1 && filteredCountries.map((country) => (
        <div key={country.name.common}>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital}<br />area {country.area}</p>
          <div><b>languages:</b></div>
          <ul>
            {Object.keys(country.languages).map(key => {
              return <li>{country.languages[key]}</li>
            })}
          </ul>
          <img src={country.flags.png}  alt={country.name.common}/>
          <Weather capital={country.capital}></Weather>
        </div>
      ))}
    </div>
  )
}
export default App