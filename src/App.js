import imageRickMorty from './img/rick-morty.png'
import './App.css';
import {useEffect, useState } from 'react';
import Characters from './component/Characters';
import Pagination from "./component/Pagination";

function App() {

  const [characters,setCharacters] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);

  const reqApi = async()=>{

    const api = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`);
    const characterApi = await api.json();

    setCharacters(characterApi.results);

  }

  useEffect(()=>{
    reqApi();
  },[pageNumber]);
  

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Rick & Morty</h1>
        {characters ? (
           <>
          <Characters characters={characters} setCharacters={setCharacters}/>
          <Pagination setPageNumber = {setPageNumber} pageNumber={pageNumber}/>
          </>
          
        ): (
          <>
          <img src={imageRickMorty} alt='Rick & Morty' className='img-home'/>
          <button onClick={reqApi} className='btn-search'>Buscar Personajes</button>
          </>
          
        )}
        
        
        
      </header>
    </div>
  );
}

export default App;
