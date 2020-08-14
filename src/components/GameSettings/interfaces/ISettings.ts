import { IStateTypes } from '../../../App';
import { SettingTypes } from '../../../enums';

export interface IGameSettingsValues {
    [key: string]: IStateTypes<string | number | boolean | Array<string | number | boolean>>
}

interface ISetting {
    types: Array<string>
    values: Array<string | boolean | number>
    type: SettingTypes
    default: string | boolean | number
}

export interface ISettings {
    [key: string]: ISetting
}
