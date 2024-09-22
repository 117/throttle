import { assert } from "assert";

import { createThrottle } from "@/src/createThrottle.ts";

Deno.test("should allow immediate token usage", async () => {
  const throttle = createThrottle({ limit: 1, interval: 1000 });
  let tokenUsed = false;
  await throttle.wait();
  tokenUsed = true;
  assert(tokenUsed);
});

Deno.test("should wait 1 second before next token is available", async () => {
  const throttle = createThrottle({ limit: 1, interval: 1000 });
  // consume a token right away
  await throttle.wait();
  const start = Date.now();
  await throttle.wait();
  assert(Date.now() - start >= 1000);
});
