var lastUnit = "";

Events.on(EventType.TapEvent, e => {
    try {
        if (!e || !e.tile || !e.player) return;

        const tile = e.tile;
        const player = e.player;

        if (!tile.block()) return;

        const block = tile.block();
        const build = tile.build;

        if (!build) return;
        const buildTeam = build.team;

        const target = Vars.content.getByName(ContentType.block, "gr-command-block");

        if (block != target) return;

        Sounds.click.at(build.x, build.y);

        Vars.ui.showMenu(
            "Commands List",
            "[lightgrey]Select one of your choosing",
            [
                ["Clear Units"],
                ["Stop Player"],
                ["Change Team"],
                ["Toggle canGameover"],
                ["Toggle Editor"],
                ["Toggle disableUnitCap"],
                ["Spawn Unit"],
                ["Get Current Unit"],
                ["Close"]
            ],
            i => {

                if (i == 0) {

                    Sounds.uiButton.play();
                    Groups.unit.clear();
                    Vars.ui.hudfrag.showToast(Icon.tree, "[green]All units cleared");

                } else if (i == 1) {
                    try {

                        Sounds.uiButton.play();
                        const p = Vars.player;
                        if (!p) {
                            Vars.ui.showInfoToast("no player", 3);
                            return;
                        }
                        const unit = p.unit();

                        if (!unit) {
                            Vars.ui.showInfoToast("no unit", 3);
                            return;
                        }

                        unit.apply(StatusEffects.unmoving, 9999 * 60);
                        Vars.ui.hudfrag.showToast(Icon.tree, "[grey]Stopped player unit");

                    } catch (err) {
                        Vars.ui.showInfoToast("err: " + err, 5);
                    }

                } else if (i == 2) {
                    try {

                        Sounds.uiButton.play();
                        const p = Vars.player;
                        if (!p || !p.unit()) {
                            Vars.ui.showInfoToast("no unit to change team", 3);
                            return;
                        }

                        const currentTeam = p.team();
                        const newTeam = (currentTeam == buildTeam ? Team.get(6) : buildTeam);

                        p.unit().setProp(LAccess.team, newTeam);
                        Vars.ui.hudfrag.showToast(Icon.tree, "[accent]Team changed");

                    } catch (err) {
                        Vars.ui.showInfoToast(String(err), 15);
                    }} else if (i == 3){
                        try{

                    Sounds.uiButton.play();
                    const gameOver = Vars.state.rules.canGameOver;
                    Vars.state.rules.canGameOver = !gameOver;

                    Vars.ui.hudfrag.showToast(Icon.tree, "[accent]Toggled canGameOver: [lightgrey]" + !gameOver);
                        
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);    
                    }} else if (i == 4){
                        try {

                    const editor = Vars.state.rules.editor;
                    Vars.state.rules.editor = !editor;

                    Vars.ui.hudfrag.showToast(Icon.tree, "[accent]Toggled editor: [lightgrey]" + !editor);
                             
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);  
                    }} else if (i == 5){
                        try{

                    Sounds.uiButton.play();
                    const disableUnitCap = Vars.state.rules.disableUnitCap;
                    Vars.state.rules.disableUnitCap = !disableUnitCap;

                    Vars.ui.hudfrag.showToast(Icon.tree, "[accent]Toggled disableUnitCap: [lightgrey]" + !disableUnitCap);
                            
                    } catch(e){
                    Vars.ui.showInfoToast(e,10);
                    }} else if (i == 6){
                        try{

                    Sounds.uiButton.play();
                    Vars.ui.showTextInput("SpawnUnit", "Enter Unit's Name", 100, lastUnit, false, text => {
                        try{
                    lastUnit = text;
                    const unit = Vars.content.getByName(ContentType.unit, text);

                    if (unit == null){
                    Vars.ui.hudfrag.showToast(Icon.search,"[red]Unit Invalid[]");
                    return;
                    }
                        
                    unit.spawn(buildTeam,build.x,build.y,90);
                    Sounds.waveSpawn.at(build.x,build.y);
                    Fx.spawn.at(build.x,build.y);
                            
                    Vars.ui.hudfrag.showToast(Icon.chat, "[accent]Spawned in a(n) []" + unit.localizedName);

                    } catch(e){
                    Vars.ui.showInfoToast(e,5);
                    }});

                            

                    } catch(e){
                    Vars.ui.showInfoToast(e,5);
                    }} else if (i == 7){
                        try{

                    Sounds.uiButton.play();
                    const unit = Vars.player.unit();
                    if (!unit) return;
                    const type = unit.type.name;
                    lastUnit = type;
                    Vars.ui.hudfrag.showToast(Icon.eye,"[lightgrey]Copied to spawn unit");
                            
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);
                    }}
            }
        );

    } catch (err) {
        Vars.ui.showInfoToast(String(err), 5);
    }
});
