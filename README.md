# throttle

![version](https://img.shields.io/jsr/v/%40117/throttle?style=flat-square&color=%23ff51bc&label=version)
![status](https://img.shields.io/github/actions/workflow/status/117/throttle/deploy.yml?style=flat-square)

A throttle function implementation for Deno that manages request rates.

## Contents

- [Features](#features)
- [Install](#install)
- [Example](#example)
- [Contributing](#contributing)

## Features

- [x] Simple and easy to use.
- [x] Regulates access to functions based on defined limits.

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
    if (throttle.canProceed()) {
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
