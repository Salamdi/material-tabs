/**
 * Created by developer on 27.05.17.
 */
import { Component, OnDestroy } from '@angular/core';
import { IFunction, IStage } from './stage.model';
import { StagesService } from './stages.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../shared/snackbar.service';

@Component({
    selector: 'request-stages',
    templateUrl: './request-stages.component.html',
    styleUrls: ['./request-stages.component.scss'],
    providers: [StagesService]
})
export class RequestStagesComponent implements OnDestroy {
    public stages: IStage[];
    public functionsList: IFunction[];
    private stagesSubscription: Subscription;
    private funcSubscription: Subscription;
    public spinner: boolean = true;

    constructor(private stagesService: StagesService, private snackBar: SnackbarService) {
        this.stagesSubscription = stagesService.getStages()
            .subscribe(stages => {
                const STAGE: IStage = {
                    id: -1,
                    number: 1,
                    name: 'Этап 1',
                    solid: 0,
                    functions: [],
                    assignees: []
                };
                this.stages = stages || [STAGE];
                this.spinner = false;
            });
        this.funcSubscription = stagesService.getFunctions()
            .subscribe((list: IFunction[]) => {
                this.functionsList = list || [
                    {function_id: 0, name: 'function-0', check: false},
                    {function_id: 0, name: 'function-1', check: false},
                    {function_id: 0, name: 'function-2', check: false},
                    {function_id: 0, name: 'function-3', check: false}
                ];
            });
    }

    /**
     * unsubscribe all subscription to avoid memory leak
     */
    public ngOnDestroy(): void {
        this.stagesSubscription.unsubscribe();
    }

    public addStage(): void {
        const STAGE: IStage = {
            id: -1,
            number: this.stages.length + 1,
            name: 'Этап ' + (this.stages.length + 1),
            solid: 0,
            functions: [],
            assignees: []
        };
        this.stages.push(STAGE);
    }

    public sort(): void {
        this.stages.sort((a, b) => a.number - b.number);
    }

    /**
     * for changing stage number and/or name
     * @param stage
     * @param event
     */
    public change(stage, event): void {
        const clone = this.stages.find(s => s.number === +event.target[1].value);
        if (clone && clone !== stage) clone.number = stage.number;
        stage.number = +event.target[1].value;
        stage.name = event.target[0].value;
        console.log(this.stages);
    }

    public save(): void {
        this.spinner = true;
        this.stagesService.saveStages(this.stages)
            .subscribe(
                {
                    next: () => {
                        this.spinner = false;
                        this.snackBar.open('Изменения успешно сохранены');
                    },
                    complete: () => this.spinner = false
                }
            );
    }

    public deleteStage(stage: IStage) {
        const index = this.stages.indexOf(stage);
        this.stages.splice(index, 1);
    }
}
