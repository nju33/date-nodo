declare module 'date-nodo' {
  interface DateNodoOptions {
    format: string,
    reference?: 'day' | 'hour',
  }

  type Range = [string, string];

  class DateNodo {
    readonly format: string;
    readonly reference: 'day' | 'hour';
    store: Map<string, number>;

    constructor(options?: Partial<DateNodoOptions>)

    isReferenceDay(): boolean;
  
    isReferenceHour(): boolean;

    getDiffDaysLength(range: Range): number;
  
    getDiffHoursLength(range: Range, day: string, daysLength: number): number

    addRange(range: Range): this;
  
    addRanges(ranges: Range[]): this;

    removeRange(range: Range): this;
  
    removeRanges(ranges: Range[]): this;

    clear(): this;

    get(range?: Range): [string, number][]

    getObj(range?: Range): object
  }

  export = DateNodo;
}