import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './App.css';
import './style.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            haveWeSearchedYet: false,
            citySearchedFor: React.createRef(),
            cityName: '',
            cityLat: '',
            cityLon: '',
            cityMapSrc: ''
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

        try{
        let locationResponseData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.citySearchedFor}&format=json`);

        this.setState({
            haveWeSearchedYet: true,
            locationData: locationResponseData.data[0],
            cityName: locationResponseData.data[0].display_name,
            cityLat: locationResponseData.data[0].lat,
            cityLon: locationResponseData.data[0].lon,
            cityMapSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${locationResponseData.data[0].lat},${locationResponseData.data[0].lon}&zoom=10`
            });
        } catch (err) {
            this.setState({error: `${err.message}: ${err.response.data.error}`});
        }
    }
    render() {
        return (
            <div>
                <h1>Welcome to City Explorer!</h1><br />
                <form className="form" onSubmit={(e) => this.getCityInfo(e)}>
                    <input type="text" name='citySearchedFor' onChange={(e) => this.handleChange(e)} placeholder="Search City, State" />
                    <button type="submit">Explore!</button>
                </form>
                {this.state.haveWeSearchedYet ?
                    <Card className="card" style={{ width: '30rem' }}
                        bg="primary"
                        text="light"
                        >
                        <Card.Img variant="top" src={this.state.cityMapSrc} alt="map" />
                        <Card.Body>
                            <Card.Title>{this.state.cityName}</Card.Title>
                            <Card.Text>
                                <p>
                                    Latitude: {this.state.cityLat}
                                    <br></br>
                                     Longitude: {this.state.cityLon}
                                </p>
                                <p>
                                    ${this.state.error}
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card> : <br></br>}
            </div>
        );
    }
}

export default App;
