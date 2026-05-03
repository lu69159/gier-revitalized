const {content} = Vars;
const attributes = require("Attributes");
const blocks = [
"gr-reinforced-structure"
];

Events.on(BuildDamageEvent, event => {
try {
const {build, source} = event;
const {lightBlock} = Fx;
const {targets} = build;
const {damage} = source;
let found = false;

for (let i = 0; i < blocks.length; i++){
if (build.block == content.block(blocks[i])) found = true;
}
  
if (!found || !build || !source || !lightBlock || !targets) return;
const healPerc = build.block.attributes.get(attributes.healPerc);
  
targets.each(b => {
try {
if (!b.damaged()) return;

b.heal(damage * 0.4);
lightBlock.at(b.x, b.y, b.block.size, Color.valueOf(build.block.baseColor));

} catch(e){
Vars.ui.showInfoToast(e + "[red] - StructureBlock - Inner", 5);
}});
  
} catch(e){
Vars.ui.showInfoToast(e + "[red] - StructureBlock", 5);
}});

Events.on(ClientLoadEvent, () => {
try {

for (let i = 0; i < blocks.length; i++){
const block = content.block(blocks[i]);
Vars.ui.content.show(block);
Vars.ui.content.hide();

block.stats.remove(Stat.repairTime);
}

} catch(e){
Vars.ui.showInfoToast(e + "[red] - StructureBlock - SetStats", 5);
}});
