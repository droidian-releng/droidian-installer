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

const packageInfo = require("../../package.json");
const { BrowserWindow, shell, Menu } = require("electron");
const window = require("./window.js");
const udev = require("./udev.js");
const settings = require("./settings.js");
const cache = require("./cache.js");
const mainEvent = require("./mainEvent.js");

class MenuManager {
  /**
   * build global application menu
   * @param {BrowserWindow} mainWindow main Droidian Installer window
   */
  getMenuTemplate(mainWindow) {
    return [
      {
        label: "About",
        submenu: [
          {
            label: "About the Droidian...",
            click: () => shell.openExternal("https://droidian.org")
          },
          {
            label: "Source",
            click: () =>
              shell.openExternal(
                "https://github.com/droidian-releng/droidian-installer/tree/" +
                  packageInfo.version
              )
          },
          {
            label: "License",
            click: () =>
              shell.openExternal(
                "https://github.com/droidian-releng/droidian-installer/blob/" +
                  packageInfo.version +
                  "/LICENSE"
              )
          }
        ]
      },
      {
        label: "Window",
        role: "window",
        submenu: [
          {
            label: "Minimize",
            accelerator: "CmdOrCtrl+M",
            role: "minimize"
          },
          {
            label: "Close",
            accelerator: "CmdOrCtrl+W",
            role: "close"
          },
          {
            label: "Quit",
            accelerator: "CmdOrCtrl+Q",
            role: "close"
          }
        ]
      },
      {
        label: "Tools",
        submenu: [
          {
            label: "Set udev rules",
            click: udev.set,
            visible:
              packageInfo.package !== "snap" && process.platform === "linux"
          },
          {
            label: "Report a bug",
            click: () => window.send("user:report")
          },
          {
            label: "Developer tools",
            click: () => mainWindow.webContents.openDevTools()
          },
          {
            label: "Clean cached files",
            click: () => cache.clean()
          },
          {
            label: "Open settings config file",
            click: () => {
              settings.openInEditor();
            },
            visible: settings.size
          },
          {
            label: "Reset settings",
            click: () => {
              settings.clear();
            },
            visible: settings.size
          },
          {
            label: "Restart Droidian Installer",
            click: () => {
              mainEvent.emit("restart");
            }
          }
        ]
      },
      {
        label: "Settings",
        submenu: [
          {
            label: "Animations",
            checked: settings.get("animations"),
            type: "checkbox",
            click: () => {
              settings.set("animations", !settings.get("animations"));
              window.send("settings:animations", settings.get("animations"));
            }
          },
          {
            label: "Never ask for udev rules",
            checked: settings.get("never.udev"),
            visible:
              packageInfo.package !== "snap" && process.platform === "linux",
            type: "checkbox",
            click: () => settings.set("never.udev", !settings.get("never.udev"))
          },
          {
            label: "Never ask for windows drivers",
            checked: settings.get("never.windowsDrivers"),
            visible: process.platform === "win32",
            type: "checkbox",
            click: () =>
              settings.set(
                "never.windowsDrivers",
                !settings.get("never.windowsDrivers")
              )
          }
        ]
      },
      {
        label: "Help",
        submenu: [
          {
            label: "Bug tracker",
            click: () =>
              shell.openExternal(
                "https://github.com/droidian-releng/droidian-installer/issues"
              )
          },
          {
            label: "Report a bug",
            click: () => window.send("user:report")
          },
          {
            label: "Telegram",
            click: () => shell.openExternal("https://t.me/DroidianLinux")
          }
        ]
      }
    ];
  }

  /**
   * set global application menu
   * @param {BrowserWindow} mainWindow main Droidian Installer window
   */
  setMenu(mainWindow) {
    Menu.setApplicationMenu(
      Menu.buildFromTemplate(this.getMenuTemplate(mainWindow))
    );
  }
}

module.exports = new MenuManager();
