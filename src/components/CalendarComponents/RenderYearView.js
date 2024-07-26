//연간 보기 모드에서 연간 달력을 렌더링
import React from 'react';
import { eachMonthOfInterval, startOfYear, endOfYear, format } from 'date-fns';

const RenderYearView = ({ currentYear, moodColors }) => {
    const start = startOfYear(currentYear);
    const end = endOfYear(currentYear);
    const months = eachMonthOfInterval({ start, end });

    return (
        <div className="year-view">
            {months.map(month => (
                <div key={month} className="month">
                    <h3>{format(month, 'MMMM yyyy')}</h3>
                    {/* Render days and mood colors for each month here */}
                </div>
            ))}
        </div>
    );
};

export default RenderYearView;
