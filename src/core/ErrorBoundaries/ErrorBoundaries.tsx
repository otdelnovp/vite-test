import React from 'react';

class ErrorBoundaries extends React.Component<any, any> {
    state = {
        hasError: false,
    };
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({ hasError: true });
        console.log('error: ', error);
        console.log('error info: ', errorInfo);
    }
    render() {
        const { children } = this.props;
        return this.state.hasError ? (
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    textAlign: 'center',
                }}
            >
                <b style={{ display: 'block', color: 'red', fontSize: '1.2em' }}>Произошла ошибка</b> Обновите страницу
                или обратитесь к разработчику
            </div>
        ) : (
            <React.Fragment>{children}</React.Fragment>
        );
    }
}

export default ErrorBoundaries;
