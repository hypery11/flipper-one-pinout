# Flipper One Pinout

Interactive pinout viewer for the [Flipper One](https://docs.flipper.net/one) GPIO header.

**Live**: <https://hypery11.github.io/flipper-one-pinout/>

Click a pin to see its alternate-function mux configurations, or use the filter chips at the top to highlight every pin that can be configured for a given protocol (I²C, UART, SPI, CAN, SAI, PWM, etc.).

## Why this exists

Looking up which header pin can do `UART5_TX` (or which two pins form an `I2C2` bus) means scrolling through the multi-row table on the official spec page and parsing the mux suffixes by hand. This is the same problem [pinout.xyz](https://pinout.xyz/) solves for the Raspberry Pi GPIO.

## Data source

All pin data is transcribed verbatim from
[docs.flipper.net/one/hardware/gpio-port](https://docs.flipper.net/one/hardware/gpio-port). Errors in this viewer are mine; the original docs are the source of truth.

If you spot a discrepancy, please [open an issue](https://github.com/hypery11/flipper-one-pinout/issues) or send a PR against `pins.js`.

## Local development

It's all static HTML / CSS / JS — no build step, no dependencies.

```bash
git clone https://github.com/hypery11/flipper-one-pinout.git
cd flipper-one-pinout
python3 -m http.server 8000   # or any static server
open http://localhost:8000
```

## Roadmap

- [x] GPIO header (20 pins)
- [ ] M.2 port pinout (Key-B, S3)
- [ ] Search box (filter by signal name)
- [ ] Permalink to a selected pin (`#B4` etc.)
- [ ] Mobile-friendly responsive tweaks

## Not affiliated with Flipper Devices

This is a community-maintained tool. Flipper One is an in-progress open-source project from
[Flipper Devices Inc.](https://flipperdevices.com/). See the [official developer portal](https://docs.flipper.net/one) for everything authoritative.

## License

MIT — see `LICENSE`.
