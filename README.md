# Realtime Chat Application

This is a realtime chat application built using Socket.io for real-time communication and JWT token for authentication.

## Installation

### Clone the Repository

Clone the repository using Git:

```bash
git clone https://github.com/your-username/chat-application.git
cd chat-application/backend
npm install
-create a .env file backend
MONGODB_URI=<Your MongoDB URI>
PORT=8080
ACCESS_TOKEN_SECRET=<Your_Access_Token_Secret>
npm run start
cd ../frontend
npm install
```

Create a .env file in the frontend directory with the following variables:

VITE_SERVER_URI=http://localhost:8080/api/v1
VITE_SOCKET_URI=http://localhost:8080

run project
use npm run start in backend folder
use npm run dev in frontend folder
