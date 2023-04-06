// Cases - All cases should have two tests, one for success and one for failure
// 1. Once every year - eg: birthday, anniversary - DONE
// 2. Weekdays - eg: standup
// 3. Few days of the week - eg: working out 3 times a week, laundry 2 times a week
// 4. Everyday - eg: Everyday

import { filterEvents } from './parser';
import mockData from '$lib/data/master.json';
import { Interval, type EventInterface } from '$lib/data/types';

import { describe, expect, it } from 'vitest';

describe('Testing all possible cases', () => {
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
		it('checking on a Monday, for event - should contain standup event', () => {
			const today = new Date('10/04/2021'); // Monday
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
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(standupEvent)
			);
		});
		it('checking on a Friday, for event - should contain standup event', () => {
			const today = new Date('10/08/2021'); // Friday
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
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(
				expect.objectContaining(standupEvent)
			);
		});
		it('checking on a Saturday, for event - should not contain standup event', () => {
			const today = new Date('10/09/2021'); // Saturday
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
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(standupEvent)
			);
		});
		it('checking on a Sunday, for event - should not contain standup event', () => {
			const today = new Date('10/10/2021'); // Sunday
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
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(
				expect.objectContaining(standupEvent)
			);
		});
	});
});
