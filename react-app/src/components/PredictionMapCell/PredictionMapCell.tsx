import React from 'react';
import { PredictionMapCellWrapper } from './style';

export interface PredictionMapCellProps {
    value: number;
    children: React.ReactNode;
}

const PredictionMapCell: React.FC<PredictionMapCellProps> = ({ value, children }) => {

    return (
        <PredictionMapCellWrapper value={value}>
            {children}
        </PredictionMapCellWrapper>
    )
};

export default PredictionMapCell;
