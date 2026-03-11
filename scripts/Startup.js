

Events.on(ContentInitEvent, e => { 

Team.get(5).setPalette(Color.valueOf("8ecff5"));
Team.get(5).emoji = "[#8ecff5][]"; 

Team.get(4).setPalette(Color.valueOf("a66de3"));
Team.get(4).emoji = "[#a66de3][]"; 

Planets.gier.visible = true;
Planets.gier.accessible = true;
Planets.gier.alwaysUnlocked = true;
Planets.gier.clearSectorOnLose = true;

Planets.serpulo.generator.indirectPaths = true;
Planets.serpulo.generator.genLakes = true;

Vars.maxSchematicSize = 3064;
MapResizeDialog.maxSize = 2500;

  
Planets.gier.ruleSetter = r => {
r.waveTeam = Team.blue;
}

});


/// Startip dialog
Events.on(ClientLoadEvent, e => { 
try{
const display = Core.bundle.get("mod.gr.display");
const title = Core.bundle.get("mod.gr.mail");
  
Vars.ui.showText(title,display,Align.center);
} catch(e) {
Vars.ui.showText("Not work",e,Align.center);
}})
