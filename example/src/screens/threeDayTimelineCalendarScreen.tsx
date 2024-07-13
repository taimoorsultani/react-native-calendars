import groupBy from 'lodash/groupBy';
// import filter from 'lodash/filter';
// import find from 'lodash/find';

import React, {Component} from 'react';
// import {Alert} from 'react-native';
import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
} from 'react-native-calendars';

import {timelineEvents, getDate} from '../mocks/timelineEvents';

const INITIAL_TIME = {hour: 9, minutes: 0};
const EVENTS: TimelineEventProps[] = timelineEvents;

// const containerCalenderStyle = {
//   backgroundColor: '#DCF2B0',
//   height: 100
// };

export default class ThreeDayTimelineCalendarScreen extends Component {
  state = {
    currentDate: getDate(),
    events: EVENTS,
    eventsByDate: groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start)) as {
      [key: string]: TimelineEventProps[];
    },
  };

  marked = {
    [`${getDate(-1)}`]: {marked: true},
    [`${getDate()}`]: {marked: true},
    [`${getDate(1)}`]: {marked: true},
    [`${getDate(2)}`]: {marked: true},
    [`${getDate(4)}`]: {marked: true},
  };

  onDateChanged = (date: string, source: string) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
    this.setState({currentDate: date});
  };

  onMonthChange = (month: any, updateSource: any) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  // createNewEvent: TimelineProps['onBackgroundLongPress'] = (timeString, timeObject) => {
  //   const {eventsByDate} = this.state;
  //   const hourString = `${(timeObject.hour + 1).toString().padStart(2, '0')}`;
  //   const minutesString = `${timeObject.minutes.toString().padStart(2, '0')}`;

  //   const newEvent = {
  //     id: 'draft',
  //     start: `${timeString}`,
  //     end: `${timeObject.date} ${hourString}:${minutesString}:00`,
  //     title: 'New Event',
  //     color: 'white'
  //   };

  //   if (timeObject.date) {
  //     if (eventsByDate[timeObject.date]) {
  //       eventsByDate[timeObject.date] = [...eventsByDate[timeObject.date], newEvent];
  //       this.setState({eventsByDate});
  //     } else {
  //       eventsByDate[timeObject.date] = [newEvent];
  //       this.setState({eventsByDate: {...eventsByDate}});
  //     }
  //   }
  // };

  // approveNewEvent: TimelineProps['onBackgroundLongPressOut'] = (_timeString, timeObject) => {
  //   const {eventsByDate} = this.state;

  //   Alert.prompt('New Event', 'Enter event title', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => {
  //         if (timeObject.date) {
  //           eventsByDate[timeObject.date] = filter(eventsByDate[timeObject.date], e => e.id !== 'draft');

  //           this.setState({
  //             eventsByDate
  //           });
  //         }
  //       }
  //     },
  //     {
  //       text: 'Create',
  //       onPress: eventTitle => {
  //         if (timeObject.date) {
  //           const draftEvent = find(eventsByDate[timeObject.date], {id: 'draft'});
  //           if (draftEvent) {
  //             draftEvent.id = undefined;
  //             draftEvent.title = eventTitle ?? 'New Event';
  //             draftEvent.color = 'lightgreen';
  //             eventsByDate[timeObject.date] = [...eventsByDate[timeObject.date]];

  //             this.setState({
  //               eventsByDate
  //             });
  //           }
  //         }
  //       }
  //     }
  //   ]);
  // };

  private timelineProps: Partial<TimelineProps> = {
    format24h: true,
    // onBackgroundLongPress: this.createNewEvent,
    // onBackgroundLongPressOut: this.approveNewEvent,
    scrollToFirst: true,
    start: 0,
    end: 24,
    unavailableHours: [
      {start: 0, end: 6},
      {start: 22, end: 24},
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
    theme: {
      nowIndicatorLine: {
        backgroundColor: '#2FDF84',
      },
      nowIndicatorKnob: {
        backgroundColor: '#2FDF84',
      },
    },
  };

  render() {
    const {currentDate, eventsByDate} = this.state;

    return (
      <CalendarProvider
        date={currentDate}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        numberOfDays={3}
      >
        <ExpandableCalendar
          firstDay={1}
          markedDates={this.marked}
          hideArrows={true}
          hideKnob={true}
          disableMonthChange={true}
          enableSwipeMonths={false}
          theme={{
            todayTextColor: '#27AE60',
            textSectionTitleColor: '#000000',
            dayTextColor: '#4D4D4D',
            selectedDayTextColor: '#FFFFFF',
            selectedDayBackgroundColor: '#27AE60',
            textDisabledColor: '#C5C5C5',
          }}
        />

        <TimelineList
           events={eventsByDate}
          // events={{}}
          timelineProps={this.timelineProps}
          showNowIndicator
          scrollToFirst
          initialTime={INITIAL_TIME}
        />
      </CalendarProvider>
    );
  }
}