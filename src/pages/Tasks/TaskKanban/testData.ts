export const boardGroups = [
    {
        groupId: 1,
        groupName: 'Иванов Петр Сергеевич',
        columnIds: [1, 2],
    },
    {
        groupId: 2,
        groupName: 'Дмитриев Антон Иванович',
        columnIds: [3, 4],
    },
];

export const boardData = {
    columns: [
        {
            id: 1,
            title: 'В очереди',
            cards: [
                {
                    id: 1,
                    title: 'Работа 1',
                    description: 'Здесь должно быть краткое описание работы',
                },
                {
                    id: 2,
                    title: 'Работа 2',
                    description: 'Здесь должно быть краткое описание работы',
                },
                {
                    id: 3,
                    title: 'Работа 3',
                    description: 'Здесь должно быть краткое описание работы',
                },
            ],
        },
        {
            id: 2,
            title: 'В работе',
            cards: [
                {
                    id: 9,
                    title: 'Работа 4',
                    description: 'Здесь должно быть краткое описание работы',
                },
            ],
        },
        {
            id: 3,
            title: 'Тестирование',
            cards: [
                {
                    id: 10,
                    title: 'Работа 5',
                    description: 'Здесь должно быть краткое описание работы',
                },
                {
                    id: 11,
                    title: 'Работа 6',
                    description: 'Здесь должно быть краткое описание работы',
                },
            ],
        },
        {
            id: 4,
            title: 'Выполнено',
            cards: [],
        },
    ],
};

