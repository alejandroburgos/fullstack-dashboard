import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts';
import hero2 from './../../../assets/images/hero-bg/hero-2.jpg';

import { Grid, TextField } from "@material-ui/core";
import moment from 'moment';
import { constants } from '../../../Constants';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { parseISO } from 'date-fns';

export const ResumeChartMonthly = (props) => {

    const [loading, setLoading] = useState(false)
    const [getWithdrawalMonthly, setGetWithdrawalMonthly] = useState({monthlyReport: [0]})
    const [getRevenueMonthly, setGetRevenueMonthly] = useState({monthlyReport: [0]})
    // get localStorage
    const token = localStorage.getItem("token");
    const userData = JSON.parse(token)

    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

    useEffect(() => {
        const url = `${constants.urlLocal}withdrawalDay/${userData.user}/${moment(date).format('MM-DD-YYYY')}`;
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setGetWithdrawalMonthly(json);
                setLoading(false);
            } catch (error) {
                setLoading(true);
            }
        };
        fetchData();
    }, [date, props.withdrawal]);

    useEffect(() => {
        const url = `${constants.urlLocal}revenueDay/${userData.user}/${moment(date).format('MM-DD-YYYY')}`;
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setGetRevenueMonthly(json);
                setLoading(false);
            } catch (error) {
                setLoading(true);
            }
        };
        fetchData();
    }, [date, props.revenue]);



    const chartDashboardMonitoring3AOptions = {
        chart: {
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        labels: getWithdrawalMonthly.days,
        fill: {
            opacity: 0.85,
            colors: ['#ac0616', '#16a136']
        },
        colors: ['#ac0616', '#16a136'],
        legend: {
            show: false
        },
        grid: {
            strokeDashArray: '5',
            borderColor: 'rgba(125, 138, 156, 0.3)'
        },
        xaxis: {
            crosshairs: {
                width: 1
            }
        },
        yaxis: {
            min: 0
        }
    }
    
    const chartDashboardMonitoring3AData = [
        {
            name: 'Ingresos',
            data: !loading && getWithdrawalMonthly && getWithdrawalMonthly?.data
        },
        {
            name: 'Retiradas',
            data: !loading && getRevenueMonthly && getRevenueMonthly?.data
        }
    ]

    // concat 
    return (
        <>
            <div >
                <Grid container spacing={0}>
                    <Grid item sm={12} md={12} xl={12}>
                        <div className="font-weight-bold font-size-lg mt-4 mb-2 text-black">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                label="Year and Month"
                                minDate={parseISO(moment().subtract(3, 'year').format('YYYY-MM-DD'))}
                                maxDate={parseISO(moment().format('YYYY-MM-DD'))}
                                value={date}
                                onChange={(newValue) => {
                                    setDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} helperText={null} />}
                            />                   
                            </LocalizationProvider>
                            </div>
                        <Chart options={chartDashboardMonitoring3AOptions} series={chartDashboardMonitoring3AData} type="bar" height={218} />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
