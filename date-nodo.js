const differenceInCalendarDays = require('date-fns/difference_in_calendar_days');
const addDays = require('date-fns/add_days');
const format = require('date-fns/format');
const isBefore = require('date-fns/is_before');

class DateNodo {
  constructor(options = {}) {
    Object.defineProperties(this, {
      format: {
        value: options.format || 'YYYY-MM-DD',
        configurable: false,
        enumerable: true,
        writable: false
      },
      reference: {
        value: options.reference || 'day',
        configurable: false,
        enumerable: true,
        writable: false,
      }
    })

    this.store = new Map();
  }

  clear() {
    this.store = new Map();

    return this;
  }

  getDiffLength(range) {
    return differenceInCalendarDays(range[1], range[0]);
  }

  addRange(range) {
    const diffLength = this.getDiffLength(range);

    for (let adjustment = 0; adjustment <= diffLength; adjustment++) {
      const formattedDate = format(
        addDays(range[0], adjustment),
        this.format
      );
      if (this.store.has(formattedDate)) {
        this.store.set(formattedDate, this.store.get(formattedDate) + 1);
      } else {
        this.store.set(formattedDate, 1);
      }
    }

    return this;
  }

  addRanges(ranges) {
    ranges.forEach(this.addRange.bind(this));

    return this;
  }

  removeRange(range) {
    const diffLength = this.getDiffLength(range);

    for (let adjustment = 0; adjustment <= diffLength; adjustment++) {
      const formattedDate = format(
        addDays(range[0], adjustment),
        this.format
      );
      if (this.store.has(formattedDate)) {
        const count = this.store.get(formattedDate);
        this.store.set(formattedDate, count - 1);

        if (count === 1) {
          this.store.delete(formattedDate);
        }
      }
    }

    return this;
  }

  removeRanges(ranges) {
    ranges.forEach(this.removeRange.bind(this));

    return this;
  }

  getByDate(date) {
    const formattedDate = format(date, this.format);
    if (!this.store.has(formattedDate)) {
      return;
    }

    return this.store.get(formattedDate);
  }

  get(range) {
    const arrStore = Array.from(this.store.entries());
    return arrStore
      .filter(item => {
        if (typeof range === 'undefined') {
          return true;
        }

        if (!Array.isArray(range)) {
          return isBefore(new Date(range), new Date(item[0]));
        }

        return (
          isBefore(new Date(range[0]), new Date(item[0])) &&
          isBefore(new Date(item[0]), new Date(range[1]))
        );
      })
      .sort((a, b) => (isBefore(a[0], b[0]) ? -1 : 1));
  }

  getObj(range) {
    const data = this.get(range);
    const obj = {};

    for (const item of data) {
      obj[item[0]] = item[1];
    }

    return obj;
  }
}

module.exports = DateNodo;