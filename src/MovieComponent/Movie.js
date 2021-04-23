import React from 'react';
import Card from 'react-bootstrap/Card';

class Movie extends React.Component {
  render() {
    return (
      <Card.Body>
        <Card.Title>{this.props.movie.title}</Card.Title>
        <Card.Text>
          <p>Release Date: {this.props.movie.release_date}</p>
          <br></br>
          <p>{this.props.movie.overview}</p>
        </Card.Text>
      </Card.Body>
    )
  }
}

export default Movie;
