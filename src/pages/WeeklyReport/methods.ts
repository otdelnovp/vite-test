export const getNextStates = (currentStateCode: string) => {
    switch (currentStateCode) {
        case 'D':
            return [
                {
                    Name: 'Отправить на согласование',
                    Code: 'R',
                },
            ];
        case 'R':
            return [
                {
                    Name: 'Согласовать',
                    Code: 'A',
                },
                {
                    Name: 'Отклонить',
                    Code: 'N',
                },
            ];
        case 'A':
            return [];
        case 'N':
            return [
                {
                    Name: 'Перевести в Черновик',
                    Code: 'D',
                },
            ];
        default:
            return [];
    }
};

