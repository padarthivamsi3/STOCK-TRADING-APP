import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../api/client';
import { Button } from '../../../components/ui/button';

const TIME_FILTERS = [
    { label: '1D', days: 1, resolution: '15' },
    { label: '1W', days: 7, resolution: '60' },
    { label: '1M', days: 30, resolution: 'D' },
    { label: '3M', days: 90, resolution: 'D' },
    { label: '6M', days: 180, resolution: 'D' },
    { label: '1Y', days: 365, resolution: 'D' },
    { label: '5Y', days: 1825, resolution: 'W' },
    { label: 'MAX', days: 3650, resolution: 'M' },
];

const StockChart = ({ symbol, quote }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const candlestickSeriesRef = useRef(null);
    const lineSeriesRef = useRef(null);
    const [chartType, setChartType] = useState('candlestick');
    const [timeFilter, setTimeFilter] = useState(TIME_FILTERS[5]);

    // Calculate timestamps
    const getTimestamps = () => {
        const to = Math.floor(Date.now() / 1000);
        const from = to - (timeFilter.days * 24 * 60 * 60);
        return { from, to };
    };

    const { from, to } = getTimestamps();

    // Fetch historical data
    const { data, isLoading, error } = useQuery({
        queryKey: ['stockHistory', symbol, timeFilter],
        queryFn: async () => {
            const response = await apiClient.get(`/stocks/${symbol}/history`, {
                params: { resolution: timeFilter.resolution, from, to }
            });
            return response.data;
        },
        enabled: !!symbol,
        refetchInterval: 60000,
    });

    // Initialize chart
    useEffect(() => {
        if (!chartContainerRef.current) return;

        const container = chartContainerRef.current;
        
        const chart = createChart(container, {
            width: container.clientWidth,
            height: 400,
            layout: {
                background: { type: 'solid', color: '#111827' },
                textColor: '#e2e8f0',
            },
            grid: {
                vertLines: { color: '#1f2937' },
                horzLines: { color: '#1f2937' },
            },
            crosshair: {
                mode: 1,
            },
            rightPriceScale: {
                borderColor: '#1f2937',
            },
            timeScale: {
                borderColor: '#1f2937',
            },
        });

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#22c55e',
            downColor: '#ef4444',
            borderDownColor: '#ef4444',
            borderUpColor: '#22c55e',
            wickDownColor: '#ef4444',
            wickUpColor: '#22c55e',
        });

        const lineSeries = chart.addLineSeries({
            color: '#3b82f6',
            lineWidth: 2,
            visible: false,
        });

        chartRef.current = chart;
        candlestickSeriesRef.current = candlestickSeries;
        lineSeriesRef.current = lineSeries;

        // Resize observer
        const resizeObserver = new ResizeObserver(() => {
            chart.applyOptions({ width: container.clientWidth });
        });
        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
            chart.remove();
        };
    }, []);

    // Update chart data
    useEffect(() => {
        if (!data?.history || !chartRef.current || !candlestickSeriesRef.current || !lineSeriesRef.current) return;

        const { t, o, h, l, c } = data.history;

        if (t && o && h && l && c && t.length > 0) {
            const candlestickData = t.map((time, index) => {
                let timeNum = Number(time);
                if (timeNum > 1000000000000) timeNum = Math.floor(timeNum / 1000);
                
                return {
                    time: timeNum,
                    open: Number(o[index]),
                    high: Number(h[index]),
                    low: Number(l[index]),
                    close: Number(c[index]),
                };
            }).filter(d => Number.isFinite(d.time) && Number.isFinite(d.open));

            const lineData = candlestickData.map(d => ({
                time: d.time,
                value: d.close,
            }));

            candlestickSeriesRef.current.setData(candlestickData);
            lineSeriesRef.current.setData(lineData);
            chartRef.current.timeScale().fitContent();
        }
    }, [data]);

    // Toggle chart type
    useEffect(() => {
        if (!candlestickSeriesRef.current || !lineSeriesRef.current) return;
        
        if (chartType === 'candlestick') {
            candlestickSeriesRef.current.applyOptions({ visible: true });
            lineSeriesRef.current.applyOptions({ visible: false });
        } else {
            candlestickSeriesRef.current.applyOptions({ visible: false });
            lineSeriesRef.current.applyOptions({ visible: true });
        }
    }, [chartType]);

    const calculateChange = () => {
        if (!quote) return null;
        const current = quote.c;
        const previousClose = quote.pc;
        const change = current - previousClose;
        const changePercent = ((change / previousClose) * 100).toFixed(2);
        return { change, changePercent, current };
    };

    const changeData = calculateChange();
    const isPositive = changeData?.change >= 0;

    return (
        <div className="space-y-4">
            {/* Prevent Tailwind from applying border to chart elements */}
            <style>{`
                #stock-chart-container > * {
                    border: none !important;
                }
            `}</style>

            {changeData && (
                <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold">${changeData.current.toFixed(2)}</div>
                    <div className={`text-xl font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{changeData.change.toFixed(2)} ({isPositive ? '+' : ''}{changeData.changePercent}%)
                    </div>
                </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex space-x-2">
                    {TIME_FILTERS.map((filter) => (
                        <Button
                            key={filter.label}
                            variant={timeFilter.label === filter.label ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setTimeFilter(filter)}
                        >
                            {filter.label}
                        </Button>
                    ))}
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant={chartType === 'candlestick' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setChartType('candlestick')}
                    >
                        Candlestick
                    </Button>
                    <Button
                        variant={chartType === 'line' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setChartType('line')}
                    >
                        Line
                    </Button>
                </div>
            </div>

            {/* Chart container */}
            <div 
                id="stock-chart-container"
                ref={chartContainerRef}
                style={{
                    width: '100%',
                    height: '400px',
                    borderRadius: '0.5rem',
                }}
            />
        </div>
    );
};

export default StockChart;
