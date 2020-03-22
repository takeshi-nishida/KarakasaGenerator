import { createKarakasaElement } from "karakasa-svg";

const keyakiNames = ["平手 友梨奈", "小池 美波", "原田 葵", "佐藤 詩織", "菅井 友香", "斎藤 冬優花", "石森 虹花",
    "渡邉 理佐", "上村 莉菜", "尾関 梨香", "織田 奈那", "渡辺 梨加", "土生 瑞穂", "今泉 佑唯",
    "鈴本 美愉", "守屋 茜", "長濱 ねる", "志田 愛佳", "長沢 菜々香", "小林 由依", "米谷 奈々未"];
const keyakiMessages = ["欅坂46", "革命、", "お待たせ"];

const names: string[] = ["西田 健志", "西田 健志", "西田 健志", "西田 健志", "西田 健志", "西田 健志", "西田 健志", "西田 健志"];
const messages: string[] = ["消極性", "デザイン", "宣言"];
var base64data;

window.onload = () => {
    const inputNames = $('#inputNames');
    const inputMessage = $('#inputMessage');
    const inputSize = $('#inputSize');
    const inputFontSize = $('#inputFontSize');
    const inputMessageSize = $('#inputMessageSize');
    const downloadSVG = $('#downloadSVG');
    const downloadPNG = $('#downloadPNG');
    const svgResult = $('#result');

    inputNames.val(names.join(","));
    inputMessage.val(messages.join());

    const createKarakasa = () => {
        const size = parseInt(<string>inputSize.val());
        const s1 = parseInt(<string>inputFontSize.val());
        const s2 = parseInt(<string>inputMessageSize.val());
        const names = (<string>inputNames.val()).split(",");
        const messages = (<string>inputMessage.val()).split(",")
        const svg = createKarakasaElement(size, size, names, s1, messages, s2);
        svgResult.empty().append(svg);
        downloadSVG.attr("href", createSVGBlobURL(svgResult.html()));
        const c = createCanvas(svgResult.find(":only-child"));
        const image = new Image();
        image.onload = function () {
            const ctx = c.getContext('2d');
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

    $("#shareButton").click(() => {
        const loading = $('<span id="loading" class="glyphicon glyphicon-refresh spinning"> </span>');
        $("#shareButton").prepend(loading);
        if (base64data) {
            imgurUpload(base64data.replace(/^.*,/, ''), (url) => {
                console.log(url);
                const m = (<string>inputMessage.val()).replace(/,/g, "");
                const twitterURL = "https://twitter.com/intent/tweet?text=" + m + " " + url + "%0A%23傘連判状ジェネレーター → https://goo.gl/a88chd";
                window.open(twitterURL, "_blank");
                loading.remove();
            });
        }
    });

    createKarakasa();
};

function createCanvas(e: JQuery) {
    const c = document.createElement('canvas');
    c.width = e.width();
    c.height = e.height();
    c.hidden = true;
    return c;
}

function createSVGBlobURL(data: string) {
    const blob = new Blob([data], { "type": "image/svg+xml" });
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
        success: (result) => {
            callback('https://imgur.com/gallery/' + result.data.id);
        }
    });
}