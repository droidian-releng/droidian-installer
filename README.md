# Droidian Installer 

Fear not! Installing [Droidian](https://droidian.org) on your [device](https://devices.droidian.org) is easy! Just download the Droidian Installer package for your operating system and sit back and relax while your computer does all the rest. Installing third-party operating systems has never been so easy!

## Config files

By default, the Installer will always use the latest version of the [installation configuration files](https://github.com/droidian-devices/installer-configs) available. Should you want to specify a custom config file, you can do that by starting the Installer with the `-f ./path/to/config.yml` argument. This can be used to test changes to the configuration or even to add new devices to the installer. The [structure of the config files is specified here](https://github.com/droidian-devices/installer-configs#readme).

## Logs

If the installer runs into an error, it will usually present you with the option to create a bug report. It is always a good idea to make use of that feature, because that way the developers will almost always have all the information they need to help you. If you still have to look at the log file for some reason, you can find it in `~/.cache/droidian/droidian-installer.log` on linux (or `~/snap/droidian-installer/current/.cache/droidian/droidian-installer.log` if you're using the snap package). On Windows, it will be located at `%APPDATA%\droidian\droidian-installer.log` and on macOS you can find it under `$HOME/Library/Caches/droidian/droidian-installer.log`.

## Set up for development

Ensure you have properly installed [`nodejs` and `npm`](https://nodejs.org/en/download/package-manager/).

```
git clone https://github.com/droidian-releng/droidian-installer.git
cd droidian-installer

npm install
```

### Run with npm

```
$ npm start -- -h
Usage: npm start -- [-f <file>] [-v[v] [-d]

Droidian Installer (0.0.4) source for linux
GPL-3.0 UBports Foundation <info@ubports.com>, Erik Inkinen <erik.inkinen@erikinkinen.fi>
The easy way to install Droidian on supported devices. A friendly cross-platform Installer for Droidian. Just connect a supported device to your PC, follow the on-screen instructions and watch this awesome tool do all the rest.
https://devices.droidian.org

Options:
  -V, --version        output the version number
  -f, --file <file>    Override the official config by loading a YAML local file
  -v, --verbose        Print debugging information. Multiple -v options increase the verbosity
  -d, --debug          Enable electron's web debugger to inspect the frontend (default: false)
  --systemimage <url>  Set a custom systemimage server url (default:
                       "https://system-image.ubports.com/")
  -h, --help           display help for command
```

### Lint

Before filing a PR, please make sure you follow our coding style by running `npm run lint`.

### Build packages

```
$ ./build.js --help
Usage: ./build.js -o <os> -p <package> -a <arch> [options]

Options:
  -V, --version                output the version number
  -o, --os <os>                Target operating system (darwin, win32, linux) (default: "linux")
  -p, --package <package>      Target package (deb, snap, AppImage, dmg, portable, dir) (default: "dir")
  -a, --arch <architecture>    Target architecture (armv7l, x64, ia32, arm64) (default: "x64")
  -e, --extra-metadata [JSON]  extra data for package.json (default: "{}")
  -h, --help                   output usage information
```

## Libraries

The UBports Foundation maintains a various free- and open-source NPM libraries for the UBports Installer.

| Package                  | Version                                                                                                             | Description                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `progressive-downloader` | [![version](https://shields.io/npm/v/progressive-downloader)](https://www.npmjs.com/package/progressive-downloader) | Parallel downloads and opportunistic checksum verification             |
| `promise-android-tools`  | [![version](https://shields.io/npm/v/promise-android-tools)](https://www.npmjs.com/package/promise-android-tools)   | Extensive wrapper for ADB, Fastboot, Heimdall                          |
| `android-tools-bin`      | [![version](https://shields.io/npm/v/android-tools-bin)](https://www.npmjs.com/package/android-tools-bin)           | Cross-platform binaries for ADB, Fastboot, Heimdall                    |
| `open-cuts-reporter`     | [![version](https://shields.io/npm/v/open-cuts-reporter)](https://www.npmjs.com/package/open-cuts-reporter)         | Report test results to [UBports OPEN-CUTS](https://www.open-cuts.org/) |

## License

Original development by [Marius Gripsgård](http://mariogrip.com/) and [Johannah Sprinz](https://spri.nz). Copyright (C) 2017-2022 [UBports Foundation](https://ubports.com). Copyright (C) 2023 Erik Inkinen <erik.inkinen@erikinkinen.fi>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.
