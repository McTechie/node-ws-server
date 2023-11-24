const broadcast = () => {
  const bytesToSend = JSON.stringify({
    users: Object.values(CONNECTIONS).map((c) => ({ username: c.username, state: c.state })),
  });

  for (const c of Object.values(CONNECTIONS)) {
    if (c.conn.readyState === 1) {
      c.conn.send(bytesToSend);
    }
  }
}

const handleMessage = (bytes, uuid) => {
  // Parse the message
  const message = JSON.parse(bytes.toString());
 
  // Update the state of the user
  CONNECTIONS[uuid].state = { ...message };

  console.log('\x1b[36m%s\x1b[0m', `📦 ${CONNECTIONS[uuid].username} updated their state: ${JSON.stringify(CONNECTIONS[uuid].state)}`);

  // Broadcast the message to all connected users
  broadcast();
}

const handleClose = (uuid) => {
  console.log('\x1b[35m%s\x1b[0m', `[${new Date().toISOString()}] | ${CONNECTIONS[uuid].username} disconnected! 👋`);
  delete CONNECTIONS[uuid];

  // Broadcast the message to all connected users
  broadcast();
}

module.exports = {
  broadcast,
  handleMessage,
  handleClose,
};

