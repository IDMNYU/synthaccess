var isBrowser=new Function("try {return this===window;}catch(e){ return false;}");
var isMax=new Function("try {return max.version!=undefined;}catch(e){ return false;}");
var isNode=new Function("try {return this===global;}catch(e){return false;}");

if(isBrowser()) console.log("Environment: Browser!");
if(isMax()) {
    post("Environment: Max/MSP/Jitter!\n");
    // alias all functions to post()
    console.log = function(..._s) { post(_s, "\n"); };
    console.info = function(..._s) { post(_s, "\n"); };
    console.warn = function(..._s) { error(_s, "\n"); };
    console.error = function(..._s) { error(_s, "\n"); };
    console.debug = function(..._s) { post(_s, "\n"); };
}
if(isNode()) console.log("Environment: Node!!!");
