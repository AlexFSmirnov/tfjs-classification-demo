import React from 'react';
import { ButtonElement } from './style';

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <ButtonElement onClick={handleClick}>{children}</ButtonElement>
    );
};

export default Button;
