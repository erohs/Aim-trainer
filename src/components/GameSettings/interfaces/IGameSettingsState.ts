import { IStateTypes } from '../../../App';

export interface IGameSettingsState {
    settings: IStateTypes<string | number | boolean>
}
