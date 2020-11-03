import styled from 'styled-components';
import { IMAGE_SIZE, CANVAS_SCALE } from '../../constants';

export const CharacterCanvasWrapperElement = styled.div`
    width: ${IMAGE_SIZE * CANVAS_SCALE}px;
    padding: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CanvasElement = styled.canvas`
    width: ${IMAGE_SIZE * CANVAS_SCALE}px;
    height: ${IMAGE_SIZE * CANVAS_SCALE}px;
    margin-bottom: 8px;

    border: 2px solid #444;
    border-radius: 8px;

    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
`;
