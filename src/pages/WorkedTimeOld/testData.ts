import { IWorkedTimeData } from './methods';

export const testData: IWorkedTimeData[] = [
    {
        UserId: 'u1',
        UserName: 'Иванов Иван Иванович',
        Dates: [
            {
                Date: '2022-09-01',
                Tasks: [
                    {
                        Id: 't1',
                        Title: 'Работа 1',
                        Number: 'ЗДЧ-1',
                        Comment: 'Комментарий к работе 1',
                        Time: 120,
                    },
                ],
            },
            {
                Date: '2022-09-05',
                Tasks: [
                    {
                        Id: 't2',
                        Title: 'Работа 2',
                        Number: 'ЗДЧ-2',
                        Comment: 'Комментарий к работе 2',
                        Time: 120,
                    },
                    {
                        Id: 't3',
                        Title: 'Работа 3',
                        Number: 'ЗДЧ-3',
                        Comment: 'Комментарий к работе 3',
                        Time: 120,
                    },
                ],
            },
        ],
    },
    {
        UserId: 'u2',
        UserName: 'Петров Петр Петрович',
        Dates: [
            {
                Date: '2022-09-01',
                Tasks: [
                    {
                        Id: 't4',
                        Title: 'Работа 4',
                        Number: 'ЗДЧ-4',
                        Comment: 'Комментарий к работе 4',
                        Time: 120,
                    },
                ],
            },
        ],
    },
    {
        UserId: 'u3',
        UserName: 'Сидоров Александр Николаевич',
        Dates: null,
    },
];

