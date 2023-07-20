
const MovieList = (props) => {
  // Extracting the favourite Component prop and assigning it to FavouriteComponent variable
const FavouriteComponent = props.favouriteComponent

    return (
      <div className="image-container d-flex justify-content-start m-3">
        {props.movies.map((movie, index) => (
          <div key={index} className="image-item">
            <img src={movie.Poster} alt="movie-img" />
            <div onClick = {() => props.handleFavouriteMovieClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
						<FavouriteComponent />
					</div>
          </div>
        ))}
      </div>
    );
  }
  
  export default MovieList;
  