import imageRickMorty from './img/rick-morty.png'
import './App.css';
import {useEffect, useState } from 'react';
import Characters from './component/Characters';
import Pagination from "./component/Pagination";

function App() {

  const [characters,setCharacters] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  const [speciesFilter, setSpeciesFilter] = useState('');

  const reqApi = async(filter = '') => {
    const url = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
    const response = await fetch(url);
    let characterApi = await response.json();
  
    if (filter) {
      characterApi = characterApi.results.filter(character => character.species.toLowerCase() === filter.toLowerCase());
    } else {
      characterApi = characterApi.results;
    }
  
    setCharacters(characterApi);
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