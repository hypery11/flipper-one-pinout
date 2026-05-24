# Flipper One Pinout

Interactive pinout viewer for the [Flipper One](https://docs.flipper.net/one) GPIO header and M.2 port.

**Live**: <https://hypery11.github.io/flipper-one-pinout/>

Two tabs:

- **GPIO header** (2×10, 20 pins) — vertical layout with each pin's alternate-function mux configurations listed inline.
- **M.2 port** (Key-B, S3, 75 pin positions with pins 12–19 absent for keying) — horizontal two-row layout, click a pin to see its description.

Filter chips at the top of each tab highlight every pin matching a given protocol (I²C, UART, SPI, CAN, SAI, PWM, PCIe, SIM, etc.). The search box accepts any substring of a signal name, pin label, or pin number, and combines (AND) with the active filter.

Direct links to a specific pin work via the URL hash — `#gpio/B4`, `#gpio/D+`, `#m2/42`, `#m2/USB_D+` all open the right tab and pre-select the pin.

## Why this exists

Looking up which header pin can do `UART5_TX` (or which two pins form an `I2C2` bus) means scrolling through the multi-row table on the official spec page and parsing the mux suffixes by hand. This is the same problem [pinout.xyz](https://pinout.xyz/) solves for the Raspberry Pi GPIO.

## Data source

All pin data is transcribed verbatim from the official Flipper One developer portal:

- GPIO header — [docs.flipper.net/one/hardware/gpio-port](https://docs.flipper.net/one/hardware/gpio-port)
- M.2 port — [docs.flipper.net/one/hardware/m2-port](https://docs.flipper.net/one/hardware/m2-port)

Errors in this viewer are mine; the original docs are the source of truth. If you spot a discrepancy, please [open an issue](https://github.com/hypery11/flipper-one-pinout/issues) or send a PR against `pins.js`.

## Local development

It's all static HTML / CSS / JS — no build step, no dependencies.

```bash
git clone https://github.com/hypery11/flipper-one-pinout.git
cd flipper-one-pinout
python3 -m http.server 8000   # or any static server
open http://localhost:8000
```

## Roadmap

- [x] GPIO header (20 pins, inline alt-function view)
- [x] M.2 port (Key-B, 67 populated pin positions)
- [x] Search box — filter by signal, label, or pin number
- [x] Permalink to a selected pin — `#gpio/B4`, `#m2/42`, etc.
- [ ] Mobile-friendly responsive tweaks
- [ ] SVG board diagram with pin highlight

## Not affiliated with Flipper Devices

This is a community-maintained tool. Flipper One is an in-progress open-source project from
[Flipper Devices Inc.](https://flipperdevices.com/). See the [official developer portal](https://docs.flipper.net/one) for everything authoritative.

## License

MIT — see `LICENSE`.
