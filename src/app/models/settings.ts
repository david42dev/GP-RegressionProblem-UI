export class Settings {
  // Only for db entry important, leave -1 if you want to post a new setting object
  id: number = -1;
  // initial:
  numberOfRuns: number;
  // parameters:
  initialTreeDepthMin: number;
  initialTreeDepthMax: number;
  maxTreeSizeCrossover: number;
  populationSize: number;
  generationSize: number;
  crossoverProbability: number;
  mutationProbability: number;
  initialGrowProbability: number;
  selectionNonTerminals: number;
  selectionTerminals: number;
  tournamentSize: number;
  elitism: number;
  reproductionProbability: number;
  // list of functions
  functions: string[];
  // list of terminals
  terminals: string[];
}
