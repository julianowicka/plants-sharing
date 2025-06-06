'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  wateringInterval: number;
  name: string;
}

interface WateringDays {
  [plant: string]: number[];
}

const Calendar = ({ wateringInterval: everyNDays, name }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const calculateWateringDays = (everyNDays: number): number[] => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    let startDate = new Date(currentYear, 0, 1);
    let wateringDays = [];

    while (startDate.getFullYear() === currentYear) {
      if (startDate.getMonth() === currentMonth) {
        wateringDays.push(startDate.getDate());
      }
      startDate.setDate(startDate.getDate() + everyNDays);
    }

    return wateringDays;
  };

  const wateringDays: WateringDays = {
    [name]: everyNDays <= 0 ? calculateWateringDays(1) : calculateWateringDays(everyNDays)
  };


  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getUTCDay();
  };

  const changeMonth = (offset: number): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const months = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];

  const days = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const plantsToWater = Object.entries(wateringDays)
        .filter(([_, days]) => days.includes(day))
        .map(([plant]) => plant);

      days.push(
        <div
          key={day}
          className={`h-12 border border-gray-200 p-1 relative ${plantsToWater.length > 0 ? 'bg-green-50' : ''
            }`}
        >
          <span className="absolute top-1 left-1 text-sm">{day}</span>
          {plantsToWater.length > 0 && (
            <div className="absolute bottom-1 right-1 left-1">
              <div className="text-xs text-green-600 truncate">
                {plantsToWater.join(', ')}
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <button
          onClick={() => changeMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <div key={day} className="h-8 flex items-center justify-center font-medium text-gray-500">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>

      <div className="mt-4">
        <div className="text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-50 border border-gray-200"></div>
            <span>Dni podlewania</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;