import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './services/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import FormSearch from './components/FormSearch'
import Pagination from './components/Pagination'
import ErrorCard from './components/ErrorCard'

function App() {

  const randomLocation = getRandomNumber(126);
  const [locationSelected, setLocationSelected] = useState(randomLocation);

  const url =`https://rickandmortyapi.com/api/location/${locationSelected || getRandomNumber(126)}`;
  const [location, getLocation, hasError] = useFetch(url);


  const [characterPerPage, setCharacterPerPage] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)
  
  const lastIndex = currentPage * characterPerPage
  const firstIndex = lastIndex - characterPerPage

  const totalCharacter = location?.residents.length

  useEffect(() => {
    getLocation()
  }, [locationSelected]);


  return (
   <div className='app'>
    <header className='app__title'></header>
    <FormSearch
      setLocationSelected={setLocationSelected}
    />
    {
      hasError
        ? <ErrorCard/>
        :<>
        <LocationInfo
          location={location}
        />
      <div className='container__resident'>
        {location?.residents.map( urlResident => (
             <ResidentCard
               key={urlResident}
              url={urlResident}
            />
           )).slice(firstIndex, lastIndex)}
      </div>
      <Pagination
        characterPerPage={characterPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCharacter={totalCharacter}
      />
     </> 
    }
   </div>
   
  )
}

export default App
