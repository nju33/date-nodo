const differenceInCalendarDays = require('date-fns/difference_in_calendar_days');
const getDate = require('date-fns/get_date');
const addDays = require('date-fns/add_days');
const addHours = require('date-fns/add_hours');
const setHours = require('date-fns/set_hours');
const getHours = require('date-fns/get_hours');
const format = require('date-fns/format');
const isBefore = require('date-fns/is_before');

class DateNodo {
  constructor(options = {by: 'day'}) {
    Object.defineProperties(this, {
      format: {
        value: options.format || options.by === 'day' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH',
        configurable: false,
        enumerable: true,
        writable: false
      },
      by: {
        value: options.by || 'day',
        configurable: false,
        enumerable: true,
        writable: false,
      }
    })

    this.store = new Map();
  }

  isDivisionByHour() {
    return this.by === 'hour';
  }

  clear() {
    this.store = new Map();

    return this;
  }

  getDiffDaysLength(range) {
    return differenceInCalendarDays(range[1], range[0]);
  }

  getDiffHoursLength(range, day, daysLength) {
    const from = getHours(range[0]);
    const to = getHours(range[1])
    if (this.isDivisionByHour()) {
      if (getDate(range[0]) === getDate(range[1])) {
        return to - from;
      } else if (day === daysLength) {
        return from;
      }

      return 23 - from;
    }

    return 0;
  }

  addRange(range) {
    const diffDaysLength = this.getDiffDaysLength(range);

    for (let adjustmentDay = 0; adjustmentDay <= diffDaysLength; adjustmentDay++) {
      let currentDay = addDays(range[0], adjustmentDay);
      if (adjustmentDay > 0) {
        currentDay = setHours(currentDay, 0);
      }

      const hoursLength = this.getDiffHoursLength(range, adjustmentDay, diffDaysLength);
      for (let adjustmentHour = 0; adjustmentHour <= hoursLength; adjustmentHour++) {
        const formattedDate = format(
          addHours(currentDay, adjustmentHour),
          this.format
        );
  
        if (this.store.has(formattedDate)) {
          this.store.set(formattedDate, this.store.get(formattedDate) + 1);
        } else {
          this.store.set(formattedDate, 1);
        }
      }
    }

    return this;
  }

  addRanges(ranges) {
    ranges.forEach(this.addRange.bind(this));

    return this;
  }

  removeRange(range) {
    const diffDaysLength = this.getDiffDaysLength(range);

    for (let adjustmentDay = 0; adjustmentDay <= diffDaysLength; adjustmentDay++) {
      let currentDay = addDays(range[0], adjustmentDay);
      if (adjustmentDay > 0) {
        currentDay = setHours(currentDay, 0);
      }

      const hoursLength = this.getDiffHoursLength(range, adjustmentDay, diffDaysLength);
      for (let adjustmentHour = 0; adjustmentHour <= hoursLength; adjustmentHour++) {
        const formattedDate = format(
          addHours(currentDay, adjustmentHour),
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
