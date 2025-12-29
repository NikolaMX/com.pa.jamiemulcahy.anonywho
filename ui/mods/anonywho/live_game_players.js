(function () {
    // Wrap model.players to anonymize player names
    var playersValue = model.players;
    model.players = ko.computed(function () {
        var players = playersValue();
        _.forEach(players, function (player) {
            // Cache original name on first access
            if (player.rawName === undefined)
                player.rawName = player.name;

            var anonymousName = anonywho.getAnimalAlias(player.id);

            // Visibility rules:
            // - Spectators see: "RealName (Anonymous Animal)"
            // - Self sees: "RealName (Anonymous Animal)"
            // - Others see: "Anonymous Animal"
            if (model.isSpectator() || player.id === model.orginalArmyId())
                player.name = player.rawName + " (Anonymous " + anonymousName + ")";
            else
                player.name = "Anonymous " + anonymousName;
        });
        return players;
    });

    // Wrap model.sortedPlayersArray to shuffle player display order
    var sortedPlayersArrayValue = model.sortedPlayersArray;
    model.sortedPlayersArray = ko.computed(function () {
        var teams = sortedPlayersArrayValue();
        // Shuffle players within each team
        _.forEach(teams, function (players) {
            players.sort(function (a, b) {
                return anonywho.hash(b.id) - anonywho.hash(a.id);
            });
        });
        // Shuffle team order
        teams.sort(function (a, b) {
            return anonywho.hash(b[0].id) - anonywho.hash(a[0].id);
        });
        return teams;
    });
})();
