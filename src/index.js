const server = require("./server");
const router = require("./router");
const requestHandlers = require("./requestHandlers");

const handle = {};
handle[""] = requestHandlers.start;
handle["start"] = requestHandlers.start;
handle["getLimerick"] = requestHandlers.getLimerick;
handle["getPoem"] = requestHandlers.getPoem;

server.start(router.route, handle);
