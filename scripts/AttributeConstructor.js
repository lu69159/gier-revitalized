

// Main Logic behind the code will enable it if a block has carbon efficiency doesnt actually work tho
Events.on(TileChangeEvent, e => {
try{
const tile = e.tile;
const building = tile.build;

var x = tile.x;
var y = tile.y;

if (e.tile.block() != Vars.content.block("gr-fissure-amalgam")) return;

const rotation = building.rotation;

if (rotation == 0) x--;
else if (rotation == 1) y--;
else if (rotation == 2) x++;
else y++;

const worldTile = Vars.world.tile(x,y).block();
const tileWorld = Vars.world.tile(x,y)
if (!worldTile) return;
    
const attribute = worldTile.attributes.get(Attribute.get("beryllium"));
building.timeScale = attribute;

if (attribute <= 0){
building.enabled = false;

Fx.attackCommand.at(tileWorld.worldx(),tileWorld.worldy(),45)
Fx.unitEnvKill.at(tileWorld.worldx(),tileWorld.worldy());

} else {
Fx.upgradeCoreBloom.at(tileWorld.worldx(),tileWorld.worldy(),1);
}
    
} catch(e){
Vars.ui.showText("bruv",e);
}});



// Sets stats for the block
Events.on(ContentInitEvent, () =>{
try{

Vars.content.block("gr-fissure-amalgam").stats.add(Stat.tiles, StatValues.blocks(Attribute.get("beryllium"), false, 1, true, false));
Vars.content.block("gr-fissure-amalgam").stats.add(Stat.output, StatValues.content(Blocks.berylliumWall));
//Vars.content.block("gr-fissure-amalgam").addBar("ef", e => new Bar("Efficency", Pal.lightOrange, () => e && e.efficiency > 0 ? e.efficiency : 0));

} catch(e){
Vars.ui.showText("bruv",e);
}});
