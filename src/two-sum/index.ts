// turn number to array
type ToArray<N extends number, Arr extends any[]=[] >=
  Arr['length'] extends N
    ? Arr
    : ToArray<N, [...Arr, any]>
// add two number
type Add<T extends number, K extends number>=[...ToArray<T>, ...ToArray<K>]['length']
// sub two number
type Sub<T extends number, K extends number>=
  ToArray<T> extends [...ToArray<K>, ...infer Rest]
    ? Rest['length']
    : never
//
type ArrToUnion<T extends any[]>=T[number]
// Array.prototype.pop
type Rest<T extends any[]>=
  T extends [T[0], ...infer Rest]
    ? Rest
    : []
// two sum
type TwoSum<N extends number[], Target extends number>=
  N['length'] extends 1 | 0
    ? 'no'
    : Sub<Target, N[0]> extends ArrToUnion<Rest<N>>
      ? [N[0], Sub<Target, N[0]>]
      : TwoSum<Rest<N>, Target>

// example
export type cases=[
  ToArray<2>,
  Add<2, 2>,
  Sub<5, 2>,
  ArrToUnion<[1, 2, 3]>,
  TwoSum<[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 9>,
]
