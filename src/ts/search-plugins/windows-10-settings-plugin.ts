import { SearchResultItem } from "../search-result-item";
import { SearchPlugin } from "./search-plugin";
import { WindowsSettingsHelpers } from "../helpers/windows-settings-helpers";
import { UeliHelpers } from "../helpers/ueli-helpers";

export class Windows10SettingsSearchPlugin implements SearchPlugin {
    private defaultIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                                <g id="surface1">
                                    <path d="M 13.1875 3 L 13.03125 3.8125 L 12.4375 6.78125 C 11.484375 7.15625 10.625 7.683594 9.84375 8.3125 L 6.9375 7.3125 L 6.15625 7.0625 L 5.75 7.78125 L 3.75 11.21875 L 3.34375 11.9375 L 3.9375 12.46875 L 6.1875 14.4375 C 6.105469 14.949219 6 15.460938 6 16 C 6 16.539063 6.105469 17.050781 6.1875 17.5625 L 3.9375 19.53125 L 3.34375 20.0625 L 3.75 20.78125 L 5.75 24.21875 L 6.15625 24.9375 L 6.9375 24.6875 L 9.84375 23.6875 C 10.625 24.316406 11.484375 24.84375 12.4375 25.21875 L 13.03125 28.1875 L 13.1875 29 L 18.8125 29 L 18.96875 28.1875 L 19.5625 25.21875 C 20.515625 24.84375 21.375 24.316406 22.15625 23.6875 L 25.0625 24.6875 L 25.84375 24.9375 L 26.25 24.21875 L 28.25 20.78125 L 28.65625 20.0625 L 28.0625 19.53125 L 25.8125 17.5625 C 25.894531 17.050781 26 16.539063 26 16 C 26 15.460938 25.894531 14.949219 25.8125 14.4375 L 28.0625 12.46875 L 28.65625 11.9375 L 28.25 11.21875 L 26.25 7.78125 L 25.84375 7.0625 L 25.0625 7.3125 L 22.15625 8.3125 C 21.375 7.683594 20.515625 7.15625 19.5625 6.78125 L 18.96875 3.8125 L 18.8125 3 Z M 14.8125 5 L 17.1875 5 L 17.6875 7.59375 L 17.8125 8.1875 L 18.375 8.375 C 19.511719 8.730469 20.542969 9.332031 21.40625 10.125 L 21.84375 10.53125 L 22.40625 10.34375 L 24.9375 9.46875 L 26.125 11.5 L 24.125 13.28125 L 23.65625 13.65625 L 23.8125 14.25 C 23.941406 14.820313 24 15.402344 24 16 C 24 16.597656 23.941406 17.179688 23.8125 17.75 L 23.6875 18.34375 L 24.125 18.71875 L 26.125 20.5 L 24.9375 22.53125 L 22.40625 21.65625 L 21.84375 21.46875 L 21.40625 21.875 C 20.542969 22.667969 19.511719 23.269531 18.375 23.625 L 17.8125 23.8125 L 17.6875 24.40625 L 17.1875 27 L 14.8125 27 L 14.3125 24.40625 L 14.1875 23.8125 L 13.625 23.625 C 12.488281 23.269531 11.457031 22.667969 10.59375 21.875 L 10.15625 21.46875 L 9.59375 21.65625 L 7.0625 22.53125 L 5.875 20.5 L 7.875 18.71875 L 8.34375 18.34375 L 8.1875 17.75 C 8.058594 17.179688 8 16.597656 8 16 C 8 15.402344 8.058594 14.820313 8.1875 14.25 L 8.34375 13.65625 L 7.875 13.28125 L 5.875 11.5 L 7.0625 9.46875 L 9.59375 10.34375 L 10.15625 10.53125 L 10.59375 10.125 C 11.457031 9.332031 12.488281 8.730469 13.625 8.375 L 14.1875 8.1875 L 14.3125 7.59375 Z M 16 11 C 13.25 11 11 13.25 11 16 C 11 18.75 13.25 21 16 21 C 18.75 21 21 18.75 21 16 C 21 13.25 18.75 11 16 11 Z M 16 13 C 17.667969 13 19 14.332031 19 16 C 19 17.667969 17.667969 19 16 19 C 14.332031 19 13 17.667969 13 16 C 13 14.332031 14.332031 13 16 13 Z "></path>
                                </g>
                            </svg>`;

    private settings: SearchResultItem[] = [];
    private systemCommands: SearchResultItem[] = [];
    private apps: SearchResultItem[] = [];

    constructor() {
        this.addToSettings(this.getSystemSettings());
        this.addToSettings(this.getDeviceSettings());
        this.addToSettings(this.getNetworkSettings());
        this.addToSettings(this.getPersonalizationSettings());
        this.addToSettings(this.getAppSettings());
        this.addToSettings(this.getAccountSettings());
        this.addToSettings(this.getCortanaSettings());
        this.addToSettings(this.getTimeAndLanguageSettings());
        this.addToSettings(this.getGamingSettings());
        this.addToSettings(this.getEaseOfAccessSettings());
        this.addToSettings(this.getPrivacySettings());
        this.addToSettings(this.getUpdateAndSecuritySettings());
        this.addToSettings(this.getCortanaSettings());
        this.addToSystemCommands(this.getSystemCommands());
        this.addToApps(this.getWindows10Apps());
    }

    public getAllItems(): SearchResultItem[] {
        return this.settings.map((setting: SearchResultItem): SearchResultItem => {
            return {
                description: `Windows Settings ${UeliHelpers.searchResultDescriptionSeparator} ${setting.name}`,
                executionArgument: setting.executionArgument,
                icon: setting.icon,
                name: setting.name,
                searchable: [setting.name],
                tags: setting.tags,
            };
        }).concat(this.systemCommands.map((systemCommand: SearchResultItem): SearchResultItem => {
            return {
                description: `Windows ${UeliHelpers.searchResultDescriptionSeparator} ${systemCommand.name}`,
                executionArgument: systemCommand.executionArgument,
                icon: systemCommand.icon,
                name: systemCommand.name,
                searchable: [systemCommand.name],
                tags: systemCommand.tags,
            };
        }).concat(this.apps.map((app: SearchResultItem): SearchResultItem => {
            return {
                description: `Windows UWP App`,
                executionArgument: app.executionArgument,
                icon: app.icon,
                name: app.name,
                searchable: [app.name],
                tags: app.tags,
            };
        })));
    }

    private addToSettings(settings: SearchResultItem[]): void {
        this.settings = this.settings.concat(settings);
    }

    private addToApps(apps: SearchResultItem[]): void {
        this.apps = this.apps.concat(apps);
    }

    private addToSystemCommands(systemCommands: SearchResultItem[]): void {
        this.systemCommands = this.systemCommands.concat(systemCommands);
    }

    private getSystemSettings(): SearchResultItem[] {
        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:batterysaver`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                name: "Windows Settings",
                tags: ["control", "panel"],
                <g id="surface1">
                <path d="M 3 8 L 3 24 L 27 24 L 27 19 L 29 19 L 29 13 L 27 13 L 27 8 Z M 5 10 L 25 10 L 25 22 L 5 22 Z M 15.5 13 L 9 16 L 14.5 16 L 15.5 19 L 22 16 L 16.5 16 Z "></path>
                </g>
                </svg>`,
                name: "Battery",
                tags: ["power", "energy", "saving", "save"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:display`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 2 6 L 2 24 L 15 24 L 15 26 L 10 26 L 10 28 L 22 28 L 22 26 L 17 26 L 17 24 L 30 24 L 30 6 Z M 4 8 L 28 8 L 28 22 L 4 22 Z "></path>
                </g>
                </svg>`,
                name: "Display",
                tags: ["screen", "resolution", "4k", "hd"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:notifications`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 3 6 L 3 26 L 12.585938 26 L 16 29.414063 L 19.414063 26 L 29 26 L 29 6 Z M 5 8 L 27 8 L 27 24 L 18.585938 24 L 16 26.585938 L 13.414063 24 L 5 24 Z M 9 11 L 9 13 L 23 13 L 23 11 Z M 9 15 L 9 17 L 23 17 L 23 15 Z M 9 19 L 9 21 L 19 21 L 19 19 Z "></path>
                </g>
                </svg>`,
                name: "Notifications & actions",
                tags: ["notify", "action"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:powersleep`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 22 3.59375 L 18 7.5625 L 15.71875 5.28125 L 14.28125 6.71875 L 15.03125 7.46875 L 9.90625 12.59375 C 8.695313 13.804688 8.695313 15.789063 9.90625 17 L 11.75 18.84375 L 4.28125 26.28125 L 5.71875 27.71875 L 13.15625 20.25 L 15 22.09375 C 16.210938 23.304688 18.195313 23.304688 19.40625 22.09375 L 24.53125 16.96875 L 25.28125 17.71875 L 26.71875 16.28125 L 24.4375 14 L 28.40625 10 L 27 8.59375 L 23 12.5625 L 19.4375 9 L 23.40625 5 Z M 16.4375 8.875 L 23.125 15.5625 L 18 20.6875 C 17.613281 21.074219 16.792969 21.074219 16.40625 20.6875 L 11.3125 15.59375 C 10.925781 15.207031 10.925781 14.386719 11.3125 14 Z "></path>
                </g>
                </svg>`,
                name: "Power & sleep",
                tags: ["energy", "plan"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:storagesense`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 6.21875 6 L 3 18.875 L 3 26 L 29 26 L 29 18.875 L 25.78125 6 Z M 7.78125 8 L 24.21875 8 L 26.71875 18 L 5.28125 18 Z M 5 20 L 27 20 L 27 24 L 5 24 Z M 24 21 C 23.449219 21 23 21.449219 23 22 C 23 22.550781 23.449219 23 24 23 C 24.550781 23 25 22.550781 25 22 C 25 21.449219 24.550781 21 24 21 Z "></path>
                </g>
                </svg>`,
                name: "Storage",
                tags: ["hard", "disk", "ssd", "hdd"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:tabletmode`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 4 6 C 3.476563 6 2.941406 6.183594 2.5625 6.5625 C 2.183594 6.941406 2 7.476563 2 8 L 2 24 C 2 24.523438 2.183594 25.058594 2.5625 25.4375 C 2.941406 25.816406 3.476563 26 4 26 L 28 26 C 28.523438 26 29.058594 25.816406 29.4375 25.4375 C 29.816406 25.058594 30 24.523438 30 24 L 30 8 C 30 7.476563 29.816406 6.941406 29.4375 6.5625 C 29.058594 6.183594 28.523438 6 28 6 Z M 4 8 L 28 8 L 28 24 L 4 24 Z M 14 21 L 14 23 L 18 23 L 18 21 Z "></path>
                </g>
                </svg>`,
                name: "Tablet mode",
                tags: ["mobile", "touch"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:project`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 2 6 L 2 19.6875 L 0.46875 22.03125 L 0.46875 22.0625 C 0.191406 22.484375 0 22.988281 0 23.5 C 0 24.882813 1.117188 26 2.5 26 L 30 26 C 30.523438 26 31.058594 25.816406 31.4375 25.4375 C 31.816406 25.058594 32 24.523438 32 24 L 32 14 C 32 13.476563 31.816406 12.941406 31.4375 12.5625 C 31.058594 12.183594 30.523438 12 30 12 L 24 12 L 24 6 Z M 4 8 L 22 8 L 22 12 L 16 12 C 15.476563 12 14.941406 12.183594 14.5625 12.5625 C 14.183594 12.941406 14 13.476563 14 14 L 14 19 L 4 19 Z M 16 14 L 30 14 L 30 24 L 16 24 Z M 3.5625 21 L 14 21 L 14 24 L 2.5 24 C 2.285156 24 2 23.714844 2 23.5 C 2 23.421875 2.011719 23.328125 2.125 23.15625 Z M 21 21 L 21 23 L 25 23 L 25 21 Z "></path>
                </g>
                </svg>`,
                name: "Projecting to this PC",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:multitasking`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 0 1.625 L 0 30.375 L 7.125 28 L 24.875 28 L 32 30.375 L 32 1.625 L 24.875 4 L 7.125 4 Z M 2 4.375 L 6 5.71875 L 6 11.8125 L 2 11.125 Z M 30 4.375 L 30 11.125 L 26 11.8125 L 26 5.71875 Z M 8 6 L 24 6 L 24 26 L 8 26 Z M 2 13.1875 L 6 13.875 L 6 26.28125 L 2 27.625 Z M 30 13.1875 L 30 27.625 L 26 26.28125 L 26 13.875 Z "></path>
                </g>
                </svg>`,
                name: "Multitasking",
                tags: ["windows", "window", "manager", "snap", "virtual", "desktop"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:remotedesktop`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 2 6 L 2 24 L 15 24 L 15 26 L 10 26 L 10 28 L 22 28 L 22 26 L 17 26 L 17 24 L 30 24 L 30 6 Z M 4 8 L 28 8 L 28 22 L 4 22 Z "></path>
                </g>
                </svg>`,
                name: "Remote Desktop",
                tags: ["connection"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:about`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 10 L 15 12 L 17 12 L 17 10 Z M 15 14 L 15 22 L 17 22 L 17 14 Z "></path>
                </g>
                </svg>`,
                name: "About your PC",
                tags: ["system", "device", "specs", "specifications", "license", "info", "information"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}shell:RecycleBinFolder`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                            <g id="surface1">
                                <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z "></path>
                            </g>
                        </svg>`,
                name: "Recycle Bin",
                tags: ["trash"],
            },
        ] as SearchResultItem[];
    }

    private getDeviceSettings(): SearchResultItem[] {
        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:bluetooth`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 14 3.59375 L 14 13.5625 L 9.71875 9.28125 L 8.28125 10.71875 L 13.5625 16 L 8.28125 21.28125 L 9.71875 22.71875 L 14 18.4375 L 14 28.40625 L 15.71875 26.71875 L 20.71875 21.71875 L 21.40625 21 L 20.71875 20.28125 L 16.4375 16 L 20.71875 11.71875 L 21.40625 11 L 20.71875 10.28125 L 15.71875 5.28125 Z M 16 8.4375 L 18.5625 11 L 16 13.5625 Z M 16 18.4375 L 18.5625 21 L 16 23.5625 Z "></path>
                </g>
                </svg>`,
                name: "Bluetooth",
                tags: ["wireless", "device", "devices"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:printers`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 9 4 L 9 11 L 7 11 C 5.355469 11 4 12.355469 4 14 L 4 24 L 9 24 L 9 28 L 23 28 L 23 24 L 28 24 L 28 14 C 28 12.355469 26.644531 11 25 11 L 23 11 L 23 4 Z M 11 6 L 21 6 L 21 11 L 11 11 Z M 7 13 L 25 13 C 25.566406 13 26 13.433594 26 14 L 26 22 L 23 22 L 23 18 L 9 18 L 9 22 L 6 22 L 6 14 C 6 13.433594 6.433594 13 7 13 Z M 8 14 C 7.449219 14 7 14.449219 7 15 C 7 15.550781 7.449219 16 8 16 C 8.550781 16 9 15.550781 9 15 C 9 14.449219 8.550781 14 8 14 Z M 11 20 L 21 20 L 21 26 L 11 26 Z "></path>
                </g>
                </svg>`,
                name: "Printers & Scanners",
                tags: ["devices"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:mousetouchpad`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 12 3 C 9.789063 3 8 4.789063 8 7 C 8 8.011719 8.378906 8.925781 9 9.625 L 9 15.65625 L 6.90625 18.34375 C 5.628906 19.996094 5.714844 22.367188 7.09375 23.9375 L 9.46875 26.625 C 10.796875 28.136719 12.707031 29 14.71875 29 L 20 29 C 23.855469 29 27 25.855469 27 22 L 27 15 C 27 13.355469 25.644531 12 24 12 C 23.464844 12 22.96875 12.15625 22.53125 12.40625 C 21.996094 11.5625 21.0625 11 20 11 C 19.464844 11 18.96875 11.15625 18.53125 11.40625 C 17.996094 10.5625 17.0625 10 16 10 C 15.648438 10 15.316406 10.074219 15 10.1875 L 15 9.625 C 15.617188 8.925781 16 8.007813 16 7 C 16 4.789063 14.210938 3 12 3 Z M 12 6 C 12.550781 6 13 6.449219 13 7 L 13 16 L 15 16 L 15 13 C 15 12.433594 15.433594 12 16 12 C 16.566406 12 17 12.433594 17 13 L 17 16 L 19 16 L 19 14 C 19 13.433594 19.433594 13 20 13 C 20.566406 13 21 13.433594 21 14 L 21 16 L 23 16 L 23 15 C 23 14.433594 23.433594 14 24 14 C 24.566406 14 25 14.433594 25 15 L 25 22 C 25 24.773438 22.773438 27 20 27 L 14.71875 27 C 13.28125 27 11.917969 26.394531 10.96875 25.3125 L 8.59375 22.59375 C 7.839844 21.734375 7.800781 20.5 8.5 19.59375 L 9 18.9375 L 9 20 L 11 20 L 11 7 C 11 6.871094 11.019531 6.738281 11.0625 6.625 C 11.066406 6.617188 11.058594 6.601563 11.0625 6.59375 C 11.113281 6.472656 11.191406 6.371094 11.28125 6.28125 C 11.460938 6.101563 11.726563 6 12 6 Z "></path>
                </g>
                </svg>`,
                name: "Touchpad",
                tags: ["input"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:typing`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 3 7 C 1.90625 7 1 7.90625 1 9 L 1 23 C 1 24.09375 1.90625 25 3 25 L 29 25 C 30.09375 25 31 24.09375 31 23 L 31 9 C 31 7.90625 30.09375 7 29 7 Z M 3 9 L 29 9 L 29 23 L 3 23 Z M 5 11 L 5 13 L 7 13 L 7 11 Z M 9 11 L 9 13 L 11 13 L 11 11 Z M 13 11 L 13 13 L 15 13 L 15 11 Z M 17 11 L 17 13 L 19 13 L 19 11 Z M 21 11 L 21 13 L 23 13 L 23 11 Z M 25 11 L 25 13 L 27 13 L 27 11 Z M 5 15 L 5 17 L 9 17 L 9 15 Z M 11 15 L 11 17 L 13 17 L 13 15 Z M 15 15 L 15 17 L 17 17 L 17 15 Z M 19 15 L 19 17 L 21 17 L 21 15 Z M 23 15 L 23 17 L 27 17 L 27 15 Z M 5 19 L 5 21 L 9 21 L 9 19 Z M 11 19 L 11 21 L 21 21 L 21 19 Z M 23 19 L 23 21 L 27 21 L 27 19 Z "></path>
                </g>
                </svg>`,
                name: "Typing",
                tags: ["input", "keyboard"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:pen`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z "></path>
                </g>
                </svg>`,
                name: "Pen & Windows Ink",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:autoplay`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 12 9.125 L 12 22.875 L 13.5 22 L 22.5 16.875 L 24 16 L 22.5 15.125 L 13.5 10 Z M 14 12.5625 L 19.96875 16 L 14 19.4375 Z "></path>
                </g>
                </svg>`,
                name: "Autoplay",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:usb`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 3 L 13 8 L 15 8 L 15 20.0625 C 14.21875 19.734375 13.410156 19.609375 12.65625 19.5 C 11.78125 19.375 10.984375 19.25 10.5625 19.03125 C 10.140625 18.8125 10 18.707031 10 18 L 10 15.71875 C 10.597656 15.371094 11 14.738281 11 14 C 11 12.894531 10.105469 12 9 12 C 7.894531 12 7 12.894531 7 14 C 7 14.738281 7.402344 15.371094 8 15.71875 L 8 18 C 8 19.292969 8.734375 20.3125 9.625 20.78125 C 10.515625 21.25 11.46875 21.375 12.34375 21.5 C 13.21875 21.625 14.015625 21.75 14.4375 21.96875 C 14.859375 22.1875 15 22.292969 15 23 C 15 23.03125 15 23.0625 15 23.09375 L 15 23.1875 C 13.839844 23.601563 13 24.699219 13 26 C 13 27.65625 14.34375 29 16 29 C 17.65625 29 19 27.65625 19 26 C 19 24.699219 18.160156 23.601563 17 23.1875 C 17.007813 23.125 17.007813 23.0625 17 23 L 17 21.15625 C 17.003906 21.105469 17.003906 21.050781 17 21 C 17 20.332031 17.191406 20.136719 17.75 19.8125 C 18.308594 19.488281 19.25 19.21875 20.25 18.96875 C 21.25 18.71875 22.308594 18.488281 23.25 17.9375 C 24.191406 17.386719 25 16.332031 25 15 L 25 13 L 26 13 L 26 9 L 22 9 L 22 13 L 23 13 L 23 15 C 23 15.667969 22.808594 15.863281 22.25 16.1875 C 21.691406 16.511719 20.75 16.78125 19.75 17.03125 C 18.835938 17.257813 17.875 17.484375 17 17.9375 L 17 8 L 19 8 Z "></path>
                </g>
                </svg>`,
                name: "USB",
                tags: ["devices"],
            },
        ] as SearchResultItem[];
    }

    private getNetworkSettings(): SearchResultItem[] {
        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:network`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 16.9375 28 17.84375 27.882813 18.71875 27.675781 L 17.4375 24.480469 C 16.953125 25.453125 16.4375 26 16 26 C 15.925781 26 15.847656 25.972656 15.769531 25.941406 C 15.742188 25.929688 15.714844 25.921875 15.683594 25.90625 C 15.65625 25.894531 15.632813 25.871094 15.609375 25.859375 C 15.488281 25.777344 15.355469 25.664063 15.203125 25.484375 C 15.109375 25.378906 15.019531 25.253906 14.925781 25.113281 C 14.847656 24.996094 14.769531 24.863281 14.691406 24.722656 C 14.667969 24.679688 14.644531 24.632813 14.621094 24.589844 C 14.46875 24.296875 14.320313 23.957031 14.179688 23.589844 C 14.125 23.449219 14.074219 23.296875 14.023438 23.140625 C 13.921875 22.839844 13.824219 22.519531 13.734375 22.175781 C 13.71875 22.117188 13.703125 22.0625 13.6875 22 L 16.445313 22 L 15.644531 20 L 13.289063 20 C 13.214844 19.503906 13.160156 18.984375 13.113281 18.453125 C 13.09375 18.199219 13.078125 17.941406 13.0625 17.683594 C 13.03125 17.128906 13 16.578125 13 16 C 13 15.464844 13.03125 14.953125 13.058594 14.4375 C 13.078125 14.097656 13.097656 13.761719 13.125 13.4375 C 13.15625 13.113281 13.195313 12.796875 13.234375 12.484375 C 13.257813 12.320313 13.28125 12.160156 13.304688 12 L 18.695313 12 C 18.835938 12.925781 18.945313 13.910156 18.980469 15 L 14 15 L 14.007813 15.015625 L 15.589844 15.488281 L 20.976563 17.105469 C 20.976563 17.070313 20.980469 17.035156 20.984375 17 L 25.949219 17 C 25.898438 17.519531 25.804688 18.023438 25.675781 18.515625 L 27.582031 19.089844 C 27.847656 18.101563 28 17.070313 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 16.726563 6 17.675781 7.492188 18.308594 10 L 13.691406 10 C 13.703125 9.960938 13.707031 9.914063 13.71875 9.875 C 13.777344 9.648438 13.847656 9.445313 13.910156 9.230469 C 13.992188 8.972656 14.066406 8.703125 14.152344 8.476563 C 14.324219 8.007813 14.515625 7.59375 14.707031 7.25 C 14.796875 7.09375 14.882813 6.953125 14.96875 6.828125 C 15.046875 6.714844 15.125 6.605469 15.203125 6.515625 C 15.371094 6.316406 15.519531 6.191406 15.644531 6.117188 C 15.664063 6.105469 15.683594 6.09375 15.703125 6.085938 C 15.746094 6.0625 15.785156 6.046875 15.820313 6.03125 C 15.882813 6.015625 15.941406 6 16 6 Z M 12.824219 6.527344 C 12.699219 6.765625 12.585938 7.015625 12.472656 7.273438 C 12.4375 7.359375 12.402344 7.449219 12.371094 7.539063 C 12.324219 7.652344 12.277344 7.761719 12.234375 7.882813 C 12.214844 7.929688 12.203125 7.984375 12.1875 8.03125 C 12.027344 8.480469 11.886719 8.957031 11.761719 9.453125 C 11.722656 9.601563 11.6875 9.75 11.65625 9.902344 C 11.648438 9.933594 11.636719 9.96875 11.628906 10 L 8.015625 10 C 9.222656 8.40625 10.890625 7.179688 12.824219 6.527344 Z M 19.179688 6.527344 C 21.113281 7.179688 22.78125 8.40625 23.984375 10 L 20.371094 10 C 20.074219 8.683594 19.679688 7.492188 19.179688 6.527344 Z M 6.84375 12 L 11.273438 12 C 11.230469 12.324219 11.199219 12.65625 11.164063 12.988281 C 11.113281 13.484375 11.078125 13.984375 11.050781 14.503906 C 11.042969 14.671875 11.023438 14.832031 11.015625 15 L 6.050781 15 C 6.15625 13.941406 6.433594 12.933594 6.84375 12 Z M 20.726563 12 L 25.15625 12 C 25.566406 12.933594 25.84375 13.941406 25.949219 15 L 20.984375 15 C 20.949219 13.980469 20.859375 12.972656 20.726563 12 Z M 6.050781 17 L 11.015625 17 C 11.027344 17.277344 11.050781 17.550781 11.066406 17.828125 C 11.078125 18.042969 11.085938 18.261719 11.105469 18.472656 C 11.144531 18.988281 11.199219 19.5 11.269531 20 L 6.84375 20 C 6.433594 19.066406 6.15625 18.058594 6.050781 17 Z M 17 18 L 21 28 L 22.878906 25.3125 L 26 28 L 28 25.753906 L 24.707031 23.019531 L 27 21 Z M 8.019531 22 L 11.625 22 C 11.640625 22.0625 11.65625 22.121094 11.671875 22.183594 C 11.703125 22.324219 11.738281 22.457031 11.773438 22.59375 C 11.898438 23.085938 12.042969 23.5625 12.199219 24.003906 C 12.210938 24.042969 12.21875 24.085938 12.234375 24.121094 C 12.285156 24.265625 12.34375 24.402344 12.402344 24.542969 C 12.429688 24.613281 12.460938 24.691406 12.488281 24.761719 C 12.585938 24.984375 12.683594 25.195313 12.785156 25.398438 C 12.796875 25.421875 12.808594 25.449219 12.820313 25.472656 C 10.886719 24.824219 9.222656 23.597656 8.019531 22 Z "></path>
                </g>
                </svg>`,
                name: "Network status",
                tags: ["internet"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:network-ethernet`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M 2 5 L 2 6 L 2 17 L 6 17 L 6 27 L 8 27 L 8 17 L 12 17 L 12 5 L 2 5 z M 14 5 L 14 7 L 28 7 L 28 21 L 10 21 L 10 23 L 17 23 L 17 25 L 12 25 L 12 27 L 24 27 L 24 25 L 19 25 L 19 23 L 30 23 L 30 5 L 14 5 z M 4 7 L 10 7 L 10 9 L 4 9 L 4 7 z M 4 11 L 6 11 L 6 13 L 8 13 L 8 11 L 10 11 L 10 15 L 4 15 L 4 11 z"></path>
                </svg>`,
                name: "Ethernet",
                tags: ["network", "internet", "wireless"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:network-wifi`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 7 C 10.984375 7 6.457031 9.082031 3.1875 12.40625 L 4.59375 13.8125 C 7.5 10.851563 11.535156 9 16 9 C 20.464844 9 24.5 10.851563 27.40625 13.8125 L 28.8125 12.40625 C 25.542969 9.082031 21.015625 7 16 7 Z M 16 12 C 12.359375 12 9.082031 13.519531 6.71875 15.9375 L 8.125 17.34375 C 10.125 15.289063 12.914063 14 16 14 C 19.085938 14 21.875 15.289063 23.875 17.34375 L 25.28125 15.9375 C 22.917969 13.519531 19.640625 12 16 12 Z M 16 17 C 13.738281 17 11.707031 17.957031 10.25 19.46875 L 11.65625 20.875 C 12.75 19.726563 14.289063 19 16 19 C 17.710938 19 19.25 19.726563 20.34375 20.875 L 21.75 19.46875 C 20.296875 17.957031 18.261719 17 16 17 Z M 16 22 C 15.117188 22 14.332031 22.390625 13.78125 23 L 16 25.21875 L 18.21875 23 C 17.667969 22.390625 16.882813 22 16 22 Z "></path>
                </g>
                </svg>`,
                name: "Wi-Fi",
                tags: ["network", "internet", "wireless"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:network-dialup`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 C 12.105469 4 8.808594 4.714844 6.59375 5.375 C 4.472656 6.003906 3 7.96875 3 10.1875 L 3 13 C 3 14.09375 3.90625 15 5 15 L 9 15 C 10.09375 15 11 14.09375 11 13 L 11 10.375 C 11.1875 10.289063 11.226563 10.253906 11.78125 10.09375 C 12.691406 9.828125 14.082031 9.5625 16 9.5625 C 17.917969 9.5625 19.308594 9.828125 20.21875 10.09375 C 20.773438 10.253906 20.8125 10.289063 21 10.375 L 21 13 C 21 14.09375 21.90625 15 23 15 L 27 15 C 28.09375 15 29 14.09375 29 13 L 29 10.1875 C 29 7.96875 27.527344 6.007813 25.40625 5.375 C 23.191406 4.71875 19.894531 4 16 4 Z M 16 6 C 19.648438 6 22.769531 6.664063 24.84375 7.28125 C 26.136719 7.664063 27 8.847656 27 10.1875 L 27 13 L 23 13 L 23 9.125 L 22.5 8.84375 C 22.5 8.84375 21.863281 8.472656 20.78125 8.15625 C 19.699219 7.839844 18.109375 7.5625 16 7.5625 C 13.890625 7.5625 12.300781 7.839844 11.21875 8.15625 C 10.136719 8.472656 9.5 8.84375 9.5 8.84375 L 9 9.125 L 9 13 L 5 13 L 5 10.1875 C 5 8.847656 5.863281 7.664063 7.15625 7.28125 C 9.230469 6.664063 12.351563 6 16 6 Z M 10 17 C 8.894531 17 8 17.894531 8 19 C 8 20.105469 8.894531 21 10 21 C 11.105469 21 12 20.105469 12 19 C 12 17.894531 11.105469 17 10 17 Z M 16 17 C 14.894531 17 14 17.894531 14 19 C 14 20.105469 14.894531 21 16 21 C 17.105469 21 18 20.105469 18 19 C 18 17.894531 17.105469 17 16 17 Z M 22 17 C 20.894531 17 20 17.894531 20 19 C 20 20.105469 20.894531 21 22 21 C 23.105469 21 24 20.105469 24 19 C 24 17.894531 23.105469 17 22 17 Z M 10 23 C 8.894531 23 8 23.894531 8 25 C 8 26.105469 8.894531 27 10 27 C 11.105469 27 12 26.105469 12 25 C 12 23.894531 11.105469 23 10 23 Z M 16 23 C 14.894531 23 14 23.894531 14 25 C 14 26.105469 14.894531 27 16 27 C 17.105469 27 18 26.105469 18 25 C 18 23.894531 17.105469 23 16 23 Z M 22 23 C 20.894531 23 20 23.894531 20 25 C 20 26.105469 20.894531 27 22 27 C 23.105469 27 24 26.105469 24 25 C 24 23.894531 23.105469 23 22 23 Z "></path>
                </g>
                </svg>`,
                name: "Dial-up",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:network-vpn`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 5 5 L 5 19 L 27 19 L 27 5 Z M 7 7 L 25 7 L 25 17 L 7 17 Z M 13 9 L 10 12 L 13 15 L 13 13 L 19 13 L 19 15 L 22 12 L 19 9 L 19 11 L 13 11 Z M 15 20 L 15 21 L 10 21 L 10 23 L 5 23 L 5 25 L 10 25 L 10 27 L 22 27 L 22 25 L 27 25 L 27 23 L 22 23 L 22 21 L 17 21 L 17 20 Z M 12 23 L 20 23 L 20 25 L 12 25 Z "></path>
                </g>
                </svg>`,
                name: "VPN",
                tags: ["vate", "virtual", "network", "vacy"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:network-airplanemode`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 9.882813 4 L 10.882813 13 L 9.015625 13 L 7.015625 10 L 2.78125 10 L 3.980469 16 L 2.78125 22 L 7.015625 22 L 9.015625 19 L 10.882813 19 L 9.882813 28 L 14.652344 28 L 18.652344 19 L 26 19 C 27.644531 19 29 17.644531 29 16 C 29 14.355469 27.644531 13 26 13 L 18.652344 13 L 14.652344 4 Z M 12.117188 6 L 13.347656 6 L 17.347656 15 L 26 15 C 26.566406 15 27 15.433594 27 16 C 27 16.566406 26.566406 17 26 17 L 17.347656 17 L 13.347656 26 L 12.117188 26 L 13.117188 17 L 7.945313 17 L 5.945313 20 L 5.21875 20 L 6.019531 16 L 5.21875 12 L 5.945313 12 L 7.945313 15 L 13.117188 15 Z "></path>
                </g>
                </svg>`,
                name: "Airplane mode",
                tags: ["offline"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:network-mobilehotspot`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 7.1875 4.1875 C 2.890625 8.371094 2.90625 15.3125 7.1875 19.59375 L 8.59375 18.1875 C 5.074219 14.667969 5.089844 9.039063 8.59375 5.625 Z M 24.8125 4.28125 L 23.40625 5.71875 C 26.929688 9.242188 26.929688 14.757813 23.40625 18.28125 L 24.8125 19.71875 C 29.085938 15.445313 29.085938 8.554688 24.8125 4.28125 Z M 9.90625 7.1875 C 7.320313 9.773438 7.320313 14.007813 9.90625 16.59375 L 11.3125 15.1875 C 9.5 13.375 9.5 10.40625 11.3125 8.59375 Z M 22.09375 7.28125 L 20.6875 8.71875 C 22.5 10.53125 22.5 13.46875 20.6875 15.28125 L 22.09375 16.71875 C 24.679688 14.132813 24.679688 9.867188 22.09375 7.28125 Z M 16 10 C 14.894531 10 14 10.894531 14 12 C 14 12.625 14.300781 13.164063 14.75 13.53125 L 10.3125 26 L 9 26 L 9 28 L 13 28 L 13 26 L 12.40625 26 L 16 15.96875 L 19.59375 26 L 19 26 L 19 28 L 23 28 L 23 26 L 21.6875 26 L 17.25 13.53125 C 17.699219 13.164063 18 12.625 18 12 C 18 10.894531 17.105469 10 16 10 Z "></path>
                </g>
                </svg>`,
                name: "Mobile hotspot",
                tags: ["network", "internet"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:datausage`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 27.21875 5.375 L 23.71875 9.75 L 20.4375 8.09375 L 19.65625 7.71875 L 19.15625 8.4375 L 15.75 13.5625 L 12.59375 11.1875 L 12 10.75 L 11.40625 11.1875 L 7.78125 13.90625 L 4.25 13.03125 L 3.75 14.96875 L 7.75 15.96875 L 8.21875 16.09375 L 8.59375 15.8125 L 12 13.25 L 15.40625 15.8125 L 16.25 16.4375 L 16.84375 15.5625 L 20.34375 10.3125 L 23.5625 11.90625 L 24.28125 12.25 L 28.78125 6.625 Z M 20.0625 18.3125 L 19.21875 19.375 L 15.8125 23.625 L 12.59375 21.1875 L 12 20.75 L 11.40625 21.1875 L 7.90625 23.8125 L 4.4375 22.09375 L 3.5625 23.90625 L 7.5625 25.90625 L 8.09375 26.15625 L 8.59375 25.8125 L 12 23.25 L 15.40625 25.8125 L 16.1875 26.375 L 16.78125 25.625 L 19.90625 21.71875 L 23.15625 26.5625 L 23.9375 27.6875 L 24.78125 26.625 L 28.78125 21.625 L 27.21875 20.375 L 24.09375 24.28125 L 20.84375 19.4375 Z "></path>
                </g>
                </svg>`,
                name: "Data Usage",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:network-proxy`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 16.179688 6 16.453125 6.109375 16.8125 6.53125 C 17.171875 6.953125 17.539063 7.644531 17.875 8.5625 C 18.03125 8.992188 18.183594 9.484375 18.3125 10 L 13.6875 10 C 13.816406 9.484375 13.96875 8.992188 14.125 8.5625 C 14.460938 7.644531 14.828125 6.953125 15.1875 6.53125 C 15.546875 6.109375 15.820313 6 16 6 Z M 12.8125 6.5 C 12.589844 6.917969 12.398438 7.378906 12.21875 7.875 C 11.984375 8.519531 11.796875 9.238281 11.625 10 L 8 10 C 9.203125 8.394531 10.871094 7.152344 12.8125 6.5 Z M 19.1875 6.5 C 21.128906 7.152344 22.796875 8.394531 24 10 L 20.375 10 C 20.203125 9.238281 20.015625 8.519531 19.78125 7.875 C 19.601563 7.378906 19.410156 6.917969 19.1875 6.5 Z M 6.8125 12 L 11.28125 12 C 11.152344 12.949219 11.0625 13.957031 11.03125 15 L 6.0625 15 C 6.164063 13.945313 6.410156 12.933594 6.8125 12 Z M 13.3125 12 L 18.6875 12 C 18.828125 12.9375 18.929688 13.945313 18.96875 15 L 13.03125 15 C 13.070313 13.945313 13.171875 12.9375 13.3125 12 Z M 20.71875 12 L 25.1875 12 C 25.589844 12.933594 25.835938 13.945313 25.9375 15 L 20.96875 15 C 20.9375 13.957031 20.847656 12.949219 20.71875 12 Z M 6.0625 17 L 11.03125 17 C 11.0625 18.042969 11.152344 19.050781 11.28125 20 L 6.8125 20 C 6.410156 19.066406 6.164063 18.054688 6.0625 17 Z M 13.03125 17 L 18.96875 17 C 18.929688 18.054688 18.828125 19.0625 18.6875 20 L 13.3125 20 C 13.171875 19.0625 13.070313 18.054688 13.03125 17 Z M 20.96875 17 L 25.9375 17 C 25.835938 18.054688 25.589844 19.066406 25.1875 20 L 20.71875 20 C 20.847656 19.050781 20.9375 18.042969 20.96875 17 Z M 8 22 L 11.625 22 C 11.796875 22.761719 11.984375 23.480469 12.21875 24.125 C 12.398438 24.621094 12.589844 25.082031 12.8125 25.5 C 10.871094 24.847656 9.203125 23.605469 8 22 Z M 13.6875 22 L 18.3125 22 C 18.183594 22.515625 18.03125 23.007813 17.875 23.4375 C 17.539063 24.355469 17.171875 25.046875 16.8125 25.46875 C 16.453125 25.890625 16.179688 26 16 26 C 15.820313 26 15.546875 25.890625 15.1875 25.46875 C 14.828125 25.046875 14.460938 24.355469 14.125 23.4375 C 13.96875 23.007813 13.816406 22.515625 13.6875 22 Z M 20.375 22 L 24 22 C 22.796875 23.605469 21.128906 24.847656 19.1875 25.5 C 19.410156 25.082031 19.601563 24.621094 19.78125 24.125 C 20.015625 23.480469 20.203125 22.761719 20.375 22 Z "></path>
                </g>
                </svg>`,
                name: "Proxy",
                tags: ["network"],
            },
        ] as SearchResultItem[];
    }

    private getPersonalizationSettings(): SearchResultItem[] {
        const moduleTitle = "Personalization";

        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:personalization-background`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 2 5 L 2 27 L 30 27 L 30 5 Z M 4 7 L 28 7 L 28 20.90625 L 22.71875 15.59375 L 22 14.875 L 17.46875 19.40625 L 11.71875 13.59375 L 11 12.875 L 4 19.875 Z M 24 9 C 22.894531 9 22 9.894531 22 11 C 22 12.105469 22.894531 13 24 13 C 25.105469 13 26 12.105469 26 11 C 26 9.894531 25.105469 9 24 9 Z M 11 15.71875 L 20.1875 25 L 4 25 L 4 22.71875 Z M 22 17.71875 L 28 23.71875 L 28 25 L 23.03125 25 L 18.875 20.8125 Z "></path>
                </g>
                </svg>`,
                name: `${moduleTitle}: Background`,
                tags: ["custom", "customization", "colors", "images", "pictures", "wallpapers"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:colors`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 15.59375 2.96875 C 15.0625 2.984375 14.515625 3.042969 13.96875 3.125 L 13.9375 3.125 C 8.613281 3.996094 4.300781 8.191406 3.21875 13.5 C 2.894531 15.011719 2.914063 16.421875 3.125 17.8125 C 3.132813 17.816406 3.125 17.835938 3.125 17.84375 C 3.453125 20.191406 6.5 21.21875 8.21875 19.5 C 9.449219 18.269531 11.269531 18.269531 12.5 19.5 C 13.730469 20.730469 13.730469 22.550781 12.5 23.78125 C 10.78125 25.5 11.808594 28.546875 14.15625 28.875 C 14.164063 28.875 14.183594 28.867188 14.1875 28.875 C 15.566406 29.085938 16.96875 29.097656 18.46875 28.78125 C 18.480469 28.78125 18.488281 28.78125 18.5 28.78125 C 23.824219 27.789063 28.007813 23.375 28.875 18.0625 L 28.875 18.03125 C 30.007813 10.390625 24.421875 3.71875 17.15625 3.03125 C 16.636719 2.980469 16.125 2.953125 15.59375 2.96875 Z M 15.625 4.96875 C 16.078125 4.953125 16.527344 4.960938 16.96875 5 C 23.164063 5.566406 27.875 11.214844 26.90625 17.75 C 26.175781 22.226563 22.585938 25.992188 18.125 26.8125 L 18.09375 26.8125 C 16.816406 27.085938 15.636719 27.089844 14.4375 26.90625 C 13.617188 26.804688 13.238281 25.886719 13.90625 25.21875 C 15.875 23.25 15.875 20.0625 13.90625 18.09375 C 11.9375 16.125 8.75 16.125 6.78125 18.09375 C 6.113281 18.761719 5.195313 18.382813 5.09375 17.5625 C 4.910156 16.363281 4.914063 15.183594 5.1875 13.90625 C 6.105469 9.417969 9.773438 5.824219 14.25 5.09375 C 14.71875 5.023438 15.171875 4.984375 15.625 4.96875 Z M 14 7 C 12.894531 7 12 7.894531 12 9 C 12 10.105469 12.894531 11 14 11 C 15.105469 11 16 10.105469 16 9 C 16 7.894531 15.105469 7 14 7 Z M 21 9 C 19.894531 9 19 9.894531 19 11 C 19 12.105469 19.894531 13 21 13 C 22.105469 13 23 12.105469 23 11 C 23 9.894531 22.105469 9 21 9 Z M 9 11 C 7.894531 11 7 11.894531 7 13 C 7 14.105469 7.894531 15 9 15 C 10.105469 15 11 14.105469 11 13 C 11 11.894531 10.105469 11 9 11 Z M 23 16 C 21.894531 16 21 16.894531 21 18 C 21 19.105469 21.894531 20 23 20 C 24.105469 20 25 19.105469 25 18 C 25 16.894531 24.105469 16 23 16 Z M 19 21 C 17.894531 21 17 21.894531 17 23 C 17 24.105469 17.894531 25 19 25 C 20.105469 25 21 24.105469 21 23 C 21 21.894531 20.105469 21 19 21 Z "></path>
                </g>
                </svg>`,
                name: `${moduleTitle}: Colors`,
                tags: ["color", "custom", "customization", "creative"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:lockscreen`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 4 6 C 3.476563 6 2.941406 6.183594 2.5625 6.5625 C 2.183594 6.941406 2 7.476563 2 8 L 2 24 C 2 24.523438 2.183594 25.058594 2.5625 25.4375 C 2.941406 25.816406 3.476563 26 4 26 L 28 26 C 28.523438 26 29.058594 25.816406 29.4375 25.4375 C 29.816406 25.058594 30 24.523438 30 24 L 30 8 C 30 7.476563 29.816406 6.941406 29.4375 6.5625 C 29.058594 6.183594 28.523438 6 28 6 Z M 4 8 L 28 8 L 28 24 L 4 24 Z M 16 10 C 14.355469 10 13 11.355469 13 13 L 13 14 L 11 14 L 11 22 L 21 22 L 21 14 L 19 14 L 19 13 C 19 11.355469 17.644531 10 16 10 Z M 16 12 C 16.554688 12 17 12.445313 17 13 L 17 14 L 15 14 L 15 13 C 15 12.445313 15.445313 12 16 12 Z M 13 16 L 19 16 L 19 20 L 13 20 Z "></path>
                </g>
                </svg>`,
                name: `${moduleTitle}: Lock screen`,
                tags: ["screen", "saver"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:themes`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 24.8125 4.03125 C 23.976563 4.03125 23.132813 4.367188 22.5 5 L 9.8125 17.5 L 9.1875 18.09375 C 8.4375 18.234375 7.722656 18.601563 7.15625 19.21875 C 6.324219 20.128906 6.160156 21.242188 5.84375 22.4375 C 5.527344 23.632813 5.125 24.964844 4.15625 26.4375 L 3.15625 28 L 5 28 C 8.914063 28 11.496094 26.128906 12.8125 24.8125 L 12.84375 24.78125 C 13.445313 24.164063 13.78125 23.386719 13.90625 22.59375 L 14.40625 22.125 L 27.09375 9.625 L 27.09375 9.59375 C 28.359375 8.328125 28.359375 6.265625 27.09375 5 C 26.460938 4.367188 25.648438 4.03125 24.8125 4.03125 Z M 24.8125 6 C 25.125 6 25.421875 6.140625 25.6875 6.40625 C 26.222656 6.941406 26.222656 7.652344 25.6875 8.1875 L 16.65625 17.125 L 14.84375 15.3125 L 23.90625 6.40625 C 24.171875 6.140625 24.5 6 24.8125 6 Z M 13.40625 16.71875 L 15.21875 18.53125 L 13.71875 20 L 11.90625 18.1875 Z M 9.96875 20.03125 C 10.472656 20.046875 11.019531 20.242188 11.4375 20.625 C 12.214844 21.335938 12.234375 22.578125 11.40625 23.40625 C 10.539063 24.273438 9 25.390625 6.75 25.8125 C 7.230469 24.761719 7.566406 23.78125 7.78125 22.96875 C 8.113281 21.714844 8.359375 20.855469 8.625 20.5625 C 8.972656 20.183594 9.464844 20.015625 9.96875 20.03125 Z "></path>
                </g>
                </svg>`,
                name: `${moduleTitle}: Themes`,
                tags: ["custom", "customization", "color", "colors", "image", "picture"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:personalization-start`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 4 4 L 4 28.03125 L 28.03125 28.03125 L 28.03125 22 L 23 22 L 23 4 Z M 6 6 L 15 6 L 15 22 L 6 22 Z M 17 6 L 21 6 L 21 22 L 17 22 Z M 8 8 L 8 10 L 13 10 L 13 8 Z M 8 12 L 8 14 L 13 14 L 13 12 Z M 17.875 19 L 17.875 21 L 20 21 L 20 19 Z M 6 24 L 26.03125 24 L 26.03125 26.03125 L 6 26.03125 Z "></path>
                </g>
                </svg>`,
                name: `${moduleTitle}: Start`,
                tags: ["custom", "customization", "search"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:taskbar`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 1 10 L 1 22 L 31 22 L 31 10 Z M 3 12 L 29 12 L 29 20 L 3 20 Z M 5 14 L 5 18 L 9 18 L 9 14 Z M 11 14 L 11 18 L 15 18 L 15 14 Z M 19 14 C 17.894531 14 17 14.894531 17 16 C 17 17.105469 17.894531 18 19 18 C 20.105469 18 21 17.105469 21 16 C 21 14.894531 20.105469 14 19 14 Z M 23 14 L 23 18 L 27 18 L 27 14 Z "></path>
                </g>
                </svg>`,
                name: `${moduleTitle}: Taskbar`,
            },
        ] as SearchResultItem[];
    }

    private getAppSettings(): SearchResultItem[] {
        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:appsfeatures`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 4 5 L 4 11 L 10 11 L 10 5 Z M 6 7 L 8 7 L 8 9 L 6 9 Z M 12 7 L 12 9 L 27 9 L 27 7 Z M 4 13 L 4 19 L 10 19 L 10 13 Z M 6 15 L 8 15 L 8 17 L 6 17 Z M 12 15 L 12 17 L 27 17 L 27 15 Z M 4 21 L 4 27 L 10 27 L 10 21 Z M 6 23 L 8 23 L 8 25 L 6 25 Z M 12 23 L 12 25 L 27 25 L 27 23 Z "></path>
                </g>
                </svg>`,
                name: "Apps & features",
                tags: ["programs"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:defaultapps`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 4 5 L 4 11 L 10 11 L 10 5 Z M 6 7 L 8 7 L 8 9 L 6 9 Z M 12 7 L 12 9 L 27 9 L 27 7 Z M 4 13 L 4 19 L 10 19 L 10 13 Z M 6 15 L 8 15 L 8 17 L 6 17 Z M 12 15 L 12 17 L 27 17 L 27 15 Z M 4 21 L 4 27 L 10 27 L 10 21 Z M 6 23 L 8 23 L 8 25 L 6 25 Z M 12 23 L 12 25 L 27 25 L 27 23 Z "></path>
                </g>
                </svg>`,
                name: "Default apps",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:optionalfeatures`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 7.28125 5 L 5.28125 11 L 3 11.003906 L 3 27 L 29 27 L 29 11 L 26.71875 11 L 24.71875 5 Z M 8.71875 7 L 15.28125 7 L 17.28125 13 L 27 13 L 27 25 L 5 25 L 5 13 L 6.71875 13 Z M 17.386719 7 L 23.28125 7 L 24.609375 11 L 18.71875 11 Z M 10 9 L 10 11 L 14 11 L 14 9 Z "></path>
                </g>
                </svg>`,
                name: "Optional features",
                tags: ["additional"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:maps`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 28 4.46875 L 26.59375 5.09375 L 19.96875 7.9375 L 12.34375 5.0625 L 11.96875 4.9375 L 11.59375 5.09375 L 4.59375 8.09375 L 4 8.34375 L 4 27.53125 L 5.40625 26.90625 L 12.03125 24.0625 L 19.65625 26.9375 L 20.03125 27.0625 L 20.40625 26.90625 L 27.40625 23.90625 L 28 23.65625 Z M 13 7.4375 L 19 9.6875 L 19 24.5625 L 13 22.3125 Z M 11 7.5 L 11 22.34375 L 6 24.5 L 6 9.65625 Z M 26 7.5 L 26 22.34375 L 21 24.5 L 21 9.65625 Z "></path>
                </g>
                </svg>`,
                name: "Offline maps",
                tags: ["earth"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:appsforwebsites`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 C 11.167969 4 6.996094 6.875 5.09375 11 L 7.34375 11 C 8.421875 9.144531 10.078125 7.667969 12.0625 6.8125 C 11.398438 7.941406 10.855469 9.363281 10.5 11 L 12.59375 11 C 13.351563 7.960938 14.722656 6 16 6 C 17.277344 6 18.648438 7.960938 19.40625 11 L 21.5 11 C 21.144531 9.363281 20.601563 7.941406 19.9375 6.8125 C 21.921875 7.667969 23.578125 9.144531 24.65625 11 L 26.90625 11 C 25.003906 6.875 20.832031 4 16 4 Z M 4 13 L 5.5 19 L 6.96875 19 C 6.96875 19 8.007813 15.367188 8.03125 15.09375 L 8.0625 15.09375 C 8.074219 15.339844 9.09375 19 9.09375 19 L 10.5 19 L 12 13 L 10.71875 13 C 10.71875 13 9.855469 16.589844 9.84375 16.8125 L 9.8125 16.8125 C 9.785156 16.53125 8.8125 13 8.8125 13 L 7.4375 13 C 7.4375 13 6.292969 16.628906 6.28125 16.84375 C 6.265625 16.558594 5.40625 13 5.40625 13 Z M 12 13 L 13.5 19 L 14.96875 19 C 14.96875 19 16.007813 15.367188 16.03125 15.09375 L 16.0625 15.09375 C 16.074219 15.339844 17.09375 19 17.09375 19 L 18.5 19 L 20 13 L 18.71875 13 C 18.71875 13 17.855469 16.589844 17.84375 16.8125 L 17.8125 16.8125 C 17.785156 16.53125 16.8125 13 16.8125 13 L 15.4375 13 C 15.4375 13 14.292969 16.628906 14.28125 16.84375 C 14.265625 16.558594 13.40625 13 13.40625 13 Z M 20 13 L 21.5 19 L 22.96875 19 C 22.96875 19 24.007813 15.367188 24.03125 15.09375 L 24.0625 15.09375 C 24.074219 15.339844 25.09375 19 25.09375 19 L 26.5 19 L 28 13 L 26.71875 13 C 26.71875 13 25.855469 16.589844 25.84375 16.8125 L 25.8125 16.8125 C 25.785156 16.53125 24.8125 13 24.8125 13 L 23.4375 13 C 23.4375 13 22.292969 16.628906 22.28125 16.84375 C 22.265625 16.558594 21.40625 13 21.40625 13 Z M 5.09375 21 C 6.996094 25.125 11.167969 28 16 28 C 20.832031 28 25.003906 25.125 26.90625 21 L 24.65625 21 C 23.578125 22.855469 21.921875 24.332031 19.9375 25.1875 C 20.601563 24.058594 21.144531 22.636719 21.5 21 L 19.40625 21 C 18.648438 24.039063 17.277344 26 16 26 C 14.722656 26 13.351563 24.039063 12.59375 21 L 10.5 21 C 10.855469 22.636719 11.398438 24.058594 12.0625 25.1875 C 10.078125 24.332031 8.421875 22.855469 7.34375 21 Z "></path>
                </g>
                </svg>`,
                name: "Apps for websites",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:videoplayback`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 4 7 L 4 23 L 28 23 L 28 7 Z M 6 9 L 26 9 L 26 21 L 6 21 Z M 13 10.21875 L 13 19.78125 L 14.5 18.84375 L 19.5 15.84375 L 20.9375 15 L 19.5 14.15625 L 14.5 11.15625 Z M 15 13.75 L 17.09375 15 L 15 16.25 Z M 10 24 L 10 26 L 22 26 L 22 24 Z "></path>
                </g>
                </svg>`,
                name: "Video playback",
            },
        ] as SearchResultItem[];
    }

    private getAccountSettings(): SearchResultItem[] {
        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:yourinfo`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 5 C 12.144531 5 9 8.144531 9 12 C 9 14.410156 10.230469 16.550781 12.09375 17.8125 C 8.527344 19.34375 6 22.882813 6 27 L 8 27 C 8 22.570313 11.570313 19 16 19 C 20.429688 19 24 22.570313 24 27 L 26 27 C 26 22.882813 23.472656 19.34375 19.90625 17.8125 C 21.769531 16.550781 23 14.410156 23 12 C 23 8.144531 19.855469 5 16 5 Z M 16 7 C 18.773438 7 21 9.226563 21 12 C 21 14.773438 18.773438 17 16 17 C 13.226563 17 11 14.773438 11 12 C 11 9.226563 13.226563 7 16 7 Z "></path>
                </g>
                </svg>`,
                name: "Your info",
                tags: ["account", "user", "about"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:emailandaccounts`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 3 8 L 3 26 L 29 26 L 29 8 Z M 7.3125 10 L 24.6875 10 L 16 15.78125 Z M 5 10.875 L 15.4375 17.84375 L 16 18.1875 L 16.5625 17.84375 L 27 10.875 L 27 24 L 5 24 Z "></path>
                </g>
                </svg>`,
                name: "Email & app accounts",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:signinoptions`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 20 3 C 15.054688 3 11 7.054688 11 12 C 11 12.519531 11.085938 12.976563 11.15625 13.4375 L 3.28125 21.28125 L 3 21.59375 L 3 29 L 10 29 L 10 26 L 13 26 L 13 23 L 16 23 L 16 20.03125 C 17.179688 20.609375 18.554688 21 20 21 C 24.945313 21 29 16.945313 29 12 C 29 7.054688 24.945313 3 20 3 Z M 20 5 C 23.855469 5 27 8.144531 27 12 C 27 15.855469 23.855469 19 20 19 C 18.789063 19 17.542969 18.644531 16.59375 18.125 L 16.34375 18 L 14 18 L 14 21 L 11 21 L 11 24 L 8 24 L 8 27 L 5 27 L 5 22.4375 L 12.90625 14.5 L 13.28125 14.15625 L 13.1875 13.625 C 13.085938 13.023438 13 12.488281 13 12 C 13 8.144531 16.144531 5 20 5 Z M 22 8 C 20.894531 8 20 8.894531 20 10 C 20 11.105469 20.894531 12 22 12 C 23.105469 12 24 11.105469 24 10 C 24 8.894531 23.105469 8 22 8 Z "></path>
                </g>
                </svg>`,
                name: "Sign-in options",
                tags: ["password", "change", "security", "secret", "account", "pin"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:workplace`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 3 C 14.136719 3 12.601563 4.277344 12.15625 6 L 3 6 L 3 26 L 29 26 L 29 6 L 19.84375 6 C 19.398438 4.277344 17.863281 3 16 3 Z M 16 5 C 16.808594 5 17.429688 5.386719 17.75 6 L 14.25 6 C 14.570313 5.386719 15.191406 5 16 5 Z M 5 8 L 27 8 L 27 17 L 5 17 Z M 16 14 C 15.449219 14 15 14.449219 15 15 C 15 15.550781 15.449219 16 16 16 C 16.550781 16 17 15.550781 17 15 C 17 14.449219 16.550781 14 16 14 Z M 5 19 L 27 19 L 27 24 L 5 24 Z "></path>
                </g>
                </svg>`,
                name: "Access work or school",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:otherusers`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 9 6 C 6.25 6 4 8.25 4 11 C 4 12.515625 4.707031 13.863281 5.78125 14.78125 C 3.542969 15.953125 2 18.316406 2 21 L 4 21 C 4 18.246094 6.246094 16 9 16 C 10.382813 16 11.5 16.476563 12.375 17.34375 C 12.140625 17.851563 12 18.410156 12 19 C 12 20.113281 12.476563 21.117188 13.21875 21.84375 C 11.886719 22.746094 11 24.285156 11 26 L 13 26 C 13 24.34375 14.34375 23 16 23 C 17.65625 23 19 24.34375 19 26 L 21 26 C 21 24.285156 20.113281 22.746094 18.78125 21.84375 C 19.523438 21.117188 20 20.113281 20 19 C 20 18.410156 19.859375 17.851563 19.625 17.34375 C 20.5 16.476563 21.617188 16 23 16 C 25.753906 16 28 18.246094 28 21 L 30 21 C 30 18.316406 28.457031 15.953125 26.21875 14.78125 C 27.292969 13.863281 28 12.515625 28 11 C 28 8.25 25.75 6 23 6 C 20.25 6 18 8.25 18 11 C 18 12.515625 18.707031 13.863281 19.78125 14.78125 C 19.265625 15.050781 18.804688 15.417969 18.375 15.8125 C 17.707031 15.308594 16.894531 15 16 15 C 15.105469 15 14.292969 15.308594 13.625 15.8125 C 13.195313 15.417969 12.734375 15.050781 12.21875 14.78125 C 13.292969 13.863281 14 12.515625 14 11 C 14 8.25 11.75 6 9 6 Z M 9 8 C 10.667969 8 12 9.332031 12 11 C 12 12.667969 10.667969 14 9 14 C 7.332031 14 6 12.667969 6 11 C 6 9.332031 7.332031 8 9 8 Z M 23 8 C 24.667969 8 26 9.332031 26 11 C 26 12.667969 24.667969 14 23 14 C 21.332031 14 20 12.667969 20 11 C 20 9.332031 21.332031 8 23 8 Z M 16 17 C 17.117188 17 18 17.882813 18 19 C 18 20.117188 17.117188 21 16 21 C 14.882813 21 14 20.117188 14 19 C 14 17.882813 14.882813 17 16 17 Z "></path>
                </g>
                </svg>`,
                name: "Family & other users",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:sync`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 C 10.886719 4 6.617188 7.160156 4.875 11.625 L 6.71875 12.375 C 8.175781 8.640625 11.710938 6 16 6 C 19.242188 6 22.132813 7.589844 23.9375 10 L 20 10 L 20 12 L 27 12 L 27 5 L 25 5 L 25 8.09375 C 22.808594 5.582031 19.570313 4 16 4 Z M 25.28125 19.625 C 23.824219 23.359375 20.289063 26 16 26 C 12.722656 26 9.84375 24.386719 8.03125 22 L 12 22 L 12 20 L 5 20 L 5 27 L 7 27 L 7 23.90625 C 9.1875 26.386719 12.394531 28 16 28 C 21.113281 28 25.382813 24.839844 27.125 20.375 Z "></path>
                </g>
                </svg>`,
                name: "Sync your settings",
            },
        ] as SearchResultItem[];
    }

    private getTimeAndLanguageSettings(): SearchResultItem[] {
        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:dateandtime`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 10 3 C 5.59375 3 2 6.59375 2 11 C 2 13.949219 3.613281 16.519531 6 17.90625 L 6 27 L 28 27 L 28 7 L 23 7 L 23 6 L 21 6 L 21 7 L 16.90625 7 C 15.519531 4.613281 12.949219 3 10 3 Z M 10 5 C 13.324219 5 16 7.675781 16 11 C 16 14.324219 13.324219 17 10 17 C 6.675781 17 4 14.324219 4 11 C 4 7.675781 6.675781 5 10 5 Z M 9 7 L 9 11.5625 L 7.28125 13.28125 L 8.71875 14.71875 L 10.71875 12.71875 L 11 12.40625 L 11 7 Z M 17.71875 9 L 21 9 L 21 10 L 23 10 L 23 9 L 26 9 L 26 11 L 18 11 C 18 10.304688 17.886719 9.644531 17.71875 9 Z M 17.71875 13 L 26 13 L 26 25 L 8 25 L 8 18.71875 C 8.644531 18.886719 9.304688 19 10 19 C 13.710938 19 16.820313 16.4375 17.71875 13 Z M 18 17 L 18 19 L 20 19 L 20 17 Z M 22 17 L 22 19 L 24 19 L 24 17 Z M 10 21 L 10 23 L 12 23 L 12 21 Z M 14 21 L 14 23 L 16 23 L 16 21 Z M 18 21 L 18 23 L 20 23 L 20 21 Z M 22 21 L 22 23 L 24 23 L 24 21 Z "></path>
                </g>
                </svg>`,
                name: "Date & Time",
                tags: ["clock"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:regionlanguage`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 3 5 L 3 23 L 8 23 L 8 28.09375 L 9.625 26.78125 L 14.34375 23 L 29 23 L 29 5 Z M 5 7 L 27 7 L 27 21 L 13.65625 21 L 13.375 21.21875 L 10 23.90625 L 10 21 L 5 21 Z M 9.21875 9 L 9 9.6875 L 7.0625 15.6875 L 7 15.84375 L 7 17 L 9 17 L 9 16.125 L 9.03125 16 L 10.96875 16 L 11 16.125 L 11 17 L 13 17 L 13 15.84375 L 12.9375 15.6875 L 11 9.6875 L 10.78125 9 Z M 20 11 L 20 12 L 17 12 L 17 14 L 21.4375 14 C 21.269531 14.289063 21.082031 14.59375 20.84375 14.90625 C 20.769531 15.003906 20.675781 15.09375 20.59375 15.1875 C 20.105469 14.738281 19.75 14.34375 19.75 14.34375 L 18.25 15.65625 C 18.25 15.65625 18.574219 16.003906 19.0625 16.46875 C 18.476563 16.785156 17.804688 17 17 17 L 17 19 C 18.476563 19 19.710938 18.503906 20.6875 17.8125 C 21.609375 18.449219 22.71875 19 24 19 L 24 17 C 23.472656 17 22.820313 16.742188 22.1875 16.375 C 22.265625 16.277344 22.363281 16.1875 22.4375 16.09375 C 23.082031 15.25 23.429688 14.53125 23.65625 14 L 25 14 L 25 12 L 22 12 L 22 11 Z M 10 13.0625 L 10.3125 14 L 9.6875 14 Z "></path>
                </g>
                </svg>`,
                name: "Region & language",
                tags: ["locale"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:speech`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 13 4 C 11.90625 4 11 4.90625 11 6 L 11 18 C 11 19.09375 11.90625 20 13 20 L 19 20 C 20.09375 20 21 19.09375 21 18 L 21 6 C 21 4.90625 20.09375 4 19 4 Z M 13 6 L 19 6 L 19 18 L 13 18 Z M 7 14 L 7 18 C 7 21.300781 9.699219 24 13 24 L 15 24 L 15 26 L 11 26 L 11 28 L 21 28 L 21 26 L 17 26 L 17 24 L 19 24 C 22.300781 24 25 21.300781 25 18 L 25 14 L 23 14 L 23 18 C 23 20.21875 21.21875 22 19 22 L 13 22 C 10.78125 22 9 20.21875 9 18 L 9 14 Z "></path>
                </g>
                </svg>`,
                name: "Speech",
            },
        ] as SearchResultItem[];
    }

    private getGamingSettings(): SearchResultItem[] {
        const gamingIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                        <g id="surface1">
                            <path d="M 16 7 C 9.617188 7 4.03125 9.0625 4.03125 9.0625 L 3.4375 9.28125 L 3.375 9.875 L 2.03125 20.125 C 1.667969 22.960938 3.695313 25.605469 6.53125 25.96875 C 9.171875 26.308594 11.539063 24.527344 12.15625 22 L 19.84375 22 C 20.464844 24.527344 22.828125 26.308594 25.46875 25.96875 C 28.304688 25.605469 30.332031 22.960938 29.96875 20.125 L 28.625 9.875 L 28.5625 9.28125 L 27.96875 9.0625 C 27.96875 9.0625 22.382813 7 16 7 Z M 16 9 C 21.484375 9 26.007813 10.523438 26.75 10.78125 L 27.96875 20.40625 C 28.195313 22.167969 26.980469 23.742188 25.21875 23.96875 C 23.457031 24.195313 21.851563 22.980469 21.625 21.21875 L 21.59375 20.875 L 21.46875 20 L 10.53125 20 L 10.40625 20.875 L 10.375 21.21875 C 10.148438 22.980469 8.542969 24.195313 6.78125 23.96875 C 5.019531 23.742188 3.804688 22.167969 4.03125 20.40625 L 5.25 10.78125 C 5.992188 10.523438 10.515625 9 16 9 Z M 9 12 L 9 14 L 7 14 L 7 16 L 9 16 L 9 18 L 11 18 L 11 16 L 13 16 L 13 14 L 11 14 L 11 12 Z M 22 12 C 21.449219 12 21 12.449219 21 13 C 21 13.550781 21.449219 14 22 14 C 22.550781 14 23 13.550781 23 13 C 23 12.449219 22.550781 12 22 12 Z M 20 14 C 19.449219 14 19 14.449219 19 15 C 19 15.550781 19.449219 16 20 16 C 20.550781 16 21 15.550781 21 15 C 21 14.449219 20.550781 14 20 14 Z M 24 14 C 23.449219 14 23 14.449219 23 15 C 23 15.550781 23.449219 16 24 16 C 24.550781 16 25 15.550781 25 15 C 25 14.449219 24.550781 14 24 14 Z M 22 16 C 21.449219 16 21 16.449219 21 17 C 21 17.550781 21.449219 18 22 18 C 22.550781 18 23 17.550781 23 17 C 23 16.449219 22.550781 16 22 16 Z "></path>
                        </g>
                    </svg>`;

        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:gaming-broadcasting`,
                icon: gamingIcon,
                name: "Broadcasting",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:gaming-gamebar`,
                icon: gamingIcon,
                name: "Game bar",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:gaming-gamedvr`,
                icon: gamingIcon,
                name: "Game DVR",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:gaming-gamemode`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 5 C 9.382813 5 4 10.382813 4 17 C 4 20.445313 5.457031 23.535156 7.78125 25.71875 L 8.09375 26 L 23.90625 26 L 24.21875 25.71875 C 26.542969 23.535156 28 20.445313 28 17 C 28 10.382813 22.617188 5 16 5 Z M 16 7 C 21.535156 7 26 11.464844 26 17 C 26 19.753906 24.832031 22.191406 23.03125 24 L 8.96875 24 C 7.167969 22.191406 6 19.753906 6 17 C 6 11.464844 10.464844 7 16 7 Z M 16 8 C 15.449219 8 15 8.449219 15 9 C 15 9.550781 15.449219 10 16 10 C 16.550781 10 17 9.550781 17 9 C 17 8.449219 16.550781 8 16 8 Z M 12 9.0625 C 11.449219 9.0625 11 9.511719 11 10.0625 C 11 10.613281 11.449219 11.0625 12 11.0625 C 12.550781 11.0625 13 10.613281 13 10.0625 C 13 9.511719 12.550781 9.0625 12 9.0625 Z M 20 9.0625 C 19.449219 9.0625 19 9.511719 19 10.0625 C 19 10.613281 19.449219 11.0625 20 11.0625 C 20.550781 11.0625 21 10.613281 21 10.0625 C 21 9.511719 20.550781 9.0625 20 9.0625 Z M 9.0625 12 C 8.511719 12 8.0625 12.449219 8.0625 13 C 8.0625 13.550781 8.511719 14 9.0625 14 C 9.613281 14 10.0625 13.550781 10.0625 13 C 10.0625 12.449219 9.613281 12 9.0625 12 Z M 22.9375 12 C 22.742188 12 22.5625 12.058594 22.40625 12.15625 L 17 15.28125 C 16.707031 15.109375 16.363281 15 16 15 C 14.894531 15 14 15.894531 14 17 C 14 18.105469 14.894531 19 16 19 C 17.105469 19 18 18.105469 18 17 L 23.3125 13.90625 C 23.671875 13.753906 23.9375 13.414063 23.9375 13 C 23.9375 12.449219 23.488281 12 22.9375 12 Z M 8 16 C 7.449219 16 7 16.449219 7 17 C 7 17.550781 7.449219 18 8 18 C 8.550781 18 9 17.550781 9 17 C 9 16.449219 8.550781 16 8 16 Z M 24 16 C 23.449219 16 23 16.449219 23 17 C 23 17.550781 23.449219 18 24 18 C 24.550781 18 25 17.550781 25 17 C 25 16.449219 24.550781 16 24 16 Z M 9.0625 20 C 8.511719 20 8.0625 20.449219 8.0625 21 C 8.0625 21.550781 8.511719 22 9.0625 22 C 9.613281 22 10.0625 21.550781 10.0625 21 C 10.0625 20.449219 9.613281 20 9.0625 20 Z M 22.9375 20 C 22.386719 20 21.9375 20.449219 21.9375 21 C 21.9375 21.550781 22.386719 22 22.9375 22 C 23.488281 22 23.9375 21.550781 23.9375 21 C 23.9375 20.449219 23.488281 20 22.9375 20 Z "></path>
                </g>
                </svg>`,
                name: "Game Mode",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:gaming-trueplay`,
                icon: gamingIcon,
                name: "TruePlay",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:gaming-xboxnetworking`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 16.09375 6 16.1875 6.027344 16.28125 6.03125 C 16.535156 6.039063 16.78125 6.039063 17.03125 6.0625 C 17.0625 6.066406 17.09375 6.058594 17.125 6.0625 C 17.21875 6.074219 17.3125 6.082031 17.40625 6.09375 C 17.46875 6.101563 17.53125 6.113281 17.59375 6.125 C 17.980469 6.1875 18.347656 6.269531 18.71875 6.375 C 19.109375 6.484375 19.507813 6.625 19.875 6.78125 C 19.882813 6.785156 19.898438 6.777344 19.90625 6.78125 C 20.070313 6.851563 20.21875 6.953125 20.375 7.03125 C 20.582031 7.132813 20.800781 7.226563 21 7.34375 C 21.054688 7.375 21.105469 7.40625 21.15625 7.4375 C 21.222656 7.460938 21.304688 7.511719 21.40625 7.59375 C 21.410156 7.597656 21.402344 7.621094 21.40625 7.625 C 19.757813 6.675781 16.03125 9.6875 16.03125 9.6875 C 14.554688 8.558594 13.214844 7.792969 12.21875 7.53125 C 11.570313 7.367188 11.078125 7.402344 10.75 7.53125 C 10.910156 7.429688 11.050781 7.308594 11.21875 7.21875 C 11.230469 7.210938 11.238281 7.195313 11.25 7.1875 C 11.503906 7.042969 11.765625 6.929688 12.03125 6.8125 C 12.050781 6.804688 12.074219 6.789063 12.09375 6.78125 C 12.28125 6.699219 12.464844 6.628906 12.65625 6.5625 C 12.828125 6.5 13.011719 6.457031 13.1875 6.40625 C 13.445313 6.332031 13.703125 6.242188 13.96875 6.1875 C 14.050781 6.171875 14.136719 6.171875 14.21875 6.15625 C 14.433594 6.117188 14.652344 6.085938 14.875 6.0625 C 14.90625 6.058594 14.9375 6.066406 14.96875 6.0625 C 15.304688 6.027344 15.652344 6 16 6 Z M 22 8.59375 C 22.292969 8.59375 22.636719 8.65625 22.9375 8.84375 C 22.976563 8.878906 23.027344 8.902344 23.0625 8.9375 C 23.117188 8.984375 23.167969 9.035156 23.21875 9.09375 C 23.359375 9.238281 23.496094 9.378906 23.625 9.53125 C 23.652344 9.566406 23.691406 9.589844 23.71875 9.625 C 23.796875 9.71875 23.863281 9.808594 23.9375 9.90625 C 24.058594 10.066406 24.167969 10.238281 24.28125 10.40625 C 24.460938 10.671875 24.628906 10.933594 24.78125 11.21875 C 24.925781 11.480469 25.070313 11.753906 25.1875 12.03125 C 25.195313 12.050781 25.210938 12.074219 25.21875 12.09375 C 25.25 12.167969 25.28125 12.238281 25.3125 12.3125 C 25.402344 12.542969 25.488281 12.792969 25.5625 13.03125 C 25.660156 13.34375 25.746094 13.644531 25.8125 13.96875 C 25.820313 14.011719 25.835938 14.050781 25.84375 14.09375 C 25.960938 14.707031 26 15.351563 26 16 C 26 18.421875 25.144531 20.648438 23.71875 22.375 C 23.636719 22.472656 23.554688 22.5625 23.46875 22.65625 C 23.945313 20.140625 23.070313 18.285156 21.65625 15.96875 C 20.179688 13.621094 17.84375 11.3125 17.84375 11.3125 C 19.925781 9.355469 21.652344 8.722656 22 8.59375 Z M 9.875 8.65625 C 10.527344 8.699219 11.203125 8.953125 11.8125 9.34375 L 11.875 9.375 C 13.175781 10.15625 14.21875 11.3125 14.21875 11.3125 C 13.089844 12.398438 10.378906 15.6875 9.46875 17.90625 C 8.125 21.296875 8.75 22.78125 8.75 22.78125 C 8.921875 20.910156 11.691406 17.605469 12.6875 16.5625 C 13.207031 15.953125 14.21875 14.96875 15 14.1875 C 15.5625 13.578125 16.03125 13.09375 16.03125 13.09375 C 16.335938 13.398438 16.644531 13.707031 16.90625 13.96875 C 18.164063 15.230469 19.101563 16.230469 19.75 16.96875 C 20.402344 17.707031 21.539063 19.097656 21.84375 19.53125 C 23.148438 21.386719 23.394531 22.644531 23.40625 22.71875 C 23.296875 22.839844 23.179688 22.945313 23.0625 23.0625 C 22.835938 23.289063 22.621094 23.515625 22.375 23.71875 C 22.128906 23.921875 21.859375 24.101563 21.59375 24.28125 C 21.328125 24.460938 21.066406 24.628906 20.78125 24.78125 C 20.5625 24.898438 20.351563 25.023438 20.125 25.125 C 20.082031 25.144531 20.042969 25.167969 20 25.1875 C 19.726563 25.304688 19.441406 25.40625 19.15625 25.5 C 19.132813 25.507813 19.117188 25.523438 19.09375 25.53125 C 18.835938 25.613281 18.578125 25.6875 18.3125 25.75 C 18.21875 25.773438 18.128906 25.792969 18.03125 25.8125 C 17.839844 25.851563 17.632813 25.847656 17.4375 25.875 C 16.980469 25.941406 16.507813 26 16.03125 26 C 15.675781 26 15.3125 25.972656 14.96875 25.9375 C 14.308594 25.867188 13.675781 25.753906 13.0625 25.5625 C 13.054688 25.558594 13.039063 25.566406 13.03125 25.5625 C 12.105469 25.269531 11.226563 24.816406 10.4375 24.28125 C 10.429688 24.277344 10.414063 24.285156 10.40625 24.28125 C 9.882813 23.925781 9.414063 23.507813 8.96875 23.0625 C 7.164063 21.253906 6.0625 18.761719 6.0625 16 C 6.0625 13.347656 7.101563 10.96875 8.75 9.1875 C 8.75 9.1875 9.179688 8.65625 9.875 8.65625 Z "></path>
                </g>
                </svg>`,
                name: "Xbox Networking",
            },
        ] as SearchResultItem[];
    }

    private getEaseOfAccessSettings(): SearchResultItem[] {
        const moduleTitle = "Ease of Access";

        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:easeofaccess-narrator`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 3 5 L 3 23 L 8 23 L 8 28.078125 L 14.351563 23 L 29 23 L 29 5 Z M 5 7 L 27 7 L 27 21 L 13.648438 21 L 10 23.917969 L 10 21 L 5 21 Z "></path>
                </g>
                </svg>`,
                name: `${moduleTitle}: Narrator`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:easeofaccess-magnifier`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z M 18 9 L 18 12 L 15 12 L 15 14 L 18 14 L 18 17 L 20 17 L 20 14 L 23 14 L 23 12 L 20 12 L 20 9 Z "></path>
                </g>
                </svg>`,
                name: `${moduleTitle}: Magnifier`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:easeofaccess-highcontrast`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 L 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z "></path>
                </g>
                </svg>`,
                name: `${moduleTitle}: Color & high Contrast`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:easeofaccess-closedcaptioning`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                                <g id="surface1">
                            <path d="M 2 6 L 2 23.90625 L 30 23.90625 L 30 6 Z M 4 8 L 28 8 L 28 21.90625 L 4 21.90625 Z M 12 10 C 9.25 10 7 12.25 7 15 C 7 17.75 9.25 20 12 20 C 13.195313 20 14.277344 19.558594 15.125 18.875 L 13.875 17.3125 C 13.347656 17.738281 12.707031 18 12 18 C 10.332031 18 9 16.667969 9 15 C 9 13.332031 10.332031 12 12 12 C 12.707031 12 13.347656 12.261719 13.875 12.6875 L 15.125 11.125 C 14.277344 10.441406 13.195313 10 12 10 Z M 22 10 C 19.25 10 17 12.25 17 15 C 17 17.75 19.25 20 22 20 C 23.195313 20 24.277344 19.558594 25.125 18.875 L 23.875 17.3125 C 23.347656 17.738281 22.707031 18 22 18 C 20.332031 18 19 16.667969 19 15 C 19 13.332031 20.332031 12 22 12 C 22.707031 12 23.347656 12.261719 23.875 12.6875 L 25.125 11.125 C 24.277344 10.441406 23.195313 10 22 10 Z "></path>
                        </g>
                </svg>`,
                name: `${moduleTitle}: Closed Captioning`,
                tags: ["cc"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:easeofaccess-keyboard`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                                <g id="surface1">
                            <path d="M 3 7 C 1.90625 7 1 7.90625 1 9 L 1 23 C 1 24.09375 1.90625 25 3 25 L 29 25 C 30.09375 25 31 24.09375 31 23 L 31 9 C 31 7.90625 30.09375 7 29 7 Z M 3 9 L 29 9 L 29 23 L 3 23 Z M 5 11 L 5 13 L 7 13 L 7 11 Z M 9 11 L 9 13 L 11 13 L 11 11 Z M 13 11 L 13 13 L 15 13 L 15 11 Z M 17 11 L 17 13 L 19 13 L 19 11 Z M 21 11 L 21 13 L 23 13 L 23 11 Z M 25 11 L 25 13 L 27 13 L 27 11 Z M 5 15 L 5 17 L 9 17 L 9 15 Z M 11 15 L 11 17 L 13 17 L 13 15 Z M 15 15 L 15 17 L 17 17 L 17 15 Z M 19 15 L 19 17 L 21 17 L 21 15 Z M 23 15 L 23 17 L 27 17 L 27 15 Z M 5 19 L 5 21 L 9 21 L 9 19 Z M 11 19 L 11 21 L 21 21 L 21 19 Z M 23 19 L 23 21 L 27 21 L 27 19 Z "></path>
                        </g>
                </svg>`,
                name: `${moduleTitle}: Keyboard`,
                tags: ["input"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:easeofaccess-mouse`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                                <g id="surface1">
                            <path d="M 16 4 C 10.488281 4 6 8.488281 6 14 L 6 18 C 6 23.511719 10.488281 28 16 28 C 21.511719 28 26 23.511719 26 18 L 26 14 C 26 8.488281 21.511719 4 16 4 Z M 16 6 C 20.089844 6 23.445313 9.046875 23.9375 13 L 8.0625 13 C 8.554688 9.046875 11.910156 6 16 6 Z M 15 7 L 15 12 L 17 12 L 17 7 Z M 8 15 L 24 15 L 24 18 C 24 22.429688 20.429688 26 16 26 C 11.570313 26 8 22.429688 8 18 Z "></path>
                        </g>
                </svg>`,
                name: `${moduleTitle}: Mouse`,
                tags: ["ease", "of", "access", "input"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:easeofaccess-otheroptions`,
                icon: this.defaultIcon,
                name: `${moduleTitle}: Other Options`,
            },
        ] as SearchResultItem[];
    }

    private getPrivacySettings(): SearchResultItem[] {
        const moduleTitle = "Privacy";
        const privacyIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                        <g id="surface1">
                            <path d="M 16 3 C 12.15625 3 9 6.15625 9 10 L 9 13 L 6 13 L 6 29 L 26 29 L 26 13 L 23 13 L 23 10 C 23 6.15625 19.84375 3 16 3 Z M 16 5 C 18.753906 5 21 7.246094 21 10 L 21 13 L 11 13 L 11 10 C 11 7.246094 13.246094 5 16 5 Z M 8 15 L 24 15 L 24 27 L 8 27 Z "></path>
                        </g>
                    </svg>`;

        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-general`,
                icon: privacyIcon,
                name: `${moduleTitle}: General`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-location`,
                icon: privacyIcon,
                name: `${moduleTitle}: Location`,
                tags: ["gps"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-webcam`,
                icon: privacyIcon,
                name: `${moduleTitle}: Camera`,
                tags: ["web cam"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-microphone`,
                icon: privacyIcon,
                name: `${moduleTitle}: Microphone`,
                tags: ["audio", "input"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-notifications`,
                icon: privacyIcon,
                name: `${moduleTitle}: Notifications`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-speechtyping`,
                icon: privacyIcon,
                name: `${moduleTitle}: Speech, ing, & typing`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-accountinfo`,
                icon: privacyIcon,
                name: `${moduleTitle}: Account info`,
                tags: ["personal", "vacy", "user"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-contacts`,
                icon: privacyIcon,
                name: `${moduleTitle}: Contacts`,
                tags: ["people"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-calendar`,
                icon: privacyIcon,
                name: `${moduleTitle}: Calendar`,
                tags: ["day", "month", "year"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-callhistory`,
                icon: privacyIcon,
                name: `${moduleTitle}: Call history`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-email`,
                icon: privacyIcon,
                name: `${moduleTitle}: Email`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-tasks`,
                icon: privacyIcon,
                name: `${moduleTitle}: Tasks`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-messaging`,
                icon: privacyIcon,
                name: `${moduleTitle}: Messaging`,
                tags: ["message"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-radios`,
                icon: privacyIcon,
                name: `${moduleTitle}: Radios`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-customdevices`,
                icon: privacyIcon,
                name: `${moduleTitle}: Other Devices`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-feedback`,
                icon: privacyIcon,
                name: `${moduleTitle}: Feedback & diagnostics`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-backgroundapps`,
                icon: privacyIcon,
                name: `${moduleTitle}: Background apps`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-appdiagnostics`,
                icon: privacyIcon,
                name: `${moduleTitle}: App diagnostics`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:automaticfiledownloads`,
                icon: privacyIcon,
                name: `${moduleTitle}: Automatic file downloads`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:privacy-motion`,
                icon: privacyIcon,
                name: `${moduleTitle}: Motion`,
            },
        ] as SearchResultItem[];
    }

    private getUpdateAndSecuritySettings(): SearchResultItem[] {
        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:windowsupdate`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 C 10.886719 4 6.617188 7.160156 4.875 11.625 L 6.71875 12.375 C 8.175781 8.640625 11.710938 6 16 6 C 19.242188 6 22.132813 7.589844 23.9375 10 L 20 10 L 20 12 L 27 12 L 27 5 L 25 5 L 25 8.09375 C 22.808594 5.582031 19.570313 4 16 4 Z M 25.28125 19.625 C 23.824219 23.359375 20.289063 26 16 26 C 12.722656 26 9.84375 24.386719 8.03125 22 L 12 22 L 12 20 L 5 20 L 5 27 L 7 27 L 7 23.90625 C 9.1875 26.386719 12.394531 28 16 28 C 21.113281 28 25.382813 24.839844 27.125 20.375 Z "></path>
                </g>
                </svg>`,
                name: "Windows Update",
                tags: ["patch", "upgrade", "security"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:windowsdefender`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 C 13.75 4 12.234375 4.886719 10.875 5.625 C 9.515625 6.363281 8.28125 7 6 7 L 5 7 L 5 8 C 5 15.71875 7.609375 20.742188 10.25 23.78125 C 12.890625 26.820313 15.625 27.9375 15.625 27.9375 L 16 28.0625 L 16.375 27.9375 C 16.375 27.9375 19.109375 26.84375 21.75 23.8125 C 24.390625 20.78125 27 15.746094 27 8 L 27 7 L 26 7 C 23.730469 7 22.484375 6.363281 21.125 5.625 C 19.765625 4.886719 18.25 4 16 4 Z M 16 6 C 17.75 6 18.753906 6.613281 20.15625 7.375 C 21.339844 8.019531 22.910156 8.636719 24.9375 8.84375 C 24.746094 15.609375 22.507813 19.910156 20.25 22.5 C 18.203125 24.847656 16.484375 25.628906 16 25.84375 C 15.511719 25.625 13.796875 24.824219 11.75 22.46875 C 9.492188 19.871094 7.253906 15.578125 7.0625 8.84375 C 9.097656 8.636719 10.660156 8.019531 11.84375 7.375 C 13.246094 6.613281 14.25 6 16 6 Z "></path>
                </g>
                </svg>`,
                name: "Windows Defender",
                tags: ["anti", "virus", "protection", "security", "scan", "malware"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:backup`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 6 4 L 6 28 L 17.0625 28 C 17.394531 28.570313 17.796875 29.109375 18.28125 29.59375 C 21.375 32.6875 26.5 32.6875 29.59375 29.59375 C 29.734375 29.453125 29.863281 29.300781 30 29.15625 L 30 32 L 32 32 L 32 26 L 26 26 L 26 28 L 28.34375 28 C 28.285156 28.0625 28.25 28.125 28.1875 28.1875 C 25.878906 30.496094 22.027344 30.496094 19.71875 28.1875 C 17.410156 25.878906 17.410156 22.027344 19.71875 19.71875 C 22.027344 17.410156 25.878906 17.410156 28.1875 19.71875 C 29.230469 20.761719 29.824219 22.046875 29.90625 23.28125 L 31.90625 23.125 C 31.789063 21.359375 30.949219 19.636719 29.59375 18.28125 C 28.570313 17.257813 27.320313 16.59375 26 16.25 L 26 4 Z M 8 6 L 24 6 L 24 11 L 8 11 Z M 8 13 L 24 13 L 24 15.96875 C 23.980469 15.96875 23.957031 15.96875 23.9375 15.96875 C 21.882813 15.96875 19.828125 16.734375 18.28125 18.28125 C 18.050781 18.511719 17.851563 18.75 17.65625 19 L 8 19 Z M 8 21 L 16.5 21 C 15.882813 22.59375 15.789063 24.359375 16.21875 26 L 8 26 Z "></path>
                </g>
                </svg>`,
                name: "Backup",
                tags: ["files", "storage"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:troubleshoot`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 21 4 C 17.144531 4 14 7.144531 14 11 C 14 11.714844 14.214844 12.363281 14.414063 13.015625 L 4.945313 22.484375 C 3.6875 23.738281 3.6875 25.800781 4.945313 27.058594 C 6.199219 28.3125 8.261719 28.3125 9.515625 27.058594 L 18.984375 17.589844 C 19.632813 17.789063 20.285156 18 21 18 C 24.855469 18 28 14.855469 28 11 C 28 9.972656 27.773438 9 27.375 8.125 L 26.78125 6.804688 L 25.761719 7.828125 L 22.585938 11 L 21 11 L 21 9.414063 L 25.195313 5.21875 L 23.875 4.625 C 23 4.226563 22.027344 4 21 4 Z M 21 6 C 21.171875 6 21.316406 6.085938 21.484375 6.101563 L 19 8.585938 L 19 13 L 23.414063 13 L 25.894531 10.515625 C 25.914063 10.683594 26 10.828125 26 11 C 26 13.773438 23.773438 16 21 16 C 20.300781 16 19.636719 15.855469 19.03125 15.597656 L 18.410156 15.332031 L 8.101563 25.640625 C 7.621094 26.125 6.839844 26.125 6.359375 25.640625 C 5.875 25.160156 5.875 24.378906 6.359375 23.894531 L 16.667969 13.589844 L 16.402344 12.964844 C 16.144531 12.359375 16 11.699219 16 11 C 16 8.226563 18.226563 6 21 6 Z "></path>
                </g>
                </svg>`,
                name: "Troubleshoot",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:recovery`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 C 11.832031 4 8.152344 6.113281 6 9.34375 L 6 6 L 4 6 L 4 13 L 11 13 L 11 11 L 7.375 11 C 9.101563 8.019531 12.296875 6 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 L 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 15 8 L 15 17 L 22 17 L 22 15 L 17 15 L 17 8 Z "></path>
                </g>
                </svg>`,
                name: "Recovery",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:activation`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 28.28125 6.28125 L 11 23.5625 L 3.71875 16.28125 L 2.28125 17.71875 L 10.28125 25.71875 L 11 26.40625 L 11.71875 25.71875 L 29.71875 7.71875 Z "></path>
                </g>
                </svg>`,
                name: "Activation",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:findmydevice`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 3 C 12.144531 3 9 6.144531 9 10 C 9 11.128906 9.445313 12.351563 10.03125 13.6875 C 10.617188 15.023438 11.363281 16.4375 12.125 17.75 C 13.648438 20.375 15.1875 22.5625 15.1875 22.5625 L 16 23.75 L 16.8125 22.5625 C 16.8125 22.5625 18.351563 20.375 19.875 17.75 C 20.636719 16.4375 21.382813 15.023438 21.96875 13.6875 C 22.554688 12.351563 23 11.128906 23 10 C 23 6.144531 19.855469 3 16 3 Z M 16 5 C 18.773438 5 21 7.226563 21 10 C 21 10.527344 20.695313 11.648438 20.15625 12.875 C 19.617188 14.101563 18.863281 15.476563 18.125 16.75 C 17.054688 18.597656 16.507813 19.398438 16 20.15625 C 15.492188 19.398438 14.945313 18.597656 13.875 16.75 C 13.136719 15.476563 12.382813 14.101563 11.84375 12.875 C 11.304688 11.648438 11 10.527344 11 10 C 11 7.226563 13.226563 5 16 5 Z M 16 8 C 14.894531 8 14 8.894531 14 10 C 14 11.105469 14.894531 12 16 12 C 17.105469 12 18 11.105469 18 10 C 18 8.894531 17.105469 8 16 8 Z M 10.90625 19.4375 C 7.035156 20.140625 4 21.679688 4 24 C 4 27.28125 10.035156 29 16 29 C 21.964844 29 28 27.28125 28 24 C 28 21.679688 24.964844 20.140625 21.09375 19.4375 L 19.875 21.28125 C 23.652344 21.828125 26 23.089844 26 24 C 26 25.195313 22.011719 27 16 27 C 9.988281 27 6 25.195313 6 24 C 6 23.089844 8.347656 21.828125 12.125 21.28125 Z "></path>
                </g>
                </svg>`,
                name: "Find my device",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:developers`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 18 5 L 12 27 L 14 27 L 20 5 Z M 7.9375 6.40625 L 1.1875 15.40625 L 0.75 16 L 1.1875 16.59375 L 7.9375 25.59375 L 9.5625 24.40625 L 3.25 16 L 9.5625 7.59375 Z M 24.0625 6.40625 L 22.4375 7.59375 L 28.75 16 L 22.4375 24.40625 L 24.0625 25.59375 L 30.8125 16.59375 L 31.25 16 L 30.8125 15.40625 Z "></path>
                </g>
                </svg>`,
                name: "For developers",
                tags: ["dev", "admin"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:windowsinsider`,
                icon: this.defaultIcon,
                name: "Windows Insider Program",
            },
        ] as SearchResultItem[];
    }

    private getCortanaSettings(): SearchResultItem[] {
        const moduleTitle = "Cortana";
        const cortanaIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M 16 3 A 1 1 0 0 0 15 4 A 1 1 0 0 0 16 5 A 1 1 0 0 0 17 4 A 1 1 0 0 0 16 3 z M 11.847656 3.7246094 A 1 1 0 0 0 11.554688 3.7851562 A 1 1 0 0 0 10.957031 5.0664062 A 1 1 0 0 0 12.238281 5.6640625 A 1 1 0 0 0 12.835938 4.3828125 A 1 1 0 0 0 11.847656 3.7246094 z M 20.082031 3.7246094 A 1 1 0 0 0 19.164062 4.3828125 A 1 1 0 0 0 19.761719 5.6640625 A 1 1 0 0 0 21.042969 5.0664062 A 1 1 0 0 0 20.445312 3.7851562 A 1 1 0 0 0 20.082031 3.7246094 z M 8.2890625 5.8066406 A 1 1 0 0 0 7.6445312 6.0410156 A 1 1 0 0 0 7.5214844 7.4492188 A 1 1 0 0 0 8.9296875 7.5722656 A 1 1 0 0 0 9.0527344 6.1640625 A 1 1 0 0 0 8.2890625 5.8066406 z M 23.740234 5.8085938 A 1 1 0 0 0 22.947266 6.1660156 A 1 1 0 0 0 23.070312 7.5742188 A 1 1 0 0 0 24.478516 7.4511719 A 1 1 0 0 0 24.355469 6.0429688 A 1 1 0 0 0 23.740234 5.8085938 z M 16 6 C 10.488997 6 6 10.488997 6 16 C 6 21.511003 10.488997 26 16 26 C 21.511003 26 26 21.511003 26 16 C 26 10.488997 21.511003 6 16 6 z M 16 8 C 20.430123 8 24 11.569877 24 16 C 24 20.430123 20.430123 24 16 24 C 11.569877 24 8 20.430123 8 16 C 8 11.569877 11.569877 8 16 8 z M 26.367188 9 A 1 1 0 0 0 25.890625 9.1328125 A 1 1 0 0 0 25.525391 10.5 A 1 1 0 0 0 26.890625 10.865234 A 1 1 0 0 0 27.257812 9.5 A 1 1 0 0 0 26.367188 9 z M 5.5605469 9.0019531 A 1 1 0 0 0 4.7421875 9.5 A 1 1 0 0 0 5.1074219 10.865234 A 1 1 0 0 0 6.4746094 10.5 A 1 1 0 0 0 6.1074219 9.1347656 A 1 1 0 0 0 5.5605469 9.0019531 z M 4.1855469 12.916016 A 1 1 0 0 0 3.1972656 13.742188 A 1 1 0 0 0 4.0078125 14.900391 A 1 1 0 0 0 5.1660156 14.089844 A 1 1 0 0 0 4.3554688 12.931641 A 1 1 0 0 0 4.1855469 12.916016 z M 27.841797 12.917969 A 1 1 0 0 0 27.642578 12.931641 A 1 1 0 0 0 26.832031 14.091797 A 1 1 0 0 0 27.990234 14.902344 A 1 1 0 0 0 28.802734 13.744141 A 1 1 0 0 0 27.841797 12.917969 z M 4.2070312 17.083984 A 1 1 0 0 0 4.0078125 17.099609 A 1 1 0 0 0 3.1953125 18.257812 A 1 1 0 0 0 4.3554688 19.068359 A 1 1 0 0 0 5.1660156 17.910156 A 1 1 0 0 0 4.2070312 17.083984 z M 27.820312 17.083984 A 1 1 0 0 0 26.832031 17.910156 A 1 1 0 0 0 27.644531 19.068359 A 1 1 0 0 0 28.802734 18.255859 A 1 1 0 0 0 27.990234 17.097656 A 1 1 0 0 0 27.820312 17.083984 z M 5.5839844 21 A 1 1 0 0 0 5.1074219 21.132812 A 1 1 0 0 0 4.7421875 22.5 A 1 1 0 0 0 6.1074219 22.865234 A 1 1 0 0 0 6.4746094 21.5 A 1 1 0 0 0 5.5839844 21 z M 26.345703 21.001953 A 1 1 0 0 0 25.527344 21.5 A 1 1 0 0 0 25.892578 22.867188 A 1 1 0 0 0 27.257812 22.5 A 1 1 0 0 0 26.892578 21.134766 A 1 1 0 0 0 26.345703 21.001953 z M 23.714844 24.191406 A 1 1 0 0 0 23.070312 24.425781 A 1 1 0 0 0 22.947266 25.833984 A 1 1 0 0 0 24.355469 25.958984 A 1 1 0 0 0 24.478516 24.548828 A 1 1 0 0 0 23.714844 24.191406 z M 8.3144531 24.195312 A 1 1 0 0 0 7.5214844 24.550781 A 1 1 0 0 0 7.6445312 25.960938 A 1 1 0 0 0 9.0527344 25.837891 A 1 1 0 0 0 8.9296875 24.427734 A 1 1 0 0 0 8.3144531 24.195312 z M 11.873047 26.275391 A 1 1 0 0 0 10.955078 26.933594 A 1 1 0 0 0 11.552734 28.214844 A 1 1 0 0 0 12.835938 27.617188 A 1 1 0 0 0 12.238281 26.335938 A 1 1 0 0 0 11.873047 26.275391 z M 20.054688 26.277344 A 1 1 0 0 0 19.761719 26.337891 A 1 1 0 0 0 19.164062 27.619141 A 1 1 0 0 0 20.445312 28.216797 A 1 1 0 0 0 21.042969 26.935547 A 1 1 0 0 0 20.054688 26.277344 z M 16 27 A 1 1 0 0 0 15 28 A 1 1 0 0 0 16 29 A 1 1 0 0 0 17 28 A 1 1 0 0 0 16 27 z"></path>
                    </svg>`;

        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:cortana-language`,
                icon: cortanaIcon,
                name: `${moduleTitle}: Talk to Cortana`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:cortana-moredetails`,
                icon: cortanaIcon,
                name: `${moduleTitle}: More details`,
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:cortana-notifications`,
                icon: cortanaIcon,
                name: `${moduleTitle}: Notifications`,
            },
        ] as SearchResultItem[];
    }

    private getSystemCommands(): SearchResultItem[] {
        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}shutdown -s -t 0`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 15 4 L 15 16 L 17 16 L 17 4 Z M 12 4.6875 C 7.347656 6.339844 4 10.785156 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 10.785156 24.652344 6.339844 20 4.6875 L 20 6.84375 C 23.527344 8.390625 26 11.910156 26 16 C 26 21.515625 21.515625 26 16 26 C 10.484375 26 6 21.515625 6 16 C 6 11.910156 8.472656 8.390625 12 6.84375 Z "></path>
                </g>
                </svg>`,
                name: "Shutdown",
                tags: ["power", "off"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}shutdown -r -t 0`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 L 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 12.734375 7.585938 9.851563 10 8.03125 L 10 13 L 12 13 L 12 5 L 4 5 L 4 7 L 8.09375 7 C 5.59375 9.199219 4 12.417969 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z "></path>
                </g>
                </svg>`,
                name: "Restart",
                tags: ["reboot"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}shutdown /l`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                            <g id="surface1">
                                <path d="M 5 3 L 5 29 L 23 29 L 23 23.1875 L 21.90625 22.125 L 21.0625 21.25 L 21 21.25 L 21 27 L 7 27 L 7 5 L 21 5 L 21 10.8125 L 21.90625 9.875 L 23 8.8125 L 23 3 Z M 23.34375 11.28125 L 21.90625 12.71875 L 24.1875 15 L 12 15 L 12 17 L 24.1875 17 L 21.90625 19.28125 L 23.34375 20.71875 L 27.34375 16.71875 L 28.03125 16 L 27.34375 15.28125 Z "></path>
                            </g>
                        </svg>`,
                name: "Sign out",
                tags: ["out", "off", "sign", "user", "log"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}rundll32 user32.dll,LockWorkStation`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                            <g id="surface1">
                                <path style=" " d="M 16 3 C 12.15625 3 9 6.15625 9 10 L 9 13 L 6 13 L 6 29 L 26 29 L 26 13 L 23 13 L 23 10 C 23 6.15625 19.84375 3 16 3 Z M 16 5 C 18.753906 5 21 7.246094 21 10 L 21 13 L 11 13 L 11 10 C 11 7.246094 13.246094 5 16 5 Z M 8 15 L 24 15 L 24 27 L 8 27 Z "></path>
                            </g>
                        </svg>`,
                name: "Lock computer",
                tags: [],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}winver`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 2 5 L 2 23 L 15 23 L 15 25 L 10 25 L 10 27 L 22 27 L 22 25 L 17 25 L 17 23 L 30 23 L 30 5 Z M 4 7 L 28 7 L 28 21 L 4 21 Z M 20 9.84375 L 15.59375 10.46875 L 15.59375 14 L 20 14 Z M 14.59375 10.75 L 11 11.25 L 11 14 L 14.59375 14 Z M 11 15 L 11 17.75 L 14.59375 18.25 L 14.59375 15 Z M 15.59375 15 L 15.59375 18.53125 L 20 19.15625 L 20 15 Z "></path>
                </g>
                </svg>`,
                name: "Windows Version",
                tags: ["about", "info", "build", "os", "operating", "system", "release"],
            },
        ] as SearchResultItem[];
    }

    private getWindows10Apps(): SearchResultItem[] {
        return [
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings:`,
                icon: this.defaultIcon,
                name: "Windows Settings",
                tags: ["control", "panel", "options"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-photos:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path style=" " d="M 2 5 L 2 27 L 30 27 L 30 5 Z M 4 7 L 28 7 L 28 20.90625 L 22.71875 15.59375 L 22 14.875 L 17.46875 19.40625 L 11.71875 13.59375 L 11 12.875 L 4 19.875 Z M 24 9 C 22.894531 9 22 9.894531 22 11 C 22 12.105469 22.894531 13 24 13 C 25.105469 13 26 12.105469 26 11 C 26 9.894531 25.105469 9 24 9 Z M 11 15.71875 L 20.1875 25 L 4 25 L 4 22.71875 Z M 22 17.71875 L 28 23.71875 L 28 25 L 23.03125 25 L 18.875 20.8125 Z "></path>
                </g>
                </svg>`,
                name: "Photos",
                tags: ["Images"],
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}com.microsoft.builder3d:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 5 5 L 5 22.40625 L 5.28125 22.71875 L 9.28125 26.71875 L 9.59375 27 L 27 27 L 27 9.59375 L 26.71875 9.28125 L 22.71875 5.28125 L 22.40625 5 Z M 8.4375 7 L 21.5625 7 L 24.5625 10 L 11.4375 10 Z M 7 8.4375 L 10 11.4375 L 10 24.5625 L 7 21.5625 Z "></path>
                </g>
                </svg>`,
                name: "3D Builder",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-actioncenter:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 3 6 L 3 26 L 12.585938 26 L 16 29.414063 L 19.414063 26 L 29 26 L 29 6 Z M 5 8 L 27 8 L 27 24 L 18.585938 24 L 16 26.585938 L 13.414063 24 L 5 24 Z M 9 11 L 9 13 L 23 13 L 23 11 Z M 9 15 L 9 17 L 23 17 L 23 15 Z M 9 19 L 9 21 L 19 21 L 19 19 Z "></path>
                </g>
                </svg>`,
                name: "Action Center",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-clock:alarm`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 9.75 3.5 C 7.050781 4.855469 4.855469 7.050781 3.5 9.75 L 5.28125 10.625 C 6.441406 8.3125 8.3125 6.441406 10.625 5.28125 Z M 22.25 3.5 L 21.375 5.28125 C 23.6875 6.441406 25.558594 8.3125 26.71875 10.625 L 28.5 9.75 C 27.144531 7.050781 24.949219 4.855469 22.25 3.5 Z M 16 5 C 9.9375 5 5 9.9375 5 16 C 5 18.953125 6.164063 21.648438 8.0625 23.625 L 5.96875 26.9375 L 7.65625 28 L 9.59375 24.9375 C 11.398438 26.234375 13.617188 27 16 27 C 18.382813 27 20.601563 26.234375 22.40625 24.9375 L 24.3125 28 L 26 26.9375 L 23.9375 23.625 C 25.835938 21.648438 27 18.953125 27 16 C 27 9.9375 22.0625 5 16 5 Z M 16 7 C 20.980469 7 25 11.019531 25 16 C 25 20.980469 20.980469 25 16 25 C 11.019531 25 7 20.980469 7 16 C 7 11.019531 11.019531 7 16 7 Z M 15 9 L 15 17 L 21 17 L 21 15 L 17 15 L 17 9 Z "></path>
                </g>
                </svg>`,
                name: "Alarms & Clock",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-availablenetworks:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 16.9375 28 17.84375 27.882813 18.71875 27.675781 L 17.4375 24.480469 C 16.953125 25.453125 16.4375 26 16 26 C 15.925781 26 15.847656 25.972656 15.769531 25.941406 C 15.742188 25.929688 15.714844 25.921875 15.683594 25.90625 C 15.65625 25.894531 15.632813 25.871094 15.609375 25.859375 C 15.488281 25.777344 15.355469 25.664063 15.203125 25.484375 C 15.109375 25.378906 15.019531 25.253906 14.925781 25.113281 C 14.847656 24.996094 14.769531 24.863281 14.691406 24.722656 C 14.667969 24.679688 14.644531 24.632813 14.621094 24.589844 C 14.46875 24.296875 14.320313 23.957031 14.179688 23.589844 C 14.125 23.449219 14.074219 23.296875 14.023438 23.140625 C 13.921875 22.839844 13.824219 22.519531 13.734375 22.175781 C 13.71875 22.117188 13.703125 22.0625 13.6875 22 L 16.445313 22 L 15.644531 20 L 13.289063 20 C 13.214844 19.503906 13.160156 18.984375 13.113281 18.453125 C 13.09375 18.199219 13.078125 17.941406 13.0625 17.683594 C 13.03125 17.128906 13 16.578125 13 16 C 13 15.464844 13.03125 14.953125 13.058594 14.4375 C 13.078125 14.097656 13.097656 13.761719 13.125 13.4375 C 13.15625 13.113281 13.195313 12.796875 13.234375 12.484375 C 13.257813 12.320313 13.28125 12.160156 13.304688 12 L 18.695313 12 C 18.835938 12.925781 18.945313 13.910156 18.980469 15 L 14 15 L 14.007813 15.015625 L 15.589844 15.488281 L 20.976563 17.105469 C 20.976563 17.070313 20.980469 17.035156 20.984375 17 L 25.949219 17 C 25.898438 17.519531 25.804688 18.023438 25.675781 18.515625 L 27.582031 19.089844 C 27.847656 18.101563 28 17.070313 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 16.726563 6 17.675781 7.492188 18.308594 10 L 13.691406 10 C 13.703125 9.960938 13.707031 9.914063 13.71875 9.875 C 13.777344 9.648438 13.847656 9.445313 13.910156 9.230469 C 13.992188 8.972656 14.066406 8.703125 14.152344 8.476563 C 14.324219 8.007813 14.515625 7.59375 14.707031 7.25 C 14.796875 7.09375 14.882813 6.953125 14.96875 6.828125 C 15.046875 6.714844 15.125 6.605469 15.203125 6.515625 C 15.371094 6.316406 15.519531 6.191406 15.644531 6.117188 C 15.664063 6.105469 15.683594 6.09375 15.703125 6.085938 C 15.746094 6.0625 15.785156 6.046875 15.820313 6.03125 C 15.882813 6.015625 15.941406 6 16 6 Z M 12.824219 6.527344 C 12.699219 6.765625 12.585938 7.015625 12.472656 7.273438 C 12.4375 7.359375 12.402344 7.449219 12.371094 7.539063 C 12.324219 7.652344 12.277344 7.761719 12.234375 7.882813 C 12.214844 7.929688 12.203125 7.984375 12.1875 8.03125 C 12.027344 8.480469 11.886719 8.957031 11.761719 9.453125 C 11.722656 9.601563 11.6875 9.75 11.65625 9.902344 C 11.648438 9.933594 11.636719 9.96875 11.628906 10 L 8.015625 10 C 9.222656 8.40625 10.890625 7.179688 12.824219 6.527344 Z M 19.179688 6.527344 C 21.113281 7.179688 22.78125 8.40625 23.984375 10 L 20.371094 10 C 20.074219 8.683594 19.679688 7.492188 19.179688 6.527344 Z M 6.84375 12 L 11.273438 12 C 11.230469 12.324219 11.199219 12.65625 11.164063 12.988281 C 11.113281 13.484375 11.078125 13.984375 11.050781 14.503906 C 11.042969 14.671875 11.023438 14.832031 11.015625 15 L 6.050781 15 C 6.15625 13.941406 6.433594 12.933594 6.84375 12 Z M 20.726563 12 L 25.15625 12 C 25.566406 12.933594 25.84375 13.941406 25.949219 15 L 20.984375 15 C 20.949219 13.980469 20.859375 12.972656 20.726563 12 Z M 6.050781 17 L 11.015625 17 C 11.027344 17.277344 11.050781 17.550781 11.066406 17.828125 C 11.078125 18.042969 11.085938 18.261719 11.105469 18.472656 C 11.144531 18.988281 11.199219 19.5 11.269531 20 L 6.84375 20 C 6.433594 19.066406 6.15625 18.058594 6.050781 17 Z M 17 18 L 21 28 L 22.878906 25.3125 L 26 28 L 28 25.753906 L 24.707031 23.019531 L 27 21 Z M 8.019531 22 L 11.625 22 C 11.640625 22.0625 11.65625 22.121094 11.671875 22.183594 C 11.703125 22.324219 11.738281 22.457031 11.773438 22.59375 C 11.898438 23.085938 12.042969 23.5625 12.199219 24.003906 C 12.210938 24.042969 12.21875 24.085938 12.234375 24.121094 C 12.285156 24.265625 12.34375 24.402344 12.402344 24.542969 C 12.429688 24.613281 12.460938 24.691406 12.488281 24.761719 C 12.585938 24.984375 12.683594 25.195313 12.785156 25.398438 C 12.796875 25.421875 12.808594 25.449219 12.820313 25.472656 C 10.886719 24.824219 9.222656 23.597656 8.019531 22 Z "></path>
                </g>
                </svg>`,
                name: "Available Networks",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}calculator:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 6 3 L 6 29 L 26 29 L 26 3 Z M 8 5 L 24 5 L 24 27 L 8 27 Z M 10 7 L 10 13 L 22 13 L 22 7 Z M 12 9 L 20 9 L 20 11 L 12 11 Z M 11 15 L 11 17 L 13 17 L 13 15 Z M 15 15 L 15 17 L 17 17 L 17 15 Z M 19 15 L 19 17 L 21 17 L 21 15 Z M 11 19 L 11 21 L 13 21 L 13 19 Z M 15 19 L 15 21 L 17 21 L 17 19 Z M 19 19 L 19 21 L 21 21 L 21 19 Z M 11 23 L 11 25 L 13 25 L 13 23 Z M 15 23 L 15 25 L 17 25 L 17 23 Z M 19 23 L 19 25 L 21 25 L 21 23 Z "></path>
                </g>
                </svg>`,
                name: "Calculator",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}outlookcal:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 9 4 L 9 5 L 5 5 L 5 27 L 27 27 L 27 5 L 23 5 L 23 4 L 21 4 L 21 5 L 11 5 L 11 4 Z M 7 7 L 9 7 L 9 8 L 11 8 L 11 7 L 21 7 L 21 8 L 23 8 L 23 7 L 25 7 L 25 9 L 7 9 Z M 7 11 L 25 11 L 25 25 L 7 25 Z M 13 13 L 13 15 L 15 15 L 15 13 Z M 17 13 L 17 15 L 19 15 L 19 13 Z M 21 13 L 21 15 L 23 15 L 23 13 Z M 9 17 L 9 19 L 11 19 L 11 17 Z M 13 17 L 13 19 L 15 19 L 15 17 Z M 17 17 L 17 19 L 19 19 L 19 17 Z M 21 17 L 21 19 L 23 19 L 23 17 Z M 9 21 L 9 23 L 11 23 L 11 21 Z M 13 21 L 13 23 L 15 23 L 15 21 Z M 17 21 L 17 23 L 19 23 L 19 21 Z "></path>
                </g>
                </svg>`,
                name: "Calendar",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}microsoft.windows.camera:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 11.5 6 L 11.1875 6.40625 L 10 8 L 3 8 L 3 26 L 29 26 L 29 8 L 22 8 L 20.8125 6.40625 L 20.5 6 Z M 12.5 8 L 19.5 8 L 20.6875 9.59375 L 21 10 L 27 10 L 27 24 L 5 24 L 5 10 L 11 10 L 11.3125 9.59375 Z M 8 11 C 7.449219 11 7 11.449219 7 12 C 7 12.550781 7.449219 13 8 13 C 8.550781 13 9 12.550781 9 12 C 9 11.449219 8.550781 11 8 11 Z M 16 11 C 12.699219 11 10 13.699219 10 17 C 10 20.300781 12.699219 23 16 23 C 19.300781 23 22 20.300781 22 17 C 22 13.699219 19.300781 11 16 11 Z M 16 13 C 18.222656 13 20 14.777344 20 17 C 20 19.222656 18.222656 21 16 21 C 13.777344 21 12 19.222656 12 17 C 12 14.777344 13.777344 13 16 13 Z "></path>
                </g>
                </svg>`,
                name: "Camera",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-projection:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 27.28125 3.28125 L 24.625 5.9375 L 24.1875 5.46875 C 23.214844 4.496094 21.9375 4 20.65625 4 C 19.375 4 18.097656 4.496094 17.125 5.46875 L 16.40625 6.15625 L 15.5 7.0625 L 14.71875 6.28125 L 13.28125 7.71875 L 16.0625 10.5 L 13.28125 13.28125 L 14.71875 14.71875 L 17.5 11.9375 L 20.0625 14.5 L 17.28125 17.28125 L 18.71875 18.71875 L 21.5 15.9375 L 24.28125 18.71875 L 25.71875 17.28125 L 24.9375 16.5 L 26.53125 14.875 C 28.476563 12.929688 28.476563 9.757813 26.53125 7.8125 L 26.0625 7.375 L 28.71875 4.71875 Z M 20.65625 6 C 21.421875 6 22.191406 6.285156 22.78125 6.875 L 25.125 9.21875 C 26.304688 10.398438 26.304688 12.289063 25.125 13.46875 L 24.875 13.6875 L 23.5 15.0625 L 16.9375 8.5 L 18.53125 6.875 C 19.121094 6.285156 19.890625 6 20.65625 6 Z M 7.71875 13.28125 L 6.28125 14.71875 L 7.0625 15.5 L 5.46875 17.125 C 3.523438 19.070313 3.523438 22.242188 5.46875 24.1875 L 5.90625 24.65625 L 3.28125 27.28125 L 4.71875 28.71875 L 7.34375 26.09375 L 7.8125 26.53125 C 9.757813 28.476563 12.929688 28.476563 14.875 26.53125 L 16.5 24.9375 L 17.28125 25.71875 L 18.71875 24.28125 Z M 8.5 16.9375 L 15.0625 23.5 L 13.46875 25.125 C 12.289063 26.304688 10.398438 26.304688 9.21875 25.125 L 9 24.875 L 6.875 22.78125 C 5.695313 21.601563 5.695313 19.710938 6.875 18.53125 Z "></path>
                </g>
                </svg>`,
                name: "Connect",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-cortana:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M 16 3 A 1 1 0 0 0 15 4 A 1 1 0 0 0 16 5 A 1 1 0 0 0 17 4 A 1 1 0 0 0 16 3 z M 11.847656 3.7246094 A 1 1 0 0 0 11.554688 3.7851562 A 1 1 0 0 0 10.957031 5.0664062 A 1 1 0 0 0 12.238281 5.6640625 A 1 1 0 0 0 12.835938 4.3828125 A 1 1 0 0 0 11.847656 3.7246094 z M 20.082031 3.7246094 A 1 1 0 0 0 19.164062 4.3828125 A 1 1 0 0 0 19.761719 5.6640625 A 1 1 0 0 0 21.042969 5.0664062 A 1 1 0 0 0 20.445312 3.7851562 A 1 1 0 0 0 20.082031 3.7246094 z M 8.2890625 5.8066406 A 1 1 0 0 0 7.6445312 6.0410156 A 1 1 0 0 0 7.5214844 7.4492188 A 1 1 0 0 0 8.9296875 7.5722656 A 1 1 0 0 0 9.0527344 6.1640625 A 1 1 0 0 0 8.2890625 5.8066406 z M 23.740234 5.8085938 A 1 1 0 0 0 22.947266 6.1660156 A 1 1 0 0 0 23.070312 7.5742188 A 1 1 0 0 0 24.478516 7.4511719 A 1 1 0 0 0 24.355469 6.0429688 A 1 1 0 0 0 23.740234 5.8085938 z M 16 6 C 10.488997 6 6 10.488997 6 16 C 6 21.511003 10.488997 26 16 26 C 21.511003 26 26 21.511003 26 16 C 26 10.488997 21.511003 6 16 6 z M 16 8 C 20.430123 8 24 11.569877 24 16 C 24 20.430123 20.430123 24 16 24 C 11.569877 24 8 20.430123 8 16 C 8 11.569877 11.569877 8 16 8 z M 26.367188 9 A 1 1 0 0 0 25.890625 9.1328125 A 1 1 0 0 0 25.525391 10.5 A 1 1 0 0 0 26.890625 10.865234 A 1 1 0 0 0 27.257812 9.5 A 1 1 0 0 0 26.367188 9 z M 5.5605469 9.0019531 A 1 1 0 0 0 4.7421875 9.5 A 1 1 0 0 0 5.1074219 10.865234 A 1 1 0 0 0 6.4746094 10.5 A 1 1 0 0 0 6.1074219 9.1347656 A 1 1 0 0 0 5.5605469 9.0019531 z M 4.1855469 12.916016 A 1 1 0 0 0 3.1972656 13.742188 A 1 1 0 0 0 4.0078125 14.900391 A 1 1 0 0 0 5.1660156 14.089844 A 1 1 0 0 0 4.3554688 12.931641 A 1 1 0 0 0 4.1855469 12.916016 z M 27.841797 12.917969 A 1 1 0 0 0 27.642578 12.931641 A 1 1 0 0 0 26.832031 14.091797 A 1 1 0 0 0 27.990234 14.902344 A 1 1 0 0 0 28.802734 13.744141 A 1 1 0 0 0 27.841797 12.917969 z M 4.2070312 17.083984 A 1 1 0 0 0 4.0078125 17.099609 A 1 1 0 0 0 3.1953125 18.257812 A 1 1 0 0 0 4.3554688 19.068359 A 1 1 0 0 0 5.1660156 17.910156 A 1 1 0 0 0 4.2070312 17.083984 z M 27.820312 17.083984 A 1 1 0 0 0 26.832031 17.910156 A 1 1 0 0 0 27.644531 19.068359 A 1 1 0 0 0 28.802734 18.255859 A 1 1 0 0 0 27.990234 17.097656 A 1 1 0 0 0 27.820312 17.083984 z M 5.5839844 21 A 1 1 0 0 0 5.1074219 21.132812 A 1 1 0 0 0 4.7421875 22.5 A 1 1 0 0 0 6.1074219 22.865234 A 1 1 0 0 0 6.4746094 21.5 A 1 1 0 0 0 5.5839844 21 z M 26.345703 21.001953 A 1 1 0 0 0 25.527344 21.5 A 1 1 0 0 0 25.892578 22.867188 A 1 1 0 0 0 27.257812 22.5 A 1 1 0 0 0 26.892578 21.134766 A 1 1 0 0 0 26.345703 21.001953 z M 23.714844 24.191406 A 1 1 0 0 0 23.070312 24.425781 A 1 1 0 0 0 22.947266 25.833984 A 1 1 0 0 0 24.355469 25.958984 A 1 1 0 0 0 24.478516 24.548828 A 1 1 0 0 0 23.714844 24.191406 z M 8.3144531 24.195312 A 1 1 0 0 0 7.5214844 24.550781 A 1 1 0 0 0 7.6445312 25.960938 A 1 1 0 0 0 9.0527344 25.837891 A 1 1 0 0 0 8.9296875 24.427734 A 1 1 0 0 0 8.3144531 24.195312 z M 11.873047 26.275391 A 1 1 0 0 0 10.955078 26.933594 A 1 1 0 0 0 11.552734 28.214844 A 1 1 0 0 0 12.835938 27.617188 A 1 1 0 0 0 12.238281 26.335938 A 1 1 0 0 0 11.873047 26.275391 z M 20.054688 26.277344 A 1 1 0 0 0 19.761719 26.337891 A 1 1 0 0 0 19.164062 27.619141 A 1 1 0 0 0 20.445312 28.216797 A 1 1 0 0 0 21.042969 26.935547 A 1 1 0 0 0 20.054688 26.277344 z M 16 27 A 1 1 0 0 0 15 28 A 1 1 0 0 0 16 29 A 1 1 0 0 0 17 28 A 1 1 0 0 0 16 27 z"></path>
                </svg>`,
                name: "Cortana",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-settings-connectabledevices:devicediscovery`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 11 5 C 9.03125 5 7.460938 6.441406 7.125 8.3125 C 5.234375 8.789063 3.59375 10.019531 2.875 11.96875 L 2.84375 11.96875 L 0.71875 17.9375 C 0.265625 18.863281 0 19.902344 0 21 C 0 24.855469 3.144531 28 7 28 C 10.472656 28 13.367188 25.449219 13.90625 22.125 C 14.449219 22.660156 15.1875 23 16 23 C 16.8125 23 17.550781 22.660156 18.09375 22.125 C 18.632813 25.449219 21.527344 28 25 28 C 28.855469 28 32 24.855469 32 21 C 32 20.027344 31.800781 19.09375 31.4375 18.25 L 29.15625 11.875 L 29.125 11.84375 L 29.125 11.8125 C 28.394531 10.039063 26.777344 8.800781 24.875 8.3125 C 24.539063 6.441406 22.96875 5 21 5 C 19.144531 5 17.636719 6.285156 17.1875 8 L 14.8125 8 C 14.363281 6.285156 12.855469 5 11 5 Z M 11 7 C 12.191406 7 13 7.808594 13 9 L 13 10 L 19 10 L 19 9 C 19 7.808594 19.808594 7 21 7 C 22.191406 7 23 7.808594 23 9 L 23 9.90625 L 23.90625 10 C 25.390625 10.15625 26.671875 11.191406 27.25 12.53125 C 27.257813 12.550781 27.273438 12.574219 27.28125 12.59375 L 28.03125 14.71875 C 27.113281 14.273438 26.085938 14 25 14 C 22.074219 14 19.574219 15.816406 18.53125 18.375 C 17.996094 17.542969 17.050781 17 16 17 C 14.949219 17 14.003906 17.542969 13.46875 18.375 C 12.425781 15.816406 9.925781 14 7 14 C 5.929688 14 4.910156 14.253906 4 14.6875 L 4.75 12.65625 L 4.75 12.625 C 5.332031 11.078125 6.558594 10.160156 8.09375 10 L 9 9.90625 L 9 9 C 9 7.808594 9.808594 7 11 7 Z M 7 16 C 9.773438 16 12 18.226563 12 21 C 12 23.773438 9.773438 26 7 26 C 4.226563 26 2 23.773438 2 21 C 2 20.292969 2.175781 19.640625 2.4375 19.03125 C 2.453125 18.992188 2.453125 18.945313 2.46875 18.90625 C 3.257813 17.191406 4.980469 16 7 16 Z M 25 16 C 27.773438 16 30 18.226563 30 21 C 30 23.773438 27.773438 26 25 26 C 22.226563 26 20 23.773438 20 21 C 20 18.226563 22.226563 16 25 16 Z M 16 19 C 16.5625 19 17 19.4375 17 20 C 17 20.5625 16.5625 21 16 21 C 15.4375 21 15 20.5625 15 20 C 15 19.4375 15.4375 19 16 19 Z "></path>
                </g>
                </svg>`,
                name: "Device Discovery",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-contact-support:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 2 5 L 2 21 L 6 21 L 6 26.09375 L 7.625 24.78125 L 12.34375 21 L 22 21 L 22 5 Z M 4 7 L 20 7 L 20 19 L 11.65625 19 L 11.375 19.21875 L 8 21.90625 L 8 19 L 4 19 Z M 24 9 L 24 11 L 28 11 L 28 23 L 24 23 L 24 25.90625 L 20.34375 23 L 12.84375 23 L 10.34375 25 L 19.65625 25 L 26 30.09375 L 26 25 L 30 25 L 30 9 Z "></path>
                </g>
                </svg>`,
                name: "Get Help",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}mswindowsmusic:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 12.855469 27.863281 9.96875 26 7.71875 L 24.375 8.875 C 24.378906 8.882813 24.371094 8.898438 24.375 8.90625 L 21.75 10.65625 L 22.84375 12.3125 L 25.53125 10.53125 C 26.464844 12.144531 27 14.007813 27 16 C 27 22.066406 22.066406 27 16 27 C 9.933594 27 5 22.066406 5 16 C 5 9.933594 9.933594 5 16 5 C 18.113281 5 20.070313 5.617188 21.75 6.65625 L 23.5 5.40625 C 21.375 3.894531 18.800781 3 16 3 Z M 16 11 C 13.238281 11 11 13.238281 11 16 C 11 18.761719 13.238281 21 16 21 C 18.761719 21 21 18.761719 21 16 C 21 13.238281 18.761719 11 16 11 Z M 16 14 C 17.105469 14 18 14.894531 18 16 C 18 17.105469 17.105469 18 16 18 C 14.894531 18 14 17.105469 14 16 C 14 14.894531 14.894531 14 16 14 Z "></path>
                </g>
                </svg>`,
                name: "Groove Music",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}outlookmail:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 3 8 L 3 26 L 29 26 L 29 8 Z M 7.3125 10 L 24.6875 10 L 16 15.78125 Z M 5 10.875 L 15.4375 17.84375 L 16 18.1875 L 16.5625 17.84375 L 27 10.875 L 27 24 L 5 24 Z "></path>
                </g>
                </svg>`,
                name: "Mail",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}bingmaps:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 28 4.46875 L 26.59375 5.09375 L 19.96875 7.9375 L 12.34375 5.0625 L 11.96875 4.9375 L 11.59375 5.09375 L 4.59375 8.09375 L 4 8.34375 L 4 27.53125 L 5.40625 26.90625 L 12.03125 24.0625 L 19.65625 26.9375 L 20.03125 27.0625 L 20.40625 26.90625 L 27.40625 23.90625 L 28 23.65625 Z M 13 7.4375 L 19 9.6875 L 19 24.5625 L 13 22.3125 Z M 11 7.5 L 11 22.34375 L 6 24.5 L 6 9.65625 Z M 26 7.5 L 26 22.34375 L 21 24.5 L 21 9.65625 Z "></path>
                </g>
                </svg>`,
                name: "Maps",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}microsoft-edge:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 9.960938 10.828125 C 7.34375 12.457031 5.847656 14.769531 5.847656 14.769531 C 5.847656 14.769531 6.234375 9.917969 9.960938 7.074219 C 11.441406 5.945313 13.46875 5 16.191406 5 C 17.214844 5 19.359375 5.179688 21.292969 6.371094 C 23.226563 7.5625 24.007813 8.558594 24.878906 10.023438 C 25.253906 10.652344 25.5625 11.464844 25.753906 12.246094 C 26.109375 13.710938 26.152344 15.460938 26.152344 15.460938 L 26.152344 17.769531 L 12.335938 17.769531 C 12.335938 17.769531 12 22.410156 18.355469 22.410156 C 20.5625 22.410156 21.339844 22.0625 22.066406 21.847656 C 23.203125 21.511719 24.300781 20.761719 24.300781 20.761719 L 24.304688 25.398438 C 24.304688 25.398438 21.703125 27 17.773438 27 C 16.667969 27 15.503906 26.90625 14.378906 26.542969 C 13.394531 26.222656 11.339844 25.363281 9.960938 23.347656 C 9.472656 22.636719 8.945313 21.6875 8.683594 20.761719 C 8.398438 19.757813 8.402344 18.785156 8.402344 18.246094 C 8.402344 16.242188 9.089844 14.328125 10.277344 12.941406 C 11.816406 11.148438 13.765625 10.359375 13.765625 10.359375 C 13.765625 10.359375 13.132813 11.097656 12.742188 12.019531 C 12.351563 12.941406 12.242188 13.867188 12.242188 13.867188 L 20.046875 13.867188 C 20.046875 13.867188 20.503906 9.203125 15.632813 9.203125 C 13.796875 9.203125 11.542969 9.84375 9.960938 10.828125 Z "></path>
                </g>
                </svg>`,
                name: "Microsoft Edge",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-windows-store:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 13.769531 4.011719 C 13.53125 4.027344 13.289063 4.078125 13.050781 4.15625 L 11.050781 4.820313 C 9.828125 5.230469 9 6.382813 9 7.667969 L 9 10.957031 L 5 11.519531 L 5 26.480469 L 23 29 L 27 27.679688 L 27 10.4375 L 23 9 L 21 9.28125 L 21 8 C 21 6.488281 19.855469 5.285156 18.476563 5.046875 C 18.015625 4.96875 17.53125 4.996094 17.050781 5.15625 L 16.480469 5.347656 C 16.015625 4.667969 15.289063 4.1875 14.476563 4.046875 C 14.246094 4.007813 14.011719 3.996094 13.769531 4.011719 Z M 13.933594 6 C 14.507813 5.945313 15 6.378906 15 7 L 15 10.121094 L 11 10.679688 L 11 7.667969 C 11 7.234375 11.269531 6.859375 11.683594 6.71875 L 13.683594 6.054688 C 13.769531 6.023438 13.851563 6.007813 13.933594 6 Z M 17.933594 7 C 18.507813 6.949219 19 7.378906 19 8 L 19 9.5625 L 17 9.839844 L 17 7.28125 L 17.683594 7.054688 C 17.769531 7.023438 17.851563 7.007813 17.933594 7 Z M 22.785156 11.046875 L 25 11.84375 L 25 26.234375 L 22.816406 26.953125 L 7 24.738281 L 7 13.261719 Z M 19 13.597656 L 14 14.300781 L 14 18 L 19 18 Z M 13 14.4375 L 9 15 L 9 18 L 13 18 Z M 9 19 L 9 22 L 13 22.5625 L 13 19 Z M 14 19 L 14 22.699219 L 19 23.402344 L 19 19 Z "></path>
                </g>
                </svg>`,
                name: "Microsoft Store",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-holocamera:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 8 5 C 6.171875 5 4.996094 6.074219 4.5 7.0625 C 4.300781 7.457031 4.195313 7.832031 4.125 8.15625 C 2.90625 8.539063 2 9.664063 2 11 L 2 24 C 2 25.644531 3.355469 27 5 27 L 12 27 C 13.320313 27 14.519531 26.203125 15.0625 25 L 16.9375 25 C 17.476563 26.203125 18.679688 27 20 27 L 27 27 C 28.644531 27 30 25.644531 30 24 L 30 11 C 30 9.664063 29.09375 8.539063 27.875 8.15625 C 27.804688 7.832031 27.699219 7.457031 27.5 7.0625 C 27.003906 6.078125 25.820313 5 24 5 Z M 8 7 L 24 7 C 25.148438 7 25.457031 7.421875 25.71875 7.9375 C 25.730469 7.960938 25.738281 7.976563 25.75 8 L 6.25 8 C 6.261719 7.976563 6.269531 7.960938 6.28125 7.9375 C 6.539063 7.425781 6.839844 7 8 7 Z M 5 10 L 27 10 C 27.566406 10 28 10.433594 28 11 L 28 24 C 28 24.566406 27.566406 25 27 25 L 20 25 C 19.457031 25 18.964844 24.667969 18.75 24.15625 L 17.71875 21.40625 L 17.71875 21.375 L 17.6875 21.34375 C 17.390625 20.648438 16.726563 20.1875 15.96875 20.1875 C 15.207031 20.1875 14.515625 20.648438 14.21875 21.34375 L 14.1875 21.375 L 14.1875 21.4375 L 13.25 24.15625 C 13.03125 24.667969 12.542969 25 12 25 L 5 25 C 4.433594 25 4 24.566406 4 24 L 4 11 C 4 10.433594 4.433594 10 5 10 Z M 10 13 C 7.800781 13 6 14.800781 6 17 C 6 19.199219 7.800781 21 10 21 C 12.199219 21 14 19.199219 14 17 C 14 14.800781 12.199219 13 10 13 Z M 22 13 C 19.800781 13 18 14.800781 18 17 C 18 19.199219 19.800781 21 22 21 C 24.199219 21 26 19.199219 26 17 C 26 14.800781 24.199219 13 22 13 Z M 10 15 C 11.117188 15 12 15.882813 12 17 C 12 18.117188 11.117188 19 10 19 C 8.882813 19 8 18.117188 8 17 C 8 15.882813 8.882813 15 10 15 Z M 22 15 C 23.117188 15 24 15.882813 24 17 C 24 18.117188 23.117188 19 22 19 C 20.882813 19 20 18.117188 20 17 C 20 15.882813 20.882813 15 22 15 Z M 15.96875 22.4375 L 16.1875 23 L 15.78125 23 Z "></path>
                </g>
                </svg>`,
                name: "Mixed Reality Camera",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-holographicfirstrun:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 8 5 C 6.171875 5 4.996094 6.074219 4.5 7.0625 C 4.300781 7.457031 4.195313 7.832031 4.125 8.15625 C 2.90625 8.539063 2 9.664063 2 11 L 2 24 C 2 25.644531 3.355469 27 5 27 L 12 27 C 13.320313 27 14.519531 26.203125 15.0625 25 L 16.9375 25 C 17.476563 26.203125 18.679688 27 20 27 L 27 27 C 28.644531 27 30 25.644531 30 24 L 30 11 C 30 9.664063 29.09375 8.539063 27.875 8.15625 C 27.804688 7.832031 27.699219 7.457031 27.5 7.0625 C 27.003906 6.078125 25.820313 5 24 5 Z M 8 7 L 24 7 C 25.148438 7 25.457031 7.421875 25.71875 7.9375 C 25.730469 7.960938 25.738281 7.976563 25.75 8 L 6.25 8 C 6.261719 7.976563 6.269531 7.960938 6.28125 7.9375 C 6.539063 7.425781 6.839844 7 8 7 Z M 5 10 L 27 10 C 27.566406 10 28 10.433594 28 11 L 28 24 C 28 24.566406 27.566406 25 27 25 L 20 25 C 19.457031 25 18.964844 24.667969 18.75 24.15625 L 17.71875 21.40625 L 17.71875 21.375 L 17.6875 21.34375 C 17.390625 20.648438 16.726563 20.1875 15.96875 20.1875 C 15.207031 20.1875 14.515625 20.648438 14.21875 21.34375 L 14.1875 21.375 L 14.1875 21.4375 L 13.25 24.15625 C 13.03125 24.667969 12.542969 25 12 25 L 5 25 C 4.433594 25 4 24.566406 4 24 L 4 11 C 4 10.433594 4.433594 10 5 10 Z M 10 13 C 7.800781 13 6 14.800781 6 17 C 6 19.199219 7.800781 21 10 21 C 12.199219 21 14 19.199219 14 17 C 14 14.800781 12.199219 13 10 13 Z M 22 13 C 19.800781 13 18 14.800781 18 17 C 18 19.199219 19.800781 21 22 21 C 24.199219 21 26 19.199219 26 17 C 26 14.800781 24.199219 13 22 13 Z M 10 15 C 11.117188 15 12 15.882813 12 17 C 12 18.117188 11.117188 19 10 19 C 8.882813 19 8 18.117188 8 17 C 8 15.882813 8.882813 15 10 15 Z M 22 15 C 23.117188 15 24 15.882813 24 17 C 24 18.117188 23.117188 19 22 19 C 20.882813 19 20 18.117188 20 17 C 20 15.882813 20.882813 15 22 15 Z M 15.96875 22.4375 L 16.1875 23 L 15.78125 23 Z "></path>
                </g>
                </svg>`,
                name: "Mixed Reality Portal",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}mswindowsvideo:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 3 6 L 3 26 L 29 26 L 29 6 Z M 5 8 L 8.25 8 L 9.59375 10 L 8.25 12 L 5 12 Z M 10.65625 8 L 13.0625 8 L 14.40625 10 L 13.0625 12 L 10.65625 12 L 11.625 10.5625 L 12 10 L 11.625 9.4375 Z M 15.46875 8 L 17.84375 8 L 19.1875 10 L 17.84375 12 L 15.46875 12 L 16.4375 10.5625 L 16.8125 10 L 16.4375 9.4375 Z M 20.25 8 L 22.65625 8 L 24 10 L 22.65625 12 L 20.25 12 L 21.21875 10.5625 L 21.59375 10 L 21.21875 9.4375 Z M 25.0625 8 L 27 8 L 27 12 L 25.0625 12 L 26.03125 10.5625 L 26.40625 10 L 26.03125 9.4375 Z M 7 9 C 6.449219 9 6 9.449219 6 10 C 6 10.550781 6.449219 11 7 11 C 7.550781 11 8 10.550781 8 10 C 8 9.449219 7.550781 9 7 9 Z M 5 14 L 27 14 L 27 24 L 5 24 Z "></path>
                </g>
                </svg>`,
                name: "Movies & TV",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}bingnews:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 3 5 L 3 23 C 3 25.210938 4.789063 27 7 27 L 25 27 C 27.210938 27 29 25.210938 29 23 L 29 12 L 23 12 L 23 5 Z M 5 7 L 21 7 L 21 23 C 21 23.730469 21.222656 24.410156 21.5625 25 L 7 25 C 5.808594 25 5 24.191406 5 23 Z M 7 9 L 7 14 L 19 14 L 19 9 Z M 9 11 L 17 11 L 17 12 L 9 12 Z M 23 14 L 27 14 L 27 23 C 27 24.191406 26.191406 25 25 25 C 23.808594 25 23 24.191406 23 23 Z M 7 15 L 7 17 L 12 17 L 12 15 Z M 14 15 L 14 17 L 19 17 L 19 15 Z M 7 18 L 7 20 L 12 20 L 12 18 Z M 14 18 L 14 20 L 19 20 L 19 18 Z M 7 21 L 7 23 L 12 23 L 12 21 Z M 14 21 L 14 23 L 19 23 L 19 21 Z "></path>
                </g>
                </svg>`,
                name: "News",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}onenote:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 15.875 4 L 15.78125 4.03125 L 4.78125 6.46875 L 4 6.65625 L 4 25.34375 L 4.78125 25.53125 L 15.78125 27.96875 L 15.875 28 L 18 28 L 18 25 L 25 25 L 25 13 L 28 13 L 28 7 L 18 7 L 18 4 Z M 16 6.03125 L 16 25.96875 L 6 23.78125 L 6 8.21875 Z M 18 9 L 26 9 L 26 11 L 23 11 L 23 23 L 18 23 L 18 21 L 22 21 L 22 19 L 18 19 L 18 18 L 22 18 L 22 16 L 18 16 L 18 15 L 22 15 L 22 13 L 18 13 L 18 12 L 22 12 L 22 10 L 18 10 Z M 14 11 L 12 11.34375 L 12 17 L 10.1875 11.625 L 8 12 L 8 20 L 10 20.34375 L 10 15 L 11.875 20.65625 L 14 21 Z M 26 14 L 26 19 L 28 19 L 28 14 Z M 26 20 L 26 25 L 28 25 L 28 20 Z "></path>
                </g>
                </svg>`,
                name: "OneNote",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-paint:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 15.59375 2.96875 C 15.0625 2.984375 14.515625 3.042969 13.96875 3.125 L 13.9375 3.125 C 8.613281 3.996094 4.300781 8.191406 3.21875 13.5 C 2.894531 15.011719 2.914063 16.421875 3.125 17.8125 C 3.132813 17.816406 3.125 17.835938 3.125 17.84375 C 3.453125 20.191406 6.5 21.21875 8.21875 19.5 C 9.449219 18.269531 11.269531 18.269531 12.5 19.5 C 13.730469 20.730469 13.730469 22.550781 12.5 23.78125 C 10.78125 25.5 11.808594 28.546875 14.15625 28.875 C 14.164063 28.875 14.183594 28.867188 14.1875 28.875 C 15.566406 29.085938 16.96875 29.097656 18.46875 28.78125 C 18.480469 28.78125 18.488281 28.78125 18.5 28.78125 C 23.824219 27.789063 28.007813 23.375 28.875 18.0625 L 28.875 18.03125 C 30.007813 10.390625 24.421875 3.71875 17.15625 3.03125 C 16.636719 2.980469 16.125 2.953125 15.59375 2.96875 Z M 15.625 4.96875 C 16.078125 4.953125 16.527344 4.960938 16.96875 5 C 23.164063 5.566406 27.875 11.214844 26.90625 17.75 C 26.175781 22.226563 22.585938 25.992188 18.125 26.8125 L 18.09375 26.8125 C 16.816406 27.085938 15.636719 27.089844 14.4375 26.90625 C 13.617188 26.804688 13.238281 25.886719 13.90625 25.21875 C 15.875 23.25 15.875 20.0625 13.90625 18.09375 C 11.9375 16.125 8.75 16.125 6.78125 18.09375 C 6.113281 18.761719 5.195313 18.382813 5.09375 17.5625 C 4.910156 16.363281 4.914063 15.183594 5.1875 13.90625 C 6.105469 9.417969 9.773438 5.824219 14.25 5.09375 C 14.71875 5.023438 15.171875 4.984375 15.625 4.96875 Z M 14 7 C 12.894531 7 12 7.894531 12 9 C 12 10.105469 12.894531 11 14 11 C 15.105469 11 16 10.105469 16 9 C 16 7.894531 15.105469 7 14 7 Z M 21 9 C 19.894531 9 19 9.894531 19 11 C 19 12.105469 19.894531 13 21 13 C 22.105469 13 23 12.105469 23 11 C 23 9.894531 22.105469 9 21 9 Z M 9 11 C 7.894531 11 7 11.894531 7 13 C 7 14.105469 7.894531 15 9 15 C 10.105469 15 11 14.105469 11 13 C 11 11.894531 10.105469 11 9 11 Z M 23 16 C 21.894531 16 21 16.894531 21 18 C 21 19.105469 21.894531 20 23 20 C 24.105469 20 25 19.105469 25 18 C 25 16.894531 24.105469 16 23 16 Z M 19 21 C 17.894531 21 17 21.894531 17 23 C 17 24.105469 17.894531 25 19 25 C 20.105469 25 21 24.105469 21 23 C 21 21.894531 20.105469 21 19 21 Z "></path>
                </g>
                </svg>`,
                name: "Paint 3D",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-people:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 8 C 13.25 8 11 10.25 11 13 C 11 14.515625 11.707031 15.863281 12.78125 16.78125 C 11.714844 17.339844 10.78125 18.183594 10.125 19.1875 C 9.769531 18.671875 9.300781 18.195313 8.78125 17.84375 C 9.523438 17.117188 10 16.113281 10 15 C 10 12.800781 8.199219 11 6 11 C 3.800781 11 2 12.800781 2 15 C 2 16.113281 2.476563 17.117188 3.21875 17.84375 C 1.886719 18.746094 1 20.285156 1 22 L 3 22 C 3 20.34375 4.34375 19 6 19 C 7.65625 19 9 20.34375 9 22 L 9 23 L 11 23 C 11 20.246094 13.246094 18 16 18 C 18.753906 18 21 20.246094 21 23 L 23 23 L 23 22 C 23 20.34375 24.34375 19 26 19 C 27.65625 19 29 20.34375 29 22 L 31 22 C 31 20.285156 30.113281 18.746094 28.78125 17.84375 C 29.523438 17.117188 30 16.113281 30 15 C 30 12.800781 28.199219 11 26 11 C 23.800781 11 22 12.800781 22 15 C 22 16.113281 22.476563 17.117188 23.21875 17.84375 C 22.699219 18.195313 22.230469 18.671875 21.875 19.1875 C 21.21875 18.183594 20.285156 17.339844 19.21875 16.78125 C 20.292969 15.863281 21 14.515625 21 13 C 21 10.25 18.75 8 16 8 Z M 16 10 C 17.667969 10 19 11.332031 19 13 C 19 14.667969 17.667969 16 16 16 C 14.332031 16 13 14.667969 13 13 C 13 11.332031 14.332031 10 16 10 Z M 6 13 C 7.117188 13 8 13.882813 8 15 C 8 16.117188 7.117188 17 6 17 C 4.882813 17 4 16.117188 4 15 C 4 13.882813 4.882813 13 6 13 Z M 26 13 C 27.117188 13 28 13.882813 28 15 C 28 16.117188 27.117188 17 26 17 C 24.882813 17 24 16.117188 24 15 C 24 13.882813 24.882813 13 26 13 Z "></path>
                </g>
                </svg>`,
                name: "People",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-get-started:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 6.8125 2.40625 L 5.40625 3.8125 L 7.5 5.90625 L 8.90625 4.5 Z M 25.1875 2.40625 L 23.09375 4.5 L 24.5 5.90625 L 26.59375 3.8125 Z M 16 3.03125 C 15.671875 3.035156 15.335938 3.054688 15 3.09375 C 14.988281 3.09375 14.980469 3.09375 14.96875 3.09375 C 10.914063 3.558594 7.6875 6.835938 7.125 10.875 C 6.675781 14.125 8.015625 17.070313 10.25 18.96875 C 11.207031 19.789063 11.796875 20.882813 12 22 L 12 28 L 14.28125 28 C 14.628906 28.597656 15.261719 29 16 29 C 16.738281 29 17.371094 28.597656 17.71875 28 L 20 28 L 20 24 L 20.09375 24 L 20.09375 22.8125 C 20.09375 21.347656 20.855469 19.867188 22.09375 18.71875 C 23.75 17.0625 25 14.707031 25 12 C 25 7.058594 20.933594 2.984375 16 3.03125 Z M 16 5.03125 C 19.863281 4.976563 23 8.140625 23 12 C 23 14.09375 22.03125 15.9375 20.6875 17.28125 L 20.71875 17.3125 C 19.375 18.566406 18.515625 20.207031 18.28125 22 L 13.90625 22 C 13.6875 20.285156 12.949219 18.628906 11.5625 17.4375 C 9.796875 15.933594 8.742188 13.675781 9.09375 11.125 C 9.53125 7.972656 12.085938 5.441406 15.21875 5.09375 C 15.480469 5.0625 15.742188 5.035156 16 5.03125 Z M 2 12 L 2 14 L 5 14 L 5 12 Z M 27 12 L 27 14 L 30 14 L 30 12 Z M 7.5 20.09375 L 5.40625 22.1875 L 6.8125 23.59375 L 8.90625 21.5 Z M 24.5 20.09375 L 23.09375 21.5 L 25.1875 23.59375 L 26.59375 22.1875 Z M 14 24 L 18 24 L 18 26 L 14 26 Z "></path>
                </g>
                </svg>`,
                name: "Tips",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}com.microsoft.3dviewer:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 5 5 L 5 22.40625 L 5.28125 22.71875 L 9.28125 26.71875 L 9.59375 27 L 27 27 L 27 9.59375 L 26.71875 9.28125 L 22.71875 5.28125 L 22.40625 5 Z M 8.4375 7 L 21.5625 7 L 24.5625 10 L 11.4375 10 Z M 7 8.4375 L 10 11.4375 L 10 24.5625 L 7 21.5625 Z "></path>
                </g>
                </svg>`,
                name: "View 3D Preview",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-callrecording:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 13 4 C 11.90625 4 11 4.90625 11 6 L 11 18 C 11 19.09375 11.90625 20 13 20 L 19 20 C 20.09375 20 21 19.09375 21 18 L 21 6 C 21 4.90625 20.09375 4 19 4 Z M 13 6 L 19 6 L 19 18 L 13 18 Z M 7 14 L 7 18 C 7 21.300781 9.699219 24 13 24 L 15 24 L 15 26 L 11 26 L 11 28 L 21 28 L 21 26 L 17 26 L 17 24 L 19 24 C 22.300781 24 25 21.300781 25 18 L 25 14 L 23 14 L 23 18 C 23 20.21875 21.21875 22 19 22 L 13 22 C 10.78125 22 9 20.21875 9 18 L 9 14 Z "></path>
                </g>
                </svg>`,
                name: "Voice Recorder",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}bingweather:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 9 6 L 9 9.09375 C 8.367188 9.222656 7.773438 9.496094 7.25 9.84375 L 5.0625 7.625 L 3.625 9.0625 L 5.84375 11.25 C 5.496094 11.773438 5.222656 12.367188 5.09375 13 L 2 13 L 2 15 L 5.125 15 C 5.253906 15.628906 5.507813 16.199219 5.84375 16.71875 L 3.625 18.9375 L 4.25 19.5625 C 4.113281 20.019531 4 20.5 4 21 C 4 23.757813 6.242188 26 9 26 L 25 26 C 27.757813 26 30 23.757813 30 21 C 30 18.980469 28.789063 17.179688 26.96875 16.40625 C 26.6875 13.988281 24.65625 12.097656 22.1875 12 C 21.125 10.152344 19.164063 9 17 9 C 16.773438 9 16.5625 9.007813 16.34375 9.03125 L 14.9375 7.625 L 12.75 9.84375 C 12.226563 9.507813 11.628906 9.253906 11 9.125 L 11 6 Z M 10 11 C 10.765625 11 11.445313 11.285156 11.96875 11.75 C 11.707031 12.152344 11.472656 12.597656 11.3125 13.0625 C 9.730469 13.332031 8.460938 14.542969 8.09375 16.09375 C 8.039063 16.101563 7.988281 16.113281 7.9375 16.125 C 7.378906 15.582031 7 14.847656 7 14 C 7 12.332031 8.332031 11 10 11 Z M 17 11 C 18.605469 11 20.054688 11.960938 20.6875 13.4375 L 20.96875 14.125 L 21.875 14.03125 C 21.917969 14.023438 21.953125 14 22 14 C 23.652344 14 24.996094 15.351563 25 16.9375 L 24.96875 17.90625 L 25.75 18.09375 C 27.082031 18.433594 28 19.636719 28 21 C 28 22.652344 26.652344 24 25 24 L 9 24 C 7.347656 24 6 22.652344 6 21 C 6 19.347656 7.347656 18 9 18 L 10 18 L 10 17 C 10 15.898438 10.894531 15.003906 11.90625 15 L 12.90625 15.0625 L 13.09375 14.21875 C 13.46875 12.359375 15.101563 11 17 11 Z "></path>
                </g>
                </svg>`,
                name: "Weather",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}windowsdefender:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 16 4 C 13.75 4 12.234375 4.886719 10.875 5.625 C 9.515625 6.363281 8.28125 7 6 7 L 5 7 L 5 8 C 5 15.71875 7.609375 20.742188 10.25 23.78125 C 12.890625 26.820313 15.625 27.9375 15.625 27.9375 L 16 28.0625 L 16.375 27.9375 C 16.375 27.9375 19.109375 26.84375 21.75 23.8125 C 24.390625 20.78125 27 15.746094 27 8 L 27 7 L 26 7 C 23.730469 7 22.484375 6.363281 21.125 5.625 C 19.765625 4.886719 18.25 4 16 4 Z M 16 6 C 17.75 6 18.753906 6.613281 20.15625 7.375 C 21.339844 8.019531 22.910156 8.636719 24.9375 8.84375 C 24.746094 15.609375 22.507813 19.910156 20.25 22.5 C 18.203125 24.847656 16.484375 25.628906 16 25.84375 C 15.511719 25.625 13.796875 24.824219 11.75 22.46875 C 9.492188 19.871094 7.253906 15.578125 7.0625 8.84375 C 9.097656 8.636719 10.660156 8.019531 11.84375 7.375 C 13.246094 6.613281 14.25 6 16 6 Z "></path>
                </g>
                </svg>`,
                name: "Windows Defender Security Center",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}ms-wpc:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                <g id="surface1">
                <path d="M 9 6 C 6.25 6 4 8.25 4 11 C 4 12.515625 4.707031 13.863281 5.78125 14.78125 C 3.542969 15.953125 2 18.316406 2 21 L 4 21 C 4 18.246094 6.246094 16 9 16 C 10.382813 16 11.5 16.476563 12.375 17.34375 C 12.140625 17.851563 12 18.410156 12 19 C 12 20.113281 12.476563 21.117188 13.21875 21.84375 C 11.886719 22.746094 11 24.285156 11 26 L 13 26 C 13 24.34375 14.34375 23 16 23 C 17.65625 23 19 24.34375 19 26 L 21 26 C 21 24.285156 20.113281 22.746094 18.78125 21.84375 C 19.523438 21.117188 20 20.113281 20 19 C 20 18.410156 19.859375 17.851563 19.625 17.34375 C 20.5 16.476563 21.617188 16 23 16 C 25.753906 16 28 18.246094 28 21 L 30 21 C 30 18.316406 28.457031 15.953125 26.21875 14.78125 C 27.292969 13.863281 28 12.515625 28 11 C 28 8.25 25.75 6 23 6 C 20.25 6 18 8.25 18 11 C 18 12.515625 18.707031 13.863281 19.78125 14.78125 C 19.265625 15.050781 18.804688 15.417969 18.375 15.8125 C 17.707031 15.308594 16.894531 15 16 15 C 15.105469 15 14.292969 15.308594 13.625 15.8125 C 13.195313 15.417969 12.734375 15.050781 12.21875 14.78125 C 13.292969 13.863281 14 12.515625 14 11 C 14 8.25 11.75 6 9 6 Z M 9 8 C 10.667969 8 12 9.332031 12 11 C 12 12.667969 10.667969 14 9 14 C 7.332031 14 6 12.667969 6 11 C 6 9.332031 7.332031 8 9 8 Z M 23 8 C 24.667969 8 26 9.332031 26 11 C 26 12.667969 24.667969 14 23 14 C 21.332031 14 20 12.667969 20 11 C 20 9.332031 21.332031 8 23 8 Z M 16 17 C 17.117188 17 18 17.882813 18 19 C 18 20.117188 17.117188 21 16 21 C 14.882813 21 14 20.117188 14 19 C 14 17.882813 14.882813 17 16 17 Z "></path>
                </g>
                </svg>`,
                name: "Windows Parental Controls",
            },
            {
                executionArgument: `${WindowsSettingsHelpers.windowsSettingsPrefix}xbox:`,
                icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1">
                        <g id="surface1">
                            <path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 16.09375 6 16.1875 6.027344 16.28125 6.03125 C 16.535156 6.039063 16.78125 6.039063 17.03125 6.0625 C 17.0625 6.066406 17.09375 6.058594 17.125 6.0625 C 17.21875 6.074219 17.3125 6.082031 17.40625 6.09375 C 17.46875 6.101563 17.53125 6.113281 17.59375 6.125 C 17.980469 6.1875 18.347656 6.269531 18.71875 6.375 C 19.109375 6.484375 19.507813 6.625 19.875 6.78125 C 19.882813 6.785156 19.898438 6.777344 19.90625 6.78125 C 20.070313 6.851563 20.21875 6.953125 20.375 7.03125 C 20.582031 7.132813 20.800781 7.226563 21 7.34375 C 21.054688 7.375 21.105469 7.40625 21.15625 7.4375 C 21.222656 7.460938 21.304688 7.511719 21.40625 7.59375 C 21.410156 7.597656 21.402344 7.621094 21.40625 7.625 C 19.757813 6.675781 16.03125 9.6875 16.03125 9.6875 C 14.554688 8.558594 13.214844 7.792969 12.21875 7.53125 C 11.570313 7.367188 11.078125 7.402344 10.75 7.53125 C 10.910156 7.429688 11.050781 7.308594 11.21875 7.21875 C 11.230469 7.210938 11.238281 7.195313 11.25 7.1875 C 11.503906 7.042969 11.765625 6.929688 12.03125 6.8125 C 12.050781 6.804688 12.074219 6.789063 12.09375 6.78125 C 12.28125 6.699219 12.464844 6.628906 12.65625 6.5625 C 12.828125 6.5 13.011719 6.457031 13.1875 6.40625 C 13.445313 6.332031 13.703125 6.242188 13.96875 6.1875 C 14.050781 6.171875 14.136719 6.171875 14.21875 6.15625 C 14.433594 6.117188 14.652344 6.085938 14.875 6.0625 C 14.90625 6.058594 14.9375 6.066406 14.96875 6.0625 C 15.304688 6.027344 15.652344 6 16 6 Z M 22 8.59375 C 22.292969 8.59375 22.636719 8.65625 22.9375 8.84375 C 22.976563 8.878906 23.027344 8.902344 23.0625 8.9375 C 23.117188 8.984375 23.167969 9.035156 23.21875 9.09375 C 23.359375 9.238281 23.496094 9.378906 23.625 9.53125 C 23.652344 9.566406 23.691406 9.589844 23.71875 9.625 C 23.796875 9.71875 23.863281 9.808594 23.9375 9.90625 C 24.058594 10.066406 24.167969 10.238281 24.28125 10.40625 C 24.460938 10.671875 24.628906 10.933594 24.78125 11.21875 C 24.925781 11.480469 25.070313 11.753906 25.1875 12.03125 C 25.195313 12.050781 25.210938 12.074219 25.21875 12.09375 C 25.25 12.167969 25.28125 12.238281 25.3125 12.3125 C 25.402344 12.542969 25.488281 12.792969 25.5625 13.03125 C 25.660156 13.34375 25.746094 13.644531 25.8125 13.96875 C 25.820313 14.011719 25.835938 14.050781 25.84375 14.09375 C 25.960938 14.707031 26 15.351563 26 16 C 26 18.421875 25.144531 20.648438 23.71875 22.375 C 23.636719 22.472656 23.554688 22.5625 23.46875 22.65625 C 23.945313 20.140625 23.070313 18.285156 21.65625 15.96875 C 20.179688 13.621094 17.84375 11.3125 17.84375 11.3125 C 19.925781 9.355469 21.652344 8.722656 22 8.59375 Z M 9.875 8.65625 C 10.527344 8.699219 11.203125 8.953125 11.8125 9.34375 L 11.875 9.375 C 13.175781 10.15625 14.21875 11.3125 14.21875 11.3125 C 13.089844 12.398438 10.378906 15.6875 9.46875 17.90625 C 8.125 21.296875 8.75 22.78125 8.75 22.78125 C 8.921875 20.910156 11.691406 17.605469 12.6875 16.5625 C 13.207031 15.953125 14.21875 14.96875 15 14.1875 C 15.5625 13.578125 16.03125 13.09375 16.03125 13.09375 C 16.335938 13.398438 16.644531 13.707031 16.90625 13.96875 C 18.164063 15.230469 19.101563 16.230469 19.75 16.96875 C 20.402344 17.707031 21.539063 19.097656 21.84375 19.53125 C 23.148438 21.386719 23.394531 22.644531 23.40625 22.71875 C 23.296875 22.839844 23.179688 22.945313 23.0625 23.0625 C 22.835938 23.289063 22.621094 23.515625 22.375 23.71875 C 22.128906 23.921875 21.859375 24.101563 21.59375 24.28125 C 21.328125 24.460938 21.066406 24.628906 20.78125 24.78125 C 20.5625 24.898438 20.351563 25.023438 20.125 25.125 C 20.082031 25.144531 20.042969 25.167969 20 25.1875 C 19.726563 25.304688 19.441406 25.40625 19.15625 25.5 C 19.132813 25.507813 19.117188 25.523438 19.09375 25.53125 C 18.835938 25.613281 18.578125 25.6875 18.3125 25.75 C 18.21875 25.773438 18.128906 25.792969 18.03125 25.8125 C 17.839844 25.851563 17.632813 25.847656 17.4375 25.875 C 16.980469 25.941406 16.507813 26 16.03125 26 C 15.675781 26 15.3125 25.972656 14.96875 25.9375 C 14.308594 25.867188 13.675781 25.753906 13.0625 25.5625 C 13.054688 25.558594 13.039063 25.566406 13.03125 25.5625 C 12.105469 25.269531 11.226563 24.816406 10.4375 24.28125 C 10.429688 24.277344 10.414063 24.285156 10.40625 24.28125 C 9.882813 23.925781 9.414063 23.507813 8.96875 23.0625 C 7.164063 21.253906 6.0625 18.761719 6.0625 16 C 6.0625 13.347656 7.101563 10.96875 8.75 9.1875 C 8.75 9.1875 9.179688 8.65625 9.875 8.65625 Z "></path>
                        </g>
                    </svg>`,
                name: "Xbox",
            },
        ] as SearchResultItem[];
    }
}
