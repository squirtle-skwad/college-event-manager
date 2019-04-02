import { useEffect, useState, } from "react";

import client from "../util/client";

function useDatesManager() {
    const [dates, setDates] = useState([]);

    function addDateRange(start, end) {
        if(start.constructor !== Date) start = new Date(start);
        if(end.constructor !== Date) end = new Date(end);

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

function useDepartmentManager() {
    const [depts, setDepts] = useState([]);

    function addDepartment(department) {
        const obj = {
            department,
        };
        setDepts([...depts, obj]);
    }

    function deptsWithEvent(event) {
        return depts.map(e => ({ ...e, event }))
    }

    function deleteDept(i) {
        setDepts(depts.filter((e, index) => i !== index));
    }

    return {
        depts,
        addDepartment,
        deptsWithEvent,
        deleteDept,
    };
}

// -----

function useAuthToken() {
    const token = localStorage.getItem("auth_token");
    return token;
}

function useUserId() {
    const id = localStorage.getItem("user_id");
    return Number(id);
}

// ------

function useCalendarEvents() {
    const [events, setEvents] = useState([]);
    const fetchEvents = () => 
        client
            .getCalendarList()
            .then(r => r.data)
            .then((er) => 
                er.map((e) => {
                    let start = new Date(e.start);
                    let end = new Date(e.end);

                    return {
                        ...e,
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
                    start: new Date(e.start),
                    end: new Date(e.end),
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

export { useCalendarEvents, useDayEvents, useAuthToken, useUserId, useDatesManager, useDepartmentManager };
