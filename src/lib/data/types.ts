export interface EventInterface {
    title: string; 
    comment: string;
    description?: string;
    timestamp: EventTimeStamp;   
}

export interface EventTimeStamp {
    time?: string[]; 
    interval: Interval;
    repeats: Day | Week | Month |  Year | DateInterface;
}

export interface Day {
    days: DayEnum[];
}

export interface Week {
    weeks: number[];
}

export interface Month {
    dates: DayEnum[];
    months: MonthEnum[];
}

export interface Year {
    years: number[]
}

export interface DateInterface {
    dates: string[];
}

export enum Interval {
    date = "date",
    day = "day",
    week = "week",
    month = "month",
    year = "year"
}

export enum DayEnum {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

export enum MonthEnum {
    January = 0,
    February = 1,
    March = 2,
    April = 3,
    May = 4,
    June = 5,
    July = 6,
    August = 7,
    September = 8,
    October = 9,
    November = 10,
    December = 11
}


