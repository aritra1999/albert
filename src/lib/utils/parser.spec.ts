// Cases - All cases should have at least two tests, one for success and one for failure
// 1. Once every year - eg: birthday, anniversary - DONE
// 2. Weekdays - eg: standup - DONE
// 3. Everyday - eg: Git commit - DONE
// 4. Few days a week - eg: working out 3 times a week, laundry 2 times a week - DONE
// 5. Once a quarter / Jan, April, July, October - eg: quarterly reports / code backup - DONE
// 6, Once a week - eg: cleaning devices - DONE
// 7. Once a month - eg: pay bills / pay rent - DONE
// 8. Specific date - eg: One time events - DONE

import { filterEvents } from './parser';
import mockData from '$lib/utils/mock.json';
import { Interval, type EventInterface } from '$lib/data/types';

import { describe, expect, it } from 'vitest';

describe('Testing all possible events', () => {
	describe('Once every year - eg: birthday, anniversary', () => {
		const birthdayEvent: EventInterface = {
			title: 'Birthday',
			comment: 'Every year on 4th November',
			timestamp: {
				time: ['00:00'],
				interval: Interval.month,
				repeats: {
					months: [10],
					dates: [4]
				}
			}
		};
		it('checking on 4th November, 2023, for 4th November - should contain birthday event', () => {
			const today = new Date('11/04/2023');
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(birthdayEvent)
			);
		});
		it('checking on 5th December, 2023, for 4th November - should not contain birthday event', () => {
			const today = new Date('12/05/2023');
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(birthdayEvent)
			);
		});
	});

	describe('Weekdays - eg: standup', () => {
		const standupEvent: EventInterface = {
			title: 'Standup',
			comment: 'Repeats every weekday',
			timestamp: {
				time: ['15:00'],
				interval: Interval.day,
				repeats: {
					days: [1, 2, 3, 4, 5]
				}
			}
		};
		it('checking on a Monday, for event - should contain standup event', () => {
			const today = new Date('10/04/2021'); // Monday
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(standupEvent)
			);
		});
		it('checking on a Friday, for event - should contain standup event', () => {
			const today = new Date('10/08/2021'); // Friday
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(standupEvent)
			);
		});
		it('checking on a Saturday, for event - should not contain standup event', () => {
			const today = new Date('10/09/2021'); // Saturday
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(standupEvent)
			);
		});
		it('checking on a Sunday, for event - should not contain standup event', () => {
			const today = new Date('10/10/2021'); // Sunday
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(standupEvent)
			);
		});
	});

	describe('Everyday - eg: git commit', () => {
		const gitCommitEvent: EventInterface = {
			title: 'Git commit',
			comment: 'Repeats everyday',
			timestamp: {
				time: ['15:00'],
				interval: Interval.day,
				repeats: {
					days: []
				}
			}
		};
		it('checking on a Monday, for event - should contain everyday event', () => {
			const today = new Date('10/04/2021'); // Monday
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(gitCommitEvent)
			);
		});
		it('checking on a Friday, for event - should contain everyday event', () => {
			const today = new Date('10/08/2021'); // Friday
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(gitCommitEvent)
			);
		});
		it('checking on a Saturday, for event - should contain everyday event', () => {
			const today = new Date('10/09/2021'); // Saturday
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(gitCommitEvent)
			);
		});
		it('checking on a Sunday, for event - should contain everyday event', () => {
			const today = new Date('10/10/2021'); // Sunday
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(gitCommitEvent)
			);
		});
	});

	describe('Few days a week - eg: working out 3 times a week, laundry 2 times a week', () => {
		const workingOutEvent: EventInterface = {
			title: 'Workout',
			comment: 'Repeats on some weekdays for 6 hours',
			timestamp: {
				time: ['07:00', '08:00'],
				interval: Interval.day,
				repeats: {
					days: [1, 3, 6]
				}
			}
		};
		it('checking on a Monday, for event - should contain working out event', () => {
			const today = new Date('10/04/2021'); // Monday
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(workingOutEvent)
			);
		});
		it('checking on a Wednesday, for event - should not contain working out event', () => {
			const today = new Date('10/06/2021'); // Wednesday
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(workingOutEvent)
			);
		});
		it('checking on a Friday, for event - should contain working out event', () => {
			const today = new Date('10/08/2021'); // Friday
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(workingOutEvent)
			);
		});
		it('checking on a Saturday, for event - should not contain working out event', () => {
			const today = new Date('10/09/2021'); // Saturday
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(workingOutEvent)
			);
		});
		it('checking on a Sunday, for event - should not contain working out event', () => {
			const today = new Date('10/10/2021'); // Sunday
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(workingOutEvent)
			);
		});
	});

	describe('Once a quarter / Jan, April, July, October - eg: quarterly reports / code backup', () => {
		const quarterlyReportsEvent: EventInterface = {
			title: 'Backup master codebase',
			comment: 'Repeats quarterly on the first day of the first month',
			timestamp: {
				time: ['20:00'],
				interval: Interval.month,
				repeats: {
					dates: [1],
					months: [0, 3, 6, 9]
				}
			}
		};
		it('checking on a January, for event - should contain quarterly reports event', () => {
			const today = new Date('01/01/2021'); // January
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(quarterlyReportsEvent)
			);
		});
		it('checking on a April, for event - should contain quarterly reports event', () => {
			const today = new Date('04/01/2021'); // April
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(quarterlyReportsEvent)
			);
		});
		it('checking on a July, for event - should contain quarterly reports event', () => {
			const today = new Date('07/01/2021'); // July
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(quarterlyReportsEvent)
			);
		});
		it('checking on a October, for event - should contain quarterly reports event', () => {
			const today = new Date('10/01/2021'); // October
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(quarterlyReportsEvent)
			);
		});
		it('checking on a December, for event - should not contain quarterly reports event', () => {
			const today = new Date('12/01/2021'); // December
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(quarterlyReportsEvent)
			);
		});
	});

	describe('Once a week - eg: cleaning devices', () => {
		const cleaningDevicesEvent: EventInterface = {
			title: 'Clean Setup',
			comment: 'Repeats every Sunday',
			timestamp: {
				time: ['12:00'],
				interval: Interval.day,
				repeats: {
					days: [0]
				}
			}
		};
		it('checking on a Monday, for event - should contain cleaning devices event', () => {
			const today = new Date('10/03/2021'); // Sunday
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(cleaningDevicesEvent)
			);
		});
		it('checking on a Tuesday, for event - should not contain cleaning devices event', () => {
			const today = new Date('10/05/2021'); // Tuesday
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(cleaningDevicesEvent)
			);
		});
		it('checking on a Wednesday, for event - should not contain cleaning devices event', () => {
			const today = new Date('10/06/2021'); // Wednesday
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(cleaningDevicesEvent)
			);
		});
	});

	describe('Once a month - eg: paying bills / pay rent', () => {
		const payingBillsEvent: EventInterface = {
			title: 'Clean keyboard',
			comment: 'Repeats 1st day of every month',
			timestamp: {
				time: ['12:00'],
				interval: Interval.month,
				repeats: {
					dates: [1],
					months: []
				}
			}
		};
		it('checking on a 1st day of the month, for event - should contain paying bills event', () => {
			const today = new Date('10/01/2021'); // 1st day of the month
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(payingBillsEvent)
			);
		});
		it('checking on a 2nd day of the month, for event - should not contain paying bills event', () => {
			const today = new Date('10/02/2021'); // 2nd day of the month
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(payingBillsEvent)
			);
		});
		it('checking on a 3rd day of the month, for event - should not contain paying bills event', () => {
			const today = new Date('10/03/2021'); // 3rd day of the month
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(payingBillsEvent)
			);
		});
	});

	describe('Specific days - eg: One time events', () => {
		const oneTimeEvent: EventInterface = {
			title: 'Relocation',
			comment: '1st May 2023',
			timestamp: {
				time: ['00:00'],
				interval: Interval.date,
				repeats: {
					dates: ['05/01/2023']
				}
			}
		};
		it('checking on a 1st of January, for event - should contain one time event', () => {
			const today = new Date('05/01/2023'); // 1st of January
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(oneTimeEvent)
			);
		});
		it('checking on a 2nd of January, for event - should not contain one time event', () => {
			const today = new Date('01/02/2021'); // 2nd of January
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(oneTimeEvent)
			);
		});
		it('checking on a 1st of February, for event - should not contain one time event', () => {
			const today = new Date('02/01/2021'); // 1st of February
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(oneTimeEvent)
			);
		});
	});
});
