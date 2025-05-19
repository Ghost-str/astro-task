import type { UnionToTuple } from "type-fest";

/**
 * предназначена только для статических объектов
 */
export function nonSafeObjectKeys<T extends object>(target: T) {
  return Object.keys(target) as UnionToTuple<keyof T>;
}
