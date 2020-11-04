import styled from 'styled-components';

export interface PredictionMapCellWrapperProps {
    value: number;
}

export const PredictionMapCellWrapper = styled.div<PredictionMapCellWrapperProps>`
    width: 64px;
    height: 64px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: rgb(0, 255, 0, ${props => Math.pow(props.value, 15)});
    font-size: 18pt;
`;
