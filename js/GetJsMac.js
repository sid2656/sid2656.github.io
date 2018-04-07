

var gb = {
    userLanguage: "hLzX",
    openDatabase: "V8vl",
    sessionStorage: "HVia",
    adblock: "FMQw",
    localCode: "lEnu",
    scrAvailWidth: "E-lJ",
    appcodeName: "qT7b",
    hasLiedOs: "ci5c",
    javaEnabled: "yD16",
    scrAvailSize: "TeRS",
    touchSupport: "wNLf",
    browserLanguage: "q4f3",
    browserVersion: "d435",
    browserName: "-UVA",
    os: "hAqN",
    plugins: "ks0Q",
    cookieCode: "VySQ",
    userAgent: "0aew",
    indexedDb: "3sw-",
    doNotTrack: "VEek",
    systemLanguage: "e6OK",
    hasLiedBrowser: "2xC5",
    storeDb: "Fvje",
    scrWidth: "ssI5",
    mimeTypes: "jp76",
    appMinorVersion: "qBVW",
    historyList: "kU5z",
    jsFonts: "EOQP",
    scrAvailHeight: "88tV",
    scrColorDepth: "qmyu",
    cpuClass: "Md7A",
    timeZone: "q5aJ",
    scrHeight: "5Jwy",
    scrDeviceXDPI: "3jCe",
    webSmartID: "E3gR",
    cookieEnabled: "VPIf",
    hasLiedResolution: "3neK",
    flashVersion: "dzuS",
    online: "9vyE",
    localStorage: "XM7l",
    hasLiedLanguages: "j5po",
    srcScreenSize: "tOHY"
};


var Ia;
if (!(Ia = R)) {
    var ca = Math, pa = {}, qa = pa.lib = {}, $a = function () {
        }, da = qa.Base = {
            mixIn: function (a) {
                for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            }, create: function () {
                var a = this.extend();
                a.init.apply(a,
                    arguments);
                return a
            }, init: function () {
            }, clone: function () {
                return this.init.prototype.extend(this)
            }, extend: function (a) {
                $a.prototype = this;
                var b = new $a;
                a && b.mixIn(a);
                b.hasOwnProperty("init") || (b.init = function () {
                    b.$super.init.apply(this, arguments)
                });
                b.init.prototype = b;
                b.$super = this;
                return b
            }
        }, ea = qa.WordArray = da.extend({
            clamp: function () {
                var a = this.words, b = this.sigBytes;
                a[b >>> 2] &= 4294967295 << 32 - b % 4 * 8;
                a.length = ca.ceil(b / 4)
            }, concat: function (a) {
                var b = this.words, c = a.words, d = this.sigBytes;
                a = a.sigBytes;
                this.clamp();
                if (d % 4) for (var e = 0; e < a; e++) b[d + e >>> 2] |= (c[e >>> 2] >>> 24 - e % 4 * 8 & 255) << 24 - (d + e) % 4 * 8; else if (65535 < c.length) for (e = 0; e < a; e += 4) b[d + e >>> 2] = c[e >>> 2]; else b.push.apply(b, c);
                this.sigBytes += a;
                return this
            }, clone: function () {
                var a = da.clone.call(this);
                a.words = this.words.slice(0);
                return a
            }, toString: function (a) {
                return (a || tb).stringify(this)
            }, init: function (a, b) {
                a = this.words = a || [];
                this.sigBytes = void 0 != b ? b : 4 * a.length
            }, random: function (a) {
                for (var b = [], c = 0; c < a; c += 4) b.push(4294967296 * ca.random() | 0);
                return new ea.init(b, a)
            }
        }),
        Ja = pa.enc = {}, tb = Ja.Hex = {
            stringify: function (a) {
                var b = a.words;
                a = a.sigBytes;
                for (var c = [], d = 0; d < a; d++) {
                    var e = b[d >>> 2] >>> 24 - d % 4 * 8 & 255;
                    c.push((e >>> 4).toString(16));
                    c.push((e & 15).toString(16))
                }
                return c.join("")
            }, parse: function (a) {
                for (var b = a.length, c = [], d = 0; d < b; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - d % 8 * 4;
                return new ea.init(c, b / 2)
            }
        }, ab = Ja.Latin1 = {
            parse: function (a) {
                for (var b = a.length, c = [], d = 0; d < b; d++) c[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - d % 4 * 8;
                return new ea.init(c, b)
            }, stringify: function (a) {
                var b = a.words;
                a = a.sigBytes;
                for (var c = [], d = 0; d < a; d++) c.push(String.fromCharCode(b[d >>> 2] >>> 24 - d % 4 * 8 & 255));
                return c.join("")
            }
        }, ub = Ja.Utf8 = {
            parse: function (a) {
                return ab.parse(unescape(encodeURIComponent(a)))
            }, stringify: function (a) {
                try {
                    return decodeURIComponent(escape(ab.stringify(a)))
                } catch (b) {
                    throw Error("Malformed UTF-8 data");
                }
            }
        }, bb = qa.BufferedBlockAlgorithm = da.extend({
            _append: function (a) {
                "string" == typeof a && (a = ub.parse(a));
                this._data.concat(a);
                this._nDataBytes += a.sigBytes
            }, clone: function () {
                var a = da.clone.call(this);
                a._data = this._data.clone();
                return a
            }, _minBufferSize: 0, reset: function () {
                this._data = new ea.init;
                this._nDataBytes = 0
            }, _process: function (a) {
                var b = this._data, c = b.words, d = b.sigBytes, e = this.blockSize, f = d / (4 * e),
                    f = a ? ca.ceil(f) : ca.max((f | 0) - this._minBufferSize, 0);
                a = f * e;
                d = ca.min(4 * a, d);
                if (a) {
                    for (var g = 0; g < a; g += e) this._doProcessBlock(c, g);
                    g = c.splice(0, a);
                    b.sigBytes -= d
                }
                return new ea.init(g, d)
            }
        });
    qa.Hasher = bb.extend({
        finalize: function (a) {
            a && this._append(a);
            return this._doFinalize()
        }, _createHmacHelper: function (a) {
            return function (b,
                             c) {
                return (new vb.HMAC.init(a, c)).finalize(b)
            }
        }, _createHelper: function (a) {
            return function (b, c) {
                return (new a.init(c)).finalize(b)
            }
        }, reset: function () {
            bb.reset.call(this);
            this._doReset()
        }, cfg: da.extend(), blockSize: 16, update: function (a) {
            this._append(a);
            this._process();
            return this
        }, init: function (a) {
            this.cfg = this.cfg.extend(a);
            this.reset()
        }
    });
    var vb = pa.algo = {};
    Ia = pa
}
for (var R = Ia, ra = Math, sa = R, S = sa.lib, wb = S.WordArray, ta = S.Hasher, S = sa.algo, cb = [], db = [], ua = 2, fa = 0; 64 > fa;) {
    var X;
    a:{
        X = ua;
        for (var xb = ra.sqrt(X), Ka =
            2; Ka <= xb; Ka++) if (!(X % Ka)) {
            X = !1;
            break a
        }
        X = !0
    }
    X && (8 > fa && (cb[fa] = Xa(ra.pow(ua, .5))), db[fa] = Xa(ra.pow(ua, 1 / 3)), fa++);
    ua++
}
var T = [], S = S.SHA256 = ta.extend({
    clone: function () {
        var a = ta.clone.call(this);
        a._hash = this._hash.clone();
        return a
    }, _doProcessBlock: function (a, b) {
        for (var c = this._hash.words, d = c[0], e = c[1], f = c[2], g = c[3], l = c[4], k = c[5], n = c[6], t = c[7], h = 0; 64 > h; h++) {
            if (16 > h) T[h] = a[b + h] | 0; else {
                var m = T[h - 15], p = T[h - 2];
                T[h] = ((m << 25 | m >>> 7) ^ (m << 14 | m >>> 18) ^ m >>> 3) + T[h - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + T[h - 16]
            }
            m =
                t + ((l << 26 | l >>> 6) ^ (l << 21 | l >>> 11) ^ (l << 7 | l >>> 25)) + (l & k ^ ~l & n) + db[h] + T[h];
            p = ((d << 30 | d >>> 2) ^ (d << 19 | d >>> 13) ^ (d << 10 | d >>> 22)) + (d & e ^ d & f ^ e & f);
            t = n;
            n = k;
            k = l;
            l = g + m | 0;
            g = f;
            f = e;
            e = d;
            d = m + p | 0
        }
        c[0] = c[0] + d | 0;
        c[1] = c[1] + e | 0;
        c[2] = c[2] + f | 0;
        c[3] = c[3] + g | 0;
        c[4] = c[4] + l | 0;
        c[5] = c[5] + k | 0;
        c[6] = c[6] + n | 0;
        c[7] = c[7] + t | 0
    }, _doFinalize: function () {
        var a = this._data, b = a.words, c = 8 * this._nDataBytes, d = 8 * a.sigBytes;
        b[d >>> 5] |= 128 << 24 - d % 32;
        b[(d + 64 >>> 9 << 4) + 14] = ra.floor(c / 4294967296);
        b[(d + 64 >>> 9 << 4) + 15] = c;
        a.sigBytes = 4 * b.length;
        this._process();
        return this._hash
    },
    _doReset: function () {
        this._hash = new wb.init(cb.slice(0))
    }
});
sa.SHA256 = ta._createHelper(S);
sa.HmacSHA256 = ta._createHmacHelper(S);
var eb = R, yb = eb.lib.WordArray;
eb.enc.Base64 = {
    parse: function (a) {
        var b = a.length, c = this._map, d = c.charAt(64);
        d && (d = a.indexOf(d), -1 != d && (b = d));
        for (var d = [], e = 0, f = 0; f < b; f++) if (f % 4) {
            var g = c.indexOf(a.charAt(f - 1)) << f % 4 * 2, l = c.indexOf(a.charAt(f)) >>> 6 - f % 4 * 2;
            d[e >>> 2] |= (g | l) << 24 - e % 4 * 8;
            e++
        }
        return yb.create(d, e)
    }, stringify: function (a) {
        var b = a.words, c = a.sigBytes, d = this._map;
        a.clamp();
        a = [];
        for (var e = 0; e < c; e += 3) for (var f = (b[e >>> 2] >>> 24 - e % 4 * 8 & 255) << 16 | (b[e + 1 >>> 2] >>> 24 - (e + 1) % 4 * 8 & 255) << 8 | b[e + 2 >>> 2] >>> 24 - (e + 2) % 4 * 8 & 255, g = 0; 4 > g && e + .75 * g < c; g++) a.push(d.charAt(f >>> 6 * (3 - g) & 63));
        if (b = d.charAt(64)) for (; a.length % 4;) a.push(b);
        return a.join("")
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
};


function hashAlg(a, b, c) {
    a.sort(function (a, b) {
        var c, d;
        if ("object" === typeof a && "object" === typeof b && a && b) return c = a.key, d = b.key, c === d ? 0 : typeof c ===
        typeof d ? c < d ? -1 : 1 : typeof c < typeof d ? -1 : 1;
        throw"error";
    });
    for (var d = 0; d < a.length; d++) {
        if(undefined==a[d])
            continue;
        var e = a[d].key.replace(RegExp("%", "gm"), ""), f = "",
            f = "string" == typeof a[d].value ? a[d].value.replace(RegExp("%", "gm"), "") : a[d].value;
        "" !== f && (c += e + f, b += "\x26" + (void 0 == gb[e] ? e : gb[e]) + "\x3d" + f)
    }
    a = c;
    c = "";
    d = a.length;
    for (e = 0; e < d; e++) f = a.charAt(e).charCodeAt(0), c = 127 === f ? c + String.fromCharCode(0) : c + String.fromCharCode(f + 1);
    a = c;
    c = a.length;
    d = a.split("");
    for (e = 0; e < parseInt(c / 2); e++) 0 == e % 2 && (f = a.charAt(e), d[e] = d[c - 1 - e], d[c - 1 -
    e] = f);
    d = d.join("");
    e = d.length;
    f = 0 == e % 3 ? parseInt(e / 3) : parseInt(e / 3) + 1;
    3 > e ? a = d : (a = d.substring(0, 1 * f), c = d.substring(1 * f, 2 * f), d = d.substring(2 * f, e), a = c + d + a);

    // console.log("key a:" + a);
    a = R.SHA256(a).toString(R.enc.Base64);
    c = a.length;
    var d = "";
    d = 0 == a.length % 2 ? a.substring(c / 2, c) + a.substring(0, c / 2) : a.substring(c / 2 + 1, c) + a.charAt(c / 2) + a.substring(0, c / 2);
    c = R.SHA256(d).toString(R.enc.Base64);

    return new p(b, c)
}

function Xa(a) {
    return 4294967296 * (a - (a | 0)) | 0
}

function nb(a) {
    var b = a.split(".");
    if (4 !== b.length) throw Error("Invalid format -- expecting a.b.c.d");
    for (var c = a = 0; c < b.length; ++c) {
        var d = parseInt(b[c], 10);
        if (0 > d || 255 < d) throw Error("Each octet must be between 0 and 255");
        a |= d << 8 * (b.length - c - 1);
        a >>>= 0
    }
    return a
}

function p(a, b) {
    this.key = a;
    this.value = b
}


function getMachineCode() {
    var b = [];
    b.push(new p("cookieCode", "new"));
    b.push(new p("userAgent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36"));
    b.push(new p("scrHeight", "1080"));
    b.push(new p("scrWidth", "1920"));
    b.push(new p("scrAvailHeight", "1040"));
    b.push(new p("scrAvailWidth", "1920"));
    b.push(new p("scrColorDepth", "24"));
    b.push(new p("scrDeviceXDPI", ""));
    b.push(new p("appCodeName", "Mozilla"));
    b.push(new p("appName", "Netscape"));
    b.push(new p("javaEnabled", "0"));
    b.push(new p("mimeTypes", "e237f9703f53d448d77c858b634154a5"));
    b.push(new p("os", "Win32"));
    b.push(new p("appMinorVersion", ""));
    b.push(new p("browserLanguage", "zh-CN"));
    b.push(new p("cookieEnabled", "1"));
    b.push(new p("cpuClass", ""));
    b.push(new p("onLine", "true"));
    b.push(new p("systemLanguage", ""));
    b.push(new p("userLanguage", ""));
    b.push(new p("timeZone", "-8"));
    b.push(new p("flashVersion", "0"));
    b.push(new p("historyList", "1"));
    b.push(new p("custID", "133"));
    b.push(new p("platform", "WEB"));
    return b;
}

function getpackStr(a) {
    var b = [], b = [], b = getMachineCode(), b = b.concat(this.moreInfoArray);
    null != a && void 0 != a && "" != a && 32 == a.length && b.push(new p("cookieCode", a));
    b.sort(function (a, b) {
        var c, d;
        if ("object" === typeof a && "object" === typeof b && a && b) return c = a.key, d = b.key, c === d ? 0 : typeof c === typeof d ?
            c < d ? -1 : 1 : typeof c < typeof d ? -1 : 1;
        throw"error";
    });
    return b
}

function fill(d) {
    var k = [];
    k = getpackStr("");
    var a = "", e = "";
    var l = "i1l1o1s1";
    var n = "24xx1080x1920";
    var h = "1040x1920";
    // var d = "192.168.1.100";
    // console.log("l:" + l);
    k.push(new p("storeDb", l));
    // console.log("n:" + n);
    k.push(new p("srcScreenSize", n));
    // console.log("h:" + h);
    k.push(new p("scrAvailSize", h));
    // console.log("d:" + d);
    "" != d && k.push(new p("localCode", nb(d)));
    // console.log("nb:" + nb(d));
    // console.log("a:" + a);
    // console.log("e:" + e);
    // console.log("k:" + k);

    // for (var i=0;i<k.length;i++){
    //     var pp = k[i];
    //     if(undefined==pp)
    //         continue;
    //     // console.log(pp.key+":"+pp.value);
    // }

    e = hashAlg(k, a, e);
    a = e.key;
    // console.log("a:" + a);
    e = e.value;
    // console.log("e:" + e);
    a += "\x26timestamp\x3d" + (new Date).getTime();
    // console.log("/otn/HttpZF/logdevice" + "?algID\x3dBgKBsMtJg3\x26hashCode\x3d" + e + a);

    return "https://kyfw.12306.cn/otn/HttpZF/logdevice" + "?algID\x3dBgKBsMtJg3\x26hashCode\x3d" + e + a;
}
