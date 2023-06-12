# PRO202_V23_G34_Frankfurt
<img src="https://therealsujitk-vercel-badge.vercel.app/?app=pro-202-v23-g34-frankfurt"/>

[![Build and deploy Node.js app to Azure Web App - frankfurt](https://github.com/sebastiannordby/PRO202_V23_G34_Frankfurt/actions/workflows/main_frankfurt.yml/badge.svg)](https://github.com/sebastiannordby/PRO202_V23_G34_Frankfurt/actions/workflows/main_frankfurt.yml)

- DEMO URI: https://pro-202-v23-g34-frankfurt.vercel.app/
- SOCKET SERVER URI: https://frankfurt.azurewebsites.net/

## Architecture
  - Frontend: NextJs, React and Tailwind
  - Backend: NextJs and NodeJS(socket server for interactive games)
  - Database: MongoDB
  - Languages/Markup/Frameworks: TypeScript, JavaScript, CSS, HTML 

## Installation - Terminal/Command line
- Change directory to "PRO202_V23_G34_Frankfurt" and run "npm install" 
- Change directory to "PRO202_V23_G34_Frankfurt/socket_server" and run "npm install" 
- Change directory to "PRO202_V23_G34_Frankfurt/prototype/ancep" and run "npm install"
- Change directory to "PRO202_V23_G34_Frankfurt" and run "npm run dev" 

## Configuration

The configuration below will be provided in a .txt document
- File(.env.local) for "/prototype/ancep" is named "frontend_config.txt"
- File(.env) for "/socket_server" is named "backend_config.txt"

### Add a ".env.local" file in path "/prototype/ancep":

GOOGLE_ID=</br>
GOOGLE_SECRET=</br>
NEXTAUTH_SECRET=</br>
MONGODB_URI=</br>
NEXT_PUBLIC_SOCKET_SERVER=localhost:4000</br>

### Add a ".env" file in path "/socket_server":

PORT=4000</br>
MONGODB_URI_SOCKET=</br>
