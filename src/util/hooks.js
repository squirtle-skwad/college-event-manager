import React from "react";

import axios from "axios";
import { ENDPOINT } from "./constants";

function useInput(defvalue) {
    const [value, setValue] = React.useState(defvalue);

    const onChange = (e) => setValue(e.target.value);

    return {
        value,
        onChange,
    };
}

function useCalendarEvents() {
    const [events, setEvents] = React.useState([]);

    const fetchEvents = () => {
        axios.get(ENDPOINT + '/event_custom/')
        .then(res => {
            let er = res.data;
            er = er.map(e => ({ 
                ...e, 
                title: e.name, 
                start: new Date(e.start.slice(0, 19)),
                end:  new Date(e.end.slice(0, 19)),
            }));
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
        if(!date) return;

        const year = date.start.getYear() + 1900;
        const month = date.start.getMonth() + 1;
        const day = date.start.getDate();

        axios.get(`${ENDPOINT}/event/${year}-${month}-${day}`)
        .then(res => {
            let er = res.data;
            console.log('Received day events ', er);
            er = er.map(e => ({ 
                ...e,
                title: e.name, 
                start: new Date(e.start.slice(0, 19)),
                end:  new Date(e.end.slice(0, 19)),
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

export { useInput, useCalendarEvents, useDayEvents };
