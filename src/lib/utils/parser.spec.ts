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
		it('today is 4th November - checking on 4th November', () => {
			const today = new Date('11/04/2023');
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(expect.objectContaining(birthdayEvent)); 
		});
		it('today is 4th November - checking on 5th December', () => {
			const today = new Date('12/05/2023');
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(expect.objectContaining(birthdayEvent)); 
		});
	});
});
