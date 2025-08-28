import { signal } from '@lit-labs/signals'

export const clock = signal<Date>(new Date())

export function startClock (ms = 1000): void {
  setInterval(() => clock.set(new Date()), ms)
}
