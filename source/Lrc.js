/**
 * @author kamilic
 * @name Lrc
 */
const {LyricIDTag , LyricIDTagCollection} = require("./LyricIDTag");
const LyricParser = require("./LyricParser");
const LyricTime = require("./LyricTime");
const LyricPhrase = require("./LyricPhrase");

/**
 * @private
 * */
function _parse(text) {
    let lyricList = [];
    let lyricTags = new LyricIDTagCollection();
    for (let tr of LyricParser.parseTag(text)) {
        lyricTags.setTag(tr[0], tr[1]);
    }
    for (let r of LyricParser.parse(text)) {
        lyricList.push(
            new LyricPhrase(
                new LyricTime(r[0]),
                r[1] || ""
            )
        )
    }
    return {
        lyricList,
        lyricTags
    };
}

function insertionSort(arr) {
    if (arr.length > 1) {
        for (let i = 0, len = arr.length; i < len; i += 1) {
            let min = arr[i];
            let pos = i;
            for (let j = i + 1; j < len; j += 1) {
                if (min.timeInSecond > arr[j].timeInSecond) {
                    min = arr[j];
                    pos = j;
                }
            }
            if (min.timeInSecond != arr[i].timeInSecond) {
                let temp = arr[i];
                arr[i] = min;
                arr[pos] = temp;
            }
        }
    }
    return arr;
}

/**
 * @class Lrc
 * @desc a collection of LyricPhrase
 * */
class Lrc {
    constructor(text = "", sort) {
        let {lyricList, lyricTags} = _parse(text.toString());
        this.lyricList = lyricList ||  /* istanbul ignore next */ [];
        this.lyricTags = lyricTags ||  /* istanbul ignore next */ new LyricIDTagCollection();
        this.length = this.lyricList.length;
        if(sort){
            this.arrangePhrase();
        }
    }

    each(func) {
        let list = this.lyricList;
        list.forEach(func);
    }

    eachTag(func){
        let tagList = this.lyricTags;
        tagList.each(func);
    }

    phraseFilterByTimeRange(min, max) {
        let list = this.lyricList;
        return list.filter(function (phrase) {
            return phrase.timeInSecond >= min && phrase.timeInSecond <= max;
        })
    }

    setPhrase(time, content, toArrange) {
        this.setPhraseByLyricPhase(new LyricPhrase(LyricTime.getInstanceByTime(time), content));
        if(toArrange){
           this.arrangePhrase();
        }
    }

    setPhraseByLyricPhase(aLyricPhase) {
        if (aLyricPhase instanceof LyricPhrase) {
            this.lyricList.push(aLyricPhase);
        }
        return null;
    }

    getPhrase(currentTime) {
        let list = this.lyricList;
        return (insertionSort(
            list.filter(function (phrase) {
                return phrase.timeInSecond >= currentTime;
            })
        ))[0];
    }

    output(configs = {type: "text"}) {
        /* istanbul ignore next */
        switch (configs.type){
            /* istanbul ignore next */
            case "file":
            /* istanbul ignore next */
            case "blob":
            case "text":
            default : return this.toString();
        }
    }

    arrangePhrase() {
        this.lyricList = insertionSort(this.lyricList);
    }

    toString() {
        let result = "";
        this.eachTag(function (v, k) {
            result += `${v.toString()}\n`;
        });
        this.each(function (v) {
            result += `${v.toString()}\n`;
        });
        return result;
    }
}

module.exports = Lrc;