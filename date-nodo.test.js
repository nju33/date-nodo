const DateNodo = require('./date-nodo');

describe('date-nodo', () => {
  let dateNodo;

  beforeEach(() => {
    dateNodo = new DateNodo();
  });

  test('addRange', () => {
    dateNodo.addRange(['2000-01-01', '2000-01-02']);
    expect(dateNodo.getObj()).toMatchObject({
      '2000-01-01': 1,
      '2000-01-02': 1
    });
  });

  test('addRanges', () => {
    dateNodo.addRanges([
      ['2000-01-01', '2000-01-02'],
      ['2000-01-02', '2000-01-03']
    ]);
    expect(dateNodo.getObj()).toMatchObject({
      '2000-01-01': 1,
      '2000-01-02': 2,
      '2000-01-03': 1
    });
  });

  test('removeRange', () => {
    dateNodo
      .addRanges([['2000-01-01', '2000-01-02'], ['2000-01-02', '2000-01-03']])
      .removeRange(['2000-01-01', '2000-01-02']);
    expect(dateNodo.getObj()).toMatchObject({
      '2000-01-02': 1,
      '2000-01-03': 1
    });
  });

  test('removeRanges', () => {
    dateNodo
      .addRanges([['2000-01-01', '2000-01-02'], ['2000-01-02', '2000-01-03']])
      .removeRanges([
        ['2000-01-01', '2000-01-02'],
        ['2000-01-02', '2000-01-03']
      ]);
    expect(dateNodo.getObj()).toMatchObject({});
  });

  test('getByDate', () => {
    dateNodo.addRanges([
      ['2000-01-01', '2000-01-02'],
      ['2000-01-02', '2000-01-03']
    ]);
    expect(dateNodo.getByDate('2000-01-02')).toBe(2);
  });

  test('clear', () => {
    dateNodo.addRanges(['2000-01-01', '2000-01-02']).clear();
    expect(dateNodo.getObj()).toMatchObject({});
  });
});
