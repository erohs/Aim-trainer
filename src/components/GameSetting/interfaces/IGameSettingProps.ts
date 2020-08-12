import { IStateTypes } from '../../../App';
import { SettingTypes, SettingNames } from '../../../enums'
export interface IGameSettingProps {
    type: SettingTypes,
    name: SettingNames,
    values?: Array<string>,
    gameSettings: IStateTypes<string>,
    updateGameSettings: Function
};