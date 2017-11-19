# Lrc.js
[![travisCI](https://travis-ci.org/kamilic/Lrc.svg?branch=master)](https://travis-ci.org/kamilic/Lrc) [![codecov](https://codecov.io/gh/kamilic/Lrc/branch/master/graph/badge.svg)](https://codecov.io/gh/kamilic/Lrc)  
A LyricParser(.lrc file)  

### Usage
```javascript
import Lrc From "Lrc" // es module
const Lrc = require("Lrc/Lrc.cjs");
// browser 
// import <script src="example.com/js/Lrc/dist/Lrc.js"></script>
const Lrc = window.Lrc;

let line =   "[Ar:Lyrics artist]\n" +
    "[al:Album where the song is from]\n" +
    "[ti:Lyrics (song) title]\n" +
    "[au:Creator of the Songtext]\n" +
    "[length:How long the song is]\n" +
    "[by:Creator of the LRC file]\n" +
    "[offset:+5]\n" +
    "\n" +
    "[re:The player or editor that created the LRC file]\n" +
    "[ve:version of program]\n" +
    "[00:00.00][00:00.00][00:00.00]\n" +
    "[00:01.12] Nothing's Gonna Change My Love For You\n" +
    "[00:14.45]\n" +
    "[00:15.60]If I had to live my life without you near me\n" +
    "[00:21.14]The days would all be empty\n" +
    "[00:26.79]The nights would seem so long"
let instance = new Lrc();
console.dir(instance.lyricList); // phrase content.
console.dir(instance.lyricList); // tags content.
```


### to be continued..