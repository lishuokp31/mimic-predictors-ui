import { List } from 'immutable';

export interface AppStateModel {
  sepsisX: List<List<number>>;
  sepsisY: List<number>;
  sepsisPredictions: List<number>;
  sepsisWeights: List<List<number>>;
  sepsisLoading: boolean;
  miX: List<List<number>>;
  miY: List<number>;
  miPredictions: List<number>;
  miWeights: List<List<number>>;
  miLoading: boolean;
  vancomycinX: List<List<number>>;
  vancomycinY: List<number>;
  vancomycinPredictions: List<number>;
  vancomycinWeights: List<List<number>>;
  vancomycinLoading: boolean;
}
