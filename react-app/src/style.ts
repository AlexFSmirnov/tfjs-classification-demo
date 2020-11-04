import styled from 'styled-components';

export const AppWrapper = styled.div`
    width: 1304px;
    height: 329px;
    padding: 12px 0px;
    padding-right: 2px;
    padding-left: 16px;

    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
    border-radius: 16px;
`;

export const Candidate = styled.div`
    width: 256px;
    height: 309px;
    border: 2px solid #444;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 156pt;
`;

export const LoadingText = styled.div`
    font-size: 50pt;
`;
