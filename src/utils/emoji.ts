export const EMOJI = {
    CHECK: 'check',
    ERROR: 'error',
}

export const getEmoji = (name: string): string => {
    switch(name) {
        case EMOJI.CHECK:
            return String.fromCodePoint(0x2705);
        case EMOJI.ERROR:
            return String.fromCodePoint(0x274C);
        default:
            return '';
    }
}
