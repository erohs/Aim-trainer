import { IStateTypes } from '../../../App';

export interface IGameStartProps {
    authenticate: Function
    logout: () => void
    user: IStateTypes<any>
};