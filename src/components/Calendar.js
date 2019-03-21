import React from "react";

import DayDialog from "./DayDialog";
import AddEventDialog from "./AddEventDialog";
import { useEvents } from "../util/hooks";

import BigCalendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

function Calendar() {
    const [clickEvent, setClickEvent] = React.useState(null);
    const [slotEvent, setSlotEvent] = React.useState(null);
    // const [focusedEvent, setFocusedEvent] = React.useState(null);

    const events = useEvents();

    // -----

    const allowedViews = [BigCalendar.Views.DAY, BigCalendar.Views.MONTH, BigCalendar.Views.WEEK];

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
                views={allowedViews}
                localizer={localizer}
                events={events.list}
                popup
                selectable
                onSelectSlot={onSelectSlot}
                // onSelectEvent={(event) => setFocusedEvent(event)}
            />

            <DayDialog day={clickEvent} onClose={() => setClickEvent(null)} list={events.list} />
            <AddEventDialog
                event={slotEvent}
                onClose={() => {
                    setSlotEvent(null);
                    events.fetchEvents();
                }}
            />
        </div>
    );
}

export default Calendar;
