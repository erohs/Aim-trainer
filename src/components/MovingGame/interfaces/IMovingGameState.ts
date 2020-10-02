import { IStateTypes } from '../../../App';
import { IResults } from '../../../helpers/ResultsHelper';

export interface IMovingGameState {
    targets: IStateTypes<any>
    settings: IStateTypes<any>
    results: IResults
    redirect: boolean
    timer: number
}
