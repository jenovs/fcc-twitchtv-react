function channelList() {
    let channels = ["freecodecamp", "noobs2ninjas", "monstercat", "esl_sc2", "OgamingSC2", "comster404", "nocopyrightsounds", "ninety9lives", "spinninrecords"];
    channels.forEach(function(item) {
        let urlChannel = "https://api.twitch.tv/kraken/channels/" + item + "?callback=?",
            urlStream = "https://api.twitch.tv/kraken/streams/" + item + "?callback=?";
        $.getJSON(urlStream, function(data) {
            let stream,
                streamClass,
                gameIco;
            if (data.stream === null) {
                stream = 'Offline';
                streamClass = 'offline';
            } else if (data.stream === undefined) {
                stream = 'Account doesn\'t exist';
                streamClass = 'offline';
            } else {
                stream = data.stream.channel.status;
                streamClass = 'online';

                // set channel type icon
                switch (data.stream.game) {
                    case "Music":
                        gameIco = "music";
                        break;
                    case "Creative":
                        gameIco = "code"
                        break;
                    default:
                        gameIco = "gamepad";
                }
            }

            $.getJSON(urlChannel, function(data) {

                let display_name = data.display_name || item;

                let logo = data.logo;
                if (!logo) {
                    logo = "https://s3.amazonaws.com/vj-files/images/no_logo.png";
                }
                let followers = "";
                if (data.followers) {
                  followers = "Followers: " + data.followers;
                }


                let html = "<div id='" + item + "' class='channel item " +
                    streamClass + "' onclick='openChannel(this)'><div class='logo'><img src='" +
                    logo + "'></div><div class='chan-name'><div class='name'>" +
                    display_name + "</div><div class='descr'>" +
                    stream + "</div><div class='followers'>" + followers +"</div></div><div class='gameIco'><i class='fa fa-" +
                    gameIco + "' aria-hidden='true'></i></div></div>";

                (streamClass === 'online') ? $('#channels').prepend(html): $('#channels').append(html);
            }); // end of channels JSON

        }); // end of streams JSON

    }); // end of forEach
};

function openChannel(item) {
    window.open("https://www.twitch.tv/" + item.id);
}

function main() {
    channelList();
    $("#filterAll").addClass("highlight");
    $("#filterOnline").click(function() {
        $(".offline").slideUp();
        $(".online").slideDown();
        $(this).addClass("highlight");
        $("#filterOffline").removeClass("highlight");
        $("#filterAll").removeClass("highlight");
    });

    $("#filterOffline").click(function() {
        $(".online").slideUp();
        $(".offline").slideDown();
        $(this).addClass("highlight");
        $("#filterOnline").removeClass("highlight");
        $("#filterAll").removeClass("highlight");
    });

    $("#filterAll").click(function() {
        $(".online").slideDown();
        $(".offline").slideDown();
        $(this).addClass("highlight");
        $("#filterOffline").removeClass("highlight");
        $("#filterOnline").removeClass("highlight");
    });

}; // end of main() function

$(document).ready(main);
