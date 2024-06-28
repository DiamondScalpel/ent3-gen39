
import { useEffect, useRef, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import LocationCard from './components/LocationCard';
import ResidentCard from './components/ResidentCard';

function App() {

  const randomId = Math.floor(Math.random() * 126) + 1;
  const [inputValue, setInputValue] = useState(randomId);
  const [location, getLocation, isLoading, hasError] = useFetch();

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
    getLocation(url);
  }, [inputValue]);

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.trim().toLowerCase());
    textInput.current.value = '';
  }

  // const pagination = () => {
  //   const quantity = 5;
  //   location?.residents.slice(0, 5);
  // }

  console.log(location);

  return (
    <div className='app'>
      {
        isLoading ?
        <h2>Loading...</h2>
        :
        <>
          <h1 className='app__title'>Rick And Morty App</h1>
          <form className='app__form' onSubmit={handleSubmit}>
            <input className='app__form-input' ref={textInput} type="number" />
            <button className='app__form-button'>Search</button>
          </form>
          {
            hasError || !+inputValue ? 
              <h2>👀 Hey! You most provide an id from 1 to 126</h2>
              :
            <>
            <LocationCard
              info={location}
            />
            <div className='app__container'>
              {
                location?.residents.map((character) => (
                  <ResidentCard 
                    key={character}
                    info={character}
                  />
                ))
              }
        </div>
            </>
          }
        </>
      }
    </div>
  )
}

export default App;
