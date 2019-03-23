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

    SET_REPORT_EVENT: (event) => ({
        type: "SET_REPORT_EVENT",
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
};

export default ACTIONS;
