const ACTIONS = {
    SET_CLICK_EVENT: (event) => ({
        type: "SET_CLICK_EVENT",
        payload: {
            clickEvent: event,
        },
    }),
    SET_SLOT_EVENT: (event) => ({
        type: "SET_SLOT_EVENT",
        payload: {
            slotEvent: event,
        },
    }),
    START_ADD_REPORT: (event) => ({
        type: "START_ADD_REPORT",
        payload: {
            reportEvent: event,
        },
    }),
    SET_CURRENT_DATE: (date) => ({
        type: "SET_CURRENT_DATE",
        payload: {
            currentDate: date,
        },
    }),

    INCREMENT_EVENT_ADD_STEP: () => ({
        type: "INCREMENT_EVENT_ADD_STEP",
    }),

    CLOSE_DAY_DIALOG: () => ({
        type: "CLOSE_DAY_DIALOG",
    }),
    CLOSE_REPORT_DIALOG: () => ({
        type: "CLOSE_REPORT_DIALOG",
    }),
    CLOSE_ADD_EVENT_DIALOG: () => ({
        type: "CLOSE_ADD_EVENT_DIALOG",
    }),
    CLOSE_IMAGE_DIALOG: () => ({
        type: "CLOSE_IMAGE_DIALOG",
    }),

    ADD_EVENT_FROM_DAY_DIALOG: () => ({
        type: "ADD_EVENT_FROM_DAY_DIALOG",
    }),
    FETCH_EVENTS: () => ({
        type: "FETCH_EVENTS",
    }),
    STOP_FETCH_EVENTS: () => ({
        type: "STOP_FETCH_EVENTS",
    }),
};

export default ACTIONS;
