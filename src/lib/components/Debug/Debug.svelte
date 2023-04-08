<script lang="ts">
    export let date: Date; 
</script>   
<div class="p-4 text-sm text-gray-800 rounded-lg bg-slate-100" role="alert">
    <div class="font-bold text-xl"> Debug </div>
    <div> Date String: {date.toDateString()} </div>
    <div> Date Locale String: {date.toLocaleDateString()}</div>
    <div> Date: {date.getDate()}</div>
    <div> Month: {date.getMonth()}</div>
    <div> Day: {date.getDay()}</div>
    <div> Year: {date.getFullYear()}</div>
    <div> Time: {date.getTime()}</div>
</div>