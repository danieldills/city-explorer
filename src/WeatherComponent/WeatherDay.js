import React from 'react';

class WeatherDay extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.description}</td>
      </tr>
    )
  }
}

export default WeatherDay;
