"use strict";
const Lrc = require("../dist/Lrc.cjs");
const LyricPhrase = Lrc.LyricPhrase;
const LyricTime = Lrc.LyricTime;
const fs = require('fs');
const path = require('path');
const assert = require('assert');

// lrc file timeline/lyric
const expected = [
    "",
    "",
    "",
    "骗我为何不骗到底",
    "",
    "自从我把真心整颗交给你",
    "自从我把真心整颗交给你",
    "就从未对你有半点怀疑",
    "给我的情又背着我转移",
    "",
    "方大同 - Nothing's Gonna Change My Love For You",
    "",
    "If I had to live my life without you near me",
    "The days would all be empty",
    "The nights would seem so long"
];
const expectedTime = [
    0,
    0,
    0,
    2.7,
    3.56,
    22.33,
    20.56,
    24.41,
    28.48,
    203.5,
    1.12,
    14.45,
    15.6,
    21.14,
    26.79
];
// sorted
const arrangedTime = [
    0,
    0,
    0,
    1.12,
    2.7,
    3.56,
    14.45,
    15.6,
    20.56,
    21.14,
    22.33,
    24.41,
    26.79,
    28.48,
    203.5,
];
const arrangedLyric = [
    "",
    "",
    "",
    "方大同 - Nothing's Gonna Change My Love For You",
    "骗我为何不骗到底",
    "",
    "",
    "If I had to live my life without you near me",
    "自从我把真心整颗交给你",
    "The days would all be empty",
    "自从我把真心整颗交给你",
    "就从未对你有半点怀疑",
    "The nights would seem so long",
    "给我的情又背着我转移",
    "",
];
// tags
const expectedTags = [

    {
        tagType: "ar",
        val: "Lyrics artist"
    },
    {
        tagType: "al",
        val: "Album where the song is from"
    },
    {
        tagType: "ti",
        val: "Lyrics (song) title"
    },
    {
        tagType: "au",
        val: "Creator of the Songtext"
    },
    {
        tagType: "length",
        val: "How long the song is"
    },
    {
        tagType: "by",
        val: "Creator of the LRC file"
    },
    {
        tagType: "offset",
        val: "+5"
    },
    {
        tagType: "re",
        val: "The player or editor that created the LRC file"
    },
    {
        tagType: "ve",
        val: "version of program"
    }
];
// filtered Time

const filteredPhrase = [
    "If I had to live my life without you near me",
    "自从我把真心整颗交给你",
    "The days would all be empty"
];
const filteredTime = [
    15.6,
    20.56,
    21.14
];


describe("normal case of lyrics", function () {
    it("should be equal to the given lyric list", function (done) {
        fs.readFile(path.join(__dirname, "casefiles", "normal.lrc"), function (err, file) {
            let rs = null;
            if (!err) {
                let string = file.toString();
                rs = new Lrc(string, false);
                expected.forEach(function (v, k) {
                    assert.equal(rs.lyricList[k].content, v);
                });
                expectedTime.forEach(function (v, k) {
                    assert.equal(rs.lyricList[k].time.getSecond(), v);
                });
                done();
            } else {
                done(err);
            }
        });
    });

    it("should be equal to a arranged list", function (done) {
        fs.readFile(path.join(__dirname, "casefiles", "normal.lrc"), function (err, file) {
            let rs = null;
            if (!err) {
                let string = file.toString();
                rs = new Lrc(string, true);
                arrangedLyric.forEach(function (v, k) {
                    assert.equal(rs.lyricList[k].content, v);
                });
                arrangedTime.forEach(function (v, k) {
                    assert.equal(rs.lyricList[k].time.getSecond(), v);
                });
                done();
            } else {
                done(err);
            }
        });
    });

    it("should be equal to a tag list", function (done) {
        fs.readFile(path.join(__dirname, "casefiles", "normal.lrc"), function (err, file) {
            let rs = null;
            if (!err) {
                let string = file.toString();
                rs = new Lrc(string, true);
                expectedTags.forEach(function (v, k) {
                    assert.equal((rs.lyricTags._tags[k]).tagValue, v.val);
                });
                done();
            } else {
                done(err);
            }
        });

    })
});

describe("lrc constructor", function () {
    it("should create a empty lrc Object" , function () {
        let rs = new Lrc();
        assert.equal(rs.lyricList.length, 0);
    })
});

describe("lrc methods", function () {
    it("Lrc.each() - should get every phrase in lrc", function (done) {
        fs.readFile(path.join(__dirname, "casefiles", "normal.lrc"), function (err, file) {
            let rs = null;
            if (!err) {
                let string = file.toString();
                rs = new Lrc(string, false);
                rs.each(function (v, k) {
                    assert.equal(v.content, expected[k]);
                });
                rs.each(function (v, k) {
                    assert.equal(v.timeInSecond, expectedTime[k]);
                });
                done();
            } else {
                done(err);
            }
        });
    });

    it("Lrc.eachTag() - should get every phrase in lrc", function (done) {
        fs.readFile(path.join(__dirname, "casefiles", "normal.lrc"), function (err, file) {
            let rs = null;
            if (!err) {
                let string = file.toString();
                rs = new Lrc(string, false);
                let i = 0;
                rs.eachTag(function (v, k) {
                    assert.equal(v.tagValue, expectedTags[i].val);
                    assert.equal(v.tagKey, expectedTags[i].tagType);
                    i += 1;
                });
                done();
            } else {
                done(err);
            }
        });
    });

    it("Lrc.phraseFilterByTimeRange() - should get a specified time range of phrase in lrc", function (done) {
        fs.readFile(path.join(__dirname, "casefiles", "normal.lrc"), function (err, file) {
            let rs = null;
            if (!err) {
                let string = file.toString();
                rs = new Lrc(string, true);
                let filteredPhraseObject = rs.phraseFilterByTimeRange(15.6, 21.14);
                filteredPhrase.forEach(function (v, k) {
                    assert.equal(filteredPhraseObject[k].content, v);
                });
                filteredTime.forEach(function (v, k) {
                    assert.equal(filteredPhraseObject[k].time.getSecond(), v);
                });
                done();
            } else {
                done(err);
            }
        });
    });
    it("Lrc.setPhrase() / Lrc.setPhraseByLyricPhrase()  -- set a phrase correctly.", function () {
        const expectPhraseList = [
            "phrase1",
            "phrase2",
            "phrase3",
        ];
        const expectPhraseTimeList = [
            5.2,
            10.3,
            0
        ];

        let rs = new Lrc();
        let time = LyricTime.getInstanceByTime(expectPhraseTimeList[0]);
        let phrase = new LyricPhrase(time, expectPhraseList[0]);
        rs.setPhraseByLyricPhase(phrase);
        rs.setPhrase(expectPhraseTimeList[1], expectPhraseList[1]);
        assert(rs.lyricList[0].content, expectPhraseList[0]);
        assert(rs.lyricList[0].timeInSecond, expectPhraseTimeList[0]);
        assert(rs.lyricList[1].content, expectPhraseList[1]);
        assert(rs.lyricList[1].timeInSecond, expectPhraseTimeList[1]);

        // sort function test
        rs.setPhrase(expectPhraseTimeList[2], expectPhraseList[2], true);

        assert.equal(rs.lyricList[0].content, expectPhraseList[2]);
        assert.equal(rs.lyricList[0].timeInSecond, expectPhraseTimeList[2]);

        assert.equal(rs.lyricList[1].content, expectPhraseList[0]);
        assert.equal(rs.lyricList[1].timeInSecond, expectPhraseTimeList[0]);

        assert.equal(rs.lyricList[2].content, expectPhraseList[1]);
        assert.equal(rs.lyricList[2].timeInSecond, expectPhraseTimeList[1]);

        assert.equal(rs.lyricList.length, 3);

        // when there are 2 same phrases.
        // auto arranged.
        rs.setPhrase(expectPhraseTimeList[2], expectPhraseList[2], true);
    });

    it("Lrc.getPhrase() -- can get a phrase", function () {
        const expectPhraseList = [
            "phrase1",
            "phrase2",
            "phrase3",
        ];
        const expectPhraseTimeList = [
            5.2,
            10.3,
            0
        ];

        const notExistTime = 123;

        let rs = new Lrc();
        let time = LyricTime.getInstanceByTime(expectPhraseTimeList[0]);
        let phrase = new LyricPhrase(time, expectPhraseList[0]);
        rs.setPhraseByLyricPhase(phrase);
        rs.setPhrase(expectPhraseTimeList[1], expectPhraseList[1]);

        // getPhrase
        // when there are 2 same phrases.
        // auto arranged.
        rs.setPhrase(expectPhraseTimeList[2], expectPhraseList[2], true);
        assert.equal(rs.getPhrase(expectPhraseTimeList[2]).content, expectPhraseList[2]);
        assert.equal(rs.getPhrase(expectPhraseTimeList[2]).timeInSecond, expectPhraseTimeList[2]);
        // input a not exist time, expecting to output undefined.
        assert.equal(rs.getPhrase(notExistTime), undefined);

    });

    it("Lrc.outPut() / Lrc.toString() -- output lrc Object to text ", function () {
        const expectPhraseList = [
            "phrase1",
            "phrase2",
            "phrase3",
        ];
        const expectPhraseTimeList = [
            5.2,
            10.3,
            0
        ];

        const tagName = "ar";
        const tagValue = "Lyrics artist";

        const expectOutPut = `[00:00.00] ${expectPhraseList[2]}\n[00:05.20] ${expectPhraseList[0]}\n[00:10.30] ${expectPhraseList[1]}\n`;
        const expectOutPutWithTag = `[${tagName}:${tagValue}]\n[00:00.00] ${expectPhraseList[2]}\n[00:05.20] ${expectPhraseList[0]}\n[00:10.30] ${expectPhraseList[1]}\n`;

        let rs = new Lrc();
        let time = LyricTime.getInstanceByTime(expectPhraseTimeList[0]);
        let phrase = new LyricPhrase(time, expectPhraseList[0]);
        rs.setPhraseByLyricPhase(phrase);
        rs.setPhrase(expectPhraseTimeList[1], expectPhraseList[1]);
        // sort function test
        rs.setPhrase(expectPhraseTimeList[2], expectPhraseList[2], true);

        assert.equal(rs.output(), expectOutPut);
        assert.equal(rs.toString(), expectOutPut);

        // set a tag
        rs.lyricTags.setTag(tagName, tagValue);
        console.log(rs.lyricTags);
        assert.equal(rs.output({type : "text"}), expectOutPutWithTag);
        assert.equal(rs.output(), expectOutPutWithTag);
        assert.equal(rs.toString(), expectOutPutWithTag);
    });
});

describe("LyricPhrase methods", function () {
    it("isMyTurn() -- giving a time to judge whether a phrase to display(an assistance method for displaying lyrics.)", function () {
        const currentTime = "22.2";
        const passedTime = "1";
        const lyricPhraseContent = "content01";
        let phrase = new LyricPhrase(LyricTime.getInstanceByTime(currentTime), lyricPhraseContent);
        assert.equal(phrase.isMyTurn(currentTime), true);
        assert.equal(phrase.isMyTurn(passedTime), false);
        // another input type;
        assert.equal(phrase.isMyTurn(LyricTime.getInstanceByTime(currentTime)), true);
        assert.equal(phrase.isMyTurn(LyricTime.getInstanceByTime(passedTime)), false);
    });
});