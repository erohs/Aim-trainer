import { IStateTypes } from '../../../App';

export interface ISetupPageProps {
    authenticate: Function
    logout: () => void
    user: IStateTypes<any>
};