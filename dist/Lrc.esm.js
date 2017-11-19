import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _getIterator from 'babel-runtime/core-js/get-iterator';
import _typeof from 'babel-runtime/helpers/typeof';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import index_js from 'babel-runtime/regenerator/index.js';

var LyricIDTag = function () {
    function LyricIDTag(k) {
        var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, LyricIDTag);

        if (typeof k !== "string") {
            throw Error("[LyricIDTag] the type of param k is " + (typeof k === "undefined" ? "undefined" : _typeof(k)) + " , expected string.");
        }
        this.tagKey = k.toLowerCase();
        this.tagValue = v;
    }

    _createClass(LyricIDTag, [{
        key: "toString",
        value: function toString() {
            return "[" + this.tagKey + ":" + this.tagValue + "]";
        }
    }]);

    return LyricIDTag;
}();

var LyricIDTagCollection = function () {
    function LyricIDTagCollection() {
        _classCallCheck(this, LyricIDTagCollection);

        this._tags = [];
    }

    _createClass(LyricIDTagCollection, [{
        key: "getTag",
        value: function getTag() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            return this._tags.filter(function (v) {
                return v.tagKey == key;
            })[0];
        }
    }, {
        key: "setTag",
        value: function setTag() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

            return this._tags.push(new LyricIDTag(key, value));
        }
    }, {
        key: "each",
        value: function each(cb) {
            if (typeof cb === "function") {
                this._tags.forEach(cb);
            } else {
                throw TypeError("The type of cb is " + (typeof cb === "undefined" ? "undefined" : _typeof(cb)) + ", expected function.");
            }
        }
    }]);

    return LyricIDTagCollection;
}();

LyricIDTagCollection.TAG_ARTIST = "ar";
LyricIDTagCollection.TAG_ALBUM = "al";
LyricIDTagCollection.TAG_TITLE = "ti";
LyricIDTagCollection.TAG_AUTHOR = "au";
LyricIDTagCollection.TAG_LENGTH = "length";
LyricIDTagCollection.TAG_LRC_AUTHOR = "by";

/**
 * @author kamilic
 * @name LyricParser
 */
// if these are 2 (or above) specific time string at one line..([aa:bb.cc]).
// eg [00:22:21][00:
var MULIT_TIME_MATCH_LENGTH = "[aa:bb.cc][aa:bb.cc]".length;
function parse(lyricText) {
    var lrcRegExp = /((\[(\d+:\d+\.\d+)][ \t]*)+)[ \t]*(.*)\s*?[\r\n$]*/g;
    return (/*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            var result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, resultFromMulitTimeParser;

            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            result = lrcRegExp.exec(lyricText);

                        case 1:
                            if (!(result != null)) {
                                _context.next = 36;
                                break;
                            }

                            if (!(result[1].length >= MULIT_TIME_MATCH_LENGTH)) {
                                _context.next = 31;
                                break;
                            }

                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 6;
                            _iterator = _getIterator(mulitTimeParser(result[1]));

                        case 8:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 15;
                                break;
                            }

                            resultFromMulitTimeParser = _step.value;
                            _context.next = 12;
                            return [resultFromMulitTimeParser, result[4]];

                        case 12:
                            _iteratorNormalCompletion = true;
                            _context.next = 8;
                            break;

                        case 15:
                            _context.next = 21;
                            break;

                        case 17:
                            _context.prev = 17;
                            _context.t0 = _context["catch"](6);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                        case 21:
                            _context.prev = 21;
                            _context.prev = 22;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 24:
                            _context.prev = 24;

                            if (!_didIteratorError) {
                                _context.next = 27;
                                break;
                            }

                            throw _iteratorError;

                        case 27:
                            return _context.finish(24);

                        case 28:
                            return _context.finish(21);

                        case 29:
                            _context.next = 33;
                            break;

                        case 31:
                            _context.next = 33;
                            return [result[3], result[4] || ""];

                        case 33:
                            result = lrcRegExp.exec(lyricText);
                            _context.next = 1;
                            break;

                        case 36:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this, [[6, 17, 21, 29], [22,, 24, 28]]);
        })()
    );
}

function parseTag(lyricText) {
    var tagParsingRegExp = /\[([a-zA-Z]+):[ \t]*(.*)]\s*?[\r\n$]*/g;
    return (/*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
            var result;
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            result = tagParsingRegExp.exec(lyricText);

                        case 1:
                            if (!(result != null)) {
                                _context2.next = 7;
                                break;
                            }

                            _context2.next = 4;
                            return [result[1], result[2]];

                        case 4:
                            result = tagParsingRegExp.exec(lyricText);
                            _context2.next = 1;
                            break;

                        case 7:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        })()
    );
}

function mulitTimeParser(text) {
    var timeRegExp = /\[(\d+:\d+\.\d+)]/g;
    return (/*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
            var result;
            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            result = timeRegExp.exec(text);

                        case 1:
                            if (!result) {
                                _context3.next = 7;
                                break;
                            }

                            _context3.next = 4;
                            return result[1];

                        case 4:
                            result = timeRegExp.exec(text);
                            _context3.next = 1;
                            break;

                        case 7:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        })()
    );
}

var LyricParser = {
    parse: parse,
    parseTag: parseTag
};

/**
 * @author kamilic
 * @name LrcTime
 * @class
 * @description Representing a time of each phrase
 *              and providing some useful methods for lrc time manipulation.
 */

var LRC_TIME_REGEXP = /(\d+):(\d+)\.(\d+)/;

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

var LyricTime = function () {
    /**
     * @constructor
     * @desc The Line Time Tags are in the format [mm:ss.xx] where mm is minutes, ss is seconds and xx is hundredths of a second.
     * @param {String} lrcParsedString mm:ss:xx string
     * */
    function LyricTime(lrcParsedString) {
        _classCallCheck(this, LyricTime);

        if (typeof lrcParsedString === "string") {
            var result = LRC_TIME_REGEXP.exec(lrcParsedString);
            if (!result) {
                throw Error("[LrcTime] Time parsing error.");
            } else {
                this.mm = parseInt(result[1]);
                this.ss = parseInt(result[2]);
                this.xx = parseInt(result[3]);

                this.mm += this.ss >= 60 ? Math.floor(this.ss / 60) : 0;

                this.ss = this.ss >= 60 ? this.ss % 60 : this.ss;
                this.ss += this.xx >= 100 ? Math.floor(this.xx / 100) : 0;

                this.xx = this.xx >= 100 ? this.xx % 100 : this.xx;
            }
        } else {
            throw Error("[LrcTime] Wrong lrcParsedString type, expected string but " + (typeof lrcParsedString === "undefined" ? "undefined" : _typeof(lrcParsedString)));
        }
    }

    _createClass(LyricTime, [{
        key: "toString",
        value: function toString() {
            return "[" + numberFormatted(this.mm) + ":" + numberFormatted(this.ss) + "." + numberFormatted(this.xx) + "]";
        }
    }, {
        key: "getSecond",
        value: function getSecond() {
            return min2sec(this.mm) + parseInt(this.ss) + hundredths2Sec(this.xx);
        }
    }, {
        key: "getSecondInt",
        value: function getSecondInt() {
            return Math.round(this.getSecond());
        }
    }]);

    return LyricTime;
}();

LyricTime.getInstanceByTime = function (time) {
    var mm = Math.floor(time / 60);
    var ss = Math.floor(time % 60);
    var xx = Math.round(time % 1 * 100);
    return new LyricTime(mm + ":" + ss + "." + xx);
};

/**
 * @author kamilic
 * @name LyricPhrase
 * @desc element of Lrc
 */
var LyricPhrase = function () {
    /**
     * @constructor
     * @description is the part of Lyric.
     *              representing a single phrase of the Lyric.
     * @param { LyricTime } time
     * @param {String} content
     * */
    function LyricPhrase(time, content) {
        _classCallCheck(this, LyricPhrase);

        if (!(time instanceof LyricTime)) {
            throw Error("[LyricPhrase] the parameter type of time is " + (typeof time === "undefined" ? "undefined" : _typeof(time)) + ", expected LyricTime.");
        }
        if (!(typeof content === "string")) {
            throw Error("[LyricPhrase] the parameter type of time is " + (typeof content === "undefined" ? "undefined" : _typeof(content)) + ", expected string.");
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


    _createClass(LyricPhrase, [{
        key: "isMyTurn",
        value: function isMyTurn(currentTime) {
            if (currentTime instanceof LyricTime) {
                return currentTime.getSecond() >= this.timeInSecond;
            } else {
                return currentTime >= this.timeInSecond;
            }
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.time.toString() + " " + this.content;
        }
    }]);

    return LyricPhrase;
}();

/**
 * @author kamilic
 * @name Lrc
 */
/**
 * @private
 * */
function _parse(text) {
    var lyricList = [];
    var lyricTags = new LyricIDTagCollection();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = _getIterator(LyricParser.parseTag(text)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var tr = _step.value;

            lyricTags.setTag(tr[0], tr[1]);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = _getIterator(LyricParser.parse(text)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var r = _step2.value;

            lyricList.push(new LyricPhrase(new LyricTime(r[0]), r[1] || ""));
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return {
        lyricList: lyricList,
        lyricTags: lyricTags
    };
}

function insertionSort(arr) {
    if (arr.length > 1) {
        for (var i = 0, len = arr.length; i < len; i += 1) {
            var min = arr[i];
            var pos = i;
            for (var j = i + 1; j < len; j += 1) {
                if (min.timeInSecond > arr[j].timeInSecond) {
                    min = arr[j];
                    pos = j;
                }
            }
            if (min.timeInSecond !== arr[i].timeInSecond) {
                var temp = arr[i];
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

var Lrc$1 = function () {
    function Lrc() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var sort = arguments[1];

        _classCallCheck(this, Lrc);

        var _parse2 = _parse(text.toString()),
            lyricList = _parse2.lyricList,
            lyricTags = _parse2.lyricTags;

        this.lyricList = lyricList || /* istanbul ignore next */[];
        this.lyricTags = lyricTags || /* istanbul ignore next */new LyricIDTagCollection();
        this.length = this.lyricList.length;
        if (sort) {
            this.arrangePhrase();
        }
    }

    _createClass(Lrc, [{
        key: "each",
        value: function each(func) {
            var list = this.lyricList;
            list.forEach(func);
        }
    }, {
        key: "eachTag",
        value: function eachTag(func) {
            var tagList = this.lyricTags;
            tagList.each(func);
        }
    }, {
        key: "phraseFilterByTimeRange",
        value: function phraseFilterByTimeRange(min, max) {
            var list = this.lyricList;
            return list.filter(function (phrase) {
                return phrase.timeInSecond >= min && phrase.timeInSecond <= max;
            });
        }
    }, {
        key: "setPhrase",
        value: function setPhrase(time, content, toArrange) {
            this.setPhraseByLyricPhase(new LyricPhrase(LyricTime.getInstanceByTime(time), content));
            if (toArrange) {
                this.arrangePhrase();
            }
        }
    }, {
        key: "setPhraseByLyricPhase",
        value: function setPhraseByLyricPhase(aLyricPhase) {
            if (aLyricPhase instanceof LyricPhrase) {
                this.lyricList.push(aLyricPhase);
            }
            return null;
        }
    }, {
        key: "getPhrase",
        value: function getPhrase(currentTime) {
            var list = this.lyricList;
            return insertionSort(list.filter(function (phrase) {
                return phrase.timeInSecond >= currentTime;
            }))[0];
        }
    }, {
        key: "output",
        value: function output() {
            var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "text" };

            /* istanbul ignore next */
            switch (configs.type) {
                /* istanbul ignore next */
                case "file":
                /* istanbul ignore next */
                case "blob":
                case "text":
                default:
                    return this.toString();
            }
        }
    }, {
        key: "arrangePhrase",
        value: function arrangePhrase() {
            this.lyricList = insertionSort(this.lyricList);
        }
    }, {
        key: "toString",
        value: function toString() {
            var result = "";
            this.eachTag(function (v, k) {
                result += v.toString() + "\n";
            });
            this.each(function (v) {
                result += v.toString() + "\n";
            });
            return result;
        }
    }]);

    return Lrc;
}();

Lrc$1.LyricTime = LyricTime;
Lrc$1.LyricPhrase = LyricPhrase;
Lrc$1.LyricIDTag = LyricIDTag;
Lrc$1.LyricIDTagCollection = LyricIDTagCollection;
Lrc$1.LyricParser = LyricParser;

export default Lrc$1;
