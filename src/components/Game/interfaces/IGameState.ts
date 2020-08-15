import { IStateTypes } from '../../../App';
import { IResults } from '../../../helpers/ResultsHelper';

export interface IGameState {
    targets: IStateTypes<any>
    settings: IStateTypes<any>
    gameover: boolean
    results: IResults
    timer: number
}
