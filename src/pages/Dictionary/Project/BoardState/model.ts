export interface IBoardStateElement {
    BoardStateId: string;
    BoardStateName: string;
    SortBy?: "StartDatePlan" | "StartDateFact" | "EndDateFact" | null;
    N: number;
}