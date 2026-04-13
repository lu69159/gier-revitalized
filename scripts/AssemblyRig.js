const blocks = [
"gr-ruthless-block"
]

Events.on(ClientLoadEvent, () => {
try{

function assemblyRigBuild(string){
const block = Vars.content.block(string);
Vars.ui.content.show(block);
Vars.ui.content.hide();

const stats = block.stats;
stats.remove(Stat.ammo);
stats.remove(Stat.inaccuracy);
stats.remove(Stat.reload);
stats.remove(Stat.targetsAir);
stats.remove(Stat.targetsGround);
}

for (let i = 0; i < blocks.length; i++){
assemblyRigBuild(blocks[i]);
}
  

} catch(e){
Vars.ui.showInfoToast(e,15);
}});
