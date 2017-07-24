/**
 * Created by developer on 27.05.17.
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IAssignee, IFunction, IStage } from '../stage.model';
import { FormControl } from '@angular/forms';
import { StagesService } from '../stages.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../shared/snackbar.service';

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_TIME = 350;
const TIP_DURATION = 5000;

@Component({
    selector: 'stage-node',
    templateUrl: './stage-node.component.html',
    styleUrls: ['./stage-node.component.scss']
})
export class StageNodeComponent implements OnInit, OnDestroy {
    @Input() stage: IStage;
    @Input() functionsList: IFunction[];
    public functions: IFunction[];
    private searchCtrl: FormControl = new FormControl();
    public people: IAssignee[];
    private selectedAssignee: IAssignee;
    private searchSubscription: Subscription;

    constructor(private stagesService: StagesService, private snackBar: SnackbarService) {
        this.searchSubscription = this.searchCtrl.valueChanges
            .filter(val => val && val.trim && val.trim().length > MIN_QUERY_LENGTH)
            .debounceTime(DEBOUNCE_TIME)
            .switchMap(val => stagesService.searchAssignees(val))
            .subscribe(
                {
                    next: list => {
                        this.people = list || [
                            {man_id: 0, firstname: 'First', lastname: 'Last', patronymic: 'patronim'},
                            {man_id: 1, firstname: 'Second', lastname: 'Fifth', patronymic: 'patronim'},
                            {man_id: 2, firstname: 'Third', lastname: 'Sixth', patronymic: 'patronim'},
                            {man_id: 3, firstname: 'Fourth', lastname: 'Seventh', patronymic: 'patronim'},
                        ]
                    },
                    error: err => {
                        console.error(err);
                        this.people = [
                            {man_id: 0, firstname: 'First', lastname: 'Last', patronymic: 'patronim'},
                            {man_id: 1, firstname: 'Second', lastname: 'Fifth', patronymic: 'patronim'},
                            {man_id: 2, firstname: 'Third', lastname: 'Sixth', patronymic: 'patronim'},
                            {man_id: 3, firstname: 'Fourth', lastname: 'Seventh', patronymic: 'patronim'},
                        ]
                    },
                    complete: () => {
                        this.people = [
                            {man_id: 0, firstname: 'First', lastname: 'Last', patronymic: 'patronim'},
                            {man_id: 1, firstname: 'Second', lastname: 'Fifth', patronymic: 'patronim'},
                            {man_id: 2, firstname: 'Third', lastname: 'Sixth', patronymic: 'patronim'},
                            {man_id: 3, firstname: 'Fourth', lastname: 'Seventh', patronymic: 'patronim'},
                        ]
                    }
                }
            ) /* (list => this.people = list || [
                {man_id: 0, firstname: 'First', lastname: 'Last', patronymic: 'patronim'},
                {man_id: 1, firstname: 'Second', lastname: 'Fifth', patronymic: 'patronim'},
                {man_id: 2, firstname: 'Third', lastname: 'Sixth', patronymic: 'patronim'},
                {man_id: 3, firstname: 'Fourth', lastname: 'Seventh', patronymic: 'patronim'},
            ]) */;
    }

    public ngOnInit(): void {
        this.stage.functions = this.stage.functions || []; // empty array if no functions due to server configuration
        this.stage.assignees = this.stage.assignees || []; // empty array if no assignees due to server configuration
        this.functions = this.functionsList.map(func => JSON.parse(JSON.stringify(func)));
        this.functions
            .forEach(func => func.check = this.stage.functions
                    .find(f => f.function_id === func.function_id) !== undefined);
    }

    public ngOnDestroy(): void {
        this.searchSubscription.unsubscribe();
    }

    public onSelectAssignee(assignee: IAssignee): void {
        this.selectedAssignee = assignee;
    }

    public addAssignee(): void {
        const isAlreadyInList = this.stage.assignees.find(a => +a.man_id === +this.selectedAssignee.man_id);
        if (isAlreadyInList) {
            this.snackBar.open('Этот ответственный уже был назначен', TIP_DURATION);
        } else {
            this.stage.assignees.push(this.selectedAssignee);
        }
        this.searchCtrl.reset();
        this.selectedAssignee = null;
    }

    public deleteAssignee(a): void {
        const i = this.stage.assignees.indexOf(a);
        this.stage.assignees.splice(i, 1);
    }

    /**
     * for adding functions to stage
     * @param func
     */
    public onChange(func: IFunction): void {
        const i = this.stage.functions.indexOf(this.stage.functions.find(f => f.function_id === func.function_id));
        func.check === true ? this.stage.functions.push(JSON.parse(JSON.stringify(func))) :
            this.stage.functions.splice(i, 1);
    }

    /**
     * for showing name in input bind to autocomplete
     * @param assignee
     * @returns {string}
     */
    public displayFn(assignee: IAssignee): string {
        return assignee ? `${assignee.firstname} ${assignee.lastname} ${assignee.patronymic}` : <undefined>assignee;
    }
}
