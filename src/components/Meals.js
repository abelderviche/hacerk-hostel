import React from 'react';
import {PropTypes} from 'prop-types';

const Meals = (({generatedSchedule}) => {
    return (<div className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
            <ol id="list">
            {generatedSchedule.map((guest,guestKey)=>
                <div key={`guest-${guestKey}`}>
                    <li className="morning">Breakfast for {guest.guest} on {guest.date}</li>
                    <li className="afternoon">Lunch for {guest.guest} on {guest.date}</li>
                    <li className="night">Dinner for {guest.guest} on {guest.date}</li>
                </div>
            )}
            </ol>
        </div>);
});

Meals.propTypes = {
    generatedSchedule: PropTypes.array
}

export default Meals;
