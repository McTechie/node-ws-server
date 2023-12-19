# WS + Node

> This is a simple example of how to use Web Sockets with Node.js, created for the purpose of learning.

### Architecture

```mermaid
sequenceDiagram
    autonumber
    actor McTechie (Client 1)

    McTechie (Client 1)->>Server: Initiate Web Socket Connection
    
    rect rgb(127, 12, 232)
        Server->>Server: Store Connection Details
        Server-->McTechie (Client 1): Listen for messages
    end
    
    Note over Server, McTechie (Client 1): Web Socket Connection Established
    actor Others
    
    Note over Others: Already Connected to Server
    McTechie (Client 1)->>Server: Send Message
    activate Server
    
    Note over Server: Parse the Message and Broadcast
    Server-->>McTechie (Client 1): Broadcasted Message
    Server-->>Others: Broadcasted Message
    deactivate Server
```

### How to run

> This project requires Node.js to run.

```bash
# Clone the repository
git clone https://github.com/McTechie/node-ws-server.git

# Change directory
cd ws-server

# Install dependencies
npm install

# Run the server
npm start
```

### Demo

#### Client 1 [McTechie]

![Client 1](assets/client1.png)

#### Client 2 [AnonUser]

![Client 2](assets/client2.png)

#### Message Broadcast [McTechie]

![Message Broadcast](assets/broadcast_send.png)

#### Message Received [AnonUser]

![Message Received](assets/broadcast_receive.png)

#### Server Logs

![Server Logs](assets/server.png)
