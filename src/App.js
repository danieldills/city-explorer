import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Weather from './WeatherComponent/Weather';
import Movies from './MovieComponent/Movies';

import './style.css';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      haveWeSearchedYet: false,
      citySearchedFor: '',
      weatherData: [],
      movieData: []
    };
  }

  handleShowSearch = () => {
    this.setState({ haveWeSearchedYet: false });
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value });
  }
  getCityInfo = async (e) => {
    e.preventDefault();
    try {
      let locationResponseData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.citySearchedFor}&format=json`);

      this.setState({
        haveWeSearchedYet: true,
        locationData: locationResponseData.data[0],
        cityName: locationResponseData.data[0].display_name,
        cityLat: locationResponseData.data[0].lat,
        cityLon: locationResponseData.data[0].lon,
        cityMapSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${locationResponseData.data[0].lat},${locationResponseData.data[0].lon}&zoom=10`
      });
      this.getWeatherData();
      this.getMovieData();
    } catch (err) {
      this.setState({ error: `${err.message}` });
    }
    
  }
  getWeatherData = async () => {
    try {
      const weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`, 
      {params: {
        lat: this.state.cityLat,
        lon: this.state.cityLon
      }});
      console.log(weatherData.data);
      this.setState({
        weatherData: weatherData.data
      })
    } catch (err) {
      this.setState({ error: `${err.message}` });
    }
  }
getMovieData = async () => {
  try {
  let movieData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies`,
    {params: {
      city: this.state.citySearchedFor
    }});
    this.setState({
      movieData: movieData.data,
    }); 
  } catch (err) {
    this.setState({error: `${err.message}`});
  }
};

  render() {
    return (
      <>
        <div className="wrapper">
          <h1>Welcome to City Explorer!</h1><br />
          <form className="form" onSubmit={(e) => this.getCityInfo(e)}>
            <input type="text" name='citySearchedFor' onChange={(e) => this.handleChange(e)} placeholder="Search City, State" />
            <button type="submit">Explore!</button>
          </form>
          {this.state.error ?
            <Card className="map">
              <Card.Body>{this.state.error} : {this.state.error}</Card.Body>
            </Card> :
            ''}
          {this.state.haveWeSearchedYet ?
            <>
              <Card className="map" style={{ width: "100%" }}
                bg="primary"
                text="light">
                <Card.Img variant="top" src={this.state.cityMapSrc} alt="map" />
                <Card.Body>
                  <Card.Title>{this.state.cityName}</Card.Title>
                  <Card.Text>
                    <>
                      Latitude: {this.state.cityLat}
                      <br></br>
                      Longitude: {this.state.cityLon}
                    </>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Weather weatherData={this.state.weatherData} error={this.state.error}/>
              <Movies movieData={this.state.movieData} error={this.state.error}/>
            </>
            : ''}
        </div>
      </>
    );
  }
}

export default App;
