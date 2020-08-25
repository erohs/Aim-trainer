import { ISettings } from './interfaces/ISettings';
import { SettingTypes } from '../../enums';

export let Settings: ISettings = {
    gamemode: {
        types: ["Clicking"],
        values: ["clicking"],
        weight: [1],
        type: SettingTypes.select,
        default: "clicking"
    },
    difficulty: {
        types: ["Easy", "Medium", "Hard", "Very Hard"],
        values: [0, 1, 2, 3],
        weight: [1, 1.25, 1.5, 2],
        type: SettingTypes.select,
        default: 0
    },
    duration: {
        types: ["15 seconds", "30 seconds", "60 seconds", "90 seconds", "120 seconds"],
        values: [15, 30, 60, 90, 120],
        weight: [1, 1.2, 1.4, 1.6, 1.8],
        type: SettingTypes.select,
        default: 30
    },
    sizes: {
        types: ["Tiny", "Small", "Medium", "Large"],
        values: [10, 20, 40, 80],
        weight: [2, 1.5, 1.25, 1],
        type: SettingTypes.select,
        default: 40
    },
    cursor: {
        types: ["Default", "Crosshair"],
        values: ["default", "crosshair"],
        weight: [1, 1],
        type: SettingTypes.select,
        default: "crosshair"
    },
    // sound: {
    //     types: ["On", "Off"],
    //     values: [true, false],
    //     type: SettingTypes.toggle,
    //     default: true
    // },
    colour: {
        types: ["Default"],
        values: ["#FF0000"],
        weight: [1],
        type: SettingTypes.colour,
        default: "#FF0000"
    }
}
