import React, {Component} from 'react';
import Bookings from './components/Bookings';
import Meals from './components/Meals';
import Error from './components/Error';
import moment from 'moment'


class App extends Component {

    state = {
        guestInfo: '',
        dateInfo: '',
        errors:[],
        generatedSchedule:[]
    }

    
  
    handleGuestInfo = (event) => {
        this.setState({...this.state,guestInfo:event.target.value})
    }

    handleDateInfo = (event) => {
        this.setState({...this.state,dateInfo:event.target.value})
    }

    parseDates = (dateArray) => {
        let fromDate =  new Date(`${dateArray[0]} 00:00:00`)
        let toDate =  new Date(`${dateArray[1]} 00:00:00`)
        
        let from = moment.utc(fromDate)
        let to  = moment.utc(toDate)
        if(from.isValid() && to.isValid() && (fromDate <= toDate) ){
            return [
                from,to
            ]
        }
    }

    parseDatesArray = (datesArray) => {
        // YYYY-MM-DD to YYYY-MM-DD 
        return datesArray.reduce((acc,val,idx)=>{
            let dateSubArray = val.split(' to ')
            if(dateSubArray.length===2){
                let parseDates = this.parseDates(dateSubArray)
                if(parseDates){
                    acc[idx] =  parseDates
                }
            }
            return acc
        },[])
    }
    getDatesForGuest = (guest,startDate, stopDate) =>{
        let dateArray = [];
        let currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push({guest:guest,date:moment(new Date(currentDate)).format('YYYY-M-DD')})
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    generateMealsSchedule = () => {
        if(this.state.guestInfo !== '' && this.state.dateInfo !== ''){
            let guestInfoArray = this.state.guestInfo.split('\n')
            let dateInfoArray = this.state.dateInfo.split('\n')

            let parsedDates = this.parseDatesArray(dateInfoArray)
            
            const mealsArr = []
            let errors = []
            guestInfoArray.forEach((guest,keyGuest)=>{
                if(parsedDates[keyGuest]){
                    let pairOfDates = parsedDates[keyGuest]
                    mealsArr.push( this.getDatesForGuest(guest,pairOfDates[0],pairOfDates[1]))
                }else{
                    errors.push(guest)
                }
            })
            
            let generatedSchedule = [].concat(...mealsArr).sort((a,b) => {
                return   new Date(a.date) - new Date(b.date)
            })
            this.setState({...this.state,generatedSchedule:generatedSchedule,errors:errors})
        }else{
            this.setState({...this.state,generatedSchedule:[],errors:[]})

        }
    }
  

    render() {
        return (<div className="container-fluid">
            <center>
                <h2>Hacker Hostel</h2>
            </center>
            <div className="container">
                <Bookings 
                    guestInfo={this.state.guestInfo}
                    dateInfo={this.state.dateInfo}
                    handleGuestInfo={this.handleGuestInfo}
                    handleDateInfo={this.handleDateInfo}
                    generateMealsSchedule={this.generateMealsSchedule}
                ></Bookings>
                {this.state.errors.map((guestError,guestErrorKey)=>
                    <Error guest={guestError} key={guestErrorKey}></Error>
                )}
                <Meals generatedSchedule={this.state.generatedSchedule}></Meals>
            </div>
        </div>);
    }
}

export default App;