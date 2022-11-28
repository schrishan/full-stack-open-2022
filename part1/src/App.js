import { useEffect, useState } from 'react'

import axios from 'axios';


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

  console.log('===========', filteredCountries)
  return (
    <div>
      {loading && <div>Loading...</div>}
      <label>Find countries </label><input
        type="text"
        value={searchText}
        onChange={({ target }) => setSearchText(target.value)}
      />
      {searchText.length > 0 && filteredCountries.length >= 10 && <div>Too many matches, specify another filter.</div>}

      {searchText.length > 0 && filteredCountries.length < 10 && filteredCountries.length > 1 && filteredCountries.map((country) => (
        <div key={country.name.common}>{country.name.common}</div>
      ))}

      {searchText.length > 0 && filteredCountries.length == 1 && filteredCountries.map((country) => (
        <div key={country.name.common}>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital}
            <br />area {country.area}</p>
          <div><b>languages:</b></div>
          <ul>
            {Object.keys(country.languages).map(key => {
              return <li>{country.languages[key]}</li>
            })}
          </ul>
          <img src={country.flags.png}/>
        </div>
      ))}
    </div>
  )
}

export default App