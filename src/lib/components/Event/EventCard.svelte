<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'
	import type { EventInterface } from "$lib/data/types";
	import { checkCurrentTask, formatTime, getTimeDifference } from "$lib/utils/dateTime.utils";

    export let event: EventInterface;

    let done = false; 
    let showMore = event.description ? event.description.length > 25 ? false : true : false;
    
    const toggleDone = () => done = !done; 
    const toggleShowMore = () => showMore = !showMore;
    
    $: currentTask = checkCurrentTask(event.timestamp.time);

    
</script>

<div class="{done ? 'bg-indigo-200 line-through': currentTask ? 'bg-indigo-500 text-white' : 'bg-indigo-100'} my-2 p-6 md:p-8 rounded-3xl">
    <div class="flex items-center justify-between">
        <div class="text-xl font-normal  magic-title">{event.title}</div>
        {#if !done }
            <button on:click={toggleDone} class="text-slate-700 hover:bg-blue-500 hover:text-white text-xs px-2 py-0.5 rounded-full">Mark Done?</button>
        {:else}
            <button on:click={toggleDone}>✅</button>
        {/if}
    </div>
    <div class="w-full">
        {#if event.description}
            <div class="prose prose-sm text-sm {currentTask ? 'text-white' : 'text-slate-600'}">
                <SvelteMarkdown source={event.description.slice(0, showMore ? event.description.length : 25)} />
            </div>
            {#if event.description.length > 25}
                <button on:click={toggleShowMore} class="text-blue-100 px-2 py-0.5 bg-blue-500 rounded-full text-xs">
                    {#if showMore} less {:else} more {/if}
                </button>    
            {/if}
        {/if}
    </div>
    {#if event.timestamp.time}
        <div class="flex items-center justify-between font-medium mt-2">
            <div class="text-xl">{formatTime(event.timestamp.time[0])}</div>
            <div class="px-3 py-0.5 rounded-full bg-indigo-500 text-white text-sm">{getTimeDifference(event.timestamp.time)}</div>
            {#if event.timestamp.time[1]}
                <div class="text-xl">{formatTime(event.timestamp.time[1])}</div>
            {/if}
        </div>
    {/if}
</div>
