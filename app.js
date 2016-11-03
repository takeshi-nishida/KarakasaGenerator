"use strict";
var karakasa_svg_1 = require("karakasa-svg");
var $ = require("jquery");
var names = ["西田 健志", "西田 健志", "西田 健志", "西田 健志", "西田 健志", "西田 健志", "西田 健志", "西田 健志"];
var messages = ["消極性", "デザイン", "宣言"];
var base64data;
window.onload = function () {
    var inputNames = $('#inputNames');
    var inputMessage = $('#inputMessage');
    var inputWidth = $('#inputWidth');
    var inputHeight = $('#inputHeight');
    var inputFontSize = $('#inputFontSize');
    var inputMessageSize = $('#inputMessageSize');
    var downloadSVG = $('#downloadSVG');
    var downloadPNG = $('#downloadPNG');
    var svgResult = $('#result');
    inputNames.val(names.join(","));
    inputMessage.val(messages.join());
    $("#createSVGButton").click(function () {
        var w = parseInt(inputWidth.val());
        var h = parseInt(inputHeight.val());
        var s1 = parseInt(inputFontSize.val());
        var s2 = parseInt(inputMessageSize.val());
        var svg = karakasa_svg_1.createKarakasaElement(w, h, inputNames.val().split(","), s1, inputMessage.val().split(","), s2);
        svgResult.empty().append(svg);
        downloadSVG.attr("href", createSVGBlobURL(svgResult.html()));
        var c = createCanvas(svgResult.find(":only-child"));
        var image = new Image();
        image.onload = function () {
            var ctx = c.getContext('2d');
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.drawImage(image, 0, 0);
            base64data = c.toDataURL("image/png");
            downloadPNG.attr("href", base64data);
        };
        image.src = createSVGBlobURL(svgResult.html());
    });
    $("#shareButton").click(function () {
        var loading = $('<span id="loading" class="glyphicon glyphicon-refresh spinning"> </span>');
        $("#shareButton").prepend(loading);
        if (base64data) {
            imgurUpload(base64data.replace(/^.*,/, ''), function (url) {
                console.log(url);
                var m = inputMessage.val().replace(/,/g, "");
                var twitterURL = "https://twitter.com/intent/tweet?text=" + m + " " + url + "%0A%23傘連判状ジェネレーター → https://goo.gl/a88chd";
                window.open(twitterURL, "_blank");
                loading.remove();
            });
        }
    });
};
function createCanvas(e) {
    var c = document.createElement('canvas');
    c.width = e.width();
    c.height = e.height();
    c.hidden = true;
    return c;
}
function createSVGBlobURL(data) {
    var blob = new Blob([data], { "type": "image/svg+xml" });
    return window.URL.createObjectURL(blob);
}
function imgurUpload(data, callback) {
    $.ajax({
        url: 'https://api.imgur.com/3/upload',
        type: 'POST',
        headers: {
            Authorization: 'Client-ID 07ac50654436ab9',
            Accept: 'application/json'
        },
        data: {
            image: data,
            type: 'base64'
        },
        success: function (result) {
            callback('https://imgur.com/gallery/' + result.data.id);
        }
    });
}
//# sourceMappingURL=app.js.map