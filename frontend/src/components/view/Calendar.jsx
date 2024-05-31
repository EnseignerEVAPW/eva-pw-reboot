import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import '../../../public/styles/calendar-heatmap.css';
import '../../../public/styles.css'
import axios from 'axios';

function Calendar({name}) {
  const [endDate, setEndDate] = useState(new Date('December 31, 2023'));
  const [startDate, setStartDate] = useState(new Date('January 01, 2023'));
  const [calendar, setCalendar] = useState({});
  const [allYears, setAllYears] = useState([]);
  const [max, setMax] = useState(0);
  const [yearSelected, setYearSelected] = useState('2023');
  const [heatmapData, setHeatmapData] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);

  useEffect(() => {
    const getActivityCalendar = async (handle) => {
      try {
        const obtainedYears = []; 
        const response = await axios.get(`http://localhost:3000/codeforces/values/${handle}`);
        const submissions = response.data;
        const submissionDates = submissions.map(submission => new Date(submission.creationTimeSeconds * 1000));
        const calendar = submissionDates.reduce((acc, date) => {
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // Los meses son indexados desde cero
          const day = date.getDate();
          
          if(!obtainedYears.includes(year)){
            obtainedYears.push(year);
          }

          if (!acc[year]) acc[year] = {};
          if (!acc[year][month]) acc[year][month] = [];
          acc[year][month].push(day);
          return acc;
        }, {});

        setAllYears(obtainedYears);
        setStartDate(new Date(`January 01, ${obtainedYears[0]}`))
        setEndDate(new Date(`December 31, ${obtainedYears[0]}`))
        setCalendar(calendar);
      } catch (error) {
        console.error('Error fetching user status data:', error);
      }
    }
    getActivityCalendar(name);
  }, [name]);

  useEffect(()=> {
    setHeatmapData(generateHeatmapValues());
    setMonthLabels(generateMonthLabels().reverse());
    setStartDate(new Date(`January 01, ${yearSelected}`))
    setEndDate(new Date(`December 31, ${yearSelected}`))
  },[calendar, yearSelected]);

  const generateHeatmapValues = () => {
    const values = [];
    let maximoo = 0;
    let currentDate = new Date(`January 01, ${yearSelected}`);
    const endDate = new Date(`December 31, ${yearSelected}`);

    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth()+1;
      const day = currentDate.getDate();

      const repeat = calendar[year] && calendar[year][month]?
      calendar[year][month].reduce((repeat, val) => {
        return val === day ? repeat+1 : repeat;
      }, 0)
      : 0;
      maximoo = Math.max(maximoo, repeat);
      values.push({
        date: currentDate.toISOString().split('T')[0],
        count: repeat,
      });
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    setMax(maximoo);
    return values;
  };

  const generateMonthLabels = () => {
    const monthLabels2 = [];
    let current = new Date(`January 01, ${yearSelected}`);
    const endDate = new Date(`December 31, ${yearSelected}`);

    while (current <= endDate) {
      const month = current.toLocaleString('default', { month: 'short' });
      const year = current.getFullYear();
      const label = `${month} ${year}`;
      if (!monthLabels2.includes(label))
        monthLabels2.push(label);
      current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    }

    return monthLabels2.reverse();
  };

  return (
    <>
    <div className='flex '>
      {allYears && allYears.map((yearOne) => (
        <div className='mx-5 px-5 border-blue-600 border-2 rounded'>
          <button onClick={() => {setYearSelected(yearOne)}}>{yearOne}</button>
        </div>
      ))}
    </div>
    <div className="calendar-heatmap-container">
      <div className="month-labels-container">
        {monthLabels.map((label, index, array) => (
          <span key={index} className={`month-label ${index === 0 || index === array.length - 1 ? 'first-or-last' : ''}`}>
            {label}
          </span>
        ))}
      </div>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
        classForValue={(value) => {
          if (!value || value.count === 0)
            return 'color-empty';
          const aux = parseInt(value.count*4/max);
          return `color-scale-${aux}`;
        }}
        showMonthLabels={false}
        tooltipDataAttrs={(value) => {
          return {
            'data-tip': `${value.date} has count: ${parseInt(value.count*4/max)}`,
          };
        }}
      />
    </div>
    </>
  );
}

export default Calendar;
