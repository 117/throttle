import { assert } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import { createThrottle } from "./createThrottle.ts";

Deno.test("should allow requests within limit", () => {
  const throttle = createThrottle({ limit: 5, interval: 1000 });

  for (let i = 0; i < 5; i++) {
    assert(throttle.check(), `request ${i + 1} should be allowed`);
  }
});

Deno.test("should block requests exceeding limit", async () => {
  const throttle = createThrottle({ limit: 2, interval: 1000 });

  assert(throttle.check(), "first request should be allowed");
  assert(throttle.check(), "second request should be allowed");
  assert(!throttle.check(), "third request should be blocked");

  // Wait for the interval to pass
  await new Promise((resolve) => setTimeout(resolve, 1000));

  assert(
    throttle.check(),
    "fourth request should be allowed after interval",
  );
});
