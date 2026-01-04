(function () {
    // Override faction-specific player icons with the standard MLA icon
    // Faction mods (Legion, Exiles, etc.) replace the static icon with a data-bound
    // model.commanderImage() function. We override it to always return the base icon.
    var standardIcon = "img/players_list_panel/icon_player_outline.png";
    model.commanderImage = function () {
        return standardIcon;
    };

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
        var myId = model.orginalArmyId();

        // Shuffle players within each team
        _.forEach(teams, function (players) {
            players.sort(function (a, b) {
                return anonywho.hash(b.id) - anonywho.hash(a.id);
            });
        });

        // Find player's team and separate it from others
        var myTeam = null;
        var otherTeams = [];
        _.forEach(teams, function (team) {
            var isMyTeam = _.some(team, function (player) {
                return player.id === myId;
            });
            if (isMyTeam) {
                myTeam = team;
            } else {
                otherTeams.push(team);
            }
        });

        // Shuffle other teams
        otherTeams.sort(function (a, b) {
            return anonywho.hash(b[0].id) - anonywho.hash(a[0].id);
        });

        // Put player's team first, then shuffled others
        var result = myTeam ? [myTeam].concat(otherTeams) : otherTeams;
        return result;
    });
})();
