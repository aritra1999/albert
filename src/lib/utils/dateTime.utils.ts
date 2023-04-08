const FULL_DAY = 'Full Day';

export function getTimeDifference(time: string[]): string {
    if (time.length == 1) return FULL_DAY;

    const totalDifference = (new Date(`2000-01-01T${time[1]}Z`).getTime()).valueOf() - (new Date(`2000-01-01T${time[0]}Z`).getTime()).valueOf();
    const hoursDifference = Math.floor(totalDifference / (1000 * 60 * 60));
    const minsDifference = Math.floor((totalDifference % (1000 * 60 * 60)) / (1000 * 60));

    let timeDiffString = (hoursDifference > 0) ? `${hoursDifference} hours` : '';
    if (minsDifference > 0) timeDiffString += ` ${minsDifference} minutes`;

    return timeDiffString.trim().length > 0 ? timeDiffString.trim() : FULL_DAY;
}

export function formatTime(time24: string): string {
    const date = new Date(`2000-01-01T${time24}:00Z`);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' });
}
