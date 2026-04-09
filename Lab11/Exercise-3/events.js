const EventEmitter = require("events");

const emitter = new EventEmitter();

const divider = (label) => {
  const line = "─".repeat(45);
  if (label) {
    console.log(`\n${line}`);
    console.log(`  ${label}`);
    console.log(line);
  } else {
    console.log(line);
  }
};

const timestamp = () => new Date().toISOString().replace("T", " ").substring(0, 19);

emitter.on("userLogin", (user) => {
  console.log(`  [LISTENER 1]  Session started for  →  ${user.name}`);
});

emitter.on("userLogin", (user) => {
  console.log(`  [LISTENER 2]  Audit log entry      →  user:${user.id} at ${timestamp()}`);
});

emitter.on("userLogin", (user) => {
  console.log(`  [LISTENER 3]  Role assigned        →  ${user.role.toUpperCase()}`);
});

emitter.on("fileSaved", (file) => {
  console.log(`  [LISTENER 1]  File persisted       →  ${file.name} (${file.size} bytes)`);
});

emitter.on("fileSaved", (file) => {
  console.log(`  [LISTENER 2]  Backup queued        →  /backup/${file.name}`);
});

emitter.on("error_event", (err) => {
  console.log(`  [LISTENER 1]  Error caught         →  ${err.code}`);
  console.log(`  [LISTENER 2]  Message              →  "${err.message}"`);
  console.log(`  [LISTENER 3]  Recovery             →  Retrying in ${err.retryAfter}s`);
});

emitter.once("serverStart", (config) => {
  console.log(`  [ONCE]        Server online         →  ${config.host}:${config.port}`);
  console.log(`  [ONCE]        Environment          →  ${config.env.toUpperCase()}`);
});

divider();
console.log("   NODE.JS EVENT-DRIVEN PROGRAMMING");
divider();

console.log("\n  Registered listeners per event:");
["userLogin", "fileSaved", "error_event", "serverStart"].forEach((evt) => {
  console.log(`    ·  ${evt.padEnd(14)} →  ${emitter.listenerCount(evt)} listener(s)`);
});

divider("[ 1 ]  EVENT: userLogin  (3 listeners)");
emitter.emit("userLogin", { id: 101, name: "Varun", role: "admin" });

divider("[ 2 ]  EVENT: fileSaved  (2 listeners)");
emitter.emit("fileSaved", { name: "report.pdf", size: 204800 });

divider("[ 3 ]  EVENT: error_event  (3 listeners)");
emitter.emit("error_event", {
  code: "ERR_CONN_REFUSED",
  message: "Connection refused on port 5432",
  retryAfter: 5,
});

divider("[ 4 ]  EVENT: serverStart  (once — fires once only)");
emitter.emit("serverStart", { host: "localhost", port: 3000, env: "development" });

console.log("\n  Emitting serverStart again — listener already consumed:");
emitter.emit("serverStart", { host: "localhost", port: 3000, env: "development" });
console.log("  (no output — once() listener removed itself after first call)");

divider("[ 5 ]  ASYNCHRONOUS EVENT DEMONSTRATION");
console.log("  Scheduling async events via setTimeout...\n");

setTimeout(() => {
  console.log(`  [t + 500ms]  Async userLogin fired`);
  emitter.emit("userLogin", { id: 202, name: "GuestUser", role: "viewer" });
}, 500);

setTimeout(() => {
  console.log(`\n  [t + 1000ms] Async fileSaved fired`);
  emitter.emit("fileSaved", { name: "async_log.txt", size: 1024 });
  divider();
  console.log("  All events emitted successfully.");
  divider();
}, 1000);
