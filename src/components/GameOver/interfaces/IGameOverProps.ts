import { IStateTypes } from '../../../App';

export interface IGameOverProps {
    clickCount: IStateTypes<number>
    targetCount: IStateTypes<number>
    score: number
};
