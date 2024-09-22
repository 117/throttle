/**
 * Represents a throttle mechanism.
 * @property {function(): Promise<void>} wait - Waits for a token to be available.
 */
export type Throttle = {
  wait: () => Promise<void>;
};

/**
 * Options for creating a throttle.
 * @property {number} limit - The maximum number of tokens.
 * @property {number} interval - The time interval for token refill in milliseconds.
 */
export type CreateThrottleOptions = {
  limit: number;
  interval: number;
};

/**
 * Creates a throttle with the specified options.
 * @param {CreateThrottleOptions} options - The options for the throttle.
 * @returns {Throttle} The throttle instance.
 */
export const createThrottle = (
  { limit, interval }: CreateThrottleOptions,
): Throttle => {
  let tokens = limit;
  let lastRefill = Date.now();

  const refill = () => {
    const now = Date.now();
    const elapsed = now - lastRefill;
    const newTokens = Math.floor(elapsed / interval) * limit;

    tokens = Math.min(limit, tokens + newTokens);
    lastRefill = now;
  };

  const wait = async () => {
    refill();

    while (tokens <= 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      refill();
    }

    tokens--;
  };

  return { wait };
};
