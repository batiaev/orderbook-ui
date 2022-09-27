import React, {useEffect, useRef, useState} from 'react';
import {ColorType, createChart} from 'lightweight-charts';
import {useOrderBookState} from "../../../hooks/useOrderBookState";

export default function CandleStickChartWidget() {

    const [idx, setIdx] = useState(0);
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
        {time: curDate, open: 0, high: 0, low: 0, close: 0},
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
                if ((idx % 4) === 0) {
                    data.push({time: curDate, open: mid, high: mid, low: mid, close: mid});
                    if (data[0].close === 0) {
                        data.pop();
                    }
                } else {
                    data[data.length - 1].close = mid;
                    data[data.length - 1].high = Math.max(data[data.length - 1].high, mid);
                    data[data.length - 1].low = Math.max(data[data.length - 1].low, mid);
                }
                setIdx(idx + 1)
                setData(data)
            }
            if (data.length >= 25) {
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

            const newSeries = chart.addCandlestickSeries();
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, orderBook, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div ref={chartContainerRef}/>
    );
}
;
