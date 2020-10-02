import { IResults } from '../../../helpers/ResultsHelper';

export interface IResultsPageState {
    results: IResults,
    name: string,
    loaded: boolean
}
