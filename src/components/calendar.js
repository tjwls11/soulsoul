import React, { useState, useEffect } from 'react';
import {
  format, addMonths, subMonths, isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addDays, isAfter, setMonth, setYear
} from 'date-fns';
import { fetchMoodRange, setMoodColor } from './api/api';

// 색상 저장 및 로드 함수 정의
function saveMoodColorsToLocalStorage(moodColors) {
  localStorage.setItem('moodColors', JSON.stringify(moodColors));
}

function loadMoodColorsFromLocalStorage() {
  const storedColors = localStorage.getItem('moodColors');
  return storedColors ? JSON.parse(storedColors) : {};
}

function Calendar() {
  const colors = ['#FFABAB', '#FFC3A0', '#FFF58E', '#CDE6A5', '#ACD1EA', '#9FB1D9', '#C8BFE7'];
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [moodColors, setMoodColors] = useState(loadMoodColorsFromLocalStorage());
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isEditingMonth, setIsEditingMonth] = useState(false);
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [inputMonth, setInputMonth] = useState(format(currentMonth, 'M'));
  const [inputYear, setInputYear] = useState(format(currentMonth, 'yyyy'));

  // 사용자 토큰
  const token = localStorage.getItem('token');

  // 캘린더의 색상 데이터를 서버에서 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
        const endDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');
        const colorsFromServer = await fetchMoodRange(startDate, endDate, token);

        if (colorsFromServer) {
          setMoodColors(colorsFromServer);
          saveMoodColorsToLocalStorage(colorsFromServer);
        }
      } catch (error) {
        console.error('Failed to fetch mood colors:', error.message);
      }
    };

    fetchData();
  }, [currentMonth, token]);

  const goToToday = () => {
    setCurrentMonth(startOfMonth(new Date()));
  };

  const onDateClick = (day) => {
    if (!isAfter(day, new Date())) {
      setSelectedDate(day);
      setShowColorPicker(true); 
    }
  };

  const handleColorClick = async (color) => {
    if (selectedDate) {
      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      const newMoodColors = { ...moodColors, [dateKey]: color };
      setMoodColors(newMoodColors);
      saveMoodColorsToLocalStorage(newMoodColors);

      try {
        await setMoodColor(dateKey, color, token);
        // 서버 저장 성공 후 로컬 스토리지 업데이트
        saveMoodColorsToLocalStorage(newMoodColors);
      } catch (error) {
        console.error('Failed to save mood color:', error.message);
      }
      setShowColorPicker(false);
    }
  };

  const handleMonthChange = () => {
    const newMonth = parseInt(inputMonth, 10);
    if (newMonth >= 1 && newMonth <= 12) {
      setCurrentMonth(setMonth(currentMonth, newMonth - 1));
      setIsEditingMonth(false);
    }
  };

  const handleYearChange = () => {
    const newYear = parseInt(inputYear, 10);
    if (newYear >= 1900) {
      setCurrentMonth(setYear(currentMonth, newYear));
      setIsEditingYear(false);
    }
  };

  const handleKeyDown = (e, callback) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      callback();
    }
  };

  const RenderHeader = ({ currentMonth }) => (
    <div className="calendar-header">
      <button className="prev-button" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>◀</button>
      <div className="month-year-container">
        {isEditingYear ? (
          <input
            type="number"
            value={inputYear}
            onChange={(e) => setInputYear(e.target.value)}
            onBlur={handleYearChange}
            onKeyDown={(e) => handleKeyDown(e, handleYearChange)}
            autoFocus
            className="month-year-input"
          />
        ) : (
          <span className="month-year" onClick={() => setIsEditingYear(true)}>
            {format(currentMonth, 'yyyy년')}
          </span>
        )}
        {isEditingMonth ? (
          <input
            type="number"
            value={inputMonth}
            onChange={(e) => setInputMonth(e.target.value)}
            onBlur={handleMonthChange}
            onKeyDown={(e) => handleKeyDown(e, handleMonthChange)}
            autoFocus
            className="month-year-input"
          />
        ) : (
          <span className="month-year" onClick={() => setIsEditingMonth(true)}>
            {format(currentMonth, 'M월')}
          </span>
        )}
      </div>
      <button className="next-button" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>▶</button>
    </div>
  );

  const RenderDays = () => {
    const days = [];
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col" key={i}>
          {dayLabels[i]}
        </div>,
      );
    }

    return <div className="days row">{days}</div>;
  };

  const RenderCells = ({ currentMonth, moodColors, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let day = startDate;

    while (day <= endDate) {
      const days = [];

      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        const dayKey = format(currentDay, 'yyyy-MM-dd');
        const dayColor = moodColors[dayKey] || 'transparent';

        days.push(
          <div
            className={`col cell ${
              !isSameMonth(currentDay, startOfMonth(currentMonth))
                ? 'disabled'
                : isSameDay(currentDay, new Date())
                ? 'today'
                : isSameDay(currentDay, selectedDate)
                ? 'selected'
                : 'valid'
            } ${isSameDay(currentDay, new Date()) ? 'today' : ''}`}
            key={i}
            onClick={() => onDateClick(currentDay)}
            style={{ backgroundColor: dayColor }}
          >
            {format(currentDay, 'd')}
          </div>,
        );

        day = addDays(day, 1);
      }

      rows.push(<div className="row" key={day}>{days}</div>);
    }

    return <div className="body">{rows}</div>;
  };

  return (
    <div className="calendar">
      <RenderHeader currentMonth={currentMonth} />
      <RenderDays />
      <RenderCells currentMonth={currentMonth} moodColors={moodColors} onDateClick={onDateClick} />
      {showColorPicker && (
        <div className="color-picker">
          {colors.map((color, index) => (
            <div
              key={index}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
            />
          ))}
        </div>
      )}
      <button onClick={goToToday} className="today-button">Today</button>
    </div>
  );
}

export default Calendar;
