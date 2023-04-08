<script lang="ts">
	import type { EventInterface } from "$lib/data/types";
	import EventCard from "./EventCard.svelte";

    export let events: EventInterface[]; 
</script>

<h2 class="font-bold text-4xl my-5">Agenda</h2>
{#each events as event}
    <EventCard event={event} />
{/each}
