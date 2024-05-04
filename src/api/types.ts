
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export enum TaskStatuses  {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type TaskType = {
    id : string,
    title : string,
    description : string | null,
    todoListId : string,
    order : number,
    status : TaskStatuses,
    priority : TaskPriorities,
    startDate : string | null,
    deadline : string | null,
    addedDate : string
}
export type FieldErrorType = {
    error: string
    field: string
}
export type ResponseType<D = {}> = {
    data: D,
    messages: string[],
    fieldsErrors: FieldErrorType[],
    resultCode: number
}
export type ResponseTaskType = {
    items: TaskType[],
    totalCount: number,
    error: null | string
}