const initialState = {
    clickEvent: null,
    slotEvent: null,
    reportEvent: null,

    currentDate: new Date(),
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_CLICK_EVENT":
        case "SET_SLOT_EVENT":
        case "SET_REPORT_EVENT":
        case "SET_CURRENT_DATE":
            return { ...state, ...action.payload };

        case "CLOSE_DAY_DIALOG":
            return { ...state, clickEvent: null, slotEvent: null };
        case "CLOSE_REPORT_DIALOG":
            return { ...state, reportEvent: null };
        case "CLOSE_ADD_EVENT_DIALOG":
            return { ...state, slotEvent: null };
        case "CLOSE_IMAGE_DIALOG":
            return { ...state, clickEvent: null, reportEvent: null };

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
