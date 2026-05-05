const statUnit = require("StatUnits");
const stat = require("Stats");
// Blocks specifically Wires
const blocks = ["gr-circuit-wire", "gr-circuit-splitter"];
// Blocks with special functions
const other = ["gr-power-cell", "gr-circuit-splitter"];


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
        let distance = 0;
        if(!tile.build || tile.block() != targetBlock) return;

        function nearby(build){
        try {
        if (!build.build || build.block().rotate == false || build.block.size > 1 || Vars.state.isPaused() || !Vars.state.isPlaying()) return;
        const frontBuild = build.nearbyBuild(build.build.rotation); 

        let found = false;
        let index = -1;
        if (!frontBuild || !build) return;

        for (let i = 0; i < other.length; i++){
        if (frontBuild.block.name == other[i]){
        found = true;
        index = i;
        }
        }
          
        if (frontBuild.block != wireBlock && !found) return;

        distance++;
        const {block} = frontBuild;
        const circuitRate = block.attributes.get(Attribute.get("circuitRate"));
        const circuitHeatingDamage = block.attributes.get(Attribute.get("circuitHeatDamage"));
          
        Fx.absorb.at(frontBuild.x, frontBuild.y, block.size);
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
        if (distance >= 225) return;
        
        if (found){
        // PowerCell Function
        if (index == 0){
        if (frontBuild.power.graph.getBatteryStored() < 45) return;
        frontBuild.power.graph.transferPower(-45);
        Fx.generate.at(build.x,build.y);
        frontBuild.block.configureSound.at(build.x,build.y);

        Sounds.shootPulsar.at(frontBuild.x, frontBuild.y);
        Lightning.create(frontBuild.team, frontBuild.team.color, 35, frontBuild.x, frontBuild.y, Mathf.random(360), 25);
          
        // Circuit Splitter Function
        } else if (index == 1){
          
        Time.run((1/circuitRate) * 60, () => {
        if (!frontBuild || !frontBuild.isValid() || !frontBuild.tile) return;
          
        const front = frontBuild.front();
        const left = frontBuild.left();
        const right = frontBuild.right();
          
        if (front) nearby(front.tile);
        if (left) nearby(left.tile);
        if (right) nearby(right.tile);
        });
          
        }
        return;
        }

          
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
