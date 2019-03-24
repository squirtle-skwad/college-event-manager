const initialState = {
    clickEvent: null,
    slotEvent: null,
    reportEvent: null,

    currentDate: new Date(),
    fetchEvents: true
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_CLICK_EVENT":
        case "SET_SLOT_EVENT":
        case "SET_REPORT_EVENT":
        case "SET_CURRENT_DATE":
            return { ...state, ...action.payload };

        case "CLOSE_DAY_DIALOG":
            return { ...state, clickEvent: null, slotEvent: null, fetchEvents: true, };
        case "CLOSE_REPORT_DIALOG":
            return { ...state, reportEvent: null, fetchEvents: true, };
        case "CLOSE_ADD_EVENT_DIALOG":
            return { ...state, slotEvent: null, fetchEvents: true, };
        case "CLOSE_IMAGE_DIALOG":
            return { ...state, clickEvent: null, reportEvent: null, fetchEvents: true, };

        case "FETCH_EVENTS":
            return { ...state, fetchEvents: true, };
        case "STOP_FETCH_EVENTS":
            return { ...state, fetchEvents: false, };

        case "ADD_EVENT_FROM_DAY_DIALOG":
            let slotEvent = {
                start: state.clickEvent.start,
                end: state.clickEvent.start,
            };
            return { ...state, slotEvent };

        case "@@INIT": return state;

        default:
            console.error("Unknown type: ", action.type);
            return state;
    }
}

export default reducer;
export { initialState };
