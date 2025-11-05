declare module 'throttle-debounce' {
  export function debounce<T extends (...args: unknown[]) => unknown>(delay: number, fn: T): T;
  export function throttle<T extends (...args: unknown[]) => unknown>(delay: number, fn: T): T;
}
