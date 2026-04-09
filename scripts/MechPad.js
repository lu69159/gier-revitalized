Events.on(ContentInitEvent, () => {
try{
const pad = Vars.content.block("gr-mechanical-pad");
  
pad.addBar("progress", e => new Bar("Progress",Pal.techBlue, () => e && e. buildProgress > 0 ? e. buildProgress : 0 ));
pad.stats.add(Stat.output, StatValue.content(pad.unitType));
              
} catch(e){
Vars.ui.showInfoText(e,10);
}}); 
