import React from "react";

import DayDialog from "./DayDialog";
import AddEventDialog from "./AddEventDialog";
import AddReportDialog from "./AddReportDialog";
import { useCalendarEvents } from "../util/hooks";

import { Fab } from "@material-ui/core";
import { CalendarToday as CalendarIcon } from "@material-ui/icons";
import BigCalendar from "react-big-calendar";
import moment from "moment";

import { useDispatch } from "redux-react-hook";
import { useGlobalState, a } from "../store";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

const MonthlyReportFab = (props) => {
    const month = props.date.getMonth() + 1;
    const year = props.date.getYear() + 1900;

    return (
        <Fab {...props}  
        color="primary" 
        variant="extended" 
        style={{
            position: "relative",
            bottom: "1rem",
            right: "auto",
            left: "auto",
        }}
        component='a' 
        href={`http://127.0.0.1:8000/month/${month}/${year}`}>
            <CalendarIcon />
            Monthly CSV
        </Fab>
    )
};

function Calendar() {
    const dispatch = useDispatch();
    const gs = useGlobalState();
    
    const [currentView, setView] = React.useState('month');

    const events = useCalendarEvents();

    // -----

    const allowedViews = [
        BigCalendar.Views.DAY,
        BigCalendar.Views.MONTH,
        BigCalendar.Views.WEEK,
    ];

    const onSelectSlot = (e) => {
        switch (e.action) {
            case "click":
            case "doubleClick":
                dispatch(a.CLICK_EVENT(e));
                break;

            case "select":
                dispatch(a.SLOT_EVENT(e));
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
                onNavigate={d => dispatch(a.SET_CURRENT_DATE(d))}
                onView={setView}
            />

            {currentView === 'month' ? <MonthlyReportFab date={gs.currentDate} /> : <span hidden />}

            <DayDialog
                day={gs.clickEvent}
                onClose={() => dispatch(a.CLICK_EVENT(null))}
                onAddClick={() =>
                    dispatch(a.SLOT_EVENT({
                        start: gs.clickEvent.start,
                        end: gs.clickEvent.start,
                    }))}
                onReport={(event) => dispatch(a.REPORT_EVENT(event))}
                list={events.list}
            />
            <AddEventDialog
                event={gs.slotEvent}
                onClose={() => {
                    dispatch(a.SLOT_EVENT(null));
                    events.fetchEvents();
                }}
            />
            <AddReportDialog
                event={gs.reportEvent}
                onClose={() => {
                    dispatch(a.REPORT_EVENT(null));
                    dispatch(a.SLOT_EVENT(null));
                }}
            />
        </div>
    );
}

export default Calendar;
