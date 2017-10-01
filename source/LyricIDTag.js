class LyricIDTag {
    constructor(k, v = "") {
        if (typeof k !== "string") {
            throw Error(`[LyricIDTag] the type of param k is ${typeof k} , expected string.`);
        }
        this.tagKey = k.toLowerCase();
        this.tagValue = v;
    }

    toString() {
        return `[${this.tagKey}:${this.tagValue}]`;
    }
}

class LyricIDTagCollection {
    constructor() {
        this._tags = [];
    }


    getTag(key = "") {
        return this._tags.filter((v)=> v.tagKey == key)[0];
    }

    setTag(key = "", value = "") {
        return this._tags.push(new LyricIDTag(key, value));
    }

    each(cb) {
        if (typeof cb === "function") {
            this._tags.forEach(cb);
        } else {
            throw TypeError(`The type of cb is ${typeof cb}, expected function.`);
        }
    }
}

LyricIDTagCollection
    .TAG_ARTIST = "ar";
LyricIDTagCollection
    .TAG_ALBUM = "al";
LyricIDTagCollection
    .TAG_TITLE = "ti";
LyricIDTagCollection
    .TAG_AUTHOR = "au";
LyricIDTagCollection
    .TAG_LENGTH = "length";
LyricIDTagCollection
    .TAG_LRC_AUTHOR = "by";

module
    .exports = {
    LyricIDTag,
    LyricIDTagCollection
};