export const SERVER_URL: string = typeof location !== 'undefined' ?
    `${location.protocol}//${location.hostname}:${location.port}/api/graphql` :
    'https://lucas-alonso-social-media.herokuapp.com/graphql'
    ;