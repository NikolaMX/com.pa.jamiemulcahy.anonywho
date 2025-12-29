(function () {
    // Animal list for aliases (74 animals from AAM)
    var animals = [
        "Alligator", "Anteater", "Armadillo", "Auroch", "Axolotl",
        "Badger", "Bat", "Bear", "Beaver", "Buffalo",
        "Camel", "Capybara", "Chameleon", "Cheetah", "Chinchilla",
        "Chipmunk", "Chupacabra", "Cormorant", "Coyote", "Crow",
        "Dingo", "Dinosaur", "Dog", "Dolphin", "Duck",
        "Elephant", "Ferret", "Fox", "Frog",
        "Giraffe", "Gopher", "Grizzly",
        "Hedgehog", "Hippo", "Hyena",
        "Ibex", "Ifrit", "Iguana",
        "Jackal",
        "Kangaroo", "Koala", "Kraken",
        "Lemur", "Leopard", "Liger", "Lion", "Llama", "Loris",
        "Manatee", "Mink", "Monkey", "Moose",
        "Narwhal", "Nyan Cat",
        "Orangutan", "Otter",
        "Panda", "Penguin", "Platypus", "Pumpkin", "Python",
        "Quagga",
        "Rabbit", "Raccoon", "Rhino",
        "Sheep", "Shrew", "Skunk", "Squirrel",
        "Tiger", "Turtle",
        "Walrus", "Wolf", "Wolverine", "Wombat"
    ];

    // XOR-based hash function for consistent pseudo-random ordering
    function hash(y) {
        y = y ^ (y << 13);
        y = y ^ (y >> 17);
        y = y ^ (y << 15);
        return y;
    }

    // Global namespace for anonywho utilities
    window.anonywho = {
        animals: animals,
        hash: hash,
        getAnimalAlias: function (playerId) {
            return animals[playerId % animals.length];
        }
    };
})();
