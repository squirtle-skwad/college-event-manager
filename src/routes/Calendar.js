import React, { useCallback, useEffect, useState } from "react";

import DayDialog from "../components/DayDialog";
import AddEventDialog from "../components/AddEventDialog";
import AddReportDialog from "../components/AddReportDialog";
import { useCalendarEvents } from "../util/hooks";

import { Fab } from "@material-ui/core";
import { CalendarToday as CalendarIcon } from "@material-ui/icons";
import BigCalendar from "react-big-calendar";
import moment from "moment";

import { act, useDispatch, useMappedState } from "../store";
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
                left: "auto",
                right: "auto",
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
    const { currentDate, fetchEvents } = useMappedState(
        useCallback(
            (state) => ({
                currentDate: state.currentDate,
                fetchEvents: state.fetchEvents,
            }),
            []
        )
    );

    const [currentView, setView] = useState("month");

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

    useEffect(() => {
        if (fetchEvents) {
            events
            .fetchEvents()
            .then(() => dispatch(act.STOP_FETCH_EVENTS()));
        }
    }, [fetchEvents]);

    // -----

    const allowedViews = [
        BigCalendar.Views.DAY,
        BigCalendar.Views.MONTH,
        BigCalendar.Views.WEEK,
    ];

    // -----

    return (
        <React.Fragment>
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

                <DayDialog list={events.list} />
                <AddEventDialog />
                <AddReportDialog />
            </div>

            {currentView === "month" ? (
                <MonthlyReportFab date={currentDate} />
            ) : (
                <span hidden />
            )}
        </React.Fragment>
    );
}

export default Calendar;
