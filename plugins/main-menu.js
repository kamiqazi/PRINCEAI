// PRINCE PROPERTY DON'T TOUCH IT OTHERWISE YOU WILL BE FAMOUS IN THE DEPLOYERS AS A CODE THEIF AND JUNIOR DEVELOPER

import { promises } from "fs";
import { join } from "path";
import _0x42a99e from "node-fetch";
import { createHash } from "crypto";
import _0x54605d from "fs";
import _0x458c1f from "moment-timezone";
import { xpRange } from "../lib/levelling.js";
let tags = {
  quran: "🕋 QURAN CMDS",
  study: "📚 STUDY CMDS",
  downloader: "📥 DOWNLOADERS CMDS",
  main: "ℹ️ INFOBOT CMDS",
  owner: "👑 OWNER CMDS",
  group: "⚙️ GROUP CMDS",
  bebot: "💻 JADIBOT CMDS",
  tools: "🔧 TOOLS CMDS",
  game: "🎮 GAMES CMDS",
  rg: "🟢 REGISTRY CMDS",
  config: "🕹 BOT SETTINGS",
  search: "🔍 SEARCH CMDS",
  sticker: "🧧 STICKER CMDS",
  econ: "🛠 RPG CMDS",
  reaction: "🎈 REACTIONS CMDS",
  maker: "🎀 LOGOS CMDS",
  fun: "🪄FUN CMDS",
  audio: "🎶 AUDIO CMDS"
};
let handler = async (_0xb33ad2, {
  conn: _0x1e3ebb,
  args: _0x4ffe4c,
  usedPrefix: _0x3c2959,
  usedPrefix: _0x2867e9,
  __dirname: _0x3d5d28
}) => {
  let _0x4ca52b = ucapan();
  const _0x170f1d = {
    before: ("「 *`%botname`* 」\n \n*Hey!* 👋🏻 *%name*\n \n \n*• DATE:*  ```%fecha```\n*• TIME:*  ```%hora (🇵🇰)``` \n*• UPTIME:*  ```%muptime```\n*• " + _0x4ca52b + "*\n\n\n ┌─❖ *💎 PRINCE MD COMMANDS* ❖─┐  \n│  \n├ ✧ 🕋 *" + _0x2867e9 + "Quranmenu*  \n├ ✧ 📚 *" + _0x2867e9 + "Studymenu*  \n├ ✧ 👑 *" + _0x2867e9 + "Ownermenu*  \n├ ✧ 💌 *" + _0x2867e9 + "Botmenu*  \n├ ✧ 🧬 *" + _0x2867e9 + "Groupmenu*  \n├ ✧ 📥 *" + _0x2867e9 + "DLmenu*  \n├ ✧ 🧰 *" + _0x2867e9 + "Toolsmenu*  \n├ ✧ 🎨 *" + _0x2867e9 + "Stickermenu*  \n├ ✧ 🎉 *" + _0x2867e9 + "Funmenu*  \n├ ✧ 🎮 *" + _0x2867e9 + "Gamemenu*  \n├ ✧ 🎩 *" + _0x2867e9 + "Logomenu*  \n├ ✧ 📃 *" + _0x2867e9 + "list*\n├ ✧ 📜 *" + _0x2867e9 + "Menu2*    \n│  \n└───────── ★ ★ ★ ─────────┘\n%readmore\n").trimStart(),
    header: "*`◉ %category`*",
    body: " ║\n╠ ○ *%cmd* %islimit %isPremium",
    footer: "╚• \n\n",
    after: "*ᴘʀɪɴᴄᴇ ᴍᴅ*\n"
  };
  try {
    _0xb33ad2.react("⏳");
    let _0x30fdcc = JSON.parse(await promises.readFile(join(_0x3d5d28, "../package.json")).catch(_0x5a97ac => ({}))) || {};
    let {
      exp: _0x1b4fa8,
      limit: _0x409a6e,
      level: _0x51094b,
      role: _0x17fc7a
    } = global.db.data.users[_0xb33ad2.sender];
    let {
      min: _0x525d04,
      xp: _0x2bb5d5,
      max: _0x3c9960
    } = xpRange(_0x51094b, global.multiplier);
    let _0x4717c7 = await _0x1e3ebb.getName(_0xb33ad2.sender);
    let _0x56a4f4 = new Date(new Date() + 3600000);
    let _0x436cc8 = "es";
    let _0x42f297 = _0x458c1f.tz("Asia/Karachi").format("DD/MM/YYYY");
    let _0x214d45 = _0x458c1f.tz("Asia/Karachi").format("LT");
    const _0x318b14 = {
      quoted: _0xb33ad2,
      contextInfo: {}
    };
    _0x318b14.contextInfo.mentionedJid = [_0xb33ad2.sender];
    let _0xd9895a = _0x318b14;
    let _0x17e3e7 = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][Math.floor(_0x56a4f4 / 84600000) % 5];
    let _0x1da71f = _0x56a4f4.toLocaleDateString(_0x436cc8, {
      weekday: "long"
    });
    let _0x58e75b = _0x56a4f4.toLocaleDateString(_0x436cc8, {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    let _0x4ba5e7 = Intl.DateTimeFormat(_0x436cc8 + "-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(_0x56a4f4);
    let _0x4b1e5d = _0x56a4f4.toLocaleTimeString(_0x436cc8, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
    let _0x233855 = process.uptime() * 1000;
    let _0x2584e9;
    if (process.send) {
      process.send("uptime");
      _0x2584e9 = (await new Promise(_0x51836a => {
        process.once("message", _0x51836a);
        setTimeout(_0x51836a, 1000);
      })) * 1000;
    }
    let _0xc9d92f = clockString(_0x2584e9);
    let _0xdbe265 = clockString(_0x233855);
    let _0xcbc1ae = "@" + _0xb33ad2.sender.split("@s.whatsapp.net")[0];
    let _0x151c1c = Object.keys(global.db.data.users).length;
    let _0x2b8acc = Object.values(global.db.data.users).filter(_0x6f8ca7 => _0x6f8ca7.registered == true).length;
    let _0x32dce2 = _0x1e3ebb.user.jid == global.conn.user.jid ? "*• Bot Ofc:* wa.me/" + global.conn.user.jid.split`@`[0] : "• Soy un sub bot del:* wa.me/" + global.conn.user.jid.split`@`[0];
    let _0x21cd1f = Object.values(global.plugins).filter(_0x3e6d7f => !_0x3e6d7f.disabled).map(_0x4436bc => {
      return {
        help: Array.isArray(_0x4436bc.tags) ? _0x4436bc.help : [_0x4436bc.help],
        tags: Array.isArray(_0x4436bc.tags) ? _0x4436bc.tags : [_0x4436bc.tags],
        prefix: "customPrefix" in _0x4436bc,
        limit: _0x4436bc.limit,
        premium: _0x4436bc.premium,
        enabled: !_0x4436bc.disabled
      };
    });
    for (let _0x136b63 of _0x21cd1f) {
      if (_0x136b63 && "tags" in _0x136b63) {
        for (let _0x3ad527 of _0x136b63.tags) {
          if (!(_0x3ad527 in tags) && _0x3ad527) {
            tags[_0x3ad527] = _0x3ad527;
          }
        }
      }
    }
    _0x1e3ebb.menu = _0x1e3ebb.menu ? _0x1e3ebb.menu : {};
    let _0x33ba78 = _0x1e3ebb.menu.before || _0x170f1d.before;
    let _0x589210 = _0x1e3ebb.menu.header || _0x170f1d.header;
    let _0x2609a0 = _0x1e3ebb.menu.body || _0x170f1d.body;
    let _0x432f3c = _0x1e3ebb.menu.footer || _0x170f1d.footer;
    let _0x3cf634 = _0x1e3ebb.menu.after || (_0x1e3ebb.user.jid == _0x1e3ebb.user.jid ? "" : "Powered by https://wa.me/" + _0x1e3ebb.user.jid.split`@`[0]) + _0x170f1d.after;
    let _0x5c82f9 = [_0x33ba78, ...Object.keys(tags).map(_0x3bf470 => {
      return _0x589210.replace(/%category/g, tags[_0x3bf470]) + "\n" + [..._0x21cd1f.filter(_0x5103fb => _0x5103fb.tags && _0x5103fb.tags.includes(_0x3bf470) && _0x5103fb.help).map(_0x251615 => {
        return _0x251615.help.map(_0x307bfe => {
          return _0x2609a0.replace(/%cmd/g, _0x251615.prefix ? _0x307bfe : "%p" + _0x307bfe).replace(/%islimit/g, _0x251615.limit ? "(ⓓ)" : "").replace(/%isPremium/g, _0x251615.premium ? "(Ⓟ)" : "").trim();
        }).join("\n");
      }), _0x432f3c].join("\n");
    }), _0x3cf634].join("\n");
    let _0x14d38b = typeof _0x1e3ebb.menu == "string" ? _0x1e3ebb.menu : typeof _0x1e3ebb.menu == "object" ? _0x5c82f9 : "";
    let _0x29c189 = {
      "%": "%",
      p: _0x3c2959,
      uptime: _0xdbe265,
      muptime: _0xc9d92f,
      me: _0x1e3ebb.getName(_0x1e3ebb.user.jid),
      npmname: _0x30fdcc.name,
      npmdesc: _0x30fdcc.description,
      version: _0x30fdcc.version,
      exp: _0x1b4fa8 - _0x525d04,
      maxexp: _0x2bb5d5,
      totalexp: _0x1b4fa8,
      xp4levelup: _0x3c9960 - _0x1b4fa8,
      github: _0x30fdcc.homepage ? _0x30fdcc.homepage.url || _0x30fdcc.homepage : "[unknown github url]",
      level: _0x51094b,
      limit: _0x409a6e,
      name: _0x4717c7,
      weton: _0x17e3e7,
      week: _0x1da71f,
      date: _0x58e75b,
      dateIslamic: _0x4ba5e7,
      time: _0x4b1e5d,
      totalreg: _0x151c1c,
      rtotalreg: _0x2b8acc,
      role: _0x17fc7a,
      readmore: readMore,
      fecha: _0x42f297,
      hora: _0x214d45,
      botOfc: _0x32dce2,
      botname: botname
    };
    _0x14d38b = _0x14d38b.replace(new RegExp("%(" + Object.keys(_0x29c189).sort((_0x1513cb, _0xac9fbd) => _0xac9fbd.length - _0x1513cb.length).join`|` + ")", "g"), (_0x24326d, _0x2b0d51) => "" + _0x29c189[_0x2b0d51]);
    let _0x470302 = pimg.getRandom();
    _0x1e3ebb.sendFile(_0xb33ad2.chat, _0x470302, "menu.jpg", _0x14d38b.trim(), _0xb33ad2, null, {
      quoted: _0xb33ad2,
      contextInfo: {
        mentionedJid: [_0xb33ad2.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363199257221654@newsletter",
          newsletterName: global.author,
          serverMessageId: -1
        },
        forwardingScore: 999
      }
    });
    _0xb33ad2.react("✅");
  } catch (_0x5861a0) {
    _0xb33ad2.react("❌");
    throw _0x5861a0;
  }
};
handler.help = ["help"];
handler.tags = ["main"];
handler.command = /^(menu|help|f)$/i;
handler.register = false;
export default handler;
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
function clockString(_0x328e19) {
  let _0x519642 = isNaN(_0x328e19) ? "--" : Math.floor(_0x328e19 / 3600000);
  let _0x5e5422 = isNaN(_0x328e19) ? "--" : Math.floor(_0x328e19 / 60000) % 60;
  let _0x4ab9fb = isNaN(_0x328e19) ? "--" : Math.floor(_0x328e19 / 1000) % 60;
  return [_0x519642, _0x5e5422, _0x4ab9fb].map(_0x2b09f8 => _0x2b09f8.toString().padStart(2, 0)).join(":");
}
function ucapan() {
  const _0x11fb89 = _0x458c1f.tz("Asia/Karachi").format("HH");
  let _0x2c699d = "happy early in the day☀️";
  if (_0x11fb89 >= 4) {
    _0x2c699d = "GOOD MORNING 🌥️";
  }
  if (_0x11fb89 >= 10) {
    _0x2c699d = "GOOD NOON 🌞";
  }
  if (_0x11fb89 >= 15) {
    _0x2c699d = "GOOD AFTERNOON 🌇";
  }
  if (_0x11fb89 >= 18) {
    _0x2c699d = "GOOD NIGHT 🌌";
  }
  return _0x2c699d;
}