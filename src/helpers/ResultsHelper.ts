import { IStateTypes } from '../App';

export interface IResults {
    score: number,
    combo: number,
    targets: IStateTypes<number>,
    clicks: IStateTypes<number>,
    settings: IStateTypes<string | number | boolean>
}

export const defaultResults: IResults = {
    score: 0,
    combo: 1,
    targets: {
        total: 0,
        hits: 0,
        missed: 0,
        perSecond: 0,
        efficiency: 0
    },
    clicks: {
        total: 0,
        hits: 0,
        missed: 0,
        perSecond: 0,
        accuracy: 0
    },
    settings: {}
}

const resetCombo = (results: IResults) => {
    let newResults = { ...results };
    newResults.combo = 1;
    return newResults;
}

const updateCombo = (results: IResults) => {
    let newResults = { ...results };

    if (newResults.combo < 4) {
        newResults.combo += 0.25;
    }

    return newResults;
}

const updateTargetsPerSecond = (timer: number, results: IResults) => {
    let newResults = { ...results };
    const seconds = newResults.settings.duration as number - timer;
    newResults.targets.perSecond = newResults.targets.hits / seconds;
    return newResults;
}

const updateClicksPerSecond = (timer: number, results: IResults) => {
    let newResults = { ...results };
    const seconds = newResults.settings.duration as number - timer;
    newResults.clicks.perSecond = newResults.clicks.total / seconds;
    return newResults;
}

const updateClicksTotal = (timer: number, results: IResults) => {
    let newResults = { ...results };
    newResults.clicks.total += 1;
    newResults = updateClicksPerSecond(timer, newResults)
    newResults = updateClickAccuracy(newResults);
    return newResults;
}

const updateTargetEfficiency = (results: IResults) => {
    let newResults = { ...results };
    newResults.targets.efficiency = newResults.targets.hits / newResults.targets.total;
    return newResults;
}

const updateClickAccuracy = (results: IResults) => {
    let newResults = { ...results };
    newResults.clicks.accuracy = newResults.clicks.hits / newResults.clicks.total;
    return newResults;
}

const calculateScore = (results: IResults) => {
    let newResults = { ...results };
    const difficultyMultiplyer = 1 / (newResults.settings.difficulty as number / 1000); // 1 1.25, 1.66, 2.5
    const durationMultiplyer = 1 + (0.1 * (newResults.settings.duration as number / 10)); //1.5, 3, 6, 9, 12
    const sizeMultiplyer = 1 + (1 / (1 + (0.1 * (newResults.settings.sizes as number / 10))));
    const score = 1 * difficultyMultiplyer * durationMultiplyer * sizeMultiplyer * newResults.combo;
    newResults.score += score;
    return newResults;
}

const roundNumber = (number: number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}

export const sanitizeResults = (results: IResults) => {
    let newResults = { ...results };
    newResults.score = roundNumber(newResults.score);
    newResults.targets.perSecond = roundNumber(newResults.targets.perSecond);
    newResults.targets.efficiency = roundNumber(newResults.targets.efficiency);
    newResults.clicks.perSecond = roundNumber(newResults.clicks.perSecond);
    newResults.clicks.accuracy = roundNumber(newResults.clicks.accuracy);
    return newResults
}

export const setDefaultResults = (results: IResults, settings: IStateTypes<string | number | boolean>) => {
    let newResults = { ...results }
    let newSettings = { ...settings }
    newResults.settings = newSettings;
    return newResults;
}

export const storeDefaultResults = (settings: IStateTypes<string | number | boolean>) => {
    const newSettings = { ...settings }
    defaultResults.settings = newSettings
    localStorage.setItem("results", JSON.stringify(defaultResults));
}

export const updateHits = (timer: number, results: IResults) => {
    let newResults = { ...results };
    newResults.targets.hits += 1;
    newResults.clicks.hits += 1;
    newResults = calculateScore(newResults);
    newResults = updateTargetsPerSecond(timer, newResults);
    newResults = updateTargetEfficiency(newResults);
    newResults = updateClicksTotal(timer, newResults);
    newResults = updateClickAccuracy(newResults);
    newResults = updateCombo(newResults);
    return newResults;
}

export const updateTargetsTotal = (results: IResults) => {
    let newResults = { ...results };
    newResults.targets.total += 1;
    newResults = updateTargetEfficiency(newResults);
    return newResults;
}

export const updateTargetsMissed = (results: IResults) => {
    let newResults = { ...results };
    newResults.targets.missed += 1;
    newResults = resetCombo(newResults);
    return newResults
}

export const updateClicksMissed = (timer: number, results: IResults) => {
    let newResults = { ...results };
    newResults.clicks.missed += 1;
    newResults = updateClicksTotal(timer, newResults);
    newResults = resetCombo(newResults);
    return newResults;
}
