export const formatId = (param: string | number): number => {
    return typeof param === 'number' ? param : parseInt(param)
};