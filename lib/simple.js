import _0x3b1a9c from "path";
import { toAudio } from "./converter.js";
import _0x176a28 from "chalk";
import _0x193d13 from "node-fetch";
import _0x29f377 from "awesome-phonenumber";
import _0x477f22 from "fs";
import _0x5bbd14 from "util";
import { fileTypeFromBuffer } from "file-type";
import { format } from "util";
import { fileURLToPath } from "url";
import _0x42b9ab from "./store.js";
const __dirname = _0x3b1a9c.dirname(fileURLToPath(import.meta.url));
const {
  default: _makeWaSocket,
  makeWALegacySocket,
  proto,
  downloadContentFromMessage,
  jidDecode,
  areJidsSameUser,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  WAMessageStubType,
  extractMessageContent,
  prepareWAMessageMedia
} = (await import("@whiskeysockets/baileys")).default;
export function makeWASocket(_0x55f999, _0x3aacce = {}) {
  let _0x9071c8 = (global.opts.legacy ? makeWALegacySocket : _makeWaSocket)(_0x55f999);
  let _0x4f990e = Object.defineProperties(_0x9071c8, {
    chats: {
      value: {
        ...(_0x3aacce.chats || {})
      },
      writable: true
    },
    decodeJid: {
      value(_0x174a7d) {
        if (!_0x174a7d || typeof _0x174a7d !== "string") {
          return !nullish(_0x174a7d) && _0x174a7d || null;
        }
        return _0x174a7d.decodeJid();
      }
    },
    logger: {
      get() {
        return {
          info(..._0x29a61a) {
            console.log(_0x176a28.bold.bgRgb(51, 204, 51)("INFO "), "[" + _0x176a28.rgb(255, 255, 255)(new Date().toUTCString()) + "]:", _0x176a28.cyan(format(..._0x29a61a)));
          },
          error(..._0xdf79f0) {
            console.log(_0x176a28.bold.bgRgb(247, 38, 33)("ERROR "), "[" + _0x176a28.rgb(255, 255, 255)(new Date().toUTCString()) + "]:", _0x176a28.rgb(255, 38, 0)(format(..._0xdf79f0)));
          },
          warn(..._0x400be4) {
            console.log(_0x176a28.bold.bgRgb(255, 153, 0)("WARNING "), "[" + _0x176a28.rgb(255, 255, 255)(new Date().toUTCString()) + "]:", _0x176a28.redBright(format(..._0x400be4)));
          },
          trace(..._0x1de284) {
            console.log(_0x176a28.grey("TRACE "), "[" + _0x176a28.rgb(255, 255, 255)(new Date().toUTCString()) + "]:", _0x176a28.white(format(..._0x1de284)));
          },
          debug(..._0x41754a) {
            console.log(_0x176a28.bold.bgRgb(66, 167, 245)("DEBUG "), "[" + _0x176a28.rgb(255, 255, 255)(new Date().toUTCString()) + "]:", _0x176a28.white(format(..._0x41754a)));
          }
        };
      },
      enumerable: true
    },
    getFile: {
      async value(_0x27d6ad, _0x16dd81 = false) {
        let _0x4dbfec;
        let _0x2b2a37;
        const _0xb3a9d3 = Buffer.isBuffer(_0x27d6ad) ? _0x27d6ad : _0x27d6ad instanceof ArrayBuffer ? _0x27d6ad.toBuffer() : /^data:.*?\/.*?;base64,/i.test(_0x27d6ad) ? Buffer.from(_0x27d6ad.split`,`[1], "base64") : /^https?:\/\//.test(_0x27d6ad) ? await (_0x4dbfec = await _0x193d13(_0x27d6ad)).buffer() : _0x477f22.existsSync(_0x27d6ad) ? (_0x2b2a37 = _0x27d6ad, _0x477f22.readFileSync(_0x27d6ad)) : typeof _0x27d6ad === "string" ? _0x27d6ad : Buffer.alloc(0);
        if (!Buffer.isBuffer(_0xb3a9d3)) {
          throw new TypeError("Result is not a buffer");
        }
        const _0x1f8f64 = (await fileTypeFromBuffer(_0xb3a9d3)) || {
          mime: "application/octet-stream",
          ext: ".bin"
        };
        if (_0xb3a9d3 && _0x16dd81 && !_0x2b2a37) {
          _0x2b2a37 = _0x3b1a9c.join(__dirname, "../tmp/" + new Date() * 1 + "." + _0x1f8f64.ext);
          await _0x477f22.promises.writeFile(_0x2b2a37, _0xb3a9d3);
        }
        return {
          res: _0x4dbfec,
          filename: _0x2b2a37,
          ..._0x1f8f64,
          data: _0xb3a9d3,
          deleteFile() {
            return _0x2b2a37 && _0x477f22.promises.unlink(_0x2b2a37);
          }
        };
      },
      enumerable: true
    },
    waitEvent: {
      value(_0x39cdc9, _0x41c806 = () => true, _0x4773c0 = 25) {
        return new Promise((_0x1478a4, _0x46d07f) => {
          let _0x4171bf = 0;
          let _0x474f95 = (..._0x271895) => {
            if (++_0x4171bf > _0x4773c0) {
              _0x46d07f("Max tries reached");
            } else if (_0x41c806()) {
              _0x9071c8.ev.off(_0x39cdc9, _0x474f95);
              _0x1478a4(..._0x271895);
            }
          };
          _0x9071c8.ev.on(_0x39cdc9, _0x474f95);
        });
      }
    },
    sendFile: {
      async value(_0x33be2f, _0x3e4b06, _0x52ff50 = "", _0x5b5f39 = "", _0x25759c, _0x4ad5fb = false, _0x15d8ab = {}) {
        let _0x208eb0 = await _0x9071c8.getFile(_0x3e4b06, true);
        let {
          res: _0x43beb1,
          data: _0x365308,
          filename: _0x44aeab
        } = _0x208eb0;
        if (_0x43beb1 && _0x43beb1.status !== 200 || _0x365308.length <= 65536) {
          try {
            throw {
              json: JSON.parse(_0x365308.toString())
            };
          } catch (_0x6a07e4) {
            if (_0x6a07e4.json) {
              throw _0x6a07e4.json;
            }
          }
        }
        const _0x21e4d3 = _0x477f22.statSync(_0x44aeab).size / 1024 / 1024;
        if (_0x21e4d3 >= 20000) {
          throw new Error(" ✳️  El tamaño del archivo es demasiado grande\n\n");
        }
        let _0x4b2ef5 = {};
        if (_0x25759c) {
          _0x4b2ef5.quoted = _0x25759c;
        }
        if (!_0x208eb0) {
          _0x15d8ab.asDocument = true;
        }
        let _0x6fc63c = "";
        let _0x267e67 = _0x15d8ab.mimetype || _0x208eb0.mime;
        let _0x180f0a;
        if (/webp/.test(_0x208eb0.mime) || /image/.test(_0x208eb0.mime) && _0x15d8ab.asSticker) {
          _0x6fc63c = "sticker";
        } else if (/image/.test(_0x208eb0.mime) || /webp/.test(_0x208eb0.mime) && _0x15d8ab.asImage) {
          _0x6fc63c = "image";
        } else if (/video/.test(_0x208eb0.mime)) {
          _0x6fc63c = "video";
        } else if (/audio/.test(_0x208eb0.mime)) {
          _0x180f0a = await toAudio(_0x365308, _0x208eb0.ext);
          _0x365308 = _0x180f0a.data;
          _0x44aeab = _0x180f0a.filename;
          _0x6fc63c = "audio";
          _0x267e67 = _0x15d8ab.mimetype || "audio/ogg; codecs=opus";
        } else {
          _0x6fc63c = "document";
        }
        if (_0x15d8ab.asDocument) {
          _0x6fc63c = "document";
        }
        delete _0x15d8ab.asSticker;
        delete _0x15d8ab.asLocation;
        delete _0x15d8ab.asVideo;
        delete _0x15d8ab.asDocument;
        delete _0x15d8ab.asImage;
        let _0x3af100 = {
          ..._0x15d8ab,
          caption: _0x5b5f39,
          ptt: _0x4ad5fb,
          [_0x6fc63c]: {
            url: _0x44aeab
          },
          mimetype: _0x267e67,
          fileName: _0x52ff50 || _0x44aeab.split("/").pop()
        };
        let _0x24adc0;
        try {
          _0x24adc0 = await _0x9071c8.sendMessage(_0x33be2f, _0x3af100, {
            ..._0x4b2ef5,
            ..._0x15d8ab
          });
        } catch (_0xe1e6c4) {
          console.error(_0xe1e6c4);
          _0x24adc0 = null;
        } finally {
          if (!_0x24adc0) {
            _0x24adc0 = await _0x9071c8.sendMessage(_0x33be2f, {
              ..._0x3af100,
              [_0x6fc63c]: _0x365308
            }, {
              ..._0x4b2ef5,
              ..._0x15d8ab
            });
          }
          _0x365308 = null;
          return _0x24adc0;
        }
      },
      enumerable: true
    },
    sendContact: {
      async value(_0x2b1a05, _0x38dc72, _0x2d2cda, _0x4553bf) {
        if (!Array.isArray(_0x38dc72[0]) && typeof _0x38dc72[0] === "string") {
          _0x38dc72 = [_0x38dc72];
        }
        let _0x282b4c = [];
        for (let [_0x1866ea, _0x3a2951] of _0x38dc72) {
          _0x1866ea = _0x1866ea.replace(/[^0-9]/g, "");
          let _0x5511f6 = _0x1866ea + "@s.whatsapp.net";
          let _0x2897e5 = (await _0x9071c8.getBusinessProfile(_0x5511f6).catch(_0x29f6d5 => null)) || {};
          let _0x1080a4 = ("\nBEGIN:VCARD\nVERSION:3.0\nN:;" + _0x3a2951.replace(/\n/g, "\\n") + ";;;\nFN:" + _0x3a2951.replace(/\n/g, "\\n") + "\nTEL;type=CELL;type=VOICE;waid=" + _0x1866ea + ":" + _0x29f377("+" + _0x1866ea).getNumber("international") + (_0x2897e5.description ? ("\nX-WA-BIZ-NAME:" + (_0x9071c8.chats[_0x5511f6]?.vname || _0x9071c8.getName(_0x5511f6) || _0x3a2951).replace(/\n/, "\\n") + "\nX-WA-BIZ-DESCRIPTION:" + _0x2897e5.description.replace(/\n/g, "\\n") + "\n").trim() : "") + "\nEND:VCARD\n        ").trim();
          _0x282b4c.push({
            vcard: _0x1080a4,
            displayName: _0x3a2951
          });
        }
        return await _0x9071c8.sendMessage(_0x2b1a05, {
          ..._0x4553bf,
          contacts: {
            ..._0x4553bf,
            displayName: (_0x282b4c.length >= 2 ? _0x282b4c.length + " kontak" : _0x282b4c[0].displayName) || null,
            contacts: _0x282b4c
          }
        }, {
          quoted: _0x2d2cda,
          ..._0x4553bf
        });
      },
      enumerable: true
    },
    reply: {
      async value(_0x567477, _0x2e3b02 = "", _0x4adddc, _0x27583f) {
        if (Buffer.isBuffer(_0x2e3b02)) {
          return _0x9071c8.sendFile(_0x567477, _0x2e3b02, "file", "", _0x4adddc, false, _0x27583f);
        } else {
          let _0x55f3bc = ["120363174979265795@newsletter", "120363174979265795@newsletter", "120363174979265795@newsletter"];
          let _0x321600 = ["꯴⃘፝𝗔𝗬α͜͡𝗭ꨴ🖤꤬ິ̶", "꯴⃘፝𝗔𝗬α͜͡𝗭ꨴ🖤꤬ິ̶", "꯴⃘፝𝗔𝗬α͜͡𝗭ꨴ🖤꤬ິ̶"];
          async function _0x2a9baf() {
            let _0x4eb446 = Math.floor(Math.random() * _0x55f3bc.length);
            let _0x9fd760 = _0x55f3bc[_0x4eb446];
            let _0x298eb7 = _0x321600[_0x4eb446];
            return {
              id: _0x9fd760,
              nombre: _0x298eb7
            };
          }
          let _0x1e85be = await _0x2a9baf();
          const _0x5b853d = {
            mentionedJid: await _0x9071c8.parseMention(_0x2e3b02),
            isForwarded: true,
            forwardingScore: 1,
            forwardedNewsletterMessageInfo: {
              newsletterJid: _0x1e85be.id,
              newsletterName: _0x1e85be.nombre,
              serverMessageId: 100
            }
          };
          const _0x33ce42 = {
            ..._0x27583f,
            text: _0x2e3b02,
            contextInfo: _0x5b853d
          };
          return _0x9071c8.sendMessage(_0x567477, _0x33ce42, {
            quoted: _0x4adddc,
            ..._0x27583f
          });
        }
      }
    },
    sendButton: {
      async value(_0x4fb260, _0x2218f4 = "", _0x29d455 = "", _0x172884, _0x429957, _0x4f02b6, _0x3196c6) {
        let _0x2db1a1;
        if (Array.isArray(_0x172884)) {
          _0x3196c6 = _0x4f02b6;
          _0x4f02b6 = _0x429957;
          _0x429957 = _0x172884;
          _0x172884 = null;
        } else if (_0x172884) {
          try {
            _0x2db1a1 = await _0x9071c8.getFile(_0x172884);
            _0x172884 = _0x2db1a1.data;
          } catch {
            _0x172884 = null;
          }
        }
        if (!Array.isArray(_0x429957[0]) && typeof _0x429957[0] === "string") {
          _0x429957 = [_0x429957];
        }
        if (!_0x3196c6) {
          _0x3196c6 = {};
        }
        let _0x4bd550 = {
          ..._0x3196c6,
          [_0x172884 ? "caption" : "text"]: _0x2218f4 || "",
          footer: _0x29d455,
          buttons: _0x429957.map(_0xa8ca9d => ({
            buttonId: !nullish(_0xa8ca9d[1]) && _0xa8ca9d[1] || !nullish(_0xa8ca9d[0]) && _0xa8ca9d[0] || "",
            buttonText: {
              displayText: !nullish(_0xa8ca9d[0]) && _0xa8ca9d[0] || !nullish(_0xa8ca9d[1]) && _0xa8ca9d[1] || ""
            }
          })),
          ...(_0x172884 ? _0x3196c6.asLocation && /image/.test(_0x2db1a1.mime) ? {
            location: {
              ..._0x3196c6,
              jpegThumbnail: _0x172884
            }
          } : {
            [/video/.test(_0x2db1a1.mime) ? "video" : /image/.test(_0x2db1a1.mime) ? "image" : "document"]: _0x172884
          } : {})
        };
        return await _0x9071c8.sendMessage(_0x4fb260, _0x4bd550, {
          quoted: _0x4f02b6,
          upload: _0x9071c8.waUploadToServer,
          ..._0x3196c6
        });
      },
      enumerable: true
    },
    sendButton2: {
      async value(_0x14ebd6, _0x37c586 = "", _0x360aa8 = "", _0x2e2193, _0x4615fa, _0x319de6, _0x41ec32, _0x505ddf, _0x124e4b) {
        let _0x3dc003;
        let _0x44ec16;
        if (/^https?:\/\//i.test(_0x2e2193)) {
          try {
            const _0x1f8b22 = await _0x193d13(_0x2e2193);
            const _0x40b3c7 = _0x1f8b22.headers.get("content-type");
            if (/^image\//i.test(_0x40b3c7)) {
              _0x3dc003 = await prepareWAMessageMedia({
                image: {
                  url: _0x2e2193
                }
              }, {
                upload: _0x9071c8.waUploadToServer
              });
            } else if (/^video\//i.test(_0x40b3c7)) {
              _0x44ec16 = await prepareWAMessageMedia({
                video: {
                  url: _0x2e2193
                }
              }, {
                upload: _0x9071c8.waUploadToServer
              });
            } else {
              console.error("Tipo MIME no compatible:", _0x40b3c7);
            }
          } catch (_0x379ad3) {
            console.error("Error al obtener el tipo MIME:", _0x379ad3);
          }
        } else {
          try {
            const _0xe10f8a = await _0x9071c8.getFile(_0x2e2193);
            if (/^image\//i.test(_0xe10f8a.mime)) {
              _0x3dc003 = await prepareWAMessageMedia({
                image: {
                  url: _0x2e2193
                }
              }, {
                upload: _0x9071c8.waUploadToServer
              });
            } else if (/^video\//i.test(_0xe10f8a.mime)) {
              _0x44ec16 = await prepareWAMessageMedia({
                video: {
                  url: _0x2e2193
                }
              }, {
                upload: _0x9071c8.waUploadToServer
              });
            }
          } catch (_0x560650) {
            console.error("Error al obtener el tipo de archivo:", _0x560650);
          }
        }
        const _0x3d9c11 = _0x4615fa.map(_0x229cb5 => ({
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
            display_text: _0x229cb5[0],
            id: _0x229cb5[1]
          })
        }));
        if (_0x319de6 && (typeof _0x319de6 === "string" || typeof _0x319de6 === "number")) {
          _0x3d9c11.push({
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "Copy",
              copy_code: _0x319de6
            })
          });
        }
        if (_0x41ec32 && Array.isArray(_0x41ec32)) {
          _0x41ec32.forEach(_0x1a4c94 => {
            _0x3d9c11.push({
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: _0x1a4c94[0],
                url: _0x1a4c94[1],
                merchant_url: _0x1a4c94[1]
              })
            });
          });
        }
        const _0x217e87 = {
          body: {
            text: _0x37c586
          },
          footer: {
            text: _0x360aa8
          },
          header: {
            hasMediaAttachment: false,
            imageMessage: _0x3dc003 ? _0x3dc003.imageMessage : null,
            videoMessage: _0x44ec16 ? _0x44ec16.videoMessage : null
          },
          nativeFlowMessage: {
            buttons: _0x3d9c11,
            messageParamsJson: ""
          }
        };
        let _0x3dd49b = generateWAMessageFromContent(_0x14ebd6, {
          viewOnceMessage: {
            message: {
              interactiveMessage: _0x217e87
            }
          }
        }, {
          userJid: _0x9071c8.user.jid,
          quoted: _0x505ddf
        });
        _0x9071c8.relayMessage(_0x14ebd6, _0x3dd49b.message, {
          messageId: _0x3dd49b.key.id,
          ..._0x124e4b
        });
      }
    },
    sendList: {
      async value(_0x3025fc, _0x4932b1, _0xa9ba60, _0x441751, _0x162f21, _0x37417e, _0x3b05e8, _0x2b3a6e = {}) {
        let _0x495c76;
        let _0xee66a0;
        if (/^https?:\/\//i.test(_0x162f21)) {
          try {
            const _0x3194f8 = await _0x193d13(_0x162f21);
            const _0x5bc09a = _0x3194f8.headers.get("content-type");
            if (/^image\//i.test(_0x5bc09a)) {
              _0x495c76 = await prepareWAMessageMedia({
                image: {
                  url: _0x162f21
                }
              }, {
                upload: _0x9071c8.waUploadToServer
              });
            } else if (/^video\//i.test(_0x5bc09a)) {
              _0xee66a0 = await prepareWAMessageMedia({
                video: {
                  url: _0x162f21
                }
              }, {
                upload: _0x9071c8.waUploadToServer
              });
            } else {
              console.error("Tipo MIME no compatible:", _0x5bc09a);
            }
          } catch (_0x476344) {
            console.error("Error al obtener el tipo MIME:", _0x476344);
          }
        } else {
          try {
            const _0x386289 = await _0x9071c8.getFile(_0x162f21);
            if (/^image\//i.test(_0x386289.mime)) {
              _0x495c76 = await prepareWAMessageMedia({
                image: {
                  url: _0x162f21
                }
              }, {
                upload: _0x9071c8.waUploadToServer
              });
            } else if (/^video\//i.test(_0x386289.mime)) {
              _0xee66a0 = await prepareWAMessageMedia({
                video: {
                  url: _0x162f21
                }
              }, {
                upload: _0x9071c8.waUploadToServer
              });
            }
          } catch (_0xa5618a) {
            console.error("Error al obtener el tipo de archivo:", _0xa5618a);
          }
        }
        const _0x141afd = [..._0x37417e];
        const _0x150c3f = {
          interactiveMessage: {
            header: {
              title: _0x4932b1,
              hasMediaAttachment: false,
              imageMessage: _0x495c76 ? _0x495c76.imageMessage : null,
              videoMessage: _0xee66a0 ? _0xee66a0.videoMessage : null
            },
            body: {
              text: _0xa9ba60
            },
            nativeFlowMessage: {
              buttons: [{
                name: "single_select",
                buttonParamsJson: JSON.stringify({
                  title: _0x441751,
                  sections: _0x141afd
                })
              }],
              messageParamsJson: ""
            }
          }
        };
        let _0x80e4c1 = generateWAMessageFromContent(_0x3025fc, {
          viewOnceMessage: {
            message: _0x150c3f
          }
        }, {
          userJid: _0x9071c8.user.jid,
          quoted: _0x3b05e8
        });
        _0x9071c8.relayMessage(_0x3025fc, _0x80e4c1.message, {
          messageId: _0x80e4c1.key.id,
          ..._0x2b3a6e
        });
      }
    },
    sendListM: {
      async value(_0x436536, _0x21968b, _0x11c282, _0x3ff449, _0x41ef54 = {}) {
        const _0x4d2f51 = [{
          title: _0x21968b.title,
          rows: [..._0x11c282]
        }];
        const _0x5d24e4 = {
          text: _0x21968b.description,
          footer: _0x21968b.footerText,
          mentions: await _0x9071c8.parseMention(_0x21968b.description),
          title: "",
          buttonText: _0x21968b.buttonText,
          sections: _0x4d2f51
        };
        _0x9071c8.sendMessage(_0x436536, _0x5d24e4, {
          quoted: _0x3ff449
        });
      }
    },
    updateProfileStatus: {
      async value(_0x389dfb) {
        return _0x9071c8.query({
          tag: "iq",
          attrs: {
            to: "s.whatsapp.net",
            type: "set",
            xmlns: "status"
          },
          content: [{
            tag: "status",
            attrs: {},
            content: Buffer.from(_0x389dfb, "utf-8")
          }]
        });
      }
    },
    sendPayment: {
      async value(_0x252879, _0x1cd511, _0x327a6a, _0x2ac95f = "", _0x902a5a, _0x10205d) {
        const _0x3ce8b2 = {
          amount: {
            currencyCode: _0x327a6a || "USD",
            offset: 0,
            value: _0x1cd511 || 9.99
          },
          expiryTimestamp: 0,
          amount1000: (_0x1cd511 || 9.99) * 1000,
          currencyCodeIso4217: _0x327a6a || "USD",
          requestFrom: _0x902a5a || "0@s.whatsapp.net",
          noteMessage: {
            extendedTextMessage: {
              text: _0x2ac95f || "Example Payment Message"
            }
          }
        };
        return _0x9071c8.relayMessage(_0x252879, {
          requestPaymentMessage: _0x3ce8b2
        }, {
          ..._0x10205d
        });
      }
    },
    sendPoll: {
      async value(_0x3249c1, _0x517ea0 = "", _0x2c41d1, _0x12e004) {
        if (!Array.isArray(_0x2c41d1[0]) && typeof _0x2c41d1[0] === "string") {
          _0x2c41d1 = [_0x2c41d1];
        }
        if (!_0x12e004) {
          _0x12e004 = {};
        }
        const _0x5add51 = {
          name: _0x517ea0,
          options: _0x2c41d1.map(_0x10b5eb => ({
            optionName: !nullish(_0x10b5eb[0]) && _0x10b5eb[0] || ""
          })),
          selectableOptionsCount: 1
        };
        return _0x9071c8.relayMessage(_0x3249c1, {
          pollCreationMessage: _0x5add51
        }, {
          ..._0x12e004
        });
      }
    },
    loadingMsg: {
      async value(_0x1fa60c, _0x330496, _0x1426b7, _0x4aab96, _0x12a1e7, _0x52af64) {
        let {
          key: _0x3ae285
        } = await _0x9071c8.sendMessage(_0x1fa60c, {
          text: _0x330496,
          ..._0x52af64
        }, {
          quoted: _0x12a1e7
        });
        for (let _0x44a176 = 0; _0x44a176 < _0x4aab96.length; _0x44a176++) {
          await _0x9071c8.sendMessage(_0x1fa60c, {
            text: _0x4aab96[_0x44a176],
            edit: _0x3ae285,
            ..._0x52af64
          }, {
            quoted: _0x12a1e7
          });
        }
        await _0x9071c8.sendMessage(_0x1fa60c, {
          text: _0x1426b7,
          edit: _0x3ae285,
          ..._0x52af64
        }, {
          quoted: _0x12a1e7
        });
      }
    },
    sendHydrated: {
      async value(_0x1145df, _0x2d782e = "", _0x8d9ff7 = "", _0xc605e, _0x1e5791, _0x56dfe6, _0x4a0ca7, _0x521f83, _0x2175ab, _0x3c53de, _0x4dee62) {
        let _0x57387a;
        if (_0xc605e) {
          try {
            _0x57387a = await _0x9071c8.getFile(_0xc605e);
            _0xc605e = _0x57387a.data;
          } catch {
            _0xc605e = _0xc605e;
          }
        }
        if (_0xc605e && !Buffer.isBuffer(_0xc605e) && (typeof _0xc605e === "string" || Array.isArray(_0xc605e))) {
          _0x4dee62 = _0x3c53de;
          _0x3c53de = _0x2175ab;
          _0x2175ab = _0x521f83;
          _0x521f83 = _0x4a0ca7;
          _0x4a0ca7 = _0x56dfe6;
          _0x56dfe6 = _0x1e5791;
          _0x1e5791 = _0xc605e;
          _0xc605e = null;
        }
        if (!_0x4dee62) {
          _0x4dee62 = {};
        }
        let _0x3f71ed = [];
        if (_0x1e5791 || _0x56dfe6) {
          if (!Array.isArray(_0x1e5791)) {
            _0x1e5791 = [_0x1e5791];
          }
          if (!Array.isArray(_0x56dfe6)) {
            _0x56dfe6 = [_0x56dfe6];
          }
          _0x3f71ed.push(...(_0x1e5791.map((_0x1c487a, _0x298980) => [_0x1c487a, _0x56dfe6[_0x298980]]).map(([_0x436022, _0x3b4e2a], _0x202c04) => ({
            index: _0x3f71ed.length + _0x202c04 + 1,
            urlButton: {
              displayText: !nullish(_0x3b4e2a) && _0x3b4e2a || !nullish(_0x436022) && _0x436022 || "",
              url: !nullish(_0x436022) && _0x436022 || !nullish(_0x3b4e2a) && _0x3b4e2a || ""
            }
          })) || []));
        }
        if (_0x4a0ca7 || _0x521f83) {
          if (!Array.isArray(_0x4a0ca7)) {
            _0x4a0ca7 = [_0x4a0ca7];
          }
          if (!Array.isArray(_0x521f83)) {
            _0x521f83 = [_0x521f83];
          }
          _0x3f71ed.push(...(_0x4a0ca7.map((_0x2aae35, _0x464e5b) => [_0x2aae35, _0x521f83[_0x464e5b]]).map(([_0x59be9d, _0x1eb68d], _0x14ba80) => ({
            index: _0x3f71ed.length + _0x14ba80 + 1,
            callButton: {
              displayText: !nullish(_0x1eb68d) && _0x1eb68d || !nullish(_0x59be9d) && _0x59be9d || "",
              phoneNumber: !nullish(_0x59be9d) && _0x59be9d || !nullish(_0x1eb68d) && _0x1eb68d || ""
            }
          })) || []));
        }
        if (_0x2175ab.length) {
          if (!Array.isArray(_0x2175ab[0])) {
            _0x2175ab = [_0x2175ab];
          }
          _0x3f71ed.push(...(_0x2175ab.map(([_0x2a1b54, _0x199e8f], _0x572fbb) => ({
            index: _0x3f71ed.length + _0x572fbb + 1,
            quickReplyButton: {
              displayText: !nullish(_0x2a1b54) && _0x2a1b54 || !nullish(_0x199e8f) && _0x199e8f || "",
              id: !nullish(_0x199e8f) && _0x199e8f || !nullish(_0x2a1b54) && _0x2a1b54 || ""
            }
          })) || []));
        }
        let _0x45a2b6 = {
          ..._0x4dee62,
          [_0xc605e ? "caption" : "text"]: _0x2d782e || "",
          footer: _0x8d9ff7,
          templateButtons: _0x3f71ed,
          ...(_0xc605e ? _0x4dee62.asLocation && /image/.test(_0x57387a.mime) ? {
            location: {
              ..._0x4dee62,
              jpegThumbnail: _0xc605e
            }
          } : {
            [/video/.test(_0x57387a.mime) ? "video" : /image/.test(_0x57387a.mime) ? "image" : "document"]: _0xc605e
          } : {})
        };
        return await _0x9071c8.sendMessage(_0x1145df, _0x45a2b6, {
          quoted: _0x3c53de,
          upload: _0x9071c8.waUploadToServer,
          ..._0x4dee62
        });
      },
      enumerable: true
    },
    sendHydrated2: {
      async value(_0x48aca8, _0xe05acf = "", _0x4ee9e3 = "", _0x423a63, _0xdf95a5, _0x3c29b2, _0x5590b4, _0x279f0e, _0x42e686, _0x23755a, _0x23cad9) {
        let _0x378be1;
        if (_0x423a63) {
          try {
            _0x378be1 = await _0x9071c8.getFile(_0x423a63);
            _0x423a63 = _0x378be1.data;
          } catch {
            _0x423a63 = _0x423a63;
          }
        }
        if (_0x423a63 && !Buffer.isBuffer(_0x423a63) && (typeof _0x423a63 === "string" || Array.isArray(_0x423a63))) {
          _0x23cad9 = _0x23755a;
          _0x23755a = _0x42e686;
          _0x42e686 = callText;
          callText = call;
          call = _0x3c29b2;
          _0x3c29b2 = _0xdf95a5;
          _0xdf95a5 = _0x423a63;
          _0x423a63 = null;
        }
        if (!_0x23cad9) {
          _0x23cad9 = {};
        }
        let _0x377bbd = [];
        if (_0xdf95a5 || _0x3c29b2) {
          if (!Array.isArray(_0xdf95a5)) {
            _0xdf95a5 = [_0xdf95a5];
          }
          if (!Array.isArray(_0x3c29b2)) {
            _0x3c29b2 = [_0x3c29b2];
          }
          _0x377bbd.push(...(_0xdf95a5.map((_0x2bee88, _0x1555b2) => [_0x2bee88, _0x3c29b2[_0x1555b2]]).map(([_0x46e707, _0x4852cf], _0x1c61db) => ({
            index: _0x377bbd.length + _0x1c61db + 1,
            urlButton: {
              displayText: !nullish(_0x4852cf) && _0x4852cf || !nullish(_0x46e707) && _0x46e707 || "",
              url: !nullish(_0x46e707) && _0x46e707 || !nullish(_0x4852cf) && _0x4852cf || ""
            }
          })) || []));
        }
        if (_0x5590b4 || _0x279f0e) {
          if (!Array.isArray(_0x5590b4)) {
            _0x5590b4 = [_0x5590b4];
          }
          if (!Array.isArray(_0x279f0e)) {
            _0x279f0e = [_0x279f0e];
          }
          _0x377bbd.push(...(_0x5590b4.map((_0x32d366, _0x360a58) => [_0x32d366, _0x279f0e[_0x360a58]]).map(([_0x2f209b, _0x24e53f], _0x55ff32) => ({
            index: _0x377bbd.length + _0x55ff32 + 1,
            urlButton: {
              displayText: !nullish(_0x24e53f) && _0x24e53f || !nullish(_0x2f209b) && _0x2f209b || "",
              url: !nullish(_0x2f209b) && _0x2f209b || !nullish(_0x24e53f) && _0x24e53f || ""
            }
          })) || []));
        }
        if (_0x42e686.length) {
          if (!Array.isArray(_0x42e686[0])) {
            _0x42e686 = [_0x42e686];
          }
          _0x377bbd.push(...(_0x42e686.map(([_0x576d38, _0x189a8f], _0x3779d2) => ({
            index: _0x377bbd.length + _0x3779d2 + 1,
            quickReplyButton: {
              displayText: !nullish(_0x576d38) && _0x576d38 || !nullish(_0x189a8f) && _0x189a8f || "",
              id: !nullish(_0x189a8f) && _0x189a8f || !nullish(_0x576d38) && _0x576d38 || ""
            }
          })) || []));
        }
        let _0x4834c4 = {
          ..._0x23cad9,
          [_0x423a63 ? "caption" : "text"]: _0xe05acf || "",
          footer: _0x4ee9e3,
          templateButtons: _0x377bbd,
          ...(_0x423a63 ? _0x23cad9.asLocation && /image/.test(_0x378be1.mime) ? {
            location: {
              ..._0x23cad9,
              jpegThumbnail: _0x423a63
            }
          } : {
            [/video/.test(_0x378be1.mime) ? "video" : /image/.test(_0x378be1.mime) ? "image" : "document"]: _0x423a63
          } : {})
        };
        return await _0x9071c8.sendMessage(_0x48aca8, _0x4834c4, {
          quoted: _0x23755a,
          upload: _0x9071c8.waUploadToServer,
          ..._0x23cad9
        });
      },
      enumerable: true
    },
    cMod: {
      value(_0x46bde2, _0x172dce, _0x2e0845 = "", _0x847e84 = _0x9071c8.user.jid, _0x56882a = {}) {
        if (_0x56882a.mentions && !Array.isArray(_0x56882a.mentions)) {
          _0x56882a.mentions = [_0x56882a.mentions];
        }
        let _0x2c79b7 = _0x172dce.toJSON();
        delete _0x2c79b7.message.messageContextInfo;
        delete _0x2c79b7.message.senderKeyDistributionMessage;
        let _0x21bed7 = Object.keys(_0x2c79b7.message)[0];
        let _0x4b0ba7 = _0x2c79b7.message;
        let _0x22d322 = _0x4b0ba7[_0x21bed7];
        if (typeof _0x22d322 === "string") {
          _0x4b0ba7[_0x21bed7] = _0x2e0845 || _0x22d322;
        } else if (_0x22d322.caption) {
          _0x22d322.caption = _0x2e0845 || _0x22d322.caption;
        } else if (_0x22d322.text) {
          _0x22d322.text = _0x2e0845 || _0x22d322.text;
        }
        if (typeof _0x22d322 !== "string") {
          _0x4b0ba7[_0x21bed7] = {
            ..._0x22d322,
            ..._0x56882a
          };
          _0x4b0ba7[_0x21bed7].contextInfo = {
            ...(_0x22d322.contextInfo || {}),
            mentionedJid: _0x56882a.mentions || _0x22d322.contextInfo?.mentionedJid || []
          };
        }
        if (_0x2c79b7.participant) {
          _0x847e84 = _0x2c79b7.participant = _0x847e84 || _0x2c79b7.participant;
        } else if (_0x2c79b7.key.participant) {
          _0x847e84 = _0x2c79b7.key.participant = _0x847e84 || _0x2c79b7.key.participant;
        }
        if (_0x2c79b7.key.remoteJid.includes("@s.whatsapp.net")) {
          _0x847e84 = _0x847e84 || _0x2c79b7.key.remoteJid;
        } else if (_0x2c79b7.key.remoteJid.includes("@broadcast")) {
          _0x847e84 = _0x847e84 || _0x2c79b7.key.remoteJid;
        }
        _0x2c79b7.key.remoteJid = _0x46bde2;
        _0x2c79b7.key.fromMe = areJidsSameUser(_0x847e84, _0x9071c8.user.id) || false;
        return proto.WebMessageInfo.fromObject(_0x2c79b7);
      },
      enumerable: true
    },
    copyNForward: {
      async value(_0x3469cc, _0x16d158, _0x42116f = true, _0xb81f46 = {}) {
        let _0xa59bac;
        if (_0xb81f46.readViewOnce && _0x16d158.message.viewOnceMessage?.message) {
          _0xa59bac = Object.keys(_0x16d158.message.viewOnceMessage.message)[0];
          delete _0x16d158.message.viewOnceMessage.message[_0xa59bac].viewOnce;
          _0x16d158.message = proto.Message.fromObject(JSON.parse(JSON.stringify(_0x16d158.message.viewOnceMessage.message)));
          _0x16d158.message[_0xa59bac].contextInfo = _0x16d158.message.viewOnceMessage.contextInfo;
        }
        let _0x321d62 = Object.keys(_0x16d158.message)[0];
        let _0x11411c = generateForwardMessageContent(_0x16d158, !!_0x42116f);
        let _0x4f9337 = Object.keys(_0x11411c)[0];
        if (_0x42116f && typeof _0x42116f === "number" && _0x42116f > 1) {
          _0x11411c[_0x4f9337].contextInfo.forwardingScore += _0x42116f;
        }
        _0x11411c[_0x4f9337].contextInfo = {
          ...(_0x16d158.message[_0x321d62].contextInfo || {}),
          ...(_0x11411c[_0x4f9337].contextInfo || {})
        };
        _0x11411c = generateWAMessageFromContent(_0x3469cc, _0x11411c, {
          ..._0xb81f46,
          userJid: _0x9071c8.user.jid
        });
        await _0x9071c8.relayMessage(_0x3469cc, _0x11411c.message, {
          messageId: _0x11411c.key.id,
          additionalAttributes: {
            ..._0xb81f46
          }
        });
        return _0x11411c;
      },
      enumerable: true
    },
    fakeReply: {
      value(_0x297643, _0x4b72ca = "", _0x3e8c32 = this.user.jid, _0x53ca3a = "", _0x136145, _0x56baf2) {
        return _0x9071c8.reply(_0x297643, _0x4b72ca, {
          key: {
            fromMe: areJidsSameUser(_0x3e8c32, _0x9071c8.user.id),
            participant: _0x3e8c32,
            ...(_0x136145 ? {
              remoteJid: _0x136145
            } : {})
          },
          message: {
            conversation: _0x53ca3a
          },
          ..._0x56baf2
        });
      }
    },
    downloadM: {
      async value(_0x3dbaf4, _0x412458, _0x1038fa) {
        let _0x3d65d1;
        if (!_0x3dbaf4 || !_0x3dbaf4.url && !_0x3dbaf4.directPath) {
          return Buffer.alloc(0);
        }
        const _0x26ab4d = await downloadContentFromMessage(_0x3dbaf4, _0x412458);
        let _0x194ba2 = Buffer.from([]);
        for await (const _0x3f4867 of _0x26ab4d) {
          _0x194ba2 = Buffer.concat([_0x194ba2, _0x3f4867]);
        }
        if (_0x1038fa) {
          ({
            filename: _0x3d65d1
          } = await _0x9071c8.getFile(_0x194ba2, true));
        }
        if (_0x1038fa && _0x477f22.existsSync(_0x3d65d1)) {
          return _0x3d65d1;
        } else {
          return _0x194ba2;
        }
      },
      enumerable: true
    },
    parseMention: {
      value(_0x3982a8 = "") {
        return [..._0x3982a8.matchAll(/@([0-9]{5,16}|0)/g)].map(_0x587aea => _0x587aea[1] + "@s.whatsapp.net");
      },
      enumerable: true
    },
    getName: {
      value(_0x2e3663 = "", _0x2fabe3 = false) {
        _0x2e3663 = _0x9071c8.decodeJid(_0x2e3663);
        _0x2fabe3 = _0x9071c8.withoutContact || _0x2fabe3;
        let _0x355bb1;
        if (_0x2e3663.endsWith("@g.us")) {
          return new Promise(async _0x2b7a74 => {
            _0x355bb1 = _0x9071c8.chats[_0x2e3663] || {};
            if (!_0x355bb1.name && !_0x355bb1.subject) {
              _0x355bb1 = (await _0x9071c8.groupMetadata(_0x2e3663)) || {};
            }
            _0x2b7a74(_0x355bb1.name || _0x355bb1.subject || _0x29f377("+" + _0x2e3663.replace("@s.whatsapp.net", "")).getNumber("international"));
          });
        } else {
          _0x355bb1 = _0x2e3663 === "0@s.whatsapp.net" ? {
            jid: _0x2e3663,
            vname: "WhatsApp"
          } : areJidsSameUser(_0x2e3663, _0x9071c8.user.id) ? _0x9071c8.user : _0x9071c8.chats[_0x2e3663] || {};
        }
        return (_0x2fabe3 ? "" : _0x355bb1.name) || _0x355bb1.subject || _0x355bb1.vname || _0x355bb1.notify || _0x355bb1.verifiedName || _0x29f377("+" + _0x2e3663.replace("@s.whatsapp.net", "")).getNumber("international");
      },
      enumerable: true
    },
    loadMessage: {
      value(_0x3c5784) {
        return Object.entries(_0x9071c8.chats).filter(([_0x34c71c, {
          messages: _0x352da1
        }]) => typeof _0x352da1 === "object").find(([_0x297c17, {
          messages: _0x3d647e
        }]) => Object.entries(_0x3d647e).find(([_0x2677de, _0x3461f9]) => _0x2677de === _0x3c5784 || _0x3461f9.key?.id === _0x3c5784))?.[1].messages?.[_0x3c5784];
      },
      enumerable: true
    },
    sendGroupV4Invite: {
      async value(_0x151409, _0x3bba73, _0x5817cb, _0x49e581, _0x52c83a = "unknown subject", _0x1b38bb = "Invitation to join my WhatsApp group", _0xb04daf, _0x9a6289 = {}) {
        const _0x43612a = proto.Message.fromObject({
          groupInviteMessage: proto.GroupInviteMessage.fromObject({
            inviteCode: _0x5817cb,
            inviteExpiration: parseInt(_0x49e581) || +new Date(new Date() + 259200000),
            groupJid: _0x151409,
            groupName: (_0x52c83a ? _0x52c83a : await _0x9071c8.getName(_0x151409)) || null,
            jpegThumbnail: Buffer.isBuffer(_0xb04daf) ? _0xb04daf : null,
            caption: _0x1b38bb
          })
        });
        const _0x92c80c = generateWAMessageFromContent(_0x3bba73, _0x43612a, _0x9a6289);
        await _0x9071c8.relayMessage(_0x3bba73, _0x92c80c.message, {
          messageId: _0x92c80c.key.id,
          additionalAttributes: {
            ..._0x9a6289
          }
        });
        return _0x92c80c;
      },
      enumerable: true
    },
    processMessageStubType: {
      async value(_0x4fb34c) {
        if (!_0x4fb34c.messageStubType) {
          return;
        }
        const _0x195745 = _0x9071c8.decodeJid(_0x4fb34c.key.remoteJid || _0x4fb34c.message?.senderKeyDistributionMessage?.groupId || "");
        if (!_0x195745 || _0x195745 === "status@broadcast") {
          return;
        }
        const _0x4483f0 = _0x257815 => {
          ev.emit("groups.update", [{
            id: _0x195745,
            ..._0x257815
          }]);
        };
        switch (_0x4fb34c.messageStubType) {
          case WAMessageStubType.REVOKE:
          case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
            _0x4483f0({
              revoke: _0x4fb34c.messageStubParameters[0]
            });
            break;
          case WAMessageStubType.GROUP_CHANGE_ICON:
            _0x4483f0({
              icon: _0x4fb34c.messageStubParameters[0]
            });
            break;
          default:
            {
              console.log({
                messageStubType: _0x4fb34c.messageStubType,
                messageStubParameters: _0x4fb34c.messageStubParameters,
                type: WAMessageStubType[_0x4fb34c.messageStubType]
              });
              break;
            }
        }
        const _0x4a1bf2 = _0x195745.endsWith("@g.us");
        if (!_0x4a1bf2) {
          return;
        }
        let _0x1ed0f0 = _0x9071c8.chats[_0x195745];
        if (!_0x1ed0f0) {
          _0x1ed0f0 = _0x9071c8.chats[_0x195745] = {
            id: _0x195745
          };
        }
        _0x1ed0f0.isChats = true;
        const _0xeb8c4 = await _0x9071c8.groupMetadata(_0x195745).catch(_0x570cef => null);
        if (!_0xeb8c4) {
          return;
        }
        _0x1ed0f0.subject = _0xeb8c4.subject;
        _0x1ed0f0.metadata = _0xeb8c4;
      }
    },
    insertAllGroup: {
      async value() {
        const _0x440a73 = (await _0x9071c8.groupFetchAllParticipating().catch(_0x308c54 => null)) || {};
        for (const _0x410d2f in _0x440a73) {
          _0x9071c8.chats[_0x410d2f] = {
            ...(_0x9071c8.chats[_0x410d2f] || {}),
            id: _0x410d2f,
            subject: _0x440a73[_0x410d2f].subject,
            isChats: true,
            metadata: _0x440a73[_0x410d2f]
          };
        }
        return _0x9071c8.chats;
      }
    },
    pushMessage: {
      async value(_0x54c493) {
        if (!_0x54c493) {
          return;
        }
        if (!Array.isArray(_0x54c493)) {
          _0x54c493 = [_0x54c493];
        }
        for (const _0x1e03d5 of _0x54c493) {
          try {
            if (!_0x1e03d5) {
              continue;
            }
            if (_0x1e03d5.messageStubType && _0x1e03d5.messageStubType != WAMessageStubType.CIPHERTEXT) {
              _0x9071c8.processMessageStubType(_0x1e03d5).catch(console.error);
            }
            const _0xa5f1d8 = Object.keys(_0x1e03d5.message || {});
            const _0x3183b0 = !["senderKeyDistributionMessage", "messageContextInfo"].includes(_0xa5f1d8[0]) && _0xa5f1d8[0] || _0xa5f1d8.length >= 3 && _0xa5f1d8[1] !== "messageContextInfo" && _0xa5f1d8[1] || _0xa5f1d8[_0xa5f1d8.length - 1];
            const _0x4182f3 = _0x9071c8.decodeJid(_0x1e03d5.key.remoteJid || _0x1e03d5.message?.senderKeyDistributionMessage?.groupId || "");
            if (_0x1e03d5.message?.[_0x3183b0]?.contextInfo?.quotedMessage) {
              let _0x534253 = _0x1e03d5.message[_0x3183b0].contextInfo;
              let _0x5ef12e = _0x9071c8.decodeJid(_0x534253.participant);
              const _0xb258e7 = _0x9071c8.decodeJid(_0x534253.remoteJid || _0x5ef12e);
              let _0x1075dd = _0x1e03d5.message[_0x3183b0].contextInfo.quotedMessage;
              if (_0xb258e7 && _0xb258e7 !== "status@broadcast" && _0x1075dd) {
                let _0x51bd40 = Object.keys(_0x1075dd)[0];
                if (_0x51bd40 == "conversation") {
                  _0x1075dd.extendedTextMessage = {
                    text: _0x1075dd[_0x51bd40]
                  };
                  delete _0x1075dd.conversation;
                  _0x51bd40 = "extendedTextMessage";
                }
                if (!_0x1075dd[_0x51bd40].contextInfo) {
                  _0x1075dd[_0x51bd40].contextInfo = {};
                }
                _0x1075dd[_0x51bd40].contextInfo.mentionedJid = _0x534253.mentionedJid || _0x1075dd[_0x51bd40].contextInfo.mentionedJid || [];
                const _0x5d7f9d = _0xb258e7.endsWith("g.us");
                if (_0x5d7f9d && !_0x5ef12e) {
                  _0x5ef12e = _0xb258e7;
                }
                const _0x19bcac = {
                  key: {
                    remoteJid: _0xb258e7,
                    fromMe: areJidsSameUser(_0x9071c8.user.jid, _0xb258e7),
                    id: _0x534253.stanzaId,
                    participant: _0x5ef12e
                  },
                  message: JSON.parse(JSON.stringify(_0x1075dd)),
                  ...(_0x5d7f9d ? {
                    participant: _0x5ef12e
                  } : {})
                };
                let _0x50d919 = _0x9071c8.chats[_0x5ef12e];
                if (!_0x50d919) {
                  _0x50d919 = _0x9071c8.chats[_0x5ef12e] = {
                    id: _0x5ef12e,
                    isChats: !_0x5d7f9d
                  };
                }
                if (!_0x50d919.messages) {
                  _0x50d919.messages = {};
                }
                if (!_0x50d919.messages[_0x534253.stanzaId] && !_0x19bcac.key.fromMe) {
                  _0x50d919.messages[_0x534253.stanzaId] = _0x19bcac;
                }
                let _0x382cae;
                if ((_0x382cae = Object.entries(_0x50d919.messages)).length > 40) {
                  _0x50d919.messages = Object.fromEntries(_0x382cae.slice(30, _0x382cae.length));
                }
              }
            }
            if (!_0x4182f3 || _0x4182f3 === "status@broadcast") {
              continue;
            }
            const _0x5466d4 = _0x4182f3.endsWith("@g.us");
            let _0x1603c6 = _0x9071c8.chats[_0x4182f3];
            if (!_0x1603c6) {
              if (_0x5466d4) {
                await _0x9071c8.insertAllGroup().catch(console.error);
              }
              _0x1603c6 = _0x9071c8.chats[_0x4182f3] = {
                id: _0x4182f3,
                isChats: true,
                ...(_0x9071c8.chats[_0x4182f3] || {})
              };
            }
            let _0x3dc883;
            let _0x546a5e;
            if (_0x5466d4) {
              if (!_0x1603c6.subject || !_0x1603c6.metadata) {
                _0x3dc883 = (await _0x9071c8.groupMetadata(_0x4182f3).catch(_0x317c80 => ({}))) || {};
                if (!_0x1603c6.subject) {
                  _0x1603c6.subject = _0x3dc883.subject || "";
                }
                if (!_0x1603c6.metadata) {
                  _0x1603c6.metadata = _0x3dc883;
                }
              }
              _0x546a5e = _0x9071c8.decodeJid(_0x1e03d5.key?.fromMe && _0x9071c8.user.id || _0x1e03d5.participant || _0x1e03d5.key?.participant || _0x4182f3 || "");
              if (_0x546a5e !== _0x4182f3) {
                let _0x36a210 = _0x9071c8.chats[_0x546a5e];
                if (!_0x36a210) {
                  _0x36a210 = _0x9071c8.chats[_0x546a5e] = {
                    id: _0x546a5e
                  };
                }
                if (!_0x36a210.name) {
                  _0x36a210.name = _0x1e03d5.pushName || _0x36a210.name || "";
                }
              }
            } else if (!_0x1603c6.name) {
              _0x1603c6.name = _0x1e03d5.pushName || _0x1603c6.name || "";
            }
            if (["senderKeyDistributionMessage", "messageContextInfo"].includes(_0x3183b0)) {
              continue;
            }
            _0x1603c6.isChats = true;
            if (!_0x1603c6.messages) {
              _0x1603c6.messages = {};
            }
            const _0x45879a = _0x1e03d5.key.fromMe || areJidsSameUser(_0x546a5e || _0x4182f3, _0x9071c8.user.id);
            if (!["protocolMessage"].includes(_0x3183b0) && !_0x45879a && _0x1e03d5.messageStubType != WAMessageStubType.CIPHERTEXT && _0x1e03d5.message) {
              delete _0x1e03d5.message.messageContextInfo;
              delete _0x1e03d5.message.senderKeyDistributionMessage;
              _0x1603c6.messages[_0x1e03d5.key.id] = JSON.parse(JSON.stringify(_0x1e03d5, null, 2));
              let _0x4f79ca;
              if ((_0x4f79ca = Object.entries(_0x1603c6.messages)).length > 40) {
                _0x1603c6.messages = Object.fromEntries(_0x4f79ca.slice(30, _0x4f79ca.length));
              }
            }
          } catch (_0x3591c3) {
            console.error(_0x3591c3);
          }
        }
      }
    },
    serializeM: {
      value(_0x47fbc3) {
        return smsg(_0x9071c8, _0x47fbc3);
      }
    },
    ...(typeof _0x9071c8.chatRead !== "function" ? {
      chatRead: {
        value(_0x4d2913, _0x4dd369 = _0x9071c8.user.jid, _0x28963d) {
          return _0x9071c8.sendReadReceipt(_0x4d2913, _0x4dd369, [_0x28963d]);
        },
        enumerable: true
      }
    } : {}),
    ...(typeof _0x9071c8.setStatus !== "function" ? {
      setStatus: {
        value(_0x596f9a) {
          return _0x9071c8.query({
            tag: "iq",
            attrs: {
              to: S_WHATSAPP_NET,
              type: "set",
              xmlns: "status"
            },
            content: [{
              tag: "status",
              attrs: {},
              content: Buffer.from(_0x596f9a, "utf-8")
            }]
          });
        },
        enumerable: true
      }
    } : {})
  });
  if (_0x4f990e.user?.id) {
    _0x4f990e.user.jid = _0x4f990e.decodeJid(_0x4f990e.user.id);
  }
  _0x42b9ab.bind(_0x4f990e);
  return _0x4f990e;
}
export function smsg(_0x49ad92, _0xa933f4, _0x385ecd) {
  if (!_0xa933f4) {
    return _0xa933f4;
  }
  let _0x110e73 = proto.WebMessageInfo;
  _0xa933f4 = _0x110e73.fromObject(_0xa933f4);
  _0xa933f4.conn = _0x49ad92;
  let _0xa563d6;
  if (_0xa933f4.message) {
    if (_0xa933f4.mtype == "protocolMessage" && _0xa933f4.msg.key) {
      _0xa563d6 = _0xa933f4.msg.key;
      if (_0xa563d6 == "status@broadcast") {
        _0xa563d6.remoteJid = _0xa933f4.chat;
      }
      if (!_0xa563d6.participant || _0xa563d6.participant == "status_me") {
        _0xa563d6.participant = _0xa933f4.sender;
      }
      _0xa563d6.fromMe = _0x49ad92.decodeJid(_0xa563d6.participant) === _0x49ad92.decodeJid(_0x49ad92.user.id);
      if (!_0xa563d6.fromMe && _0xa563d6.remoteJid === _0x49ad92.decodeJid(_0x49ad92.user.id)) {
        _0xa563d6.remoteJid = _0xa933f4.sender;
      }
    }
    if (_0xa933f4.quoted) {
      if (!_0xa933f4.quoted.mediaMessage) {
        delete _0xa933f4.quoted.download;
      }
    }
  }
  if (!_0xa933f4.mediaMessage) {
    delete _0xa933f4.download;
  }
  try {
    if (_0xa563d6 && _0xa933f4.mtype == "protocolMessage") {
      _0x49ad92.ev.emit("message.delete", _0xa563d6);
    }
  } catch (_0x3ca58d) {
    console.error(_0x3ca58d);
  }
  return _0xa933f4;
}
export function serialize() {
  const _0x20a3fc = ["imageMessage", "videoMessage", "audioMessage", "stickerMessage", "documentMessage"];
  return Object.defineProperties(proto.WebMessageInfo.prototype, {
    conn: {
      value: undefined,
      enumerable: false,
      writable: true
    },
    id: {
      get() {
        return this.key?.id;
      }
    },
    isBaileys: {
      get() {
        return this.id?.length === 16 || this.id?.startsWith("3EB0") && this.id?.length === 12 || false;
      }
    },
    chat: {
      get() {
        const _0x95df22 = this.message?.senderKeyDistributionMessage?.groupId;
        return (this.key?.remoteJid || _0x95df22 && _0x95df22 !== "status@broadcast" || "").decodeJid();
      }
    },
    isGroup: {
      get() {
        return this.chat.endsWith("@g.us");
      },
      enumerable: true
    },
    sender: {
      get() {
        return this.conn?.decodeJid(this.key?.fromMe && this.conn?.user.id || this.participant || this.key.participant || this.chat || "");
      },
      enumerable: true
    },
    fromMe: {
      get() {
        return this.key?.fromMe || areJidsSameUser(this.conn?.user.id, this.sender) || false;
      }
    },
    mtype: {
      get() {
        if (!this.message) {
          return "";
        }
        const _0x1fb06b = Object.keys(this.message);
        return !["senderKeyDistributionMessage", "messageContextInfo"].includes(_0x1fb06b[0]) && _0x1fb06b[0] || _0x1fb06b.length >= 3 && _0x1fb06b[1] !== "messageContextInfo" && _0x1fb06b[1] || _0x1fb06b[_0x1fb06b.length - 1];
      },
      enumerable: true
    },
    msg: {
      get() {
        if (!this.message) {
          return null;
        }
        return this.message[this.mtype];
      }
    },
    mediaMessage: {
      get() {
        if (!this.message) {
          return null;
        }
        const _0x48dc55 = (this.msg?.url || this.msg?.directPath ? {
          ...this.message
        } : extractMessageContent(this.message)) || null;
        if (!_0x48dc55) {
          return null;
        }
        const _0x420f41 = Object.keys(_0x48dc55)[0];
        if (_0x20a3fc.includes(_0x420f41)) {
          return _0x48dc55;
        } else {
          return null;
        }
      },
      enumerable: true
    },
    mediaType: {
      get() {
        let _0x2e49ed;
        if (!(_0x2e49ed = this.mediaMessage)) {
          return null;
        }
        return Object.keys(_0x2e49ed)[0];
      },
      enumerable: true
    },
    quoted: {
      get() {
        const _0x4dabc4 = this;
        const _0x26c948 = _0x4dabc4.msg;
        const _0x4dba4e = _0x26c948?.contextInfo;
        const _0x7613d = _0x4dba4e?.quotedMessage;
        if (!_0x26c948 || !_0x4dba4e || !_0x7613d) {
          return null;
        }
        const _0x22b7ee = Object.keys(_0x7613d)[0];
        let _0x269e35 = _0x7613d[_0x22b7ee];
        const _0x459d65 = typeof _0x269e35 === "string" ? _0x269e35 : _0x269e35.text;
        return Object.defineProperties(JSON.parse(JSON.stringify(typeof _0x269e35 === "string" ? {
          text: _0x269e35
        } : _0x269e35)), {
          mtype: {
            get() {
              return _0x22b7ee;
            },
            enumerable: true
          },
          mediaMessage: {
            get() {
              const _0x59a076 = (_0x269e35.url || _0x269e35.directPath ? {
                ..._0x7613d
              } : extractMessageContent(_0x7613d)) || null;
              if (!_0x59a076) {
                return null;
              }
              const _0x53e8c2 = Object.keys(_0x59a076)[0];
              if (_0x20a3fc.includes(_0x53e8c2)) {
                return _0x59a076;
              } else {
                return null;
              }
            },
            enumerable: true
          },
          mediaType: {
            get() {
              let _0x1a4329;
              if (!(_0x1a4329 = this.mediaMessage)) {
                return null;
              }
              return Object.keys(_0x1a4329)[0];
            },
            enumerable: true
          },
          id: {
            get() {
              return _0x4dba4e.stanzaId;
            },
            enumerable: true
          },
          chat: {
            get() {
              return _0x4dba4e.remoteJid || _0x4dabc4.chat;
            },
            enumerable: true
          },
          isBaileys: {
            get() {
              return this.id?.length === 16 || this.id?.startsWith("3EB0") && this.id.length === 12 || false;
            },
            enumerable: true
          },
          sender: {
            get() {
              return (_0x4dba4e.participant || this.chat || "").decodeJid();
            },
            enumerable: true
          },
          fromMe: {
            get() {
              return areJidsSameUser(this.sender, _0x4dabc4.conn?.user.jid);
            },
            enumerable: true
          },
          text: {
            get() {
              return _0x459d65 || this.caption || this.contentText || this.selectedDisplayText || "";
            },
            enumerable: true
          },
          mentionedJid: {
            get() {
              return _0x269e35.contextInfo?.mentionedJid || _0x4dabc4.getQuotedObj()?.mentionedJid || [];
            },
            enumerable: true
          },
          name: {
            get() {
              const _0x35b4db = this.sender;
              if (_0x35b4db) {
                return _0x4dabc4.conn?.getName(_0x35b4db);
              } else {
                return null;
              }
            },
            enumerable: true
          },
          vM: {
            get() {
              return proto.WebMessageInfo.fromObject({
                key: {
                  fromMe: this.fromMe,
                  remoteJid: this.chat,
                  id: this.id
                },
                message: _0x7613d,
                ...(_0x4dabc4.isGroup ? {
                  participant: this.sender
                } : {})
              });
            }
          },
          fakeObj: {
            get() {
              return this.vM;
            }
          },
          download: {
            value(_0x46fab4 = false) {
              const _0x44a7ed = this.mediaType;
              return _0x4dabc4.conn?.downloadM(this.mediaMessage[_0x44a7ed], _0x44a7ed.replace(/message/i, ""), _0x46fab4);
            },
            enumerable: true,
            configurable: true
          },
          reply: {
            value(_0x2c96f0, _0x39001e, _0x1c3d21) {
              return _0x4dabc4.conn?.reply(_0x39001e ? _0x39001e : this.chat, _0x2c96f0, this.vM, _0x1c3d21);
            },
            enumerable: true
          },
          copy: {
            value() {
              const _0x3cf9d = proto.WebMessageInfo;
              return smsg(conn, _0x3cf9d.fromObject(_0x3cf9d.toObject(this.vM)));
            },
            enumerable: true
          },
          forward: {
            value(_0x2dd806, _0x1ee774 = false, _0x10bed9) {
              return _0x4dabc4.conn?.sendMessage(_0x2dd806, {
                forward: this.vM,
                force: _0x1ee774,
                ..._0x10bed9
              }, {
                ..._0x10bed9
              });
            },
            enumerable: true
          },
          copyNForward: {
            value(_0xb116cc, _0x53f72e = false, _0x3e9a33) {
              return _0x4dabc4.conn?.copyNForward(_0xb116cc, this.vM, _0x53f72e, _0x3e9a33);
            },
            enumerable: true
          },
          cMod: {
            value(_0x3413d2, _0x5a7b23 = "", _0x2b1e46 = this.sender, _0x4472fc = {}) {
              return _0x4dabc4.conn?.cMod(_0x3413d2, this.vM, _0x5a7b23, _0x2b1e46, _0x4472fc);
            },
            enumerable: true
          },
          delete: {
            value() {
              return _0x4dabc4.conn?.sendMessage(this.chat, {
                delete: this.vM.key
              });
            },
            enumerable: true
          },
          react: {
            value(_0x3e8171) {
              return _0x4dabc4.conn?.sendMessage(this.chat, {
                react: {
                  text: _0x3e8171,
                  key: this.vM.key
                }
              });
            },
            enumerable: true
          }
        });
      },
      enumerable: true
    },
    _text: {
      value: null,
      writable: true
    },
    text: {
      get() {
        const _0x491195 = this.msg;
        const _0x2d8a87 = (typeof _0x491195 === "string" ? _0x491195 : _0x491195?.text) || _0x491195?.caption || _0x491195?.contentText || "";
        if (typeof this._text === "string") {
          return this._text;
        } else {
          return "" || (typeof _0x2d8a87 === "string" ? _0x2d8a87 : _0x2d8a87?.selectedDisplayText || _0x2d8a87?.hydratedTemplate?.hydratedContentText || _0x2d8a87) || "";
        }
      },
      set(_0x30dd3b) {
        return this._text = _0x30dd3b;
      },
      enumerable: true
    },
    mentionedJid: {
      get() {
        return this.msg?.contextInfo?.mentionedJid?.length && this.msg.contextInfo.mentionedJid || [];
      },
      enumerable: true
    },
    name: {
      get() {
        return !nullish(this.pushName) && this.pushName || this.conn?.getName(this.sender);
      },
      enumerable: true
    },
    download: {
      value(_0x4ce01b = false) {
        const _0x315746 = this.mediaType;
        return this.conn?.downloadM(this.mediaMessage[_0x315746], _0x315746.replace(/message/i, ""), _0x4ce01b);
      },
      enumerable: true,
      configurable: true
    },
    reply: {
      value(_0x4ca17d, _0x59872f, _0x27f05b) {
        return this.conn?.reply(_0x59872f ? _0x59872f : this.chat, _0x4ca17d, this, _0x27f05b);
      }
    },
    copy: {
      value() {
        const _0xfd243e = proto.WebMessageInfo;
        return smsg(this.conn, _0xfd243e.fromObject(_0xfd243e.toObject(this)));
      },
      enumerable: true
    },
    forward: {
      value(_0x5cbddd, _0x2be099 = false, _0x2eb228 = {}) {
        return this.conn?.sendMessage(_0x5cbddd, {
          forward: this,
          force: _0x2be099,
          ..._0x2eb228
        }, {
          ..._0x2eb228
        });
      },
      enumerable: true
    },
    copyNForward: {
      value(_0x5bde00, _0x231651 = false, _0x1fd7ec = {}) {
        return this.conn?.copyNForward(_0x5bde00, this, _0x231651, _0x1fd7ec);
      },
      enumerable: true
    },
    cMod: {
      value(_0x453cd4, _0x582668 = "", _0x1c9b8a = this.sender, _0x226ae5 = {}) {
        return this.conn?.cMod(_0x453cd4, this, _0x582668, _0x1c9b8a, _0x226ae5);
      },
      enumerable: true
    },
    getQuotedObj: {
      value() {
        if (!this.quoted.id) {
          return null;
        }
        const _0x425a25 = proto.WebMessageInfo.fromObject(this.conn?.loadMessage(this.quoted.id) || this.quoted.vM);
        return smsg(this.conn, _0x425a25);
      },
      enumerable: true
    },
    getQuotedMessage: {
      get() {
        return this.getQuotedObj;
      }
    },
    delete: {
      value() {
        return this.conn?.sendMessage(this.chat, {
          delete: this.key
        });
      },
      enumerable: true
    },
    react: {
      value(_0x4af345) {
        return this.conn?.sendMessage(this.chat, {
          react: {
            text: _0x4af345,
            key: this.key
          }
        });
      },
      enumerable: true
    }
  });
}
export function logic(_0xf7d994, _0x52268d, _0x57de5d) {
  if (_0x52268d.length !== _0x57de5d.length) {
    throw new Error("Input and Output must have same length");
  }
  for (let _0x370f92 in _0x52268d) {
    if (_0x5bbd14.isDeepStrictEqual(_0xf7d994, _0x52268d[_0x370f92])) {
      return _0x57de5d[_0x370f92];
    }
  }
  return null;
}
export function protoType() {
  Buffer.prototype.toArrayBuffer = function _0x2ba952() {
    const _0x3a8cb2 = new ArrayBuffer(this.length);
    const _0x434b02 = new Uint8Array(_0x3a8cb2);
    for (let _0x4132e5 = 0; _0x4132e5 < this.length; ++_0x4132e5) {
      _0x434b02[_0x4132e5] = this[_0x4132e5];
    }
    return _0x3a8cb2;
  };
  Buffer.prototype.toArrayBufferV2 = function _0x556265() {
    return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength);
  };
  ArrayBuffer.prototype.toBuffer = function _0x268bf8() {
    return Buffer.from(new Uint8Array(this));
  };
  Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function _0x568b64() {
    return await fileTypeFromBuffer(this);
  };
  String.prototype.isNumber = Number.prototype.isNumber = isNumber;
  String.prototype.capitalize = function _0x199e4c() {
    return this.charAt(0).toUpperCase() + this.slice(1, this.length);
  };
  String.prototype.capitalizeV2 = function _0x106b0a() {
    const _0x391d90 = this.split(" ");
    return _0x391d90.map(_0x8216f5 => _0x8216f5.capitalize()).join(" ");
  };
  String.prototype.decodeJid = function _0x5535d1() {
    if (/:\d+@/gi.test(this)) {
      const _0x38bd13 = jidDecode(this) || {};
      return (_0x38bd13.user && _0x38bd13.server && _0x38bd13.user + "@" + _0x38bd13.server || this).trim();
    } else {
      return this.trim();
    }
  };
  Number.prototype.toTimeString = function _0x2e3c76() {
    const _0x316e21 = Math.floor(this / 1000 % 60);
    const _0x27177b = Math.floor(this / 60000 % 60);
    const _0x5a5db6 = Math.floor(this / 3600000 % 24);
    const _0x7219cc = Math.floor(this / 86400000);
    return ((_0x7219cc ? _0x7219cc + " day(s) " : "") + (_0x5a5db6 ? _0x5a5db6 + " hour(s) " : "") + (_0x27177b ? _0x27177b + " minute(s) " : "") + (_0x316e21 ? _0x316e21 + " second(s)" : "")).trim();
  };
  Number.prototype.getRandom = String.prototype.getRandom = Array.prototype.getRandom = getRandom;
}
function isNumber() {
  const _0x4969cd = parseInt(this);
  return typeof _0x4969cd === "number" && !isNaN(_0x4969cd);
}
function getRandom() {
  if (Array.isArray(this) || this instanceof String) {
    return this[Math.floor(Math.random() * this.length)];
  }
  return Math.floor(Math.random() * this);
}
function nullish(_0x3195b2) {
  return _0x3195b2 === null || _0x3195b2 === undefined;
}
