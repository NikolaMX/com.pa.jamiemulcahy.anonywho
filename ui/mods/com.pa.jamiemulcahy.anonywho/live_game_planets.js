(function () {
    // Override faction-specific player icons with the standard MLA icon
    // Faction mods (Legion, Exiles, etc.) replace the static icon with a data-bound
    // model.commanderImage() function. We override it to always return the base icon.
    var standardIcon = "img/players_list_panel/icon_player_outline.png";
    model.commanderImage = function () {
        return standardIcon;
    };
})();
