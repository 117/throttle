# throttle

![version](https://img.shields.io/jsr/v/%40117/throttle?style=flat-square&color=%23ff51bc&label=version)
![status](https://img.shields.io/github/actions/workflow/status/117/throttle/deploy.yml?style=flat-square)

A token bucket rate limiter for Deno.

## Contents

- [Features](#features)
- [Install](#install)
- [Example](#example)
- [Contributing](#contributing)

## Features

- [x] Simple and easy to use.
- [x] Rate limiting based on token bucket algorithm.

## Install

For Deno:

```sh
$ deno add @117/throttle
```

## Example

```ts
import { createThrottle } from "@117/throttle";

const throttle = createThrottle({ limit: 5, interval: 1000 });

const work = () => {
    if (throttle.check()) {
        console.log("request allowed, processing work");
    } else {
        console.log("request blocked, please wait");
    }
};

// Simulate requests
setInterval(work, 200);
```

## Contributing

Feel free to contribute and PR to your 💖's content.
