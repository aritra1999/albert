<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'
	import type { EventInterface } from "$lib/data/types";
	import { formatTime, getTimeDifference } from "$lib/utils/dateTime.utils";

    export let event: EventInterface;
</script>

<div class="bg-slate-100 my-2 p-2 rounded">
    <div class="flex divide-x-4 divide-blue-600">
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
        <div class="py-2 px-4">
            <div class="font-semibold">{event.title}</div>
            {#if event.description}
                <div class="prose prose-sm text-sm">
                    <SvelteMarkdown source={event.description} />
                </div>
            {/if}
        </div>
    </div>
</div>