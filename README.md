# date nodo

## Example

```js
const DateNodo = require('date-nodo');

const ranges = [
  [new Date('2018-09-11'), new Date('2018-11-14')],
  [new Date('2018-08-24'), new Date('2018-12-01')],
  [new Date('2018-10-29'), new Date('2019-01-02')],
]

const dateNodo = new DateNodo({
  format: 'YYYY-MM-DD', // default
  by: 'day'
});

console.log(
  dateNodo.addRanges(ranges).getByDate('2018-11-01')
) // 3
```