import { assert } from "assert";

import { createThrottle } from "@/src/createThrottle.ts";

Deno.test("should allow requests within limit", async () => {
  const throttle = createThrottle({ limit: 5, interval: 1000 });

  for (let i = 0; i < 5; i++) {
    await throttle.wait();
    assert(true, `request ${i + 1} should be allowed`);
  }
});

Deno.test("should block requests exceeding limit", async () => {
  const throttle = createThrottle({ limit: 2, interval: 1000 });

  await throttle.wait();
  await throttle.wait();

  let blocked = false;

  try {
    await throttle.wait();
  } catch {
    blocked = true;
  }

  assert(blocked, "third request should be blocked");

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await throttle.wait();

  assert(true, "fourth request should be allowed after interval");
});
