const initialState = {
    clickEvent: null,
    slotEvent: null,
    reportEvent: null,

    currentDate: new Date(),
};

function reducer(state=initialState, action) {
    switch(action.type) {
        case 'CLICK_EVENT':
        case 'SLOT_EVENT':
        case 'REPORT_EVENT':
        case 'SET_CURRENT_DATE':
            return { ...state, ...action.payload };

        default:
            console.error('Unknown type: ', action.type);
            return state;
    }
}

export default reducer;
export { initialState };
