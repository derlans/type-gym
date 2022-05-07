type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = [],
> = Arr['length'] extends Length
  ? Arr
  : BuildArray<Length, Ele, [...Arr, Ele]>
type TestBuildArray=BuildArray<1>

export type Add<Num1 extends number, Num2 extends number> =
    [...BuildArray<Num1>, ...BuildArray<Num2>]['length']
type TestAdd=Add<2, 100>

export type Subtract<Num1 extends number, Num2 extends number>=
  BuildArray<Num1> extends [...BuildArray<Num2>, ...infer R]
    ? R['length']
    : never
type SubTest=Subtract<2, 0>

type Mutiply<
  Num1 extends number,
  Num2 extends number,
  ResultArr extends unknown[] = [],
> = Num2 extends 0 ? ResultArr['length']
  : Mutiply<Num1, Subtract<Num2, 1>, [...BuildArray<Num1>, ...ResultArr]>

type MulTest=Mutiply<2, 300>

type Divide<
  Num1 extends number,
  Num2 extends number,
  CountArr extends unknown[] = [],
> = Num1 extends 0 ? CountArr['length']
  : Divide<Subtract<Num1, Num2>, Num2, [unknown, ...CountArr]>
type DivTest=Divide<10, 2>
