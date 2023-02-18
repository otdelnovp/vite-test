import React from 'react';
import { useParams } from 'react-router-dom';
import WeeklyReportElement from './WeeklyReportElement';
import WeeklyReportList from './WeeklyReportList';

const WeeklyReport = () => {
    const { weeklyReportId } = useParams();
    if (weeklyReportId) {
        return <WeeklyReportElement weeklyReportId={weeklyReportId} />
    }
    return <WeeklyReportList />
};

export default WeeklyReport;

