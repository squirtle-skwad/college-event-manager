import { useEffect, useState, } from "react";

import client from "../util/client";

function useInput(defvalue) {
    const [value, setValue] = useState(defvalue);

    const onChange = (e) => setValue(e.target.value);

    return {
        value,
        onChange,
    };
}

function useDatesManager() {
    const [dates, setDates] = useState([]);

    function addDateRange(start, end) {
        const obj = {
            start,
            end,
            allDay: false,
        };
        setDates([...dates, obj]);
    }

    function datesWithEvent(event) {
        return dates.map(e => ({ ...e, event }))
    }

    function deleteDate(i) {
        setDates(dates.filter((e, index) => i !== index));
    }

    return {
        dates,
        addDateRange,
        datesWithEvent,
        deleteDate,
    };
}

function useAuthToken() {
    const token = localStorage.getItem("auth_token");
    return token;
}

function useCalendarEvents() {
    const [events, setEvents] = useState([]);
    const fetchEvents = () =>  client.events
            .getAll()
            .then(r => r.data)
            .then((er) => 
                er.map((e) => {
                    let start = new Date(e.start);
                    let end = new Date(e.end);

                    return {
                        ...e,
                        title: e.name,
                        start,
                        end,
                    };
                })
            )
            .then(setEvents)
            .catch(console.error);

    useEffect(() => {
        fetchEvents();
    }, [])

    return {
        list: events,
        fetchEvents,
    };
}

function useDayEvents(date) {
    const [events, setEvents] = useState([]);

    const fetchEvents = () => {
        if (!date) return;

        const year = date.start.getYear() + 1900;
        const month = date.start.getMonth() + 1;
        const day = date.start.getDate();

        return client
            .getDayEvents(year, month, day)
            .then(r => r.data)
            .then((er) => 
                er.map((e) => ({
                    ...e,
                    title: e.name,
                    start: new Date(e.start.slice(0, 19)),
                    end: new Date(e.end.slice(0, 19)),
                    allDay: false,
                }))
            )
            .then(setEvents)
            .catch(console.error);
    }

    useEffect(() => {
        fetchEvents();
    }, [date])

    return {
        list: events,
        fetchEvents,
    };
}

export { useInput, useCalendarEvents, useDayEvents, useAuthToken, useDatesManager };
