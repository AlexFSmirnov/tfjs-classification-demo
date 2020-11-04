import React from 'react';
import { loadLayersModel, tensor, LayersModel, Tensor } from '@tensorflow/tfjs';
import { normalizePrediction } from './utils/normalizePrediction';
import { getEmptyPrediction } from './utils/getEmptyPrediction';
import { CharacterCanvas, PredictionMap } from './components';
import { IMAGE_SIZE } from './constants';
import { AppWrapper, Candidate, LoadingText } from './style';

export interface AppState {
    prediction: Record<string, number>;
    topCandidate: string;
}

class App extends React.Component<{}, AppState> {
    private model: LayersModel | null = null;

    state = {
        prediction: getEmptyPrediction(),
        topCandidate: '?',
    };

    componentDidMount() {
        this.loadModel();
    }

    loadModel = async () => {
        this.model = await loadLayersModel(`${process.env.PUBLIC_URL}/model/model.json`);
        this.forceUpdate();
    };

    predict = (pixels: number[][][]) => {
        if (!this.model) {
            return;
        }

        const inputTensor = tensor([pixels], [1, IMAGE_SIZE, IMAGE_SIZE, 3]);

        const result = this.model.predict(inputTensor) as Tensor;
        const { topCandidate, prediction } = normalizePrediction(Array.from(result.dataSync()));

        this.setState({ topCandidate, prediction });
    };

    handleCanvasChange = (pixels: number[][][] | null) => {
        if (!pixels) {
            return;
        }

        this.predict(pixels);
    };

    render() {
        const { prediction, topCandidate } = this.state;

        return (
            <AppWrapper>
                {this.model
                    ? (
                        <>
                            <Candidate>{topCandidate}</Candidate>
                            <CharacterCanvas onChange={this.handleCanvasChange} />
                            <PredictionMap prediction={prediction} />
                        </>
                    )
                    : (
                        <LoadingText>Model loading...</LoadingText>
                    )
                }
            </AppWrapper>
        );
    }
}

export default App;
