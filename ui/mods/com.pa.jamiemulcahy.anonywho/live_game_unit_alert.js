(function () {
    // Subscribe to defeated army alerts to anonymize player names
    model.defeatedArmyAlerts.subscribe(function (changes) {
        _.forEach(changes, function (change) {
            if (change.status === 'added') {
                var defeated = change.value.defeated;
                var killer = change.value.killer;

                // Anonymize defeated player
                if (defeated.rawName === undefined)
                    defeated.rawName = defeated.name;
                var anonymousName = anonywho.getAnimalAlias(defeated.id);
                if (model.isSpectator())
                    defeated.name = defeated.rawName + " (Anonymous " + anonymousName + ")";
                else
                    defeated.name = "Anonymous " + anonymousName;

                // Anonymize killer if present
                if (killer) {
                    if (killer.rawName === undefined)
                        killer.rawName = killer.name;
                    anonymousName = anonywho.getAnimalAlias(killer.id);
                    if (model.isSpectator())
                        killer.name = killer.rawName + " (Anonymous " + anonymousName + ")";
                    else
                        killer.name = "Anonymous " + anonymousName;
                }
            }
        });
    }, null, "arrayChange");
})();
