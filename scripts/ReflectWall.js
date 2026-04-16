const block = [
"gr-reflectum-wall"
];

Events.on(BuildDamageEvent, e => {
try{
function deflect(bullet){
bullet.type.create(e.build, bullet.x, bullet.y, bullet.rotation() + 180);
}

for (let i = 0; i < blocks.length; i++){
if (build.block.name == blocks[i]){
deflect(source);
}}


} catch(e){
Vars.ui.showInfoToast(e,15);
}});
