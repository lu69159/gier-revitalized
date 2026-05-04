const statUnit = require("StarUnits");
const stat = require("Stat");
const block = [
"gr-circuit-wire"
];

Events.on(ClientLoadEvent, () => {
try {
for (let i = 0; i < block.length; i++){
const block = Vars.content.block(block[i]);
const rate = block.attributes.get(Attribute.get("circuitRate"));
const circuitUnit = statUnit.circuitUnit;

block.stats.remove(stat.circuitSpeed);
block.stats.add(stat.circuitSpeed, rate, circuitUnit);
}
  
} catch(e){
Vars.ui.showText("CircuitLogic", e);  
}});
