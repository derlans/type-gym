// Array.prototype.includes
type Includes<T extends any[], S>=
  T extends []
    ? false
    : T extends [infer V, ...infer Rest]
      ? V extends S
        ? true
        : Includes<Rest, S>
      : never
type IncludesExample=Includes<[1, 2, 3], 2>
type IncludesExample2=Includes<[1, 2, 3], 0>
type IncludesExample3=Includes<[], undefined>
