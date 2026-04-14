Events.on(WorldLoadEvent, () => {
try{
if (Core.settings.getBool("deranged") == true && Vars.state.isCampaign()){        
const rule = Vars.state.rules;
rule.unitBuildSpeedMultiplier = 0.65
rule.unitCrashDamageMultiplier = 1.5;
rule.ghostBlocks = false;
rule.deconstructRefundMultiplier = 0;
rule.fog = true;
rule.lighting = true;
  
}} catch(e){
Vars.ui.showText("bruv",e);
}});
