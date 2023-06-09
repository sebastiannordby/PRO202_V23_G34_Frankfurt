# PRO202_V23_G34_Frankfurt
<img src="https://therealsujitk-vercel-badge.vercel.app/?app=pro-202-v23-g34-frankfurt"/>

[![Build and deploy Node.js app to Azure Web App - frankfurt](https://github.com/sebastiannordby/PRO202_V23_G34_Frankfurt/actions/workflows/main_frankfurt.yml/badge.svg)](https://github.com/sebastiannordby/PRO202_V23_G34_Frankfurt/actions/workflows/main_frankfurt.yml)


<h2>Architecture</h2>

<h3>Configuration</h3>

Add a .env.local file to /prototype/ancep:

GOOGLE_ID=
GOOGLE_SECRET=
NEXTAUTH_SECRET=
MONGODB_URI=
NEXT_PUBLIC_SOCKET_SERVER=localhost:4000

Add a .env file to /socket_server:

PORT=4000
MONGODB_URI_SOCKET=