import React, { useCallback } from "react";

import DayDialog from "../components/DayDialog";
import AddEventDialog from "../components/AddEventDialog";
import AddReportDialog from "../components/AddReportDialog";
import { useCalendarEvents } from "../util/hooks";

import { Fab } from "@material-ui/core";
import { CalendarToday as CalendarIcon } from "@material-ui/icons";
import BigCalendar from "react-big-calendar";
import moment from "moment";

import { useDispatch, useMappedState } from "redux-react-hook";
import { act } from "../store";
import { ENDPOINT } from "../util/constants";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

const MonthlyReportFab = (props) => {
    const month = props.date.getMonth() + 1;
    const year = props.date.getYear() + 1900;

    return (
        <Fab
            {...props}
            color='primary'
            variant='extended'
            style={{
                position: "relative",
                bottom: "1rem",
                right: "auto",
                left: "auto",
            }}
            component='a'
            href={`${ENDPOINT}/month/${month}/${year}`}>
            <CalendarIcon />
            Monthly CSV
        </Fab>
    );
};

function Calendar() {
    const dispatch = useDispatch();
    const currentDate = useMappedState(
        useCallback((state) => state.currentDate, [])
    );

    const [currentView, setView] = React.useState("month");

    const events = useCalendarEvents();

    const onSelectSlot = useCallback((e) => {
        switch (e.action) {
            case "click":
            case "doubleClick":
                dispatch(act.SET_CLICK_EVENT(e));
                break;

            case "select":
                dispatch(act.SET_SLOT_EVENT(e));
                break;

            default:
                break;
        }
    }, []);

    // -----

    const allowedViews = [
        BigCalendar.Views.DAY,
        BigCalendar.Views.MONTH,
        BigCalendar.Views.WEEK,
    ];

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
                onNavigate={(d) => dispatch(act.SET_CURRENT_DATE(d))}
                onView={setView}
            />

            {currentView === "month" ? (
                <MonthlyReportFab date={currentDate} />
            ) : (
                <span hidden />
            )}

            <DayDialog list={events.list} />
            <AddEventDialog />
            <AddReportDialog />
        </div>
    );
}

export default Calendar;
