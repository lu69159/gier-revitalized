

Events.on(ContentInitEvent, e => { 

Team.get(5).setPalette(Color.valueOf("8ecff5"));
Team.get(5).emoji = "[#8ecff5][]"; 

Team.get(4).setPalette(Color.valueOf("a66de3"));
Team.get(4).emoji = "[#a66de3][]"; 

Planets.gier.visible = true;
Planets.gier.accessible = true;
Planets.gier.alwaysUnlocked = true;
Planets.gier.clearSectorOnLose = true;

Vars.maxSchematicSize = 3064;

Planets.gier.ruleSetter = r => {
r.waveTeam = Team.blue;
}

});
