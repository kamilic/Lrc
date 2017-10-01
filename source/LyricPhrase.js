/**
 * @author kamilic
 * @name LyricPhrase
 * @desc element of Lrc
 */
const LyricTime = require("./LyricTime");

"use strict";
class LyricPhrase {
    /**
     * @constructor
     * @description is the part of Lyric.
     *              representing a single phrase of the Lyric.
     * @param { LyricTime } time
     * @param {String} content
     * */
    constructor(time, content){
        if(!(time instanceof LyricTime)) {
            throw Error(`[LyricPhrase] the parameter type of time is ${typeof time}, expected LyricTime.`);
        }
        if(!(typeof content === "string")){
            throw Error(`[LyricPhrase] the parameter type of time is ${typeof content}, expected string.`);
        }

        this.time = time;
        // a quick entrance for getting time.
        this.timeInSecond = time.getSecond();
        this.content = content;
    }
    /**
     * @method
     * @description Is time to show this phrase?
     * @param { LyricTime / Number } currentTime Unit in second .
     * */
    isMyTurn(currentTime) {
        if(currentTime instanceof LyricTime){
            return currentTime.getSecond() >= this.timeInSecond;
        }
        else{
            return currentTime >= this.timeInSecond;
        }
    }

    toString() {
        return `${this.time.toString()} ${this.content}`;
    }
}


module.exports = LyricPhrase;