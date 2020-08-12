import { IStateTypes } from '../../../App';

export interface ISetupPageProps {
    gameSettings: IStateTypes<string>
    updateGameSettings: Function
    title: string
    authenticate: Function
    logout: () => void
    user: IStateTypes<any>
};