<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'
	import type { EventInterface } from "$lib/data/types";
	import { formatTime, getTimeDifference } from "$lib/utils/dateTime.utils";

    export let event: EventInterface;

    let done = false; 
    const toggleDone = () => done = !done; 

</script>

<div class="bg-slate-100 my-2 p-2 rounded">
    <div class="flex divide-x-4 divide-blue-500">
        <div class="w-36 py-2 px-4">
            {#if event.timestamp.time}
                <div class="font-medium text-sm">
                    {formatTime(event.timestamp.time[0])}
                    <!-- {#if event.timestamp.time[1]}
                        - {formatTime(event.timestamp.time[1])}
                    {/if}
                     -->
                </div>
                <div class="text-xs text-slate-500">{getTimeDifference(event.timestamp.time)}</div>
            {/if}
        </div>
        <div class="w-full py-2 px-4">
            <div class="flex items-start justify-between">
                <div class="font-semibold {done ? 'line-through': ''}">{event.title}</div>
                {#if !done }
                    <button on:click={toggleDone} class="text-slate-700 hover:bg-blue-500 hover:text-white text-xs px-2 py-0.5 rounded-full">Mark Done?</button>
                {:else}
                    <button on:click={toggleDone} class="bg-green-100  text-green-500 hover:bg-green-300 hover:text-white text-xs px-2 py-0.5 rounded-full">Done</button>
                {/if}
            </div>
            {#if event.description}
                <div class="prose prose-sm text-sm">
                    <SvelteMarkdown source={event.description} />
                </div>
            {/if}
        </div>
    </div>
</div>