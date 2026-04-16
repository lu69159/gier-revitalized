Events.on(TapEvent, e => {
try{
const tile = e.tile;
const player = e.player;
if (!tile || !player) return;

const block = tile.block();
const console = Vars.content.block("gr-preformance-console");
const buildTeam = tile.team();
const playerTeam = player.team();
const selectBlock = player.selectedBlock;
if (block != console || selectBlock != null || buildTeam != playerTeam) return;

Vars.ui.showMenu("@preformance-console.title", "", 
[
["@preformance-console.showStat"]
]
, p => {
try{  
                
if (p == 0){
const stat = Vars.state.stats;

Vars.ui.showText("@preformance-console.option1.title",
"@preformance-console.option1.enemyKill" + stat.enemyUnitsDestroyed + "\n" +
"@preformance-console.option1.buildingsBuilt" + stat.buildingsBuilt         
)}


} catch(e){
Vars.ui.showInfoToast(e + " - PreformanceConsole - [red]Inner",5); 
}});

  
} catch(e){
Vars.ui.showInfoToast(e + " - PreformanceConsole",5); 
}});

/*
@preformance-console.option1.buildingsBuilt
@preformance-console.option1.enemyKill
@preformance-console.title
@preformance-console.showStat
@preformance-console.option1.title
*/
