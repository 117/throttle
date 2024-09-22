export type CreateThrottleOptions = {
  limit: number;
  interval: number;
};

export const createThrottle = ({ limit, interval }: CreateThrottleOptions) => {
  let tokens = limit;
  let lastRefill = Date.now();

  const refillTokens = () => {
    const now = Date.now();
    const elapsed = now - lastRefill;
    const newTokens = Math.floor(elapsed / interval) * limit;

    tokens = Math.min(limit, tokens + newTokens);
    lastRefill = now;
  };

  const canProceed = () => {
    refillTokens();

    if (tokens > 0) {
      tokens--;
      return true;
    }

    return false;
  };

  return { canProceed };
};
