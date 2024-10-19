import{createRequire as e}from"node:module";var n={n:e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},d:(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o:(e,n)=>Object.prototype.hasOwnProperty.call(e,n)};const t=e(import.meta.url)("node:http"),r=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i,i=function(e){return"string"==typeof e&&r.test(e)},o=e(import.meta.url)("node:crypto");var s=n.n(o);const a={randomUUID:s().randomUUID},d=new Uint8Array(256);let u=d.length;function f(){return u>d.length-16&&(s().randomFillSync(d),u=0),d.slice(u,u+=16)}const c=[];for(let e=0;e<256;++e)c.push((e+256).toString(16).slice(1));const p=function(e,n,t){if(a.randomUUID&&!n&&!e)return a.randomUUID();const r=(e=e||{}).random||(e.rng||f)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,n){t=t||0;for(let e=0;e<16;++e)n[t+e]=r[e];return n}return function(e,n=0){return(c[e[n+0]]+c[e[n+1]]+c[e[n+2]]+c[e[n+3]]+"-"+c[e[n+4]]+c[e[n+5]]+"-"+c[e[n+6]]+c[e[n+7]]+"-"+c[e[n+8]]+c[e[n+9]]+"-"+c[e[n+10]]+c[e[n+11]]+c[e[n+12]]+c[e[n+13]]+c[e[n+14]]+c[e[n+15]]).toLowerCase()}(r)};function l(e){const n=Object.keys({username:"",age:0,hobbies:[]});for(let t of Object.keys(e)){if(!n.includes(t))return!1;if("username"===t&&"string"!=typeof e[t])return!1;if("age"===t){const n=parseInt(String(e[t]??""));if(!n||"number"!=typeof n||!Number.isInteger(n)||n<0)return!1}if("hobbies"===t&&!Array.isArray(e[t]))return!1}return!0}function y(e,n){if("users"===e.query.pathname.split("/")[2]){const t=e.body;if(!function(e){const n=Object.keys({username:"",age:0,hobbies:[]}),t=Object.keys(e);return n.length===t.length&&l(e)}(t))return n.writeHead(400,{"Content-Type":"text/plain"}),void n.end("Body does not contain required fields or they have invalid values");{const r=function(e,n){e.users||(e.users=[]);const t={...n,id:p()};return e.users.push(t),t}(e,t);n.writeHead(201,{"Content-Type":"application/json"}),n.write(JSON.stringify(r)),n.end()}}else n.writeHead(404,{"Content-Type":"text/plain"}),n.end("Route not found")}function h(e,n){const t=e.query.pathname.split("/");if("users"===t[2]){const r=t[3];if(!i(r))return n.writeHead(400,{"Content-Type":"text/plain"}),void n.end("userId is invalid");const o=e.users.findIndex((e=>e.id===r));if(-1!==o)if(l(e.body)){const t=function(e,n){const t=e.users;return e.users[n]={...e.users[n],...t},e.users[n]}(e,o);n.writeHead(200,{"Content-Type":"application/json"}),n.write(JSON.stringify(t)),n.end()}else n.writeHead(400,{"Content-Type":"text/plain"}),n.end("Body does not contain required fields or they have invalid values");else n.writeHead(404,{"Content-Type":"text/plain"}),n.end("record with id === userId doesn't exist")}else n.writeHead(404,{"Content-Type":"text/plain"}),n.end("Route not found")}const b=[{id:"1",username:"Frank",age:53,hobbies:["dancing","cycling"]},{id:"2",username:"Alice",age:35,hobbies:[]},{id:"3",username:"Frank",age:57,hobbies:["swimming"]},{id:"4",username:"Grace",age:35,hobbies:["photography","painting","coding"]},{id:"5",username:"Grace",age:46,hobbies:[]},{id:"6",username:"Hank",age:29,hobbies:[]},{id:"7",username:"Alice",age:42,hobbies:["painting"]},{id:"8",username:"Jack",age:34,hobbies:[]},{id:"9",username:"Ivy",age:59,hobbies:[]},{id:"10",username:"Grace",age:37,hobbies:["coding","photography"]}].map((e=>({...e,id:p()})));function g(e,n,t){let r=[];e.on("data",(e=>{r.push(e)})),e.on("end",(()=>{e.body=Buffer.concat(r).toString(),"application/json"===e.headers["content-type"]&&(e.body=JSON.parse(e.body)),t(e,n)}))}const m=process.env.PORT??3e3;t.createServer(((e,n)=>{try{switch(e.users=b??[],e.query=new URL(e.url??"",`http://${e.headers.host}`),e.method){case"GET":!function(e,n){const t=e.query.pathname.split("/");if("users"===t[2]){const r=t[3];if(r){if(!i(r))return n.writeHead(400,{"Content-Type":"text/plain"}),void n.end("userId is invalid");const t=e.users.find((e=>e.id===r));t?(n.writeHead(200,{"Content-Type":"application/json"}),n.end(JSON.stringify(t))):(n.writeHead(404,{"Content-Type":"text/plain"}),n.end("record with id === userId doesn't exist"))}else n.writeHead(200,{"Content-Type":"application/json"}),n.end(JSON.stringify(e.users))}else n.writeHead(404,{"Content-Type":"text/plain"}),n.end("Route not found")}(e,n);break;case"POST":g(e,n,y);break;case"PUT":g(e,n,h);break;case"DELETE":!function(e,n){const t=e.query.pathname.split("/");if("users"===t[2]){const r=t[3];if(r){if(!i(r))return n.writeHead(400,{"Content-Type":"text/plain"}),void n.end("userId is invalid");const t=e.users.findIndex((e=>e.id===r));-1!==t?(function(e,n){e.users?e.users.splice(n,1):e.users=[]}(e,t),n.writeHead(204),n.end()):(n.writeHead(404,{"Content-Type":"text/plain"}),n.end("record with id === userId doesn't exist"))}else n.writeHead(400,{"Content-Type":"text/plain"}),n.end("userId is not provided in the path")}else n.writeHead(404,{"Content-Type":"text/plain"}),n.end("Route not found")}(e,n);break;default:n.writeHead(500,{"Content-Type":"text/plain"}),n.end("Intenal server error")}}catch(e){!function(e,n){console.log(e),n.writeHead(500,{"Content-Type":"application/json"}),n.write(JSON.stringify({message:"Internal server error"})),n.end()}(e,n)}})).listen(m,(()=>{console.log(`Server is listening on ${m} port`)}));