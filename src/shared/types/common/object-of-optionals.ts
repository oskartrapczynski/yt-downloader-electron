export type ObjectOfOptionals<T> = {
  [P in keyof T]?: T[P]
}
