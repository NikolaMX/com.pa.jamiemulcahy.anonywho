(function () {
    // Wrap handlers.state to anonymize the game start cinematic
    var originalStateHandler = handlers.state;
    handlers.state = function (config) {
        var teams = config.teams || [];

        // Shuffle team order using our hash function for consistency
        teams.sort(function (a, b) {
            var aId = a.players[0] ? a.players[0].id : 0;
            var bId = b.players[0] ? b.players[0].id : 0;
            return anonywho.hash(bId) - anonywho.hash(aId);
        });

        // Process each team
        _.forEach(teams, function (team) {
            // Shuffle players within team
            team.players.sort(function (a, b) {
                return anonywho.hash(b.id) - anonywho.hash(a.id);
            });

            // Anonymize each player
            _.forEach(team.players, function (player) {
                // Blank name - cinematic shouldn't reveal identities
                player.name = "";
                // Set color to white to hide team colors
                player.color = [[255, 255, 255], [255, 255, 255]];
            });
        });

        return originalStateHandler(config);
    };
})();
