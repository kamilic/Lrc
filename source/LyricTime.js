/**
 * @author kamilic
 * @name LrcTime
 * @class
 * @description Representing a time of each phrase
 *              and providing some useful methods for lrc time manipulation.
 */

const LRC_TIME_REGEXP = /(\d+):(\d+)\.(\d+)/;


/**
 * @private
 * @desc turning minute to second.
 * */
function min2sec(mm) {
    return 60 * parseInt(mm);
}

// xx is hundredths of a second
function hundredths2Sec(xx) {
    return parseFloat((xx / 100).toFixed(2));
}
/**
 * @desc 5 -> 05
 *
 */
function numberFormatted(number) {
    if (number < 0) {
        throw Error("[numberFormatted] invalid input number");
    }
    return parseInt(number) >= 10 ? number.toString() : "0".concat(number.toString());
}

class LyricTime {
    /**
     * @constructor
     * @desc The Line Time Tags are in the format [mm:ss.xx] where mm is minutes, ss is seconds and xx is hundredths of a second.
     * @param {String} lrcParsedString mm:ss:xx string
     * */
    constructor(lrcParsedString) {
        if (typeof lrcParsedString === "string") {
            let result = LRC_TIME_REGEXP.exec(lrcParsedString);
            if (!result) {
                throw Error(`[LrcTime] Time parsing error.`)
            }
            else {
                this.mm = parseInt(result[1]);
                this.ss = parseInt(result[2]);
                this.xx = parseInt(result[3]);

                this.mm += this.ss >= 60 ? Math.floor(this.ss / 60) : 0;

                this.ss = this.ss >= 60 ? this.ss % 60 : this.ss;
                this.ss += this.xx >= 100 ? Math.floor(this.xx / 100) : 0;

                this.xx = this.xx >= 100 ? this.xx % 100 : this.xx;
            }
        }
        else {
            throw Error(`[LrcTime] Wrong lrcParsedString type, expected string but ${typeof lrcParsedString}`)
        }
    }

    toString() {
        return "[" + numberFormatted(this.mm) + ":" + numberFormatted(this.ss) + "." + numberFormatted(this.xx) + "]";
    }

    getSecond() {
        return min2sec(this.mm) + parseInt(this.ss) + hundredths2Sec(this.xx);
    }

    getSecondInt() {
        return Math.round(this.getSecond());
    }

}

LyricTime.getInstanceByTime = function (time) {
    let mm = Math.floor(time / 60);
    let ss = Math.floor((time % 60));
    let xx = Math.round((time % 1) * 100);
    return new LyricTime(`${mm}:${ss}.${xx}`);
};

export default LyricTime ;


