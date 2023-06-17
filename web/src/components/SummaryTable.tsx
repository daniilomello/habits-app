import { useEffect, useState } from 'react';
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';
import { HabitDay } from './HabitDay';
import { api } from '../lib/axios';
import dayjs from 'dayjs';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDateSize = 18 * 7;
const amountOfDaysTofill = minimumSummaryDateSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[]

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get('summary').then(response => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, i) => (
          <div key={i} className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 && summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day');
          });

          return (
            <HabitDay
              key={dayInSummary?.id}
              date={date}
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed}
            />
          );
        })}

        {amountOfDaysTofill > 0 && Array.from({length: amountOfDaysTofill}).map((_, i) => (
          <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-30 cursor-not-allowed"></div>
        ))}
      </div>
    </div>
  );
}
