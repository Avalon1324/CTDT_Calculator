function getSetOptions(sets) {
    var setPlayers = PlayerStats;
    var playerNames = Object.keys(setPlayers);
    playerNames.sort();
    var setOptions = [];
    var idNum = 0;
    for (var i = 0; i < playerNames.length; i++) {
        var playerName = playerNames[i];
        setOptions.push({
            player: playerName,
            text: playerName
        });
        if (playerName in setPlayers) {
            var setNames = Object.keys(setPlayers[playerName]);
            for (var j = 0; j < setNames.length; j++) {
                var setName = setNames[j];
                setOptions.push({
                    player: playerName,
                    set: setName,
                    text: playerName + " (" + setName + ")",
                    id: playerName + " (" + setName + ")",
                    isCustom: setPlayers[playerName][setName].isCustomSet,
                    nickname: setPlayers[playerName][setName].nickname || ""
                });
            }
        }
    }
    return setOptions;
}

$(".LoadPlayers").change(function () {
	var fullSetName = $(this).val();
	var playerName, setName;
	playerName = fullSetName.substring(0, fullSetName.indexOf(" ("));
	setName = fullSetName.substring(fullSetName.indexOf("(") + 1, fullSetName.lastIndexOf(")"));
	var player = PlayerStats[playerName];
	if (player) {
        var playerObj = $(this).closest(".LoadPlayers");
        var _playerStats = PlayerStats[playerName][setName]
        alert(_playerStats.Defense);
	}
});

function loadDefaultLists() {
    $(".LoadPlayers").select2({
        formatResult: function (object) {
            return object.set ? ("&nbsp;&nbsp;&nbsp;" + object.set) : ("<b>" + object.text + "</b>");
        },
        query: function (query) {
            var pageSize = 30;
            var results = _.filter(getSetOptions(), function (option) {
                var playerName = option.player.toUpperCase();
                return !query.term || query.term.toUpperCase().split(" ").every(function (term) {
                    return playerName.indexOf(term) === 0 || playerName.indexOf("-" + term) >= 0 || playerName.indexOf(" " + term) >= 0;
                });
            });
            query.callback({
                results: results.slice((query.page - 1) * pageSize, query.page * pageSize),
                more: results.length >= query.page * pageSize
            });
        },
        initSelection: function (element, callback) {
            var data = getSetOptions()[1];
            callback(data);
        }
    });
}

$(document).ready(function () {

  loadDefaultLists();
});


