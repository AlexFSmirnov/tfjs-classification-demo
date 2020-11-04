import { NORMALIZED_CLASSES } from '../constants';

export const getEmptyPrediction = () => {
    const result: Record<string, number> = {}
    NORMALIZED_CLASSES.forEach(char => {
        result[char] = 0;
    });

    return result;
};
