import { IStateTypes } from '../App';
import { Settings } from '../components/GameSettings/Settings';

export const setDefaultSettings = () => {
    let defaultSettings: IStateTypes<string | number | boolean> = {};
    for (const setting in Settings) {
        defaultSettings[setting] = Settings[setting].default;
    };
    localStorage.setItem("settings", JSON.stringify(defaultSettings));
}