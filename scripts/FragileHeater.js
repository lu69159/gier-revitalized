const blocks = [
"gr-boiler"
];

Events.on(BuildDamageEvent, e => {
try {
const bullet = e.source;
const build = e.build;
let found = false;

for (let i = 0; i < blocks.length; i++){
if (build.block == Vars.content.block(blocks[i]) found == true;
}

if (found == false) return;
const heat = build.heat;

if (heat < heatRequirement) return;

const damageInc = bullet.damage / 2;
build.damage(damageInc);
const recol = Fx.hitBeam.wrap(Color.valueof("ffd37fff"));
recol.at(bullet.x, bullet.y);
  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
