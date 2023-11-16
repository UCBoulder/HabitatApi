"use strict";
// in DB-Operations/index-DB-Operations.mjs 
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(require("./createTable"));
__export(require("./insertObservation"));
__export(require("./viewAllObservations"));
__export(require("./batchUpload"));
