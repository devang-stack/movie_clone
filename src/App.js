import React,{useEffect, useState} from "react";
import Movie from "./Components/Movie";



function App() {

  const FEATURED_API= "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f56668e9c8ca57a5df685488c65eaca5&page=1";
  const SEARCH_API= "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results)
      });
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(searchTerm){
      fetch(SEARCH_API+searchTerm)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results)
      });

     setSearchTerm('');
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

    return (
      <>
      <header>
        <form onSubmit={handleOnSubmit}>
                  <input type="search" placeholder="Search..." className="search"  onChange={handleOnChange} value={searchTerm}/>

        </form>
      </header>
    <div className="movie-container"> 
      {movies.length>0 && movies.map((movie) => 
      <Movie key={movie.id} {...movie}/>
      )}
      
    </div>
    </>
  );
}

export default App;