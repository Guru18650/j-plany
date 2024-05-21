

<script>
    import planM from "$lib/plany/M.json";
    import planJ from "$lib/plany/J.json";
	import mobile from "is-mobile";

	let tablePreparationM = [];
    let tablePreparationJ = [];

    let hoursM = [
	  "7:10 - 7:55",
      "8:00 - 8:45",
      "8:50 - 9:35",
      "9:50 - 10:35",
      "10:40 - 11:25",
      "11:30 - 12:15",
      "12:20 - 13:05",
      "13:20 - 14:05",
      "14:10 - 14:55",
      "15:00 - 15:45",
      "15:50 - 16:35",
      "16:40 - 17:25",
      "17:30 - 18:15",
      "18:25 - 19:10",
      "19:15 - 20:00",
    ]
	let hoursJ = [
	  "7:05 - 7:50",
      "7:55 - 8:40",
      "8:45 - 9:30",
      "9:35 - 10:20",
      "10:35 - 11:20",
      "11:25 - 12:10",
      "12:15 - 13:00",
      "13:05 - 13:50",
      "13:55 - 14:40",
      "14:45 - 15:30",
      "15:35 - 16:20",
      "16:25 - 17:10",
      "17:15 - 18:00",
    ]

	let J = false;

    for (let i = 0; i < 15; i++) {
      let tempRow = [hoursM[i]];
     planM.forEach(e => {
	
	try {
		if(e.lessons[i].name == undefined)
        tempRow.push({"name":"","status":""})
      else
        tempRow.push(e.lessons[i])
	} catch (error) {
        tempRow.push({"name":"","status":""})
	}	
    
     });
     tablePreparationM.push(tempRow);
    }

	for (let i = 0; i < 12; i++) {
      let tempRow = [hoursJ[i]];
     planJ.forEach(e => {
	
      if(e.lessons[i].name == undefined)
        tempRow.push({"name":"","status":""})
      else
        tempRow.push(e.lessons[i])
     });
     tablePreparationJ.push(tempRow);
    }

	let days = [
		"Poniedziałek",
		"Wtorek",
		"Środa",
		"Czwartek",
		"Piątek",
	]

	let dayCounter = 0;
	let today = new Date();
	if(today.getDay()>5)
	dayCounter = 0
	else
	dayCounter=today.getDay()-1
  </script>
  
	{#if mobile()==false}  
  <div class="table-container max-w-[1800px] m-auto">
  <table class="table table-compact">
	<thead>
      <tr>
        <th>Godzina</th>
        <th>Poniedziałek</th>
        <th>Wtorek</th>
        <th>Środa</th>
        <th>Czwartek</th>
        <th>Piątek</th>
      </tr>
    </thead>
    <tbody>
      {#each tablePreparationM as row}
        <tr>
          <td class="text-center">{row[0]}</td>
          <td class={row[1].status}>{row[1].name}</td>
          <td class={row[2].status}>{row[2].name}</td>
          <td class={row[3].status}>{row[3].name}</td>
          <td class={row[4].status}>{row[4].name}</td>
          <td class={row[5].status}>{row[5].name}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
<div class="table-container max-w-[1800px] m-auto mt-10">
	<table class="table table-compact">
	  <thead>
		<tr>
		  <th>Godzina</th>
		  <th>Poniedziałek</th>
		  <th>Wtorek</th>
		  <th>Środa</th>
		  <th>Czwartek</th>
		  <th>Piątek</th>
		</tr>
	  </thead>
	  <tbody>
		{#each tablePreparationJ as row}
		  <tr>
			<td class="text-center">{row[0]}</td>
			<td class={row[1].status}>{row[1].name}</td>
			<td class={row[2].status}>{row[2].name}</td>
			<td class={row[3].status}>{row[3].name}</td>
			<td class={row[4].status}>{row[4].name}</td>
			<td class={row[5].status}>{row[5].name}</td>
		  </tr>
		{/each}
	  </tbody>
	</table>
  </div>
{:else}
<div class="card">
	<header class="card-header">
		<div class="btn-group variant-filled-secondary w-full">
			<button class={J ? "w-auto btn variant-ringed-secondary" : "w-auto btn variant-filled-tertiary hover:variant-filled-tertiary"} on:click={() => {J = false;}}>Michał</button>
			<button class={!J ? "w-auto btn variant-ringed-secondary" : "w-auto btn variant-filled-tertiary hover:variant-filled-tertiary"} on:click={() => {J = true;}}>Julcia</button>
			<button type="button" class="btn variant-filled-pr w-1/4 hover:variant-filled-secondary" on:click={() => {dayCounter = (dayCounter-1)%5;
				if(dayCounter<0)
				dayCounter+=5}}>&#60</button>
			<button type="button" class="btn variant-filled-secondary w-1/4 hover:variant-filled-secondary" on:click={() => {dayCounter = (dayCounter+1)%5;}}>&#62</button>
		
		</div>
		<div class="flex mt-2">
		</div>
	</header>
	<section class="p-2">
		<div class="table-container overflow-hidden">
		<table class="table">
			<thead>
				<tr>
				  <th class="!font-light !w-1/5 text-center">Godzina</th>
				  <th class="!font-light !w-4/5 text-center">{days[dayCounter]}</th>
				</tr>
			</thead>
			<tbody>
				{#if J}
				{#each planJ[dayCounter].lessons as row, i}
				<tr class="font-light">
					<td class="text-center">{hoursJ[i]}</td>
					<td class={row.status}>{row.name==undefined ? "" : row.name}</td>
				</tr>
				{/each}
				{:else}
				{#each planM[dayCounter].lessons as row, i}
				<tr class="font-light">
					{#if i != 0}
					{#if row.span != undefined || planM[dayCounter].lessons[i-1].span != undefined}
					<td class="text-center h-12"></td>
					{:else}
					<td class="text-center">{hoursM[i]}</td>
					{/if}
					{:else}
					<td class="text-center">{hoursM[i]}</td>

					{/if}
					
				{#if row.span != undefined}
				<td rowspan={row.span} class={row.status+" !align-middle"}>{row.name}</td>
				{:else}
				<td class={row.status}>{row.name==undefined ? "" : row.name}</td>
				{/if}
				</tr>
				{/each}
				{/if}
			</tbody>
		</table>
	</div>
	</section>
</div>
{/if}