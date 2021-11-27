import { toKeysAndValues, toSentence, toUpperSnakeCase } from '.';

describe('lib', () => {
  it('should convert to sentence', () => {
    expect(toSentence('someKey')).toEqual('Some Key');
  });

  it('should convert to upper snake cast', () => {
    expect(toUpperSnakeCase('someKey')).toEqual('SOME_KEY');
  });

  it('should convert to keys and values', () => {
    const obj = {
      one: 'two',
      three: 'four',
    };
    expect(toKeysAndValues(obj)).toEqual([
      {
        key: 'one',
        value: 'two',
      },
      {
        key: 'three',
        value: 'four',
      },
    ]);
  });
});
