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
