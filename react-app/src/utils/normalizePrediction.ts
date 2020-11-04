import { CLASSES, NORMALIZED_CLASSES } from '../constants';

export const normalizePrediction = (prediction: number[]) => {
    let normalizedPrediction = NORMALIZED_CLASSES.map(_ => 0);
    CLASSES.forEach((hexClass, i) => {
        const hexValue = hexClass.split('_')[hexClass.split('_').length - 1];
        const char = String.fromCharCode(parseInt(hexValue, 16)).toUpperCase();

        normalizedPrediction[NORMALIZED_CLASSES.indexOf(char)] += prediction[i];
    });

    const minValue = Math.min(...normalizedPrediction);
    const maxValue = Math.max(...normalizedPrediction) - minValue;
    normalizedPrediction = normalizedPrediction
        .map(value => value - minValue)
        .map(value => value / maxValue);

    const result: Record<string, number> = {}
    NORMALIZED_CLASSES.forEach(char => {
        result[char] = normalizedPrediction[NORMALIZED_CLASSES.indexOf(char)];
    });

    return {
        topCandidate: NORMALIZED_CLASSES[normalizedPrediction.indexOf(Math.max(...normalizedPrediction))],
        prediction: result,
    };
};
