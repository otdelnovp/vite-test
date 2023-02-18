import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CustomReportElement from './CustomReportElement';
import CustomReportList from './CustomReportList';

const CustomReport = () => {
    const { customReportId } = useParams();
    const location = useLocation();

    if (customReportId) {
        if (location.pathname.search('/edit/') !== -1) return <CustomReportElement customReportId={customReportId} editMode={true} />;
        return <CustomReportElement customReportId={customReportId} editMode={false} />;
    }
    return <CustomReportList />;
};

export default CustomReport;
