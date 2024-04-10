import imageRickMorty from './img/rick-morty.png'
import './App.css';
import {useEffect, useState } from 'react';
import Characters from './component/Characters';
import Pagination from "./component/Pagination";

function App() {

  const [characters,setCharacters] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  const [speciesFilter, setSpeciesFilter] = useState('');

  const reqApi = async (filter = '') => {
    let url = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
    if (filter) {
      url += `&species=${filter}`;
    }
    const response = await fetch(url);
    const characterApi = await response.json();
    if (characterApi.results && characterApi.results.length > 0) {
      setCharacters(characterApi.results);
    } else {
      alert('No characters found for this filter');
    }
  }

  useEffect(() => {
    reqApi();
  }, [pageNumber]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Rick & Morty</h1>
        {characters && characters.length > 0 ? (
          <>
            <input 
              type="text" 
              value={speciesFilter} 
              onChange={e => setSpeciesFilter(e.target.value)} 
              placeholder="Filter by species"
            />
            <button onClick={() => reqApi(speciesFilter)}>Filter</button>
            <Characters characters={characters} setCharacters={setCharacters}/>
            <Pagination setPageNumber = {setPageNumber} pageNumber={pageNumber}/>
          </>
        ) : (
          <>
            <img src={imageRickMorty} alt='Rick & Morty' className='img-home'/>
            <button onClick={() => reqApi()} className='btn-search'>Buscar Personajes</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;