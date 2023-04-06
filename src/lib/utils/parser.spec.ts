// Cases - All cases should have two tests, one for success and one for failure
// 1. Birthday - Repeat once every year
// 2. Standup - Weekdays (Monday to Friday)
// 3. Workout - 3 times a week
// 4. Git commit - Everyday

import { filterEvents } from './parser';
import mockData from '$lib/data/master.json';
import { Interval, type EventInterface } from '$lib/data/types';

import { describe, expect, it } from 'vitest';

describe('Testing all possible cases', () => {
	describe('birthday - once every year', () => {
		const birthdayEvent: EventInterface = {
			title: 'Birthday',
			comment: 'Every year on 4th November',
			timestamp: {
				time: ['00:00'],
				interval: Interval.month,
				repeats: {
					dates: [4],
					months: [10]
				}
			}
		};

		it('today is 4th November', () => {
			const today = new Date('11/04/2023');
			expect(filterEvents(mockData.events as EventInterface[], today)).toContainEqual(expect.objectContaining(birthdayEvent)); 
		});
		
		it('today is 4th November', () => {
			const today = new Date('12/05/2023');
			expect(filterEvents(mockData.events as EventInterface[], today)).not.toContainEqual(expect.objectContaining(birthdayEvent)); 
		});

	});
});
