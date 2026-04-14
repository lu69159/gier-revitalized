Events.on(TapEvent, e => {
try{
const tile = e.tile;
const build = tile.build;
const block = tile.block();
const target = Vars.content.block("gr-note");

if (block != target || !build) return;
const stringBuild = build.message;
Vars.ui.showText("Note", stringBuild.toString());
Sounds.click.play();
  
} catch(e){
Vars.ui.showInfoToast(e,15); 
}});
