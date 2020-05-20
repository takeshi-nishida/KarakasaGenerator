"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var karakasa_svg_1 = require("karakasa-svg");
var keyakiNames = ["平手 友梨奈", "小池 美波", "原田 葵", "佐藤 詩織", "菅井 友香", "斎藤 冬優花", "石森 虹花",
    "渡邉 理佐", "上村 莉菜", "尾関 梨香", "織田 奈那", "渡辺 梨加", "土生 瑞穂", "今泉 佑唯",
    "鈴本 美愉", "守屋 茜", "長濱 ねる", "志田 愛佳", "長沢 菜々香", "小林 由依", "米谷 奈々未"];
var keyakiMessages = ["欅坂46", "革命、", "お待たせ"];
var names = ["西田 健志", "西田 健志", "西田 健志", "西田 健志", "西田 健志", "西田 健志", "西田 健志", "西田 健志"];
var messages = ["消極性", "デザイン", "宣言"];
var base64data;
window.onload = function () {
    var inputNames = $('#inputNames');
    var inputMessage = $('#inputMessage');
    var inputSize = $('#inputSize');
    var inputFontSize = $('#inputFontSize');
    var inputMessageSize = $('#inputMessageSize');
    var downloadSVG = $('#downloadSVG');
    var downloadPNG = $('#downloadPNG');
    var svgResult = $('#result');
    inputNames.val(names.join(","));
    inputMessage.val(messages.join());
    var createKarakasa = function () {
        var size = parseInt(inputSize.val());
        var s1 = parseInt(inputFontSize.val());
        var s2 = parseInt(inputMessageSize.val());
        var names = inputNames.val().split(",");
        var messages = inputMessage.val().split(",");
        var svg = karakasa_svg_1.createKarakasaElement(size, size, names, s1, messages, s2);
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
        $(".btn").removeClass("disabled");
    };
    $("#createSVGButton").click(createKarakasa);
    $("input[type='number']").change(createKarakasa);
    $("#keyakiButton").click(function () {
        inputNames.val(keyakiNames.join(","));
        inputMessage.val(keyakiMessages.join(","));
        inputSize.val(300);
        inputFontSize.val(12);
        inputMessageSize.val(24);
        createKarakasa();
        $(".keyaki").removeClass("hidden");
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
    createKarakasa();
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
        url: 'https://api.imgur.com/3/image',
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
            callback(result.data.link);
        }
    });
}
//# sourceMappingURL=app.js.map