import { IStateTypes } from '../../../App';

export interface IGameState {
    targets: IStateTypes<any>
    settings: IStateTypes<any>
    playing: boolean
    gameover: boolean
    targetCount: IStateTypes<number>
    clickCount: IStateTypes<number>
    score: number
}