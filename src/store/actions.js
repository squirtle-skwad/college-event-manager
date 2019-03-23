const ACTIONS = {
    CLICK_EVENT: (event) => ({
        type: 'CLICK_EVENT',
        payload: {
            clickEvent: event,
        },
    }),

    SLOT_EVENT: (event) => ({
        type: 'SLOT_EVENT',
        payload: {
            slotEvent: event,
        },
    }),

    REPORT_EVENT: (event) => ({
        type: 'REPORT_EVENT',
        payload: {
            reportEvent: event,
        },
    }),

    SET_CURRENT_DATE: (date) => ({
        type: 'SET_CURRENT_DATE',
        payload: {
            currentDate: date,
        },
    }),
};

export default ACTIONS;
