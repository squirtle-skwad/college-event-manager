import React from "react";

import DayDialog from "./DayDialog";
import AddEventDialog from "./AddEventDialog";

import BigCalendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

function Calendar() {
    const [clickEvent, setClickEvent] = React.useState(null);
    const [slotEvent, setSlotEvent] = React.useState(null);
    const [focusedEvent, setFocusedEvent] = React.useState(null);

    const events = [
        {
            title: "Test",
            start: new Date(),
            end: new Date(),
            allDay: true,
        },
    ];

    // -----

    const onSelectSlot = (e) => {
        switch (e.action) {
            case "click":
            case "doubleClick":
                setClickEvent(e);
                break;

            case "select":
                setSlotEvent(e);
                break;

            default:
                break;
        }
    };

    // -----

    return (
        <div className='calendar-container'>
            <BigCalendar
                style={{
                    height: "inherit",
                    width: "inherit",
                }}
                localizer={localizer}
                events={events}
                popup
                selectable
                onSelectSlot={onSelectSlot}
                onSelectEvent={(event) => setFocusedEvent(event)}
            />

            <DayDialog day={clickEvent} onClose={() => setClickEvent(null)} list={events} />
            <AddEventDialog
                event={slotEvent}
                onClose={() => setSlotEvent(null)}
            />
        </div>
    );
}

export default Calendar;
