const FULL_DAY = 'Full Day';

export function getTimeDifference(time: string[]): string {
    if (time.length == 1) return FULL_DAY;

    const totalDifference = timeString2Value(time[1]) - timeString2Value(time[0])
    const hoursDifference = Math.floor(totalDifference / (1000 * 60 * 60));
    const minsDifference = Math.floor((totalDifference % (1000 * 60 * 60)) / (1000 * 60));

    let timeDiffString = (hoursDifference > 0) ? `${hoursDifference} Hours` : '';
    if (minsDifference > 0) timeDiffString += ` ${minsDifference} Mins`;

    return timeDiffString.trim().length > 0 ? timeDiffString.trim() : FULL_DAY;
}

export function formatTime(time24: string): string {
    const date = new Date(`2000-01-01T${time24}:00Z`);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' });
}

export function string2Time(timeString: string): Date {
    return new Date(`2000-01-01T${timeString}Z`);
}

export function timeString2Value(timeString: string): number {
    return new Date(`2000-01-01T${timeString}Z`).getTime().valueOf();
}

export function checkCurrentTask(eventTime: string[] | undefined): boolean {
    if (!eventTime) return false;
    const time24 = `${new Date().getHours()}:${new Date().getUTCMinutes()}`;
    const currentTime = new Date(`2000-01-01T${time24}:00Z`).getTime().valueOf();
    return (timeString2Value(eventTime[0]) <= currentTime && currentTime <= timeString2Value(eventTime[1]));
}