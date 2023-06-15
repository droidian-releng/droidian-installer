"use strict";

/*
 * Copyright (C) 2017-2022 UBports Foundation <info@ubports.com>
 * Copyright (C) 2023 Erik Inkinen <erik.inkinen@erikinkinen.fi>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const axios = require("axios");
const packageInfo = require("../../package.json");
const semverGt = require("semver/functions/gt");
const semverLt = require("semver/functions/lt");

/**
 * Droidian Installer version management
 * @property {String} updateUrl url to download the latest stable version of the current package
 */
class Updater {
  constructor() {
    this.cache = {};
    this.updateUrl = `https://devices.ubuntu-touch.io/installer/${
      packageInfo.package ? "?package=" + packageInfo.package : ""
    }`;
  }

  /**
   * resolves latest version of the Droidian Installer
   * @returns {Promise<String>}
   */
  async getLatestVersion() {
    if (this.cache.latest) {
      return this.cache.latest;
    } else {
      return axios
        .get(
          "https://api.github.com/repos/droidian-releng/droidian-installer/releases/latest",
          {
            json: true,
            headers: { "User-Agent": "axios" }
          }
        )
        .then(r => {
          this.cache.latest = r.data.tag_name;
          return r.data.tag_name;
        })
        .catch(e => {
          throw new Error(
            `Failed to get latest version of the Droidian Installer: ${e}`
          );
        });
    }
  }

  /**
   * resolves update url if the installer is outdated, null otherwise
   * @returns {Promise<String>}
   */
  async isOutdated() {
    const latest = await this.getLatestVersion();
    return semverLt(packageInfo.version, latest) ? this.updateUrl : null;
  }

  /**
   * resolves update url if the installer is a prerelease, null otherwise
   * @returns {Promise<String>}
   */
  async isPrerelease() {
    const latest = await this.getLatestVersion();
    return semverGt(packageInfo.version, latest) ? this.updateUrl : null;
  }
}

module.exports = new Updater();
