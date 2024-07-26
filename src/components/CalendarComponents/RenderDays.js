//월간 달력의 각 날짜를 렌더링
import React from 'react';
import { startOfWeek, endOfWeek,  endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
import { format } from 'date-fns';

const RenderDays = ({ currentMonth }) => {
    const start = startOfWeek(currentMonth, { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth));
    const days = eachDayOfInterval({ start, end });

    return (
        <div className="days">
            {days.map(day => (
                <div key={day} className={`day ${isSameMonth(day, currentMonth) ? 'current-month' : 'other-month'}`}>
                    {format(day, 'd')}
                </div>
            ))}
        </div>
    );
};

export default RenderDays;
