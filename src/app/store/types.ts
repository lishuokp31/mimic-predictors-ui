import { Feature } from '../typings';

export interface AppStateModel {
  sepsisFeatures: Feature[];
  sepsisX: number[][];
  sepsisY: number[];
  sepsisPredictions: number[];
  sepsisWeights: number[][];
  sepsisLoading: boolean;
  miFeatures: Feature[];
  miX: number[][];
  miY: number[];
  miPredictions: number[];
  miWeights: number[][];
  miLoading: boolean;
  vancomycinFeatures: Feature[];
  vancomycinX: number[][];
  vancomycinY: number[];
  vancomycinPredictions: number[];
  vancomycinWeights: number[][];
  vancomycinLoading: boolean;
}
