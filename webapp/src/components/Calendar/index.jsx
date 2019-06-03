import React, { useCallback, useEffect, useState } from 'react';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import { useCalendarEvents } from 'util/hooks';
import { act, useDispatch, useMappedState } from 'store';

import MonthlyReportFab from 'components/MonthlyReportFab';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'components/Calendar/Calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

function Calendar() {
  const dispatch = useDispatch();
  const { currentDate, fetchEvents } = useMappedState(
    useCallback(
      state => ({
        currentDate: state.currentDate,
        fetchEvents: state.fetchEvents,
      }),
      [],
    ),
  );

  const [currentView, setView] = useState('month');

  const events = useCalendarEvents();

  const onSelectSlot = useCallback((e) => {
    switch (e.action) {
      case 'click':
      case 'doubleClick':
        dispatch(act.SET_CLICK_EVENT(e));
        break;

      case 'select':
        dispatch(act.SET_SLOT_EVENT(e));
        break;

      default:
        break;
    }
  }, []);

  useEffect(() => {
    if (fetchEvents) {
      events
        .fetchEvents()
        .then(() => dispatch(act.STOP_FETCH_EVENTS()));
    }
  }, [fetchEvents]);

  // -----

  const allowedViews = [
    BigCalendar.Views.DAY,
    BigCalendar.Views.MONTH,
    BigCalendar.Views.WEEK,
  ];

  // -----

  return (
    <React.Fragment>
      <div className="calendar-container">
        <BigCalendar
          style={{
            height: 'inherit',
            width: 'inherit',
          }}
          views={allowedViews}
          localizer={localizer}
          events={events.list}
          popup
          selectable
          onSelectSlot={onSelectSlot}
                    // onSelectEvent={(event) => setFocusedEvent(event)}
          onNavigate={d => dispatch(act.SET_CURRENT_DATE(d))}
          onView={setView}
        />

        {/* <DayDialog list={events.list} />
        <AddEventDialog />
        <AddReportDialog /> */}
      </div>

      {currentView === 'month' && <MonthlyReportFab date={currentDate} />}
    </React.Fragment>
  );
}

export default Calendar;
