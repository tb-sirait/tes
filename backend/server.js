import { WebSocketServer } from 'ws';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

let activeClients = new Set();

function broadcastVisitorCount() {
  const count = activeClients.size;
  const message = JSON.stringify({ type: 'visitorCount', count });
  activeClients.forEach(ws => {
    if (ws.readyState === ws.OPEN) {
      ws.send(message);
    }
  });
}

const clientIPs = new Map();

wss.on('connection', (ws) => {
  // Get client IP address from underlying socket
  const ip = ws._socket.remoteAddress;
  clientIPs.set(ws, ip);
  console.log('New connection from IP:', ip);

  activeClients.add(ws);
  broadcastVisitorCount();

  ws.on('close', () => {
    activeClients.delete(ws);
    clientIPs.delete(ws);
    broadcastVisitorCount();
  });

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'clientIP' && data.ip) {
        clientIPs.set(ws, data.ip);
        console.log('Updated client IP from message:', data.ip);
      }
    } catch (err) {
      console.error('Error parsing message:', err);
    }
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
