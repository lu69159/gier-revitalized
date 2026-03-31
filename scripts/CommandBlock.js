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
                ["Close"]
            ],
            i => {

                if (i == 0) {
                    Groups.unit.clear();
                    Vars.ui.showInfoToast("[green]All units cleared", 5);

                } else if (i == 1) {
                    try {
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
                        Vars.ui.showInfoToast("[grey]Stopped player unit", 5);

                    } catch (err) {
                        Vars.ui.showInfoToast("err: " + err, 5);
                    }

                } else if (i == 2) {
                    try {
                        const p = Vars.player;
                        if (!p || !p.unit()) {
                            Vars.ui.showInfoToast("no unit to change team", 3);
                            return;
                        }

                        const currentTeam = p.team();
                        const newTeam = (currentTeam == buildTeam ? Team.get(6) : buildTeam);

                        p.unit().setProp(LAccess.team, newTeam);
                        Vars.ui.showInfoToast("[accent]Team changed", 5);

                    } catch (err) {
                        Vars.ui.showInfoToast(String(err), 15);
                    }} else if (i == 3){
                        try{
                        
                    const gameOver = Vars.state.rules.canGameOver;
                    Vars.state.rules.canGameOver = !gameOver;

                    Vars.ui.showInfoToast("[accent]Toggled canGameOver: [lightgrey]" + !gameOver, 5);
                        
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);    
                    }} else if (i == 4){
                        try {

                    const editor = Vars.state.rules.editor;
                    Vars.state.rules.editor = !editor;

                    Vars.ui.showInfoToast("[accent]Toggled editor: [lightgrey]" + !editor, 5);
                             
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);  
                    }} else if (i == 5){
                        try{

                    const disableUnitCap = Vars.state.rules.disableUnitCap;
                    Vars.state.rules.disableUnitCap = !disableUnitCap;

                    Vars.ui.showInfoToast("[accent]Toggled disableUnitCap: [lightgrey]" + !disableUnitCap, 5);
                            
                    } catch(e){
                    Vars.ui.showInfoToast(e,10);
                    }}
            }
        );

    } catch (err) {
        Vars.ui.showInfoToast(String(err), 5);
    }
});
