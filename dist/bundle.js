import{createRequire as e}from"node:module";var t={998:(e,t,n)=>{const r=n(896),o=n(928),i=n(857),s=n(982),a=n(56).version,l=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;function u(e){console.log(`[dotenv@${a}][DEBUG] ${e}`)}function c(e){return e&&e.DOTENV_KEY&&e.DOTENV_KEY.length>0?e.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function f(e,t){let n;try{n=new URL(t)}catch(e){if("ERR_INVALID_URL"===e.code){const e=new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");throw e.code="INVALID_DOTENV_KEY",e}throw e}const r=n.password;if(!r){const e=new Error("INVALID_DOTENV_KEY: Missing key part");throw e.code="INVALID_DOTENV_KEY",e}const o=n.searchParams.get("environment");if(!o){const e=new Error("INVALID_DOTENV_KEY: Missing environment part");throw e.code="INVALID_DOTENV_KEY",e}const i=`DOTENV_VAULT_${o.toUpperCase()}`,s=e.parsed[i];if(!s){const e=new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${i} in your .env.vault file.`);throw e.code="NOT_FOUND_DOTENV_ENVIRONMENT",e}return{ciphertext:s,key:r}}function d(e){let t=null;if(e&&e.path&&e.path.length>0)if(Array.isArray(e.path))for(const n of e.path)r.existsSync(n)&&(t=n.endsWith(".vault")?n:`${n}.vault`);else t=e.path.endsWith(".vault")?e.path:`${e.path}.vault`;else t=o.resolve(process.cwd(),".env.vault");return r.existsSync(t)?t:null}function p(e){return"~"===e[0]?o.join(i.homedir(),e.slice(1)):e}const v={configDotenv:function(e){const t=o.resolve(process.cwd(),".env");let n="utf8";const i=Boolean(e&&e.debug);e&&e.encoding?n=e.encoding:i&&u("No encoding is specified. UTF-8 is used by default");let s,a=[t];if(e&&e.path)if(Array.isArray(e.path)){a=[];for(const t of e.path)a.push(p(t))}else a=[p(e.path)];const l={};for(const t of a)try{const o=v.parse(r.readFileSync(t,{encoding:n}));v.populate(l,o,e)}catch(e){i&&u(`Failed to load ${t} ${e.message}`),s=e}let c=process.env;return e&&null!=e.processEnv&&(c=e.processEnv),v.populate(c,l,e),s?{parsed:l,error:s}:{parsed:l}},_configVault:function(e){console.log(`[dotenv@${a}][INFO] Loading env from encrypted .env.vault`);const t=v._parseVault(e);let n=process.env;return e&&null!=e.processEnv&&(n=e.processEnv),v.populate(n,t,e),{parsed:t}},_parseVault:function(e){const t=d(e),n=v.configDotenv({path:t});if(!n.parsed){const e=new Error(`MISSING_DATA: Cannot parse ${t} for an unknown reason`);throw e.code="MISSING_DATA",e}const r=c(e).split(","),o=r.length;let i;for(let e=0;e<o;e++)try{const t=f(n,r[e].trim());i=v.decrypt(t.ciphertext,t.key);break}catch(t){if(e+1>=o)throw t}return v.parse(i)},config:function(e){if(0===c(e).length)return v.configDotenv(e);const t=d(e);return t?v._configVault(e):(n=`You set DOTENV_KEY but you are missing a .env.vault file at ${t}. Did you forget to build it?`,console.log(`[dotenv@${a}][WARN] ${n}`),v.configDotenv(e));var n},decrypt:function(e,t){const n=Buffer.from(t.slice(-64),"hex");let r=Buffer.from(e,"base64");const o=r.subarray(0,12),i=r.subarray(-16);r=r.subarray(12,-16);try{const e=s.createDecipheriv("aes-256-gcm",n,o);return e.setAuthTag(i),`${e.update(r)}${e.final()}`}catch(e){const t=e instanceof RangeError,n="Invalid key length"===e.message,r="Unsupported state or unable to authenticate data"===e.message;if(t||n){const e=new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");throw e.code="INVALID_DOTENV_KEY",e}if(r){const e=new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");throw e.code="DECRYPTION_FAILED",e}throw e}},parse:function(e){const t={};let n,r=e.toString();for(r=r.replace(/\r\n?/gm,"\n");null!=(n=l.exec(r));){const e=n[1];let r=n[2]||"";r=r.trim();const o=r[0];r=r.replace(/^(['"`])([\s\S]*)\1$/gm,"$2"),'"'===o&&(r=r.replace(/\\n/g,"\n"),r=r.replace(/\\r/g,"\r")),t[e]=r}return t},populate:function(e,t,n={}){const r=Boolean(n&&n.debug),o=Boolean(n&&n.override);if("object"!=typeof t){const e=new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");throw e.code="OBJECT_REQUIRED",e}for(const n of Object.keys(t))Object.prototype.hasOwnProperty.call(e,n)?(!0===o&&(e[n]=t[n]),r&&u(!0===o?`"${n}" is already defined and WAS overwritten`:`"${n}" is already defined and was NOT overwritten`)):e[n]=t[n]}};e.exports.configDotenv=v.configDotenv,e.exports._configVault=v._configVault,e.exports._parseVault=v._parseVault,e.exports.config=v.config,e.exports.decrypt=v.decrypt,e.exports.parse=v.parse,e.exports.populate=v.populate,e.exports=v},153:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=n(293),o=[{id:"1",username:"Frank",age:53,hobbies:["dancing","cycling"]},{id:"2",username:"Alice",age:35,hobbies:[]},{id:"3",username:"Frank",age:57,hobbies:["swimming"]},{id:"4",username:"Grace",age:35,hobbies:["photography","painting","coding"]},{id:"5",username:"Grace",age:46,hobbies:[]},{id:"6",username:"Hank",age:29,hobbies:[]},{id:"7",username:"Alice",age:42,hobbies:["painting"]},{id:"8",username:"Jack",age:34,hobbies:[]},{id:"9",username:"Ivy",age:59,hobbies:[]},{id:"10",username:"Grace",age:37,hobbies:["coding","photography"]}].map((e=>({...e,id:(0,r.v4)()})));t.default=o},156:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=i(n(67)),l=s(n(101)),u=s(n(451)),c=s(n(680)),f=s(n(690)),d=s(n(450)),p=s(n(285));i(n(998)).config();const v=process.env.PORT;a.createServer(((e,t)=>{try{const n=new URL(e.url??"",`http://${e.headers.host}`);switch(e.method){case"GET":(0,l.default)(e,t,n);break;case"POST":(0,d.default)(e,t,u.default,n);break;case"PUT":(0,d.default)(e,t,c.default,n);break;case"DELETE":(0,f.default)(e,t,n);break;default:t.writeHead(500,{"Content-Type":"text/plain"}),t.end("Intenal server error")}}catch(e){(0,p.default)(e,t)}})).listen(v,(()=>{console.log(`Server is listening on ${v} port`)}))},690:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){const r=n.pathname.split("/");if("users"===r[2]){const e=r[3];if(e){if(!(0,o.validate)(e))return t.writeHead(400,{"Content-Type":"text/plain"}),void t.end("userId is invalid");const n=s.default.findIndex((t=>t.id===e));-1!==n?((0,i.default)(n),t.writeHead(204),t.end()):(t.writeHead(404,{"Content-Type":"text/plain"}),t.end("record with id === userId doesn't exist"))}else t.writeHead(400,{"Content-Type":"text/plain"}),t.end("userId is not provided in the path")}else t.writeHead(404,{"Content-Type":"text/plain"}),t.end("Route not found")};const o=n(293),i=r(n(229)),s=r(n(153))},101:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){const r=n.pathname.split("/");if("users"===r[2]){const e=r[3];if(e){if(!(0,o.validate)(e))return t.writeHead(400,{"Content-Type":"text/plain"}),void t.end("userId is invalid");const n=i.default.find((t=>t.id===e));n?(t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(n))):(t.writeHead(404,{"Content-Type":"text/plain"}),t.end("record with id === userId doesn't exist"))}else t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(i.default))}else t.writeHead(404,{"Content-Type":"text/plain"}),t.end("Route not found")};const o=n(293),i=r(n(153))},451:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n,r){if("users"===n.pathname.split("/")[2]){const e=r;if(!(0,i.default)(e))return t.writeHead(400,{"Content-Type":"text/plain"}),void t.end("Body does not contain required fields or they have invalid values");{const n=(0,o.default)(e);t.writeHead(201,{"Content-Type":"application/json"}),t.write(JSON.stringify(n)),t.end()}}else t.writeHead(404,{"Content-Type":"text/plain"}),t.end("Route not found")};const o=r(n(733)),i=r(n(807))},680:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n,r){const l=n.pathname.split("/");if("users"===l[2]){const n=l[3];if(!(0,s.validate)(n))return t.writeHead(400,{"Content-Type":"text/plain"}),void t.end("userId is invalid");const u=a.default.findIndex((e=>e.id===n));if(-1!==u){const n=r;if((0,i.default)(n)){const n=(0,o.default)(e,u,r);t.writeHead(200,{"Content-Type":"application/json"}),t.write(JSON.stringify(n)),t.end()}else t.writeHead(400,{"Content-Type":"text/plain"}),t.end("Body does not contain required fields or they have invalid values")}else t.writeHead(404,{"Content-Type":"text/plain"}),t.end("record with id === userId doesn't exist")}else t.writeHead(404,{"Content-Type":"text/plain"}),t.end("Route not found")};const o=r(n(651)),i=r(n(734)),s=n(293),a=r(n(153))},733:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){const t={...e,age:Number(e.age),id:(0,o.v4)()};return i.default.push(t),t};const o=n(293),i=r(n(153))},229:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){o.default.splice(e,1)};const o=r(n(153))},285:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){console.log(e),t.writeHead(500,{"Content-Type":"application/json"}),t.write(JSON.stringify({message:"Internal server error"})),t.end()}},450:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n,r){let o=[];e.on("data",(e=>{o.push(e)})),e.on("end",(()=>{let i=Buffer.concat(o).toString(),s={};if("application/json"===e.headers["content-type"])try{s=JSON.parse(i)}catch(e){return console.error("Error parsing JSON:",e),t.writeHead(400,{"Content-Type":"text/plain"}),void t.end("Invalid JSON")}n(e,t,r,s)}))}},651:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){const r=n;if(void 0!==r.age&&"string"==typeof r.age){const e=Number(r.age);isNaN(e)||(r.age=e)}return o.default[t]={...o.default[t],...r},o.default[t]};const o=r(n(153))},807:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){const t=Object.keys({username:"",age:0,hobbies:[]}),n=Object.keys(e);return t.length===n.length&&(0,o.default)(e)};const o=r(n(734))},734:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){const t=Object.keys({username:"",age:0,hobbies:[]});for(let n of Object.keys(e)){if(!t.includes(n))return!1;if("username"===n&&"string"!=typeof e[n])return!1;if("age"===n){const t=parseInt(String(e[n]??""));if(!t||"number"!=typeof t||!Number.isInteger(t)||t<0)return!1}if("hobbies"===n&&!Array.isArray(e[n]))return!1}return!0}},293:(t,n,r)=>{r.r(n),r.d(n,{MAX:()=>o,NIL:()=>i,parse:()=>l,stringify:()=>f,v1:()=>w,v1ToV6:()=>E,v3:()=>D,v4:()=>I,v5:()=>N,v6:()=>j,v6ToV1:()=>x,v7:()=>U,validate:()=>a,version:()=>S});const o="ffffffff-ffff-ffff-ffff-ffffffffffff",i="00000000-0000-0000-0000-000000000000",s=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i,a=function(e){return"string"==typeof e&&s.test(e)},l=function(e){if(!a(e))throw TypeError("Invalid UUID");let t;const n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n},u=[];for(let e=0;e<256;++e)u.push((e+256).toString(16).slice(1));function c(e,t=0){return(u[e[t+0]]+u[e[t+1]]+u[e[t+2]]+u[e[t+3]]+"-"+u[e[t+4]]+u[e[t+5]]+"-"+u[e[t+6]]+u[e[t+7]]+"-"+u[e[t+8]]+u[e[t+9]]+"-"+u[e[t+10]]+u[e[t+11]]+u[e[t+12]]+u[e[t+13]]+u[e[t+14]]+u[e[t+15]]).toLowerCase()}const f=function(e,t=0){const n=c(e,t);if(!a(n))throw TypeError("Stringified UUID is invalid");return n},d=e(import.meta.url)("node:crypto");var p=r.n(d);const v=new Uint8Array(256);let y,g,h=v.length;function _(){return h>v.length-16&&(p().randomFillSync(v),h=0),v.slice(h,h+=16)}let m=0,b=0;const w=function(e,t,n){let r=t&&n||0;const o=t||new Array(16);let i=(e=e||{}).node,s=e.clockseq;if(e._v6||(i||(i=y),null==s&&(s=g)),null==i||null==s){const t=e.random||(e.rng||_)();null==i&&(i=[t[0],t[1],t[2],t[3],t[4],t[5]],y||e._v6||(i[0]|=1,y=i)),null==s&&(s=16383&(t[6]<<8|t[7]),void 0!==g||e._v6||(g=s))}let a=void 0!==e.msecs?e.msecs:Date.now(),l=void 0!==e.nsecs?e.nsecs:b+1;const u=a-m+(l-b)/1e4;if(u<0&&void 0===e.clockseq&&(s=s+1&16383),(u<0||a>m)&&void 0===e.nsecs&&(l=0),l>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");m=a,b=l,g=s,a+=122192928e5;const f=(1e4*(268435455&a)+l)%4294967296;o[r++]=f>>>24&255,o[r++]=f>>>16&255,o[r++]=f>>>8&255,o[r++]=255&f;const d=a/4294967296*1e4&268435455;o[r++]=d>>>8&255,o[r++]=255&d,o[r++]=d>>>24&15|16,o[r++]=d>>>16&255,o[r++]=s>>>8|128,o[r++]=255&s;for(let e=0;e<6;++e)o[r+e]=i[e];return t||c(o)};function E(e){const t=(n="string"==typeof e?l(e):e,Uint8Array.of((15&n[6])<<4|n[7]>>4&15,(15&n[7])<<4|(240&n[4])>>4,(15&n[4])<<4|(240&n[5])>>4,(15&n[5])<<4|(240&n[0])>>4,(15&n[0])<<4|(240&n[1])>>4,(15&n[1])<<4|(240&n[2])>>4,96|15&n[2],n[3],n[8],n[9],n[10],n[11],n[12],n[13],n[14],n[15]));var n;return"string"==typeof e?c(t):t}function O(e,t,n){function r(e,r,o,i){var s;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof r&&(r=l(r)),16!==(null===(s=r)||void 0===s?void 0:s.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let a=new Uint8Array(16+e.length);if(a.set(r),a.set(e,r.length),a=n(a),a[6]=15&a[6]|t,a[8]=63&a[8]|128,o){i=i||0;for(let e=0;e<16;++e)o[i+e]=a[e];return o}return c(a)}try{r.name=e}catch(e){}return r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",r}const D=O("v3",48,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),p().createHash("md5").update(e).digest()})),T={randomUUID:p().randomUUID},I=function(e,t,n){if(T.randomUUID&&!t&&!e)return T.randomUUID();const r=(e=e||{}).random||(e.rng||_)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){n=n||0;for(let e=0;e<16;++e)t[n+e]=r[e];return t}return c(r)},N=O("v5",80,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),p().createHash("sha1").update(e).digest()}));function j(e={},t,n=0){let r=w({...e,_v6:!0},new Uint8Array(16));if(r=E(r),t){for(let e=0;e<16;e++)t[n+e]=r[e];return t}return c(r)}function x(e){const t=(n="string"==typeof e?l(e):e,Uint8Array.of((15&n[3])<<4|n[4]>>4&15,(15&n[4])<<4|(240&n[5])>>4,(15&n[5])<<4|15&n[6],n[7],(15&n[1])<<4|(240&n[2])>>4,(15&n[2])<<4|(240&n[3])>>4,16|(240&n[0])>>4,(15&n[0])<<4|(240&n[1])>>4,n[8],n[9],n[10],n[11],n[12],n[13],n[14],n[15]));var n;return"string"==typeof e?c(t):t}let A=null,V=null,M=0;const U=function(e,t,n){e=e||{};let r=t&&n||0;const o=t||new Uint8Array(16),i=e.random||(e.rng||_)(),s=void 0!==e.msecs?e.msecs:Date.now();let a=void 0!==e.seq?e.seq:null,l=V,u=A;return s>M&&void 0===e.msecs&&(M=s,null!==a&&(l=null,u=null)),null!==a&&(a>2147483647&&(a=2147483647),l=a>>>19&4095,u=524287&a),null!==l&&null!==u||(l=127&i[6],l=l<<8|i[7],u=63&i[8],u=u<<8|i[9],u=u<<5|i[10]>>>3),s+1e4>M&&null===a?++u>524287&&(u=0,++l>4095&&(l=0,M++)):M=s,V=l,A=u,o[r++]=M/1099511627776&255,o[r++]=M/4294967296&255,o[r++]=M/16777216&255,o[r++]=M/65536&255,o[r++]=M/256&255,o[r++]=255&M,o[r++]=l>>>4&15|112,o[r++]=255&l,o[r++]=u>>>13&63|128,o[r++]=u>>>5&255,o[r++]=u<<3&255|7&i[10],o[r++]=i[11],o[r++]=i[12],o[r++]=i[13],o[r++]=i[14],o[r++]=i[15],t||c(o)},S=function(e){if(!a(e))throw TypeError("Invalid UUID");return parseInt(e.slice(14,15),16)}},982:t=>{t.exports=e(import.meta.url)("crypto")},896:t=>{t.exports=e(import.meta.url)("fs")},67:t=>{t.exports=e(import.meta.url)("node:http")},857:t=>{t.exports=e(import.meta.url)("os")},928:t=>{t.exports=e(import.meta.url)("path")},56:e=>{e.exports=JSON.parse('{"name":"dotenv","version":"16.4.5","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","test:coverage":"tap --coverage-report=lcov","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"funding":"https://dotenvx.com","keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@definitelytyped/dtslint":"^0.0.133","@types/node":"^18.11.3","decache":"^4.6.1","sinon":"^14.0.1","standard":"^17.0.0","standard-markdown":"^7.1.0","standard-version":"^9.5.0","tap":"^16.3.0","tar":"^6.1.11","typescript":"^4.8.4"},"engines":{"node":">=12"},"browser":{"fs":false}}')}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e].call(i.exports,i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(156);