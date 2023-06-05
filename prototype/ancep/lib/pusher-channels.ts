import PusherClient from 'pusher-js';

export const THINK_PROVOKE_CHANNEL = "private-think-provoke";

export function getJoinChannelName(hostCode: string) {
    return 'think-provoke-join';
}

export function getClientPusher() {
    return new PusherClient('bef553a644fc3fdd487a', {
        cluster: 'eu'
    });
}

export function getSocketServerAdr() {
    const environment = process.env.NODE_ENV || 'development';
    let adr;

    if(environment === 'development') {
        adr = window.location.hostname + ':4000';
    } else {
        adr = process.env.SOCKET_SERVER ?? 'https://frankfurt.azurewebsites.net';
    }

    console.log('ADRESS SOCKET: ', adr);
    return adr;
}