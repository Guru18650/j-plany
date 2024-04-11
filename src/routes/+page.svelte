

<script>
    import planM from "$lib/plany/M.json";
    import planJ from "$lib/plany/J.json";
	import mobile from "is-mobile";

	let tablePreparationM = [];
    let tablePreparationJ = [];

    let hoursM = [
	  "7:10",
      "8:00",
      "8:50",
      "9:50",
      "10:40",
      "11:30",
      "12:20",
      "13:20",
      "14:10",
      "15:00",
      "15:50",
      "16:40",
      "17:30",
    ]
	let hoursJ = [
	  "7:05",
      "7:55",
      "8:45",
      "9:35",
      "10:35",
      "11:25",
      "12:15",
      "13:05",
      "13:55",
      "14:45",
      "15:35",
      "16:25",
      "17:15",
    ]

	let J = false;

    for (let i = 0; i < 12; i++) {
      let tempRow = [hoursM[i]];
     planM.forEach(e => {
      if(e.lessons[i].name == undefined)
        tempRow.push({"name":"","status":""})
      else
        tempRow.push(e.lessons[i])
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
	if(today.getDay()>4)
	dayCounter = 0
	else
	dayCounter=today.getDay()
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
				  <th class="!font-light !w-1/5">Godzina</th>
				  <th class="!font-light !w-4/5">Lekcja 	||	{days[dayCounter]}</th>
				</tr>
			</thead>
			<tbody>
				{#if J}
				{#each planJ[dayCounter].lessons as row, i}
				<tr class="font-light">
					<td>{hoursJ[i]}</td>
					<td class={row.status}>{row.name==undefined ? "" : row.name}</td>
				</tr>
				{/each}
				{:else}
				{#each planM[dayCounter].lessons as row, i}
				<tr class="font-light">
					<td>{hoursM[i]}</td>
					<td class={row.status}>{row.name==undefined ? "" : row.name}</td>
				</tr>
				{/each}
				{/if}
			</tbody>
		</table>
	</div>
	</section>
</div>
{/if}