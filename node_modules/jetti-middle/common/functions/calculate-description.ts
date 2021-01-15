export function calculateDescription(description: string, date: Date | string, code: string, group = '') {
    const Group = group ? '(' + group + ')' : '';
    const value = `${description} ${Group} #${code}, ${date ?
        new Date(date).toISOString() :
        (new Date()).toISOString()}`;
    return value;
}
