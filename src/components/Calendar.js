import React from "react";

import BigCalendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

function Calendar() {
    return (
        <div className="calendar-container">
            <BigCalendar 
                style={{
                    height: "inherit",
                    width: "inherit",
                }}
                localizer={localizer} 
                events={[]}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    );
}

export default Calendar;
