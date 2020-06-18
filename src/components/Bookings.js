import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Bookings extends Component {
  handleGuestInfo = (event) => {
    this.props.handleGuestInfo(event)
  }
  handleDateInfo = (event) => {
    this.props.handleDateInfo(event)
  }
  render(){
      const {guestInfo, dateInfo,generateMealsSchedule} = this.props
      return (
        <div className="row">
          <TextField
            className="col-md-6"
            multiline
            rows="4"
            placeholder="Enter the hacker list (one hacker per line)"
            name="guestInfo"
            value={guestInfo}
            onChange={this.handleGuestInfo}
          />
          <TextField
            className="col-md-6"
            multiline
            rows="4"
            placeholder="Enter the date range for each hacker's stay (one range per line)"
            name="dateInfo"
            value={dateInfo}

            onChange={this.handleDateInfo}
          />
          <Button 
            onClick={generateMealsSchedule}
            variant="outlined" 
            color="primary" 
            className="block-center">
              Get Meals Schedule
          </Button>
        </div>);
    }
}

Bookings.propTypes = {
  guestInfo: PropTypes.string,
  dateInfo: PropTypes.string,
  handleGuestInfo: PropTypes.func,
  handleDateInfo: PropTypes.func,
  generateMealsSchedule: PropTypes.func
}


export default Bookings;