const blocks = [
"gr-extractor-bastion"
]

function constructDroneBay(string){
const block = Vars.content.block(string);
if (block && block instanceof DroneCenter){
block.stats.add(Stat.output, StatValues.content(block.droneType));
block.stats.add(drones, block.unitsSpawned);
block.stats.add(buildTime, (block.droneConstructTime/60));
}}

Events.on(ContentInitEvent, () => {
try{
const drones = new Stat("drones", StatCat.crafting);
const buildTime = new Stat("buildTime", StatCat.crafting)

for (let i = 0; i < blocks.length; i++){
constructDroneBay(blocks[i]);
}
  
} catch(e){
Vars.ui.showText("bruv",e);
}});
