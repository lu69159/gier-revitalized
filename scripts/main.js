// Team changes, showing gier and other stuff
require("Startup");

//    ### Class Overrides ###
// Subclass: Block
require("PowerButton"); // Requires to atleast have powerProduction
require("DamageBattery"); // Requires to atleast be able to have consumeBuffered
require("BrittleDrill"); // Could actually be anything lol
require("LaunchSilo"); // Required to shootConne on 180 and needs to be a turret that can shoot

// Subclass: Units
require("IFrameUnit");
require("EnrageUnit");
