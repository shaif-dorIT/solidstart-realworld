export type ResponseType<K extends string, V> = Promise<{
  [P in K]: V
}>

export type ResponseTypes<T> = Promise<T>

export type OptionalPick<T, K extends keyof T> = Pick<Partial<T>, K>

export type Optional<T, K extends keyof T> = OptionalPick<T, K> & Omit<T, K>

export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
  ? {
      [K in keyof O]: O[K]
    }
  : never

export type ExpandRecursively<T> = T extends (...args: infer A) => infer R
  ? (...args: ExpandRecursively<A>) => ExpandRecursively<R>
  : T extends object
  ? T extends infer O
    ? {
        [K in keyof O]: ExpandRecursively<O[K]>
      }
    : never
  : T
