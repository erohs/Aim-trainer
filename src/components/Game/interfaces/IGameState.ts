import { IStateTypes } from '../../../App';

export interface IGameState {
    targets: IStateTypes<any>
    settings: IStateTypes<any>
    gameover: boolean
    targetCount: IStateTypes<number>
    clickCount: IStateTypes<number>
    score: number,
    timer: number
}
