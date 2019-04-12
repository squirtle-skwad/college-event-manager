import moment from "moment";

const initialState = {
    clickEvent: null,
    slotEvent: null,
    reportEvent: null,

    currentDate: new Date(),
    fetchEvents: true,

    newEvent: null,
    eventAddStep: 0,
};

/** Convert time to match college hours. */
function normaliseTime(mObj, hours = 7, minutes = 0) {
    if (mObj.hours() === 0 && mObj.minutes() === 0) {
        mObj.hours(hours);
        mObj.minutes(minutes);
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_CLICK_EVENT":
        case "START_ADD_REPORT":
        case "SET_CURRENT_DATE":
            return { ...state, ...action.payload };

        case "SET_SLOT_EVENT": {
            const startM = moment(action.payload.slotEvent.start);
            const endM = moment(action.payload.slotEvent.end);
            normaliseTime(startM, 7);
            normaliseTime(endM, 18, 30);
            action.payload.slotEvent.start = startM.toISOString();
            action.payload.slotEvent.end = endM.toISOString();

            return { ...state, ...action.payload };
        }

        case 'INCREMENT_EVENT_ADD_STEP':
            return { ...state, eventAddStep: state.eventAddStep + 1 };

        case "CLOSE_DAY_DIALOG":
            return {
                ...state,
                clickEvent: null,
                slotEvent: null,
                fetchEvents: true,
            };
        case "CLOSE_REPORT_DIALOG":
            return { 
                ...state, 
                reportEvent: null, 
                fetchEvents: true
            };
        case "CLOSE_ADD_EVENT_DIALOG":
            return { 
                ...state, 
                slotEvent: null, 
                fetchEvents: true, 
                eventAddStep: 0 
            };
        case "CLOSE_IMAGE_DIALOG":
            return {
                ...state,
                slotEvent: null,
                clickEvent: null,
                reportEvent: null,
                fetchEvents: true,
            };

        case "FETCH_EVENTS":
            return { ...state, fetchEvents: true };
        case "STOP_FETCH_EVENTS":
            return { ...state, fetchEvents: false };

        case "ADD_EVENT_FROM_DAY_DIALOG":
            let slotEvent = {
                start: state.clickEvent.start,
                end: state.clickEvent.start,
            };
            return { ...state, slotEvent };

        case "@@INIT":
            return state;

        default:
            console.error("Unknown type: ", action.type);
            return state;
    }
}

export default reducer;
export { initialState };
