type Concat<T extends Array<any>, K extends Array<any>>=[...T, ...K]
type type1 = Concat<[1, 2, 3], [4, 5, 6]>
