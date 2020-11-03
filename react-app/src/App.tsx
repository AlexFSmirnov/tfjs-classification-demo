import React from 'react';
import { loadLayersModel, tensor, LayersModel, Tensor } from '@tensorflow/tfjs';
import { CharacterCanvas } from './components';
import { IMAGE_SIZE, CLASSES } from './constants';

class App extends React.Component {
    private model: LayersModel | null = null;

    componentDidMount() {
        this.loadModel();
    }

    loadModel = async () => {
        this.model = await loadLayersModel(`${process.env.PUBLIC_URL}/model/model.json`);
        console.log('Model loaded');
    };

    predict = async (pixels: number[][][]) => {
        if (!this.model) {
            return;
        }

        const inputTensor = tensor([pixels], [1, IMAGE_SIZE, IMAGE_SIZE, 3]);

        const result = this.model.predict(inputTensor) as Tensor;
        const predictionArray = Array.from(result.dataSync());

        const maxProb = Math.max(...predictionArray);
        const idx = predictionArray.indexOf(maxProb);
        const hexVal = CLASSES[idx].split('_')[CLASSES[idx].split('_').length - 1];
        const val = String.fromCharCode(parseInt(hexVal, 16));
        console.log(`${hexVal}: ${val}   (${maxProb})`);
    };

    handleCanvasChange = (pixels: number[][][] | null) => {
        if (!pixels) {
            return;
        }

        this.predict(pixels);
    };

    render() {
        return (
            <CharacterCanvas onChange={this.handleCanvasChange} />
        );
    }
}

export default App;
