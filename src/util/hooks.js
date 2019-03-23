import React from "react";

import client from "../util/client";

function useInput(defvalue) {
    const [value, setValue] = React.useState(defvalue);

    const onChange = (e) => setValue(e.target.value);

    return {
        value,
        onChange,
    };
}

function useAuthToken() {
    const token = localStorage.getItem('auth_token');
    return token;
}

function useCalendarEvents() {
    const [events, setEvents] = React.useState([]);

    const fetchEvents = () => {
        client.getAllEvents()
            .then((res) => {
                let er = res;
                console.log("Received cal events ", er);
                er = er.map((e) => ({
                    ...e,
                    title: e.name,
                    start: new Date(e.start.slice(0, 19)),
                    end: new Date(e.end.slice(0, 19)),
                }));
                console.log("Converted cal events ", er);
                setEvents(er);
            })
            .catch(console.error);
    };

    React.useEffect(fetchEvents, []);

    return {
        list: events,
        fetchEvents,
    };
}

function useDayEvents(date) {
    const [events, setEvents] = React.useState([]);

    const fetchEvents = () => {
        if (!date) return;

        const year = date.start.getYear() + 1900;
        const month = date.start.getMonth() + 1;
        const day = date.start.getDate();

        client.getDayEvents(year, month, day)
            .then((res) => {
                let er = res;
                console.log("Received day events ", er);
                er = er.map((e) => ({
                    ...e,
                    title: e.name,
                    start: new Date(e.start.slice(0, 19)),
                    end: new Date(e.end.slice(0, 19)),
                    allDay: false,
                }));
                console.log("Converted day events ", er);
                setEvents(er);
            })
            .catch(console.error);
    };

    React.useEffect(fetchEvents, [date]);

    return {
        list: events,
        fetchEvents,
    };
}

export { useInput, useCalendarEvents, useDayEvents, useAuthToken };
