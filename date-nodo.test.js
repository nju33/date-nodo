const DateNodo = require('./date-nodo');

describe('date-nodo', () => {
  let dateNodo;
  let dateNodoWithHour;

  beforeEach(() => {
    dateNodo = new DateNodo();
    dateNodoWithHour = new DateNodo({by: 'hour'});
  });

  test('addRange', () => {
    dateNodo.addRange(['2000-01-01', '2000-01-02']);
    expect(dateNodo.getObj()).toMatchObject({
      '2000-01-01': 1,
      '2000-01-02': 1
    });

    dateNodoWithHour.addRange(['2000-01-01 10', '2000-01-02 05']);
    expect(dateNodoWithHour.getObj()).toMatchObject({
      '2000-01-01 10': 1,
      '2000-01-01 11': 1,
      '2000-01-01 12': 1,
      '2000-01-01 13': 1,
      '2000-01-01 14': 1,
      '2000-01-01 15': 1,
      '2000-01-01 16': 1,
      '2000-01-01 17': 1,
      '2000-01-01 18': 1,
      '2000-01-01 19': 1,
      '2000-01-01 20': 1,
      '2000-01-01 21': 1,
      '2000-01-01 22': 1,
      '2000-01-01 23': 1,
      '2000-01-02 00': 1,
      '2000-01-02 01': 1,
      '2000-01-02 02': 1,
      '2000-01-02 03': 1,
      '2000-01-02 04': 1,
      '2000-01-02 05': 1,
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

    dateNodoWithHour
      .addRange(['2000-01-01 05', '2000-01-01 10'])
      .addRange(['2000-01-01 05', '2000-01-01 10'])
      .removeRange(['2000-01-01 05', '2000-01-01 07'])
    expect(dateNodoWithHour.getObj()).toMatchObject({
      '2000-01-01 05': 1,
      '2000-01-01 06': 1,
      '2000-01-01 07': 1,
      '2000-01-01 08': 2,
      '2000-01-01 09': 2,
      '2000-01-01 10': 2,
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
