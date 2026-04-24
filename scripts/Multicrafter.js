// Extra stats
Events.on(BlockInfoEvent, e => {
try{
//Vars.ui.showInfoToast("open",10);

const selectBlock = Vars.player.selectedBlock;
const block = Vars.content.block("gr-sealent-capsule");

if (selectBlock != block) return;

const cont = Vars.ui.content.cont;
if (!cont) return;

    
} catch(e){
Vars.ui.showInfoToast(e,10);
}});

var lastBuild = null;

Events.on(TapEvent, e => {
try{
const tile = e.tile;
const block = tile.block();
const player = e.player;
const build = tile.build;
const health = build.health;
  
if (build != lastBuild){
lastBuild = build;
return;
}


// Multicrafter logic  
if (player.team() != tile.team() || player.selectedBlock != null) return;

const crafters = [
Vars.content.block("gr-sealent-capsule"),
Vars.content.block("gr-sealent-capsule-steam")
];

if (block == crafters[0] || block == crafters[1] || block == crafters[2]){
Sounds.click.at(tile.worldx(),tile.worldy());
}

const buildTeam = build.team;

const blockTile = build.tile;
if (block == crafters[0]){
blockTile.setBlock(crafters[1], buildTeam);
} else if (block == crafters[1]) {
blockTile.setBlock(crafters[2], buildTeam);
} else {
return;
}

if (blockTile.block() != block){
Fx.select.at(blockTile.worldx(),blockTile.worldy());
blockTile.build.health = health;
lastBuild = null;
}
  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
