import React from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
  render() {
    return (
      <>
        {this.props.error ?
          <Card>
            <h2>{this.props.error}</h2>
          </Card> :
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Forecast</th>
              </tr>
            </thead>
            <tbody>
              {this.props.weatherData.map((day, index) => (
                <tr key={index}>
                  <td>{day.date}</td>
                  <td>{day.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        }
      </>
    );
  }
}

export default Weather;
