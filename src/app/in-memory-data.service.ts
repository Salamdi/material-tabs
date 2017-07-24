import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IStage, IFunction, IAssignee } from './request-stages/stage.model';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {

    const testStages: IStage[] = [
      {
        id: 0,
        number: 1,
        name: 'stage 1',
        solid: 0,
        assignees: [],
        functions: []
      }      
    ]

    const testFunctions: IFunction[] = [];
    const testAssignees: IAssignee[] = [
      {man_id: 0, firstname: 'First', lastname: 'Last', patronymic: 'patronim'},
      {man_id: 1, firstname: 'Second', lastname: 'Fifth', patronymic: 'patronim'},
      {man_id: 2, firstname: 'Third', lastname: 'Sixth', patronymic: 'patronim'},
      {man_id: 3, firstname: 'Fourth', lastname: 'Seventh', patronymic: 'patronim'},
    ];

    return { testStages,  testFunctions, testAssignees };
  
  }
}