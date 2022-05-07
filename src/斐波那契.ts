import type { Add, Subtract } from './加减乘除'

type Fblq<N extends number, Pre extends number=0, Result extends number =1>=
  N extends 0
    ? Pre
    : N extends 1
      ? Result
      : Fblq<Subtract<N, 1>, Result, Add<Pre, Result>>
type FblqTest=Fblq<15>
