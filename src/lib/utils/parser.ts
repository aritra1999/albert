import type { Day, Week, Month, Year, EventInterface, DateInterface } from "$lib/data/types";

export function compareEventStartTime(eventA: EventInterface, eventB: EventInterface): number {
    if(!eventA.timestamp.time || !eventB.timestamp.time) return 0;
    if(eventA.timestamp.time[0] < eventB.timestamp.time[0]) return -1;
    if(eventB.timestamp.time[0] > eventB.timestamp.time[0]) return 1;
    return 0;
}

export function filterEvents(events: EventInterface[], today: Date = new Date()): EventInterface[] {
    return events.filter((event) => checkEvent(event, today)).sort(compareEventStartTime);
}

export function checkEvent(event: EventInterface, today: Date): boolean {
    switch(event.timestamp.interval) {
        case "date": return checkDate(event.timestamp.repeats as DateInterface, today);
        case "day": return checkDay(event.timestamp.repeats as Day, today);
        case "week": return checkWeek(event.timestamp.repeats as Week, today);
        case "month": return checkMonth(event.timestamp.repeats as Month, today);
        case "year": return checkYear(event.timestamp.repeats as Year, today);
    }

    return false;
}

export function checkDate(date: DateInterface, today: Date): boolean {
    return date.dates.includes(today.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }));
}

export function checkDay(day: Day, today: Date): boolean {
    return (day.days.includes(today.getDay()) || day.days.length == 0); 
}

export function checkWeek(week: Week, today: Date): boolean {
    const startDate = new Date(today.getFullYear(), 0, 1);
    const currentWeek = Math.floor((today.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000));
    return week.weeks.includes(currentWeek); 
}

export function checkMonth(month: Month, today: Date): boolean {
    return month.dates.includes(today.getDate()) && (month.months.includes(today.getMonth()) || month.months.length == 0);
}

export function checkYear(year: Year, today: Date): boolean {
    return year.years.includes(today.getFullYear());
}
