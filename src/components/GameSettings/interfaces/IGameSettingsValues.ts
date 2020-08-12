import { IStateTypes } from '../../../App';

export interface IGameSettingsValues {
    [key: string]: IStateTypes<string | number | boolean>
}