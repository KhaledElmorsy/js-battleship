import Space from '../src/space';

describe('Constructor', () => {
  it('declares "isHit" instance property as false', () => {
    expect(new Space().isHit).toBe(false);
  });
  it('sets the parent object', () => {
    const parent = {test: 'test'};
    expect(new Space(parent).parent).toBe(parent);
  })
});

describe('Methods:', () => {
  let space;

  beforeEach(() => {
    space = new Space();
  });

  describe('hit()', () => {
    it('changes isHit to true', () => {
      space.hit();
      expect(space.isHit).toBe(true);
    });
  });
});
