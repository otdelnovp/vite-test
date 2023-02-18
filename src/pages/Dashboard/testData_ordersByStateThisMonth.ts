export const testData_ordersByStateThisMonth = {
    body: {
        FromDate: '2022-12-01',
        ToDate: '2022-12-19',
        Total: [
            {
                Count: 17,
                Percent: 0.29,
                State: 'NW',
                StateName: 'Создана',
            },
            {
                Count: 201,
                Percent: 3.39,
                State: 'CH',
                StateName: 'Выбор перевозчика',
            },
            {
                Count: 4566,
                Percent: 76.92,
                State: 'CL',
                StateName: 'Закрыт',
            },
            {
                Count: 607,
                Percent: 10.23,
                State: 'CN',
                StateName: 'Отменена',
            },
            {
                Count: 545,
                Percent: 9.18,
                State: 'PL',
                StateName: 'Принята',
            },
        ],
        // ByDate: [
        //     {
        //         Date: '2022-12-01',
        //         States: [
        //             {
        //                 Count: 59,
        //                 Percent: 11.28,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 20,
        //                 Percent: 3.82,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //             {
        //                 Count: 3,
        //                 Percent: 0.57,
        //                 State: 'NW',
        //                 State_Name: 'Создана',
        //             },
        //             {
        //                 Count: 441,
        //                 Percent: 84.32,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-02',
        //         States: [
        //             {
        //                 Count: 20,
        //                 Percent: 5.19,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //             {
        //                 Count: 44,
        //                 Percent: 11.43,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 321,
        //                 Percent: 83.38,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-03',
        //         States: [
        //             {
        //                 Count: 5,
        //                 Percent: 3.31,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 140,
        //                 Percent: 92.72,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 6,
        //                 Percent: 3.97,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-04',
        //         States: [
        //             {
        //                 Count: 119,
        //                 Percent: 91.54,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 3,
        //                 Percent: 2.31,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //             {
        //                 Count: 8,
        //                 Percent: 6.15,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-05',
        //         States: [
        //             {
        //                 Count: 11,
        //                 Percent: 3.08,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //             {
        //                 Count: 34,
        //                 Percent: 9.52,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 312,
        //                 Percent: 87.39,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-06',
        //         States: [
        //             {
        //                 Count: 1,
        //                 Percent: 0.28,
        //                 State: 'NW',
        //                 State_Name: 'Создана',
        //             },
        //             {
        //                 Count: 306,
        //                 Percent: 84.76,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 42,
        //                 Percent: 11.63,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 12,
        //                 Percent: 3.32,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-07',
        //         States: [
        //             {
        //                 Count: 16,
        //                 Percent: 4.21,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //             {
        //                 Count: 325,
        //                 Percent: 85.53,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 39,
        //                 Percent: 10.26,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-08',
        //         States: [
        //             {
        //                 Count: 38,
        //                 Percent: 10.22,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 11,
        //                 Percent: 2.96,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //             {
        //                 Count: 321,
        //                 Percent: 86.29,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 2,
        //                 Percent: 0.54,
        //                 State: 'NW',
        //                 State_Name: 'Создана',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-09',
        //         States: [
        //             {
        //                 Count: 324,
        //                 Percent: 87.33,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 35,
        //                 Percent: 9.43,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 12,
        //                 Percent: 3.23,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-10',
        //         States: [
        //             {
        //                 Count: 4,
        //                 Percent: 2.94,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //             {
        //                 Count: 128,
        //                 Percent: 94.12,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 4,
        //                 Percent: 2.94,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-11',
        //         States: [
        //             {
        //                 Count: 122,
        //                 Percent: 91.73,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 4,
        //                 Percent: 3.01,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //             {
        //                 Count: 7,
        //                 Percent: 5.26,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-12',
        //         States: [
        //             {
        //                 Count: 36,
        //                 Percent: 9.94,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 316,
        //                 Percent: 87.29,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 10,
        //                 Percent: 2.76,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-13',
        //         States: [
        //             {
        //                 Count: 328,
        //                 Percent: 82.62,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 13,
        //                 Percent: 3.27,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //             {
        //                 Count: 54,
        //                 Percent: 13.6,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 2,
        //                 Percent: 0.5,
        //                 State: 'PL',
        //                 State_Name: 'Принята',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-14',
        //         States: [
        //             {
        //                 Count: 50,
        //                 Percent: 13.85,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 300,
        //                 Percent: 83.1,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 11,
        //                 Percent: 3.05,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-15',
        //         States: [
        //             {
        //                 Count: 1,
        //                 Percent: 0.26,
        //                 State: 'NW',
        //                 State_Name: 'Создана',
        //             },
        //             {
        //                 Count: 309,
        //                 Percent: 81.32,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 53,
        //                 Percent: 13.95,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 17,
        //                 Percent: 4.47,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-16',
        //         States: [
        //             {
        //                 Count: 2,
        //                 Percent: 0.4,
        //                 State: 'NW',
        //                 State_Name: 'Создана',
        //             },
        //             {
        //                 Count: 265,
        //                 Percent: 52.58,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 177,
        //                 Percent: 35.12,
        //                 State: 'PL',
        //                 State_Name: 'Принята',
        //             },
        //             {
        //                 Count: 45,
        //                 Percent: 8.93,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 15,
        //                 Percent: 2.98,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-17',
        //         States: [
        //             {
        //                 Count: 10,
        //                 Percent: 6.94,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 24,
        //                 Percent: 16.67,
        //                 State: 'PL',
        //                 State_Name: 'Принята',
        //             },
        //             {
        //                 Count: 1,
        //                 Percent: 0.69,
        //                 State: 'NW',
        //                 State_Name: 'Создана',
        //             },
        //             {
        //                 Count: 104,
        //                 Percent: 72.22,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 5,
        //                 Percent: 3.47,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-18',
        //         States: [
        //             {
        //                 Count: 2,
        //                 Percent: 1.54,
        //                 State: 'NW',
        //                 State_Name: 'Создана',
        //             },
        //             {
        //                 Count: 5,
        //                 Percent: 3.85,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 5,
        //                 Percent: 3.85,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //             {
        //                 Count: 84,
        //                 Percent: 64.62,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 34,
        //                 Percent: 26.15,
        //                 State: 'PL',
        //                 State_Name: 'Принята',
        //             },
        //         ],
        //     },
        //     {
        //         Date: '2022-12-19',
        //         States: [
        //             {
        //                 Count: 308,
        //                 Percent: 85.79,
        //                 State: 'PL',
        //                 State_Name: 'Принята',
        //             },
        //             {
        //                 Count: 6,
        //                 Percent: 1.67,
        //                 State: 'CN-C',
        //                 State_Name: 'Отменена (заказчиком)',
        //             },
        //             {
        //                 Count: 39,
        //                 Percent: 10.86,
        //                 State: 'CN',
        //                 State_Name: 'Отменена',
        //             },
        //             {
        //                 Count: 1,
        //                 Percent: 0.28,
        //                 State: 'RD',
        //                 State_Name: 'Выполнена',
        //             },
        //             {
        //                 Count: 5,
        //                 Percent: 1.39,
        //                 State: 'NW',
        //                 State_Name: 'Создана',
        //             },
        //         ],
        //     },
        // ],
    },
};
