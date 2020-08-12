import { IStateTypes } from '../../../App';

export interface IGameSettingsProps {
    gameSettings: IStateTypes<string>
    updateGameSettings: Function
}
