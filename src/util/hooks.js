import React, { useEffect } from "react";

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
    const token = localStorage.getItem("auth_token");
    return token;
}

function useCalendarEvents() {
    const [events, setEvents] = React.useState([]);

    const fetchEvents = () =>
        client.events
            .getAll()
            .then((res) => {
                let er = res.body();
                er = er.map(e => e.data()).map((e) => {
                    let start = new Date(e.start);
                    let end = new Date(e.end);

                    return {
                        ...e,
                        title: e.name,
                        start,
                        end,
                    };
                });

                setEvents(er);
            })
            .catch(console.error);
    useEffect(() => {
        fetchEvents();
    }, []);

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

        client
            .getDayEvents(year, month, day)
            .then((res) => {
                let er = res;
                er = er.map((e) => ({
                    ...e,
                    title: e.name,
                    start: new Date(e.start.slice(0, 19)),
                    end: new Date(e.end.slice(0, 19)),
                    allDay: false,
                }));
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
