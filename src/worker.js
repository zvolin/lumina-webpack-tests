import { run_worker } from "lumina-node-wasm";

Error.stackTraceLimit = 99;

// for SharedWorker we queue incoming connections
// for dedicated Worker we queue incoming messages (coming from the single client)
let queued = [];
if (typeof SharedWorkerGlobalScope !== "undefined" && self instanceof SharedWorkerGlobalScope) {
  onconnect = (event) => {
    queued.push(event)
  }
} else {
  onmessage = (event) => {
    queued.push(event);
  }
}

console.log("starting worker, queued messages: ", queued.length);
await run_worker(queued);
