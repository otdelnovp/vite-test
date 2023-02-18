import { IUserData } from '@helpers/authHelper';

export const prepareExecutionTimeData = (executionTimeId: string, Time: number, Comment: string, TaskId: string, user: IUserData | null) => {
    return {
        Id: !!executionTimeId ? executionTimeId : null,
        Time,
        Comment,
        TaskId,
        UserId: user?.UserId,
    };
};
