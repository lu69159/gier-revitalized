// Team changes, showing gier and other stuff
require("Startup");

//    ### Class Overrides ###
// Subclass: Block
require("PowerButton"); // Requires to atleast have powerProduction
require("DamageBattery"); // Requires to atleast be able to have consumeBuffered
require("BrittleDrill"); // Could actually be anything lol
require("LaunchSilo"); // Required to shootConne on 180 and needs to be a turret that can shoot
require("CompactCore"); // Adapted to CoreBlocl but could be used for anything. Spawner is a turret that kills itself
require("Fabricator");

// Subclass: Units
require("IFrameUnit");
require("EnrageUnit");
require("ZapUnit");

// Mods
require("Modifiers");
