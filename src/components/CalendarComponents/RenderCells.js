//각 날짜 셀을 렌더링
import React from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, endOfMonth   } from 'date-fns';

const RenderCells = ({ currentMonth, moodColors, onDateClick, onDateMouseOver, onDateMouseOut }) => {
    const start = startOfWeek(currentMonth, { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth));
    const days = eachDayOfInterval({ start, end });

    return (
        <div className="cells">
            {days.map(day => (
                <div
                    key={day}
                    className={`cell ${isSameMonth(day, currentMonth) ? 'current-month' : 'other-month'}`}
                    style={{ backgroundColor: moodColors[format(day, 'yyyy-MM-dd')] }}
                    onClick={() => onDateClick(day)}
                    onMouseOver={(e) => onDateMouseOver(e, day)}
                    onMouseOut={onDateMouseOut}
                >
                    {format(day, 'd')}
                </div>
            ))}
        </div>
    );
};

export default RenderCells;
