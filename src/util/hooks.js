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

function useEvents() {
    const [events, setEvents] = React.useState([]);

    const fetchEvents = () => {
        axios.get(ENDPOINT + '/event_custom/')
        .then(res => {
            let er = res.data;
            er = er.map(e => ({ 
                ...e, 
                title: e.name, 
                start: new Date(e.start),
                end:  new Date(e.end),
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

export { useInput, useEvents };
