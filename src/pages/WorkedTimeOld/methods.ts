export interface IWorkedTimeUserData {
    UserId: string;
    UserName: string;
    Time: number;
}

export interface IWorkedTimeDateData {
    Date: string;
    Time: number;
}

export interface IWorkedTimeTaskData {
    Id: string;
    Title: string;
    Number: string;
    Comment: string;
    Time: number;
}

export interface IWorkedTimeData {
    UserId: string;
    UserName: string;
    Dates: {
        Date: string;
        Tasks: {
            Id: string;
            Title: string;
            Number: string;
            Comment: string;
            Time: number;
        }[];
    }[] | null;
}

export const updateUserList = (workedTimeData: IWorkedTimeData[], setUserList: (newUserList: IWorkedTimeUserData[]) => void) => {
    let newUserList: IWorkedTimeUserData[] = [];
    workedTimeData.map((user) => {
        let time = 0;
        if (user.Dates) {
            user.Dates.forEach((date) => {
                date.Tasks.forEach((task) => {
                    time = time + task.Time;
                })
            })
        };
        newUserList.push({
            UserId: user.UserId,
            UserName: user.UserName,
            Time: time / 60,
        })
    })
    setUserList(newUserList)
}

export const updateDateList = (userId: string, workedTimeData: IWorkedTimeData[], setDateList: (newDateList: IWorkedTimeDateData[]) => void) => {
    const userData = workedTimeData.find(user => user.UserId === userId);
    let newDateList: IWorkedTimeDateData[] = []
    if (userData && userData.Dates) {
        userData.Dates.forEach((date) => {
            let time = 0;
            date.Tasks.forEach((task) => {
                time = time + task.Time;
            })
            newDateList.push({
                Date: date.Date,
                Time: time / 60,
            })
        })
    }
    setDateList(newDateList)
}

export const updateTaskList = (userId: string, date: string, workedTimeData: IWorkedTimeData[], setTaskList: (newTaskList: IWorkedTimeTaskData[]) => void) => {
    const userData = workedTimeData.find(user => user.UserId === userId);
    let newTaskList: IWorkedTimeTaskData[] = []
    if (userData && userData.Dates) {
        const dateData = userData.Dates.find(foundDate => foundDate.Date === date);
        if (dateData && dateData.Tasks) {
            newTaskList = dateData.Tasks.map((task) => {
                return { ...task, Time: task.Time / 60 }
            })
        }
    }
    setTaskList(newTaskList)
}

