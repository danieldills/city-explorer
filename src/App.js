import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {
    
    constructor(props) {
        super(props);

        this.state={
            haveWeSearchedYet: false,
            citySearchedFor: '',
        };
    }

    handleShowSearch = () => {
        this.setState({haveWeSearchedYet: false});
    }
    
    getCityInfo = async(citySearchedFor) => {;
        console.log('searched', citySearchedFor);
        let locationResponseData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_Key}&q=${citySearchedFor}&format=json`);
        console.log(locationResponseData);
        this.setState({
            haveWeSearchedYet: true,
            citySearchedFor: citySearchedFor,
            locationData: locationResponseData.data[0]
        });
    }
    render() {
        return(
            <>
                <h1>Welcome to City Explorer!</h1><br/>
                <form className="form" onSubmit={this.getCityInfo}>
                    <input type="text" name="cityInput"/>
                    <button type="submit">Explore!</button>
                </form>
            </>
        );
    }
}

export default App;
