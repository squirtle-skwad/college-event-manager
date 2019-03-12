import React from "react";

import BigCalendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

function Calendar() {

    const allowedViews = [BigCalendar.Views.MONTH, BigCalendar.Views.DAY, BigCalendar.Views.AGENDA];

    const events = [{
        title: "Test dfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfd",
        start: new Date(),
        end: new Date(),
        allDay: 1,
    }];

    const onSelect = function (e) {

    };

    return (
        <div className="calendar-container">
            <BigCalendar 
                style={{
                    height: "inherit",
                    width: "inherit",
                }}
                views={allowedViews}
                localizer={localizer} 
                events={events}
                popup
                selectable

                onSelectEvent={a => alert(JSON.stringify(a))}
                onSelectSlot={a => alert(JSON.stringify(a))}
            />
        </div>
    );
}

export default Calendar;
