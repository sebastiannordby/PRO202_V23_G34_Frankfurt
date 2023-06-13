# Installation Guide - PRO202_V23_G34_Frankfurt
<img src="https://therealsujitk-vercel-badge.vercel.app/?app=pro-202-v23-g34-frankfurt"/>

[![Build and deploy Node.js app to Azure Web App - frankfurt](https://github.com/sebastiannordby/PRO202_V23_G34_Frankfurt/actions/workflows/main_frankfurt.yml/badge.svg)](https://github.com/sebastiannordby/PRO202_V23_G34_Frankfurt/actions/workflows/main_frankfurt.yml)

- DEMO URI: https://pro-202-v23-g34-frankfurt.vercel.app/</br>
- SOCKET SERVER URI: https://frankfurt.azurewebsites.net/</br>
- LINK TO THE FIRST PROTOTYPE: https://pro-202-v23-g34-frankfurt-prototype.vercel.app/
- LINK TO GITHUB REPOSITORY: https://github.com/sebastiannordby/PRO202_V23_G34_Frankfurt
- LINK TO FORKED VERSION OF PROTOTYPE: https://github.com/Kristiania-EDU/PRO202_V23_G34_Frankfurt_Prototype/tree/master

## Architecture
  - Frontend: NextJs, React and Tailwind</br>
  - Backend: NextJs and NodeJS(socket server for interactive games)</br>
  - Database: MongoDB</br>
  - Languages/Markup/Frameworks: TypeScript, JavaScript, CSS, HTML </br>

## Installation - Terminal/Command line
- Change directory to "PRO202_V23_G34_Frankfurt" and run "npm install" </br>
- Change directory to "PRO202_V23_G34_Frankfurt/socket_server" and run "npm install" </br>
- Change directory to "PRO202_V23_G34_Frankfurt/prototype/ancep" and run "npm install"</br>
- Change directory to "PRO202_V23_G34_Frankfurt" and run "npm run dev" </br>

## Configuration

The configuration below will be provided in a .txt document</br>
- File(.env.local) for "/prototype/ancep" is named "frontend_config.txt"</br>
- File(.env) for "/socket_server" is named "backend_config.txt"</br>

### Add a ".env.local" file in path "/prototype/ancep":

GOOGLE_ID=</br>
GOOGLE_SECRET=</br>
NEXTAUTH_SECRET=</br>
MONGODB_URI=</br>
NEXT_PUBLIC_SOCKET_SERVER=localhost:4000</br>

### Add a ".env" file in path "/socket_server":

PORT=4000</br>
MONGODB_URI_SOCKET=</br>
