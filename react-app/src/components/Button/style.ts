import styled from 'styled-components';

export const ButtonElement = styled.div`
    width: 100%;
    padding: 8px 2px;
    border-radius: 4px;

    text-align: center;
    user-select: none;
    font-size: 18pt;
    color: white;
    background-color: #444;

    transition: background-color 200ms;

    &:hover {
        background-color: #3a3a3a;
    }

    &:active {
        background-color: #222;
    }
`;
