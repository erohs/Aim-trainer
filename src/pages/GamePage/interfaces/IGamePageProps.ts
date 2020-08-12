import { IStateTypes } from '../../../App';

export interface IGameProps {
    gameSettings: IStateTypes<string>
    user: IStateTypes<any>
};