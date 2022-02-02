export const SERVER_URL: string = typeof location !== 'undefined' ?
    `${location.protocol}//${location.hostname}:${location.port}/api/graphql` :
    '/api/graphql'
    ;