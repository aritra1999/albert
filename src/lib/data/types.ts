export interface Event {
    title: string; 
    comments: string;
    description: string;
    timestamp: EventTimeStamp;   
}

export interface EventTimeStamp {
    time: string[]; 
    repeats: Interval & (Day | Week | Month |  Year | Date);
}

export interface Day {
    days: DayEnum[];
}

export interface Week {
    weeks: number[];
}

export interface Month {
    day?: DayEnum;
    date?: number; 
    months: MonthEnum[];
}

export interface Year {
    years: number
}



export enum Interval {
    dates,
    everyday,
    day,
    week,
    month,
    year
}

export enum DayEnum {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export enum MonthEnum {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}


