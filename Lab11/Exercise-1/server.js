const http = require("http");

const PORT = 3000;
const HOST = "localhost";

const server = http.createServer((req, res) => {
  const now = new Date().toISOString();

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("X-Powered-By", "Node.js");
  res.writeHead(200);

  res.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Node.js Server</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:       #0a0a0a;
      --surface:  #111111;
      --border:   #222222;
      --muted:    #444444;
      --subtle:   #888888;
      --text:     #e8e8e8;
      --bright:   #ffffff;
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Mono', monospace;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      max-width: 560px;
      width: 100%;
      padding: 3rem 3.5rem;
    }

    .badge {
      display: inline-block;
      font-size: 0.65rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--subtle);
      border: 1px solid var(--border);
      padding: 0.3rem 0.75rem;
      margin-bottom: 2rem;
    }

    h1 {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 2.4rem;
      color: var(--bright);
      line-height: 1.1;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }

    .divider {
      width: 2.5rem;
      height: 1px;
      background: var(--muted);
      margin: 1.75rem 0;
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 0.65rem 0;
      border-bottom: 1px solid var(--border);
      font-size: 0.82rem;
    }

    .row:last-of-type { border-bottom: none; }

    .label { color: var(--subtle); letter-spacing: 0.06em; }
    .value { color: var(--bright); font-weight: 500; }

    .status-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      background: var(--bright);
      border-radius: 50%;
      margin-right: 0.5rem;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.3; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">HTTP · 200 OK</div>
    <h1>Node.js<br/>Server</h1>
    <div class="divider"></div>
    <div class="row">
      <span class="label">STATUS</span>
      <span class="value"><span class="status-dot"></span>RUNNING</span>
    </div>
    <div class="row">
      <span class="label">HOST</span>
      <span class="value">${HOST}:${PORT}</span>
    </div>
    <div class="row">
      <span class="label">METHOD</span>
      <span class="value">${req.method}</span>
    </div>
    <div class="row">
      <span class="label">PATH</span>
      <span class="value">${req.url}</span>
    </div>
    <div class="row">
      <span class="label">TIMESTAMP</span>
      <span class="value">${now}</span>
    </div>
    <div class="row">
      <span class="label">RUNTIME</span>
      <span class="value">Node.js ${process.version}</span>
    </div>
  </div>
</body>
</html>`);

  res.end();

  console.log(`[${now}]  ${req.method}  ${req.url}`);
});

server.listen(PORT, HOST, () => {
  console.log(`\n  Server running at http://${HOST}:${PORT}\n`);
});
