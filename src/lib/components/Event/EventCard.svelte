<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'
	import type { EventInterface } from "$lib/data/types";
	import { formatTime, getTimeDifference } from "$lib/utils/dateTime.utils";

    export let event: EventInterface;

    let done = false; 
    let showMore = event.description ? event.description.length > 25 ? false : true : false;
    
    const toggleDone = () => done = !done; 
    const toggleShowMore = () => showMore = !showMore;
    
</script>

<div class="{done ? 'bg-stone-100': 'bg-slate-100'} my-2 p-2 rounded">
    <div class="flex divide-x-4 divide-blue-600">
        <div class="w-36 flex flex-col justify-center py-2 px-2">
            {#if event.timestamp.time}
                <div class="font-medium">{formatTime(event.timestamp.time[0])}</div>
                <div class="text-xs text-slate-500">{getTimeDifference(event.timestamp.time)}</div>
            {/if}
        </div>
        <div class="w-full flex flex-col justify-center py-2 px-4  {done ? 'line-through': ''}">
            <div class="flex justify-between relative">
                <div>
                    <div class="text-lg font-semibold">{event.title}</div>
                </div>
                <div class="absolute -top-2 -right-4">
                    {#if !done }
                        <button on:click={toggleDone} class="text-slate-700 hover:bg-blue-500 hover:text-white text-xs px-2 py-0.5 rounded-full">Mark Done?</button>
                    {:else}
                        <button on:click={toggleDone}>✅</button>
                    {/if}
                </div>
            </div>
            <div>
                {#if event.timestamp.time && event.timestamp.time[1]}
                    <div class="text-xs text-slate-500">
                        {formatTime(event.timestamp.time[0])}{#if event.timestamp.time[1]} - {formatTime(event.timestamp.time[1])}{/if}
                    </div>
                {/if}
            </div>
            <div class="w-full relative">
                {#if event.description}
                    <div class="prose prose-sm text-sm mb-3">
                        <SvelteMarkdown source={event.description.slice(0, showMore ? event.description.length : 25)} />
                    </div>
                    {#if event.description.length > 25}
                        <button on:click={toggleShowMore} class="bg-blue-100 px-2 py-0.5 text-blue-500 rounded-full text-xs absolute -bottom-2 -right-4">
                            {#if showMore} less {:else} more {/if}
                        </button>    
                    {/if}
                {/if}
            </div>
        </div>
    </div>
</div>
