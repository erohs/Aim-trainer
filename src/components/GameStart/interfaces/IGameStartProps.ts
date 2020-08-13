import { IStateTypes } from "../../../App";

export interface IGameStartProps {
    logout: Function
    authenticate: Function
    user: IStateTypes<any>
}
