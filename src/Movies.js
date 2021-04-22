import React from 'react';
import Card from 'react-bootstrap/Card';

class Movies extends React.Component {
  render() {
    return (
      <>
        {this.props.movieData.map((movie, index) => (
          <Card key={index} style={{ width: "100%" }}>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="movie-poster" />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>
                <p>Release Date: {movie.release_date}</p>
                <br></br>
                <p>{movie.overview}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  }
}

export default Movies;
