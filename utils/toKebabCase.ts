export const toKebabCase = (str: string): string => {
    return str.toLowerCase().split(' ').join('-');
};