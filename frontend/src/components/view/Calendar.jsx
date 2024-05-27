import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import '../../../public/styles/calendar-heatmap.css';
import '../../../public/styles.css'
import axios from 'axios';

function Calendar({name}) {
  const endDate = new Date();
  const startDate = new Date(new Date().setDate(endDate.getDate() - 300));
  const [calendar, setCalendar] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  useEffect(() => {
    async function getActivityCalendar(handle) {
      try {
        const response = await axios.get(`http://localhost:3000/codeforces/values/${handle}`);
        const submissions = response.data;
        const submissionDates = submissions.map(submission => new Date(submission.creationTimeSeconds * 1000));
        
        console.log(submissionDates);
        let counter = 0;
        let counterday = 0;
        const calendar = submissionDates.reduce((acc, date) => {
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // Los meses son indexados desde cero
          const day = date.getDate();
          
          if (!acc[year]) acc[year] = {};
          if (!acc[year][month]) acc[year][month] = [];
          
          //acc[year][month].push((day,0));
          if(acc[year][month].includes(day)){
            acc[year][month].push([day,counterday+1]);
            counter= Math.max(counter,counterday+1);
          }else{
            acc[year][month].push([day,0]);
          }
          console.log('tip', counter);
          return acc;
        }, {});
        
        console.log(calendar);
        setCalendar(calendar);
      } catch (error) {
        console.error('Error fetching user status data:', error);
      }
    }
    
    getActivityCalendar('JudithMPeach');
  }, []);

  const generateHeatmapValues = (start, end) => {
    const values = [];
    let currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
      values.push({
        date: currentDate.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 5),
      });
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    return values;
  };

  const generateMonthLabels = (start, end) => {
    const monthLabels = [];
    let current = new Date(start);
    const endDate = new Date(end);

    while (current <= endDate) {
      const month = current.toLocaleString('default', { month: 'short' });
      const year = current.getFullYear();
      const label = `${month} ${year}`;
      if (!monthLabels.includes(label))
        monthLabels.push(label);
      current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    }

    return monthLabels.reverse();
  };

  const heatmapData = generateHeatmapValues(startDate, endDate);
  const monthLabels = generateMonthLabels(startDate, endDate).reverse();

  return (
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

          return `color-scale-${value.count}`;
        }}
        showMonthLabels={false}
        tooltipDataAttrs={(value) => {
          return {
            'data-tip': `${value.date} has count: ${value.count}`,
          };
        }}
      />
    </div>
  );
}

export default Calendar;
