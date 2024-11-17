declare type ObjectOfOptionals<T> = {
  [P in keyof T]?: T[P]
}

declare type ValueOf<T> = T[keyof T]
