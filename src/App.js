import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './Componets/MovieList';
import MovieListHeading from './Componets/MovieListHeading';
import SearchBox from './Componets/SearchBox';
import AddToFavourite from './Componets/AddToFavourites';
import RemoveFavourite from './Componets/RemoveFavourites';


function App() {
  //initializing state variables
  const [movies, setMovies] = useState([]);//holds the list of movies fetched from the api
  const [favouriteMovie, setFavouriteMovie] = useState([]);//holds the list of favourite movies
  const [searchValue, setSearchValue] = useState('')//holds the current search querry
  
// console.log(searchValue)

//Function to fetch the movie from the API based on the search value
  const getMovie = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=40cb621f` // API endpoint with search value and API key
     
    const response = await fetch(url);//Fetching data from the API
    const responseJSON = await response.json();//Parsing the response into JSON format
    
    if(responseJSON.Search) {
      setMovies(responseJSON.Search)//Updating the 'movies' state with the fetched movie data
    }
  }

  //Function to save the movies to the local storage
const saveToLocalStorage = (items) => {
  localStorage.setItem("favourite-movie", JSON.stringify(items))//Saving the favourite movies as a JSON string in local strorage
}

  //function to add a movie to the favourite movie list
  const addFavouriteMovie = (movie) => {
    const favouriteMovieList = [...favouriteMovie, movie]; // Creating a new array by adding the selected movie to the existing favourite movie list
    setFavouriteMovie(favouriteMovieList);// Updating the 'favouriteMovie' state with the new favourite movie list
    saveToLocalStorage(favouriteMovie);// Saving the updated favourite movie list to local storage
  };

  //function to remove a movie from favourite movie list
  const removeFavouriteMovie = (movie) => {
    const favlist = favouriteMovie.filter((favouriteMovi) => favouriteMovi.imdbID !== movie.imdbID)// Filtering out the movie to be removed from the favourite movie list
    setFavouriteMovie(favlist)// Updating the 'favouriteMovie' state with the filtered favourite movie list
    saveToLocalStorage(favlist)// Saving the updated favourite movie list to local storage
  }
  
// Fetch movies from the API whenever the 'searchValue' state changes
  useEffect(()=> {
    getMovie(searchValue);
  }, [searchValue])
// Load favourite movies from local storage when the component mounts
  useEffect(()=> {
    const favouriteMovieSave = JSON.parse(localStorage.getItem("favourite-movie"));
    setFavouriteMovie(favouriteMovieSave)
  }, [])

// JSX markup for the App component
  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='MovieSpot' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList
        movies = {movies}
        handleFavouriteMovieClick = {addFavouriteMovie} 
        favouriteComponent={AddToFavourite} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        <MovieList
         movies = {favouriteMovie} 
         handleFavouriteMovieClick = {removeFavouriteMovie} 
         favouriteComponent={RemoveFavourite} />
      </div>
    </div>
  );
}

export default App;


//40cb621f
