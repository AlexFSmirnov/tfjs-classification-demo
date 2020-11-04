import React from 'react';
import { PredictionMapCell } from '../PredictionMapCell';
import { PredictionMapContainer, PredictionMapWrapper } from './style';

export interface PredictionMapProps {
    prediction: Record<string, number>;
}

const PredictionMap: React.FC<PredictionMapProps> = ({ prediction }) => {

    return (
        <PredictionMapWrapper>
            <PredictionMapContainer>
                {Object.keys(prediction).map(k => (
                    <PredictionMapCell key={k} value={prediction[k]}>{k}</PredictionMapCell>
                ))}
            </PredictionMapContainer>
        </PredictionMapWrapper>
    )
};

export default PredictionMap;
