export const fixFirebaseURL = (str: string): string => {
    return str.replace(/value.jpg[\d]alt=media/, 'value.jpg?alt=media')
};