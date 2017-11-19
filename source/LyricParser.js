/**
 * @author kamilic
 * @name LyricParser
 */
import regeneratorRuntime from "babel-runtime/regenerator/index.js"
// if these are 2 (or above) specific time string at one line..([aa:bb.cc]).
// eg [00:22:21][00:
const MULIT_TIME_MATCH_LENGTH = "[aa:bb.cc][aa:bb.cc]".length ;
function parse(lyricText) {
    let lrcRegExp = /((\[(\d+:\d+\.\d+)][ \t]*)+)[ \t]*(.*)\s*?[\r\n$]*/g;
    return (function *() {
        for (let result = lrcRegExp.exec(lyricText);
             result != null;
             result = lrcRegExp.exec(lyricText)) {
            if(result[1].length >= MULIT_TIME_MATCH_LENGTH){
                for(let resultFromMulitTimeParser of mulitTimeParser(result[1])){
                    yield [resultFromMulitTimeParser, result[4]];
                }
            }else {
                yield [result[3], result[4] || ""];
            }

        }
    })();
}

function parseTag(lyricText) {
    let tagParsingRegExp = /\[([a-zA-Z]+):[ \t]*(.*)]\s*?[\r\n$]*/g;
    return (function *() {
        for (let result = tagParsingRegExp.exec(lyricText);
             result != null;
             result = tagParsingRegExp.exec(lyricText)) {
                yield [result[1], result[2]];
            }
    })();
}

function mulitTimeParser(text) {
    let timeRegExp = /\[(\d+:\d+\.\d+)]/g;
    return (function *() {
        let result = timeRegExp.exec(text);
        while (result){
            yield result[1];
            result = timeRegExp.exec(text);
        }
    })();
}


const LyricParser = {
    parse,
    parseTag
};

export default LyricParser;