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