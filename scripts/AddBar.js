const blocks = [
"gr-sunder-furnace",
"gr-oxidization-reactor"
]

Events.on(ContentInitEvent, () => {
try{

function giveBar(string){
const block = Vars.content.block(string);
if (!block) return;
  
block.addBar("progress", e => new Bar(
"Process", 
Pal.lightOrange,
() => e && e.progress > 0 ? e.progress : 0));
}

for (let i = 0; i < blocks.length; i++){
giveBar(blocks[i]);
}
  
} catch(e){
Vars.ui.showInfoToast(e,15);
}});
