import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export default function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - monthStart.getDay());
  
  const endDate = new Date(monthEnd);
  endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));

  const days = [];
  const day = new Date(startDate);
  
  while (day <= endDate) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  const formatDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date): boolean => {
    return formatDateString(date) === formatDateString(today);
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isPastDate = (date: Date): boolean => {
    return date < today && !isToday(date);
  };

  const isSelected = (date: Date): boolean => {
    return formatDateString(date) === selectedDate;
  };

  const isWeekend = (date: Date): boolean => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const handleDateClick = (date: Date) => {
    if (isPastDate(date) || !isCurrentMonth(date)) return;
    onDateSelect(formatDateString(date));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const canGoPrevious = () => {
    const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    return prevMonthDate >= currentMonthStart;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Card className="border border-slate-700 bg-slate-800/90 backdrop-blur-md">
      <CardContent className="p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Select Date</h3>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevMonth}
              disabled={!canGoPrevious()}
              className="p-2"
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="font-semibold text-white min-w-[140px] text-center">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={nextMonth}
              className="p-2"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map((dayName) => (
            <div key={dayName} className="text-center font-semibold text-slate-200 py-2 text-sm">
              {dayName}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dateString = formatDateString(day);
            const isCurrentMonthDay = isCurrentMonth(day);
            const isPast = isPastDate(day);
            const isTodayDate = isToday(day);
            const isSelectedDate = isSelected(day);
            const isWeekendDay = isWeekend(day);

            return (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                disabled={isPast || !isCurrentMonthDay}
                className={cn(
                  "calendar-day",
                  {
                    // Current month days
                    "text-slate-100 hover:bg-iron-blue-500/40 hover:text-white": isCurrentMonthDay && !isPast,
                    
                    // Other month days
                    "text-slate-400 cursor-not-allowed": !isCurrentMonthDay,
                    
                    // Past dates
                    "text-slate-400 cursor-not-allowed opacity-50": isPast,
                    
                    // Today
                    "bg-iron-blue-600/60 text-white font-semibold border border-iron-blue-300": isTodayDate && !isSelectedDate,
                    
                    // Selected date
                    "bg-iron-blue-500 text-white hover:bg-iron-blue-600 border-2 border-iron-blue-200": isSelectedDate,
                    
                    // Weekend days (slightly different styling)
                    "text-slate-200": isWeekendDay && isCurrentMonthDay && !isPast && !isSelectedDate && !isTodayDate,
                  }
                )}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-slate-600">
          <div className="flex flex-wrap gap-4 text-xs text-slate-200">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-iron-blue-600 rounded mr-2 border border-iron-blue-400"></div>
              <span>Today</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-iron-blue-500 rounded mr-2 border-2 border-iron-blue-300"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-slate-600 rounded mr-2"></div>
              <span>Unavailable</span>
            </div>
          </div>
        </div>

        {selectedDate && (
          <div className="mt-4 p-3 bg-iron-blue-900/50 rounded-lg border border-iron-blue-600">
            <p className="text-sm text-slate-100">
              <strong className="text-white">Selected:</strong> {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
