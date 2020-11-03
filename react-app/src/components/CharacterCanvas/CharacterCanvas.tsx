import React, { useRef, useEffect } from 'react';
import { IMAGE_SIZE, CANVAS_LINE_WIDTH, CANVAS_BACKGROUND_COLOR, CANVAS_SCALE } from '../../constants';
import { Button } from '../Button';
import { CharacterCanvasWrapperElement, CanvasElement } from './style';

export interface CharacterCanvasProps {
    onChange?: (pixels: number[][][] | null) => void;
}

const CharacterCanvas: React.FC<CharacterCanvasProps> = ({ onChange }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const previousPointerPosition = useRef<{ x: number, y: number } | null>(null);

    const clear = () => {
        const { current: canvas } = canvasRef;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.rect(0, 0, IMAGE_SIZE, IMAGE_SIZE);
                ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
                ctx.fill();
            }
        }
    }

    useEffect(clear, [canvasRef]);

    const getPixels = () => {
        const { current: canvas } = canvasRef;
        if (!canvas) {
            return null;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return null;
        }

        const result: number[][][] = [];
        for (let y = 0; y < IMAGE_SIZE; ++y) {
            const row: number[][] = [];
            for (let x = 0; x < IMAGE_SIZE; ++x) {
                const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
                row.push([r, g, b]);
            }
            result.push(row);
        }

        return result;
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const { current: canvas } = canvasRef;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const { buttons, clientX, clientY } = e;
                const x = (clientX - canvas.getBoundingClientRect().x) / CANVAS_SCALE;
                const y = (clientY - canvas.getBoundingClientRect().y) / CANVAS_SCALE;

                if (!buttons) {
                    previousPointerPosition.current = null;
                    return;
                }

                if (previousPointerPosition.current) {
                    // A little hack to make the line darker on a small resolution canvas
                    for (let i = 0; i < 5; ++i) {
                        const { current: { x: prevX, y: prevY } } = previousPointerPosition;
                        ctx.beginPath();
                        ctx.moveTo(prevX, prevY);
                        ctx.lineTo(x, y);
                        ctx.lineWidth = CANVAS_LINE_WIDTH;
                        ctx.stroke();
                    }
                }

                previousPointerPosition.current = { x, y };
            }
        }

        if (onChange) {
            onChange(getPixels());
        }
    };

    const handlePointerUp = () => (previousPointerPosition.current = null);

    const canvasProps = {
        ref: canvasRef,
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
    };

    return (
        <CharacterCanvasWrapperElement>
            <CanvasElement {...canvasProps} />
            <Button onClick={clear}>Clear</Button>
        </CharacterCanvasWrapperElement>
    );
};

export default CharacterCanvas;
