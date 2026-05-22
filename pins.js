// Flipper One GPIO header — 2x10 = 20 pin layout.
// Data sourced from https://docs.flipper.net/one/hardware/gpio-port
// (commit: docs/hardware/GPIO-port.md, public-release branch)
//
// Each row corresponds to one physical row on the header. `left` is the pin
// on the side of the table marked Description/PIN, `right` is the mirrored
// PIN/Description pair on the other side. The actual orientation of "left"
// and "right" on the PCB depends on board orientation; the schematic image
// at /files/pics/gpio-port-pinout.jpg is the authoritative reference.

const HEADER_ROWS = [
  {
    left:  { label: "3V3", type: "power", name: "3.3V Power", notes: "up to 2A EFUSE", alts: [] },
    right: { label: "GND", type: "gnd",   name: "Ground",      notes: "",                alts: [] }
  },
  {
    left:  {
      label: "M40", type: "mcu-gpio", name: "MCU GPIO 40", notes: "RP2350 GPIO",
      alts: [
        { signal: "PIO",    mux: null },
        { signal: "ADC0",   mux: null },
        { signal: "PWM8_A", mux: null }
      ]
    },
    right: {
      label: "M41", type: "mcu-gpio", name: "MCU GPIO 41", notes: "RP2350 GPIO",
      alts: [
        { signal: "PWM8_B", mux: null },
        { signal: "ADC0",   mux: null },
        { signal: "PIO",    mux: null }
      ]
    }
  },
  {
    left: {
      label: "B4", type: "cpu-gpio", name: "CPU GPIO4_B4_D", notes: "RK3576 GPIO",
      alts: [
        { signal: "SPDIF_RX0", mux: "M0" },
        { signal: "I2C3_SDA",  mux: "M0" },
        { signal: "UART2_RX",  mux: "M1" },
        { signal: "CAN1_RX",   mux: "M2" }
      ]
    },
    right: {
      label: "B5", type: "cpu-gpio", name: "CPU GPIO4_B5_D", notes: "RK3576 GPIO",
      alts: [
        { signal: "CAN1_TX",   mux: "M2" },
        { signal: "UART2_TX",  mux: "M1" },
        { signal: "I2C3_SCL",  mux: "M0" },
        { signal: "SPDIF_TX0", mux: "M0" }
      ]
    }
  },
  {
    left: {
      label: "B2", type: "cpu-gpio", name: "CPU GPIO4_B2_D", notes: "RK3576 GPIO",
      alts: [
        { signal: "SAI1_SDO3", mux: "M0" },
        { signal: "SAI1_SDI1", mux: "M0" },
        { signal: "PDM1_SDI1", mux: "M1" },
        { signal: "SPI4_MISO", mux: "M2" }
      ]
    },
    right: {
      label: "B3", type: "cpu-gpio", name: "CPU GPIO4_B3_D", notes: "RK3576 GPIO",
      alts: [
        { signal: "PWM2_CH7",  mux: "M0" },
        { signal: "SPI3_CSN1", mux: "M2" },
        { signal: "SPI4_CSN0", mux: "M2" },
        { signal: "PDM1_SDI0", mux: "M1" },
        { signal: "SAI4_SD0",  mux: "M0" },
        { signal: "SAI1_SDI0", mux: "M0" }
      ]
    }
  },
  {
    left: {
      label: "B0", type: "cpu-gpio", name: "CPU GPIO4_B0_D", notes: "RK3576 GPIO",
      alts: [
        { signal: "SAI1_SDO1",  mux: "M0" },
        { signal: "SAI1_SDI3",  mux: "M0" },
        { signal: "PDM1_CLK1",  mux: "M1" },
        { signal: "SPI4_CLK",   mux: "M2" },
        { signal: "UART5_TX",   mux: "M1" },
        { signal: "UART6_RTSN", mux: "M0" },
        { signal: "UART2_RTSN", mux: "M1" }
      ]
    },
    right: {
      label: "B1", type: "cpu-gpio", name: "CPU GPIO4_B1_D", notes: "RK3576 GPIO",
      alts: [
        { signal: "UART2_CTSN", mux: "M1" },
        { signal: "UART6_CTSN", mux: "M0" },
        { signal: "UART5_RX",   mux: "M1" },
        { signal: "SPI4_MOSI",  mux: "M2" },
        { signal: "PDM1_SDI2",  mux: "M1" },
        { signal: "SAI1_SDI2",  mux: "M0" },
        { signal: "SAI1_SDO2",  mux: "M0" }
      ]
    }
  },
  {
    left: {
      label: "A6", type: "cpu-gpio", name: "CPU GPIO4_A6_D", notes: "RK3576 GPIO",
      alts: [
        { signal: "SAI4_LRCK", mux: "M0" },
        { signal: "PDM1_CLK0", mux: "M1" },
        { signal: "SPI3_MISO", mux: "M2" },
        { signal: "I2C4_SDA",  mux: "M1" },
        { signal: "UART6_RX",  mux: "M0" },
        { signal: "CAN0_RX",   mux: "M2" }
      ]
    },
    right: {
      label: "A7", type: "cpu-gpio", name: "CPU GPIO4_A7_D", notes: "RK3576 GPIO",
      alts: [
        { signal: "PWM2_CH6",  mux: "M0" },
        { signal: "SPI3_CLK",  mux: "M2" },
        { signal: "SAI4_SDI1", mux: "M0" },
        { signal: "SAI1_SDO0", mux: "M0" }
      ]
    }
  },
  {
    left: {
      label: "A4", type: "cpu-gpio", name: "CPU GPIO4_A4_D", notes: "RK3576 GPIO",
      alts: [
        { signal: "SAI4_SCLK", mux: "M0" },
        { signal: "PDM1_SDI3", mux: "M1" },
        { signal: "SPI3_MOSI", mux: "M2" },
        { signal: "I2C4_SCL",  mux: "M1" },
        { signal: "UART6_TX",  mux: "M0" },
        { signal: "CAN0_TX",   mux: "M2" }
      ]
    },
    right: {
      label: "A5", type: "cpu-gpio", name: "CPU GPIO4_A5_D", notes: "RK3576 GPIO",
      alts: [
        { signal: "I2C2_SDA",   mux: "M2" },
        { signal: "UART5_CTSN", mux: "M1" },
        { signal: "SPI4_CSN1",  mux: "M2" },
        { signal: "SAI1_LRCK",  mux: "M0" }
      ]
    }
  },
  {
    left: {
      label: "A2", type: "cpu-gpio", name: "CPU GPIO4_A2_D", notes: "RK3576 GPIO",
      alts: [
        { signal: "SAI1_MCLK", mux: "M0" },
        { signal: "SAI4_MCLK", mux: "M0" },
        { signal: "PWM2_CH5",  mux: "M0" }
      ]
    },
    right: {
      label: "A3", type: "cpu-gpio", name: "CPU GPIO4_A3_D", notes: "RK3576 GPIO",
      alts: [
        { signal: "PWM2_CH4",   mux: "M1" },
        { signal: "I2C2_SCL",   mux: "M2" },
        { signal: "UART5_RTSN", mux: "M1" },
        { signal: "SPI3_CSN0",  mux: "M2" },
        { signal: "SAI1_SCLK",  mux: "M0" }
      ]
    }
  },
  {
    left:  { label: "5V",  type: "power", name: "5V Power",       notes: "up to 2A EFUSE", alts: [] },
    right: { label: "GND", type: "gnd",   name: "Ground",          notes: "",                alts: [] }
  },
  {
    left:  { label: "D+",  type: "usb",   name: "CPU USB 2.0 D+",  notes: "USB 2.0 data positive", alts: [] },
    right: { label: "D-",  type: "usb",   name: "CPU USB 2.0 D-",  notes: "USB 2.0 data negative", alts: [] }
  }
];

// Functional filters for the GPIO header.
// "all" is a special case handled in the UI code.
const GPIO_FILTERS = [
  { id: "all",       label: "All",       test: () => true },
  { id: "power",     label: "Power",     test: p => p.type === "power" },
  { id: "gnd",       label: "Ground",    test: p => p.type === "gnd" },
  { id: "usb",       label: "USB",       test: p => p.type === "usb" },
  { id: "mcu-gpio",  label: "MCU GPIO",  test: p => p.type === "mcu-gpio" },
  { id: "cpu-gpio",  label: "CPU GPIO",  test: p => p.type === "cpu-gpio" },
  { id: "i2c",       label: "I²C",       test: p => p.alts.some(a => a.signal.startsWith("I2C")) },
  { id: "uart",      label: "UART",      test: p => p.alts.some(a => a.signal.startsWith("UART")) },
  { id: "spi",       label: "SPI",       test: p => p.alts.some(a => a.signal.startsWith("SPI")) },
  { id: "can",       label: "CAN",       test: p => p.alts.some(a => a.signal.startsWith("CAN")) },
  { id: "sai",       label: "SAI / I²S", test: p => p.alts.some(a => a.signal.startsWith("SAI")) },
  { id: "pwm",       label: "PWM",       test: p => p.alts.some(a => a.signal.startsWith("PWM")) },
  { id: "pdm",       label: "PDM",       test: p => p.alts.some(a => a.signal.startsWith("PDM")) },
  { id: "spdif",     label: "S/PDIF",    test: p => p.alts.some(a => a.signal.startsWith("SPDIF")) },
  { id: "adc",       label: "ADC",       test: p => p.alts.some(a => a.signal.startsWith("ADC")) },
  { id: "pio",       label: "PIO",       test: p => p.alts.some(a => a.signal === "PIO") }
];

// --- M.2 port -----------------------------------------------------------------
//
// Flipper One uses an M.2 Key-B (S3) connector. Standard Key-B has 75 pin
// positions; pins 12–19 are physically absent (the connector key occupies that
// region). Sourced verbatim from https://docs.flipper.net/one/hardware/m2-port

const M2_PINS = [
  { pin:  1, desc: "CONFIG_3", type: "config" },
  { pin:  2, desc: "3.3V", type: "power" },
  { pin:  3, desc: "GND", type: "gnd" },
  { pin:  4, desc: "3.3V", type: "power" },
  { pin:  5, desc: "GND", type: "gnd" },
  { pin:  6, desc: "FULL_CARD_POWER_OFF# (O)(0/1.8V or 3.3V)", type: "control" },
  { pin:  7, desc: "USB_D+", type: "usb" },
  { pin:  8, desc: "W_DISABLE1# (O)(0/1.8V/3.3V)", type: "control" },
  { pin:  9, desc: "USB_D-", type: "usb" },
  { pin: 10, desc: "GPIO_9/DAS/DSS (I/O)/LED_1# (I)(0/3.3V)", type: "control" },
  { pin: 11, desc: "GND", type: "gnd" },
  { pin: 20, desc: "GPIO_5 (I/O)(0/1.8V)", type: "control" },
  { pin: 21, desc: "CONFIG_0", type: "config" },
  { pin: 22, desc: "GPIO_6 (I/O)(0/1.8V)", type: "control" },
  { pin: 23, desc: "GPIO_11 (I/O)(0/1.8V)", type: "control" },
  { pin: 24, desc: "GPIO_7 (I/O)(0/1.8V)", type: "control" },
  { pin: 25, desc: "DPR (O)(0/1.8V)", type: "control" },
  { pin: 26, desc: "GPIO_10 (I/O)(0/1.8V)", type: "control" },
  { pin: 27, desc: "GND", type: "gnd" },
  { pin: 28, desc: "PLA_S2# (I)/GPIO_8 (I/O)(0/1.8V)", type: "control" },
  { pin: 29, desc: "PERn1/USB3.1-Rx-/SSIC-RxN", type: "pcie" },
  { pin: 30, desc: "UIM_RESET (I)", type: "sim" },
  { pin: 31, desc: "PERp1/USB3.1-Rx+/SSIC-RxP", type: "pcie" },
  { pin: 32, desc: "UIM_CLK (I)", type: "sim" },
  { pin: 33, desc: "GND", type: "gnd" },
  { pin: 34, desc: "UIM_DATA (I/O)", type: "sim" },
  { pin: 35, desc: "PETn1/USB3.1-Tx-/SSIC-TxN", type: "pcie" },
  { pin: 36, desc: "UIM_PWR (I)", type: "sim" },
  { pin: 37, desc: "PETp1/USB3.1-Tx+/SSIC-TxP", type: "pcie" },
  { pin: 38, desc: "DEVSLP (O)", type: "control" },
  { pin: 39, desc: "GND", type: "gnd" },
  { pin: 40, desc: "GPIO_0 (I/O)/SMB_CLK (I/O)/(0/1.8V)", type: "control" },
  { pin: 41, desc: "PERn0/SATA-B+", type: "pcie" },
  { pin: 42, desc: "GPIO_1 (I/O)/SMB_DATA (I/O)/(0/1.8V)", type: "control" },
  { pin: 43, desc: "PERp0/SATA-B-", type: "pcie" },
  { pin: 44, desc: "GPIO_2 (I/O)/ALERT# (I)(0/1.8V)", type: "control" },
  { pin: 45, desc: "GND", type: "gnd" },
  { pin: 46, desc: "GPIO_3 (I/O)(0/1.8V)", type: "control" },
  { pin: 47, desc: "PETn0/SATA-A-", type: "pcie" },
  { pin: 48, desc: "GPIO_4 (I/O)(0/1.8V)", type: "control" },
  { pin: 49, desc: "PETp0/SATA-A+", type: "pcie" },
  { pin: 50, desc: "PERST# (O)(0/1.8V/3.3V)", type: "pcie" },
  { pin: 51, desc: "GND", type: "gnd" },
  { pin: 52, desc: "CLKREQ# (I/O)(0/1.8V/3.3V)", type: "pcie" },
  { pin: 53, desc: "REFCLKn", type: "pcie" },
  { pin: 54, desc: "PEWAKE# (I/O)(0/1.8V/3.3V)", type: "pcie" },
  { pin: 55, desc: "REFCLKp", type: "pcie" },
  { pin: 56, desc: "NC", type: "nc" },
  { pin: 57, desc: "GND", type: "gnd" },
  { pin: 58, desc: "NC", type: "nc" },
  { pin: 59, desc: "ANTCTL0 (I)(0/1.8V)", type: "coex" },
  { pin: 60, desc: "COEX3 (I/O)(0/1.8V)", type: "coex" },
  { pin: 61, desc: "ANTCTL1 (I)(0/1.8V)", type: "coex" },
  { pin: 62, desc: "COEX_TXD (O)(0/1.8V)", type: "coex" },
  { pin: 63, desc: "ANTCTL2 (I)(0/1.8V)", type: "coex" },
  { pin: 64, desc: "COEX_RXD (I)(0/1.8V)", type: "coex" },
  { pin: 65, desc: "ANTCTL3 (I)(0/1.8V)", type: "coex" },
  { pin: 66, desc: "SIM DETECT (O)", type: "sim" },
  { pin: 67, desc: "RESET# (O)(0/1.8V)", type: "control" },
  { pin: 68, desc: "SUSCLK (O)(0/1.8V/3.3V)", type: "control" },
  { pin: 69, desc: "CONFIG_1", type: "config" },
  { pin: 70, desc: "3.3 V/VBAT", type: "power" },
  { pin: 71, desc: "GND", type: "gnd" },
  { pin: 72, desc: "3.3 V/VBAT", type: "power" },
  { pin: 73, desc: "VIO_CFG (I) or GND", type: "other" },
  { pin: 74, desc: "3.3 V/VBAT", type: "power" },
  { pin: 75, desc: "CONFIG_2", type: "config" }
];

const M2_FILTERS = [
  { id: "all",     label: "All",     test: () => true },
  { id: "power",   label: "Power",   test: p => p.type === "power" },
  { id: "gnd",     label: "Ground",  test: p => p.type === "gnd" },
  { id: "usb",     label: "USB",     test: p => p.type === "usb" },
  { id: "pcie",    label: "PCIe / SATA / USB3", test: p => p.type === "pcie" },
  { id: "sim",     label: "SIM",     test: p => p.type === "sim" },
  { id: "config",  label: "Config",  test: p => p.type === "config" },
  { id: "control", label: "GPIO / Control", test: p => p.type === "control" },
  { id: "coex",    label: "Antenna / Coex",  test: p => p.type === "coex" },
  { id: "nc",      label: "NC",      test: p => p.type === "nc" }
];
