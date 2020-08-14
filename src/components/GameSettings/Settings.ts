import { ISettings } from './interfaces/ISettings';
import { SettingTypes } from '../../enums';

export let Settings: ISettings = {
    difficulty: {
        types: ["Easy", "Medium", "Hard", "Very Hard"],
        values: [1000, 800, 600, 400],
        type: SettingTypes.select,
        defaultIndex: 1
    },
    duration: {
        types: ["15 seconds", "30 seconds", "60 seconds", "90 seconds", "120 seconds"],
        values: [15, 30, 60, 90, 120],
        type: SettingTypes.select,
        defaultIndex: 1
    },
    sizes: {
        types: ["Tiny", "Small", "Medium", "Large"],
        values: [10, 20, 40, 80],
        type: SettingTypes.select,
        defaultIndex: 2
    },
    cursor: {
        types: ["Default", "Crosshair"],
        values: ["default", "crosshair"],
        type: SettingTypes.select,
        defaultIndex: 1
    },
    sound: {
        types: ["On", "Off"],
        values: [true, false],
        type: SettingTypes.toggle,
        defaultIndex: 1
    },
    colour: {
        types: ["Default"],
        values: ["#FF0000"],
        type: SettingTypes.colour,
        defaultIndex: 0
    }
}