// String.prototype.repeat
type RepeatString<T extends string, N extends number, Arr extends any[]=[]>=
  Arr['length'] extends N
    ? ''
    : `${T}${RepeatString<T, N, [...Arr, any]>}`
export type example1= RepeatString<'123', 5>

type alphaChars = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm'
| 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
| 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M'
| 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'

// ParseAlphaChars
type ParseAlphaChars<T extends string, Chars extends string=''>=
  T extends `${infer PrefixChar}${infer RestStr}`
    ? PrefixChar extends alphaChars
      ? ParseAlphaChars<RestStr, `${Chars}${PrefixChar}`>
      : [Chars, T]
    :never
export type example2=ParseAlphaChars<'func(a,b)'>

type rightBrackets= ')'
// parseFunctionParameter
type ParseFunctionParameter<T extends string, Arr extends string[]=[]>=
  T extends `${infer PrefixChar}${infer RestStr}`
    ? PrefixChar extends rightBrackets
      ?Arr
      :ParseFunctionParameter<ParseAlphaChars<RestStr>[1], [...Arr, ParseAlphaChars<RestStr>[0]]>
    :never
export type example3=ParseFunctionParameter<'(ab,bc)'>

interface TempParseResult<Token extends string, Parameter extends string[]> {
  token: Token
  rest: Parameter
}

// parseFunction
type ParseFunction<T extends string>=TempParseResult<ParseAlphaChars<T>[0], ParseFunctionParameter<ParseAlphaChars<T>[1]>>
export type example4=ParseFunction<'func(ab,bc,d)'>

// filterNumberProp
type filterNumberProp<T extends object>= {
  [Key in keyof T]: T[Key] extends number ? T[Key] : never
}[keyof T]
type filterNumberKey<T extends object>= {
  [Key in keyof T]: T[Key] extends number ? Key : never
}[keyof T]
export type example5=filterNumberProp<{ a: 1; b: '2'; c: 3 }>
export type example6=filterNumberKey<{ a: 1; b: '2'; c: 3 }>

// 模式匹配
type Pop<T extends unknown[]>=T extends [...infer Rest, infer Last] ? Last : never
type example7=Pop<[1, 2, 3]>

type TrimLeft<T extends string>=T extends `${' ' | '\t' | '\n'}${infer Rest}`
  ? TrimLeft<Rest>
  : T
type example8=TrimLeft<' \t\n123 \t\n'>
type TrimRight<T extends string>=T extends `${infer Rest}${' ' | '\t' | '\n'}`
  ? TrimRight<Rest>
  : T
type example9=TrimRight<'123 \t\n'>
type Trim<T extends string>=TrimLeft<TrimRight<T>>
type example10=Trim<' \t\n123 \t\n'>

type Replace<T extends string, R extends string, A extends string>=T extends `${infer FirstRest}${R}${infer LastRest}`
  ? `${FirstRest}${A}${LastRest}`
  : T
type example11= Replace<'abcd1234', 'cd1', 'e'>

type GetEnterAndReturnType<T extends (...args: any[]) => any>=T extends (...params: infer Params) => infer R
  ? [Params, R]
  : never
type example12=GetEnterAndReturnType<(a: number, b: string) => string>

// 匹配解析params
// type ParseParams<T extends string>=T extends `${infer PrefixChar}${infer RestStr}`
//   ? PrefixChar extends ''
