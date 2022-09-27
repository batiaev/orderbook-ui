import React, {useEffect, useRef, useState} from 'react';
import {ColorType, createChart} from 'lightweight-charts';
import {useOrderBookState} from "../../../hooks/useOrderBookState";

export default function LineChartWidget() {

    const [curDate, setCurDate] = useState({year: 2022, month: 1, day: 1});

    function nextBusinessDay(time) {
        const d = new Date();
        d.setUTCFullYear(time.year);
        d.setUTCMonth(time.month - 1);
        d.setUTCDate(time.day + 1);
        d.setUTCHours(0, 0, 0, 0);
        return {
            year: d.getUTCFullYear(),
            month: d.getUTCMonth() + 1,
            day: d.getUTCDate(),
        };
    }

    const [data, setData] = useState([
        {time: curDate, value: 0},
    ])
    const {orderBook} = useOrderBookState();

    const backgroundColor = 'white';
    const lineColor = '#2962FF';
    const textColor = 'black';
    const areaTopColor = '#2962FF';
    const areaBottomColor = 'rgba(41, 98, 255, 0.28)';
    const chartContainerRef = useRef();

    useEffect(
        () => {
            const mid = orderBook.length === 0 ? 0 : ((orderBook[orderBook.length / 2].priceLevel
                + orderBook[orderBook.length / 2 - 1].priceLevel) / 2).toFixed(2);
            if (mid !== data[data.length - 1].value) {
                setCurDate(nextBusinessDay(curDate))
                data.push({time: curDate, value: mid});
                setData(data)
            }
            if (data.length > 1 && data[0].value === 0)
                data.shift()
            if (data.length >= 100) {
                data.shift();
                setData(data)
            }

            const handleResize = () => {
                chart.applyOptions({width: chartContainerRef.current.clientWidth});
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: {type: ColorType.Solid, color: backgroundColor},
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addAreaSeries({lineColor, topColor: areaTopColor, bottomColor: areaBottomColor});
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, curDate, orderBook, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div ref={chartContainerRef}/>
    )
}
