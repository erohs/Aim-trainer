import { IStateTypes } from '../../../App';

export interface IMovingTargetProps {
    index: number
    targets: IStateTypes<any>
    removeOnClick: (id: number) => void
    position: Array<number>
    settings: IStateTypes<any>
};
