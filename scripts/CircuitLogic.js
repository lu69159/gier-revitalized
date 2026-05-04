const statUnit = require("StatUnits");
const stat = require("Stats");
// Blocks specifically Wires
const blocks = ["gr-circuit-wire"];

// Block stat setter
Events.on(ClientLoadEvent, () => {
try {
for (let i = 0; i < blocks.length; i++){
const block = Vars.content.block(blocks[i]);
Vars.ui.content.show(block);
Vars.ui.content.hide();
  
const rate = block.attributes.get(Attribute.get("circuitRate"));
const heatDamage = block.attributes.get(Attribute.get("circuitHeatDamage"));
const circuitUnit = statUnit.circuitUnit;

block.stats.remove(stat.CircuitRate);
block.stats.add(stat.CircuitRate, rate, circuitUnit);
block.stats.add(stat.CircuitHeatDamage, heatDamage);
}
  
} catch(e){
Vars.ui.showText("CircuitLogic", e);  
}});

// Main logic
Events.on(TapEvent, event => {
    try{
        const tile = event.tile;
        if(tile == null) return;

        const targetBlock = Vars.content.block("gr-signal");
        const wireBlock = Vars.content.block("gr-circuit-wire");
        let heating = [];
        if(!tile.build || tile.block() != targetBlock) return;

        function nearby(build){
        try {
        if (!build.build || build.block().rotate == false || build.block.size > 1 || Vars.state.isPaused() || !Vars.state.isPlaying()) return;
        const frontBuild = build.nearbyBuild(build.build.rotation); 
        if (!frontBuild || !build || frontBuild.block != wireBlock) return;
          
        const {block} = frontBuild;
        const circuitRate = block.attributes.get(Attribute.get("circuitRate"));
        const circuitHeatingDamage = block.attributes.get(Attribute.get("circuitHeatDamage"));
          
        Fx.absorb.at(frontBuild.x, frontBuild.y, frontBuild.block.size);
        Sounds.shootSegment.at(frontBuild.x, frontBuild.y);
        
        for (let i = 0; i < heating.length; i++){
        if (heating[i] == frontBuild) {
        frontBuild.damage(circuitHeatingDamage);
        heating.splice(i, 1);
        Fx.turbinegenerate.at(frontBuild.x, frontBuild.y);
        return;
        }
        }
        
        heating.push(frontBuild);
        if (heating.length > 225) heating.shift();
        
        Time.run((1/circuitRate) * 60, () => {
        try {
        if (!frontBuild || !frontBuild.isValid() || Vars.state.isPaused() || !Vars.state.isPlaying()) return;
        if (!frontBuild.tile || !heating) return;

        nearby(frontBuild.tile);
        } catch(e){
        Vars.ui.showInfoToast(e + "[red] - inner2", 5); 
        }});
            
        } catch(e){
        Vars.ui.showInfoToast(e + "[red] - Inner", 5);   
        }}

        Fx.generate.at(tile.worldx(), tile.worldy());
        tile.block().configureSound.at(tile.worldx(), tile.worldy());
        nearby(tile);

    }catch(e){
        Vars.ui.showInfoToast(String(e) + "[red] - Outer", 5);
    }
});
