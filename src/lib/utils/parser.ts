import type { Day, Week, Month, Year, EventInterface, DateInterface } from "$lib/data/types";

export function filterEvents(events: EventInterface[], today: Date = new Date()): EventInterface[] {
    return events.filter((event) => checkEvent(event, today));
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
    return false;
}

export function checkDay(day: Day, today: Date): boolean {
    return true; 
}

export function checkWeek(week: Week, today: Date): boolean {
    return true; 
}

export function checkMonth(month: Month, today: Date): boolean {
    return month.dates.includes(today.getDate()) && month.months.includes(today.getMonth());
}

export function checkYear(year: Year, today: Date): boolean {
    return true;
}
