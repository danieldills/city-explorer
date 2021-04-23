import React from 'react';
import Card from 'react-bootstrap/Card';
import Movie from './Movie';


class Movies extends React.Component {
  render() {
    return (
      <>
        {this.props.movieData.map((movie, index) => (
          <Card key={index} style={{ width: "100%" }}>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="movie-poster" />
            <Movie movie={movie} />
          </Card>
        ))}
      </>
    );
  }
}

export default Movies;
