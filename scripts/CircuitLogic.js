const statUnit = require("StatUnits");
const stat = require("Stats");
const blocks = [
"gr-circuit-wire"
];

Events.on(ClientLoadEvent, () => {
try {
for (let i = 0; i < blocks.length; i++){
const block = Vars.content.block(blocks[i]);
Vars.ui.content.show(block);
Vars.ui.content.hide();
  
const rate = block.attributes.get(Attribute.get("circuitRate"));
const circuitUnit = statUnit.circuitUnit;

block.stats.remove(stat.CircuitRate);
block.stats.add(stat.CircuitRate, rate, circuitUnit);
}
  
} catch(e){
Vars.ui.showText("CircuitLogic", e);  
}});
