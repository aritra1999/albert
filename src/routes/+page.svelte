<script lang="ts">
    import mockData from '$lib/utils/mock.json'
    import { filterEvents } from '$lib/utils/parser';
	import type { EventInterface } from '$lib/data/types';

    import EventList from '$lib/components/Event/EventList.svelte';

	let selectedDate = new Date();
    let localeDateString = selectedDate.toISOString().substring(0, 10);
    let events = filterEvents(mockData.events as EventInterface[], selectedDate);

    const updateEvents = () => {
        console.log("Update", localeDateString);
        selectedDate = new Date(localeDateString)
        events = filterEvents(mockData.events as EventInterface[], selectedDate);
    }

</script>

<div class="flex justify-between items-center border-b boder-slate-300 py-4">

    <input class="rounded-lg border-none bg-slate-100 text-slate-800 text-sm font-medium" type="date" on:change={updateEvents} bind:value={localeDateString}>
	
    <div class="flex items-center space-x-4">
		<div class="flex items-center rounded hover:bg-slate-100 py-2 px-4">
            Events
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-slate-700 font-semibold ml-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>    
        </div>
		<div class="flex items-center rounded hover:bg-slate-100 py-2 px-4">
            Food
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 ml-2 text-slate-600 font-semibold" viewBox="0 0 16 16"><path fill="currentColor" d="M3.5 1a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 0 1 1.415V1.5a.5.5 0 0 1 1 0v4.415A1.5 1.5 0 0 0 7 4.5v-3a.5.5 0 0 1 1 0v3a2.5 2.5 0 0 1-2 2.45v7.55a.5.5 0 0 1-1 0V6.95A2.5 2.5 0 0 1 3 4.5v-3a.5.5 0 0 1 .5-.5Zm6.979 1.479c.159-.16.338-.283.521-.364V7h-1V3.5c0-.337.174-.717.479-1.021ZM11 8v6.5a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5c-.663 0-1.283.326-1.729.771C9.326 2.217 9 2.837 9 3.5v4a.5.5 0 0 0 .5.5H11Z"/></svg>
        </div>
		<div class="flex items-center hover:bg-slate-100 py-2 px-4">
            Cloths
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 ml-2 text-slate-600 font-semibold"  viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M37 17v20m-26 0v7h26v-7m-26 0H4V17c0-3 2-6.5 5-9s7-4 7-4h16s4 1.5 7 4s5 6 5 9v20h-7m-26 0V17m13 0v27m0-27L16 4m16 0l-8 13"/></svg>
        </div>
	</div>
</div>

<div class="flex">
    <div class="w-1/2">
        <EventList events={events}/>
    </div>
    <div class="w-1/2">

    </div>
</div>