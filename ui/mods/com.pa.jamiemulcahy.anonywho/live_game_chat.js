(function () {
    // Intercept chat messages to anonymize sender names
    var originalChatHandler = handlers.chat_message;
    handlers.chat_message = function (payload) {
        // Anonymize player name for non-spectators
        // This covers both regular chat and server messages (disconnect/reconnect)
        // Server messages embed player_name into the message via loc()
        if (payload.player_name && !model.spectatorChat()) {
            payload.player_name = "Anonymous";
        }
        return originalChatHandler(payload);
    };
})();
