import { EMOJI, getEmoji } from '../../src/utils/emoji';

describe('emoji.ts', () => {
    it('has unchanged static variables', () => {
        expect(EMOJI.CHECK).toEqual('check');
        expect(EMOJI.ERROR).toEqual('error');
    });

    it('returns correct emoji-string for static variable EMOJI.CHECK', () => {
        expect(getEmoji(EMOJI.CHECK)).toEqual(String.fromCodePoint(0x2705));
    });

    it('returns correct emoji-string for static variable EMOJI.ERROR', () => {
        expect(getEmoji(EMOJI.ERROR)).toEqual(String.fromCodePoint(0x274C));
    });

    it('returns empty string for not defined string/emoji', () => {
        expect(getEmoji('not-defined')).toEqual('');
    });
});
