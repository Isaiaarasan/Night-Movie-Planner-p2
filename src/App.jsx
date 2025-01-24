import React, { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState("");
  const [schedule, setSchedule] = useState(null);

  const handleAddMovie = () => {
    if (newMovie.trim()) {
      setMovies([...movies, { id: Date.now(), title: newMovie, votes: 0 }]);
      setNewMovie("");
    }
  };

  const handleVote = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, votes: movie.votes + 1 } : movie
      )
    );
  };

  const handleRemoveVote = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id && movie.votes > 0
          ? { ...movie, votes: movie.votes - 1 }
          : movie
      )
    );
  };

  const handleSchedule = (dateTime) => {
    setSchedule(dateTime);
  };

  const getTopMovie = () => {
    if (movies.length === 0) return "No movies available.";
    const topMovie = movies.reduce((prev, curr) =>
      curr.votes > prev.votes ? curr : prev
    );
    return `${topMovie.title} (${topMovie.votes} votes)`;
  };

  return (
    <div className="app-container">
      <h1>Movie Night Planner</h1>

      {/* Add Movie Section */}
      <div className="add-movie">
        <input
          type="text"
          placeholder="Enter movie title"
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>

      {/* Movie List Section */}
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <span>{movie.title}</span>
            <div className="vote-buttons">
              <button onClick={() => handleVote(movie.id)}>Vote</button>
              <button onClick={() => handleRemoveVote(movie.id)}>Remove Vote</button>
            </div>
            <span className="vote-count">{movie.votes} votes</span>
          </li>
        ))}
      </ul>

      {/* Schedule Section */}
      <div className="schedule">
        <h2>Schedule Movie Night</h2>
        <input
          type="datetime-local"
          onChange={(e) => handleSchedule(e.target.value)}
        />
        {schedule && <p>Scheduled for: {new Date(schedule).toLocaleString()}</p>}
      </div>

      {/* Top-Voted Movie Section */}
      <div className="top-movie">
        <h2>Top-Voted Movie</h2>
        <p>{getTopMovie()}</p>
      </div>
    </div>
  );
}

export default App;
 