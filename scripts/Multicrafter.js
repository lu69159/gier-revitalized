var lastBuild = null;
const stats = require("Stats");

Events.on(ClientLoadEvent, () => {
try {
const block = Vars.content.block("gr-sealent-capsule");
Vars.ui.content.show(block);
Vars.ui.content.hide();

const seq = new Seq();
seq.add(Vars.content.item("gr-water-capsule"));
seq.add(Vars.content.item("gr-steam-capsule"));
  
block.stats.add(stats.Recipe, StatValues.content(seq));
block.stats.remove(Stat.input);
block.stats.output(Stat.output);

} catch(e){
Vars.ui.showText("Oh no", e);
}});

Events.on(TapEvent, e => {
try{
const tile = e.tile;
const block = tile.block();
const player = e.player;
const build = tile.build;
  
if (build != lastBuild){
lastBuild = build;
return;
}


// Multicrafter logic  
if ( !build || player.team() != build.team || player.selectedBlock != null) return;

const health = tile.build.health;
const crafters = [
Vars.content.block("gr-sealent-capsule"),
Vars.content.block("gr-sealent-capsule-steam")
];

if (block == crafters[0] || block == crafters[1]){
Sounds.click.at(tile.worldx(),tile.worldy());
}

const buildTeam = build.team;

const blockTile = build.tile;
if (block == crafters[0]){
blockTile.setBlock(crafters[1], buildTeam);
} else if (block == crafters[1]) {
blockTile.setBlock(crafters[0], buildTeam);
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
