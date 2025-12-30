(function () {
    var preferredColors = anonywho.preferredColors;

    // Find the current player's slot in the lobby
    var getThisPlayerSlot = function () {
        var armies = model.armies();
        for (var i = 0; i < armies.length; i++) {
            var army = armies[i];
            if (!army.armyContainsThisPlayer()) {
                continue;
            }
            var slots = army.slots();
            for (var j = 0; j < slots.length; j++) {
                var slot = slots[j];
                if (slot.containsThisPlayer()) {
                    return slot;
                }
            }
        }
    };

    // Assign a random color from the preferred palette
    var setPreferredColor = function (slot) {
        var colors = model.colors();
        if (!colors.length) {
            return;
        }

        // Check if current color is already in preferred palette
        var current = colors[slot.colorIndex()];
        if (current && preferredColors.indexOf(current.color) > -1) {
            return;
        }

        // Find available colors that are in the preferred palette
        var available = [];
        for (var i = 0; i < colors.length; i++) {
            var color = colors[i];
            if (!color.taken && preferredColors.indexOf(color.color) > -1) {
                available.push(i);
            }
        }

        // Randomly select one
        if (available.length) {
            var newColor = available[_.random(available.length - 1)];
            slot.colorIndex(newColor);
        }
    };

    // Hook handlers.players to randomize color when player list updates
    $(document).ready(function () {
        var originalHandler = handlers.players;
        handlers.players = function (payload, force) {
            originalHandler.apply(handlers, arguments);
            var slot = getThisPlayerSlot();
            if (slot) {
                setPreferredColor(slot);
            }
        };
    });
})();
