import Space from '../src/space';

describe('Test that the constructor', () => {
  it('Declares "isHit" instance property as false', () => {
    expect(new Space().isHit).toBe(false);
  });
});

describe('Methods:', () => {
  let space;

  beforeEach(() => {
    space = new Space();
  });

  describe('Test that hit()', () => {
    it('changes isHit to true', () => {
      space.hit();
      expect(space.isHit).toBe(true);
    });
  });
});
