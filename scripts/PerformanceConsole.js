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

Vars.ui.showMenu("@performance-console.title", "", 
[
["@performance-console.showStat"],
["@performance-console.dedrone"]
]
, p => {
try{  
                
if (p == 0){
try{
const stat = Vars.state.stats;
const points = (stat.enemyUnitsDestroyed + stat.buildingsBuilt) * ((stat.wavesLasted * 0.45) + 1);

Vars.ui.showText("@performance-console.option1.title",
Core.bundle.format("performance-console.option1.enemyKill") + stat.enemyUnitsDestroyed + "\n" +
Core.bundle.format("performance-console.option1.buildingsBuilt") + stat.buildingsBuilt + "\n\n" +
Core.bundle.format("performance-console.option1.points") + points
} catch(e){
Vars.ui.showInfoToast(e + " - PreformanceConsole - [red]Inner",5); 
}} else if (p == 1){
try{

const facility = Vars.content.getByName(ContentType.block,"gr-drone-facility");
const dropzone = Vars.content.getByName(ContentType.block,"gr-facility-dropzone");
            
Vars.ui.hudfrag.showToast(new TextureRegionDrawable(Core.atlas.find("gr-dedrone") , "[tan]Dedrone[red] Enabled");
Vars.state.rules.bannedBlocks.add(facility);
Vars.state.rules.bannedBlocks.add(dropzone);

} catch(e){
Vars.ui.showInfoToast(e + " - PerformanceConsole - [red]Inner",5); 
}}
);


} catch(e){
Vars.ui.showInfoToast(e + " - PerformanceConsole - [red]Inner",5); 
}});

} catch(e){
Vars.ui.showInfoToast(e + " - PerformanceConsole",5); 
}});

/*
@preformance-console.option1.buildingsBuilt
@preformance-console.option1.enemyKill
@preformance-console.title
@preformance-console.showStat
@preformance-console.option1.title
*/
