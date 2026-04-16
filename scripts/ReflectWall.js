// A reflecting wall but for all bulletTypes

const blocks = [
"gr-reflectum-wall"
];

Events.on(BuildDamageEvent, e => {
try{
function deflect(bullet){
bullet.type.create(e.build, bullet.x, bullet.y, bullet.rotation() + 180);
}

for (let i = 0; i < blocks.length; i++){
if (e.build.block.name == blocks[i]){
deflect(e.source);
}}


} catch(e){
Vars.ui.showInfoToast(e,15);
}});
