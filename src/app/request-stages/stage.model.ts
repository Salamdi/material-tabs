/**
 * Created by developer on 01.06.17.
 */
export interface IStage {
    id: number;
    number: number;
    name: string;
    solid: number;
    assignees: IAssignee[];
    functions: IFunction[];
}

export interface IAssignee {
    man_id: number;
    firstname: string;
    lastname: string;
    patronymic: string;
}

export interface IFunction {
    function_id: number;
    name: string;
    check?: boolean;
}
