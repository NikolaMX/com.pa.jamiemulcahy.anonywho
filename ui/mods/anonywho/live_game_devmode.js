(function () {
    // Wrap model.state to anonymize player names in devmode/sandbox viewer
    var stateValue = model.state;
    model.state = ko.pureComputed({
        read: function () {
            var state = stateValue();
            _.forEach(state.players, function (player) {
                // Cache original name on first access
                if (player.rawName === undefined)
                    player.rawName = player.name;

                var anonymousName = anonywho.getAnimalAlias(player.id);

                // Visibility rules:
                // - Spectators see: "RealName (Anonymous Animal)"
                // - Players see: "Anonymous Animal"
                if (state.spectator)
                    player.name = player.rawName + " (Anonymous " + anonymousName + ")";
                else
                    player.name = "Anonymous " + anonymousName;
            });
            return state;
        },
        write: stateValue
    });
})();
