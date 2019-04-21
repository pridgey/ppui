import * as React from "react";
import styled from 'styled-components';

const CalendarTable = styled.table`
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;
`;

const CalendarTbody = styled.tbody`
    &:before {
        content: "NaN";
        display: block;
        line-height: 1em;
        color: transparent;
    }
`;

const CalendarTheadTR = styled.tr`
    border-spacing: 0;
`;

const CalendarTR = styled.tr`
    border-spacing: 0;
`

const CalendarTH = styled.th`
    color: #cccccc;
    font-size: 14px;
    font-weight: 200;
    border-spacing: 0;
    border-bottom: 1px solid #202020;
    padding-bottom: 5px;
`;

const CalendarTD = styled.td`
    padding: 10px;
    text-align: center;
    border-radius: 50px;
    border: 1px solid #fefefe;
    cursor: pointer;

    &:hover {
        border: 1px solid black;
        background: #1168b3;
        color: white;
    }
`;

const Weekday: { [number: string]: string } = {
    0: "Su",
    1: "Mo",
    2: "Tu",
    3: "We",
    4: "Th",
    5: "Fr",
    6: "Sa",
}

export interface IDayTableProps { 
    ActiveCell: { Day: number, Month: number, Year: number};
    OnClick: (year: number, month: number, day: number) => void;  
}

export interface IDayTableState { 
    ActiveCell: { Day: number, Month: number, Year: number};
}

const Today: Date = new Date();

export class DayTable extends React.Component<IDayTableProps, IDayTableState> {
    public static getDerivedStateFromProps(nextProps: IDayTableProps) {
        return {
            ActiveCell: nextProps.ActiveCell ? nextProps.ActiveCell : null
        };
    }

    constructor(props: any){
        super(props);
        this.state = {
            ActiveCell: this.props.ActiveCell,
        }
    }

    public render() {
        return (
            <CalendarTable>
                <thead>
                    <CalendarTheadTR>
                        <CalendarTH>{Weekday[0]}</CalendarTH>
                        <CalendarTH>{Weekday[1]}</CalendarTH>
                        <CalendarTH>{Weekday[2]}</CalendarTH>
                        <CalendarTH>{Weekday[3]}</CalendarTH>
                        <CalendarTH>{Weekday[4]}</CalendarTH>
                        <CalendarTH>{Weekday[5]}</CalendarTH>
                        <CalendarTH>{Weekday[6]}</CalendarTH>
                    </CalendarTheadTR>
                </thead>
                <CalendarTbody>
                    {this.loadMonth(this.createDaysOfTheMonth())}
                </CalendarTbody>
            </CalendarTable>
        );
    }

    private handleClick = (event: any) => {
        const year = Number(event.target.dataset.year);        
        const month = Number(event.target.dataset.month);
        const day = Number(event.target.dataset.day);
        this.props.OnClick(year, month, day);
    };  

    private firstDayOfMonth = (year: number, month: number) => {
        var date = new Date(year, month, 1);
        return date.getDay();
    }

    private daysInMonth = (year: number, month: number) => {
        var date = new Date(year, month+1, 0);
        return date.getDate();
    }

    private createDaysOfTheMonth = () => {
        let weekday = this.firstDayOfMonth(this.state.ActiveCell.Year, this.state.ActiveCell.Month);
        let numDays = this.daysInMonth(this.state.ActiveCell.Year, this.state.ActiveCell.Month);
        let daysOfTheMonth = [];
        var day: number;
        for(day = 1; day < numDays + 1; day++)
        {
            var item = {
                "day": day,
                "weekday": weekday,
            };
            daysOfTheMonth.push(item);

            weekday++;
            if (weekday > 6)
                weekday = 0;
        }
        return daysOfTheMonth;
    }

    private loadStartFillers = (daysOfTheMonth: any) => {
        let year: number = this.state.ActiveCell.Year;
        let month: number = Number(this.state.ActiveCell.Month) - 1;
        if (this.state.ActiveCell.Month == 0)
        {
            year--;
            month = 11;
        }
        const numDays = this.daysInMonth(year, month);
        const numFillers = daysOfTheMonth[0].weekday - 1;
        let rowFillers: any[] = [];
        var idx: number;
        for(idx = 0; idx <= numFillers; idx++)
        {
            const day = numDays - numFillers + idx;
            rowFillers.push(<CalendarTD
                                tabIndex = {0}
                                key={`StartFillerCell${day}`}
                                data-day={day}
                                data-month={month}
                                data-year={year}
                                onClick={(event) => this.handleClick(event)}
                                onMouseDown={(event) => this.handleClick(event)}
                                style={{color: "#dddddd"}}
                            >{day.toString()}
                            </CalendarTD>);
        }
        return rowFillers;
    }

    private loadEndFillers = (daysOfTheMonth: any) => {
        let year: number = this.state.ActiveCell.Year;
        let month: number = Number(this.state.ActiveCell.Month) + 1;
        if (this.state.ActiveCell.Month == 11)
        {
            year++;
            month = 0;
        }

        let numFillers = 6 - daysOfTheMonth[daysOfTheMonth.length-1].weekday;
        if (numFillers == 0)
            numFillers = 7;
        let rowFillers: any[] = [];
        var idx: number;
        for(idx = 0; idx < numFillers; idx++)
        {
            const day = idx + 1;
            rowFillers.push(<CalendarTD
                                tabIndex = {0}
                                key={`EndFillerCell${day}`}
                                data-day={day}
                                data-month={month}
                                data-year={year}
                                onClick={(event) => this.handleClick(event)}
                                onMouseDown={(event) => this.handleClick(event)}
                                style={{color: "#dddddd"}}
                            >{day.toString()}
                            </CalendarTD>);
        }
        return rowFillers;
    }

    private createRowFromDayOn = (day: number) => {
        let year: number = this.state.ActiveCell.Year;
        let month: number = Number(this.state.ActiveCell.Month) + 1;
        if (this.state.ActiveCell.Month == 11)
        {
            year++;
            month = 0;
        }

        const numFillers = 7;
        let rowFillers: any[] = [];
        var idx: number;
        for(idx = day; idx < day + numFillers; idx++)
        {
            const day = idx + 1;
            rowFillers.push(<CalendarTD
                                tabIndex = {0}
                                key={`EndFillerCell${day}`}
                                data-day={day}
                                data-month={month}
                                data-year={year}
                                onClick={(event) => this.handleClick(event)}
                                onMouseDown={(event) => this.handleClick(event)}
                                style={{color: "#dddddd"}}
                            >{day.toString()}
                            </CalendarTD>);
        }
        return rowFillers;
    }

    private loadMonth = (daysOfTheMonth: any) => {
        let rows: any[] = [];
        let row: any[] = this.loadStartFillers(daysOfTheMonth);    
        for(let item of daysOfTheMonth)
        {
            let cell = (<CalendarTD
                            tabIndex = {0}
                            key={`Cell${item.day}`}
                            data-day={item.day} data-month={this.state.ActiveCell.Month}
                            data-year={this.state.ActiveCell.Year}
                            onClick={(event) => this.handleClick(event)}
                            onMouseDown={(event) => this.handleClick(event)}
                        >
                        {item.day.toString()}
                        </CalendarTD>);
            if (Today.getDate() == item.day && Today.getMonth() == this.state.ActiveCell.Month && Today.getFullYear() == this.state.ActiveCell.Year)
            {
                cell = (<CalendarTD
                    tabIndex = {0}
                    key={`Cell${item.day}`}
                    data-day={item.day}
                    data-month={this.state.ActiveCell.Month}
                    data-year={this.state.ActiveCell.Year}
                    onMouseDown={(event) => this.handleClick(event)}
                    style={{background:"#eeeeee", color: "black"}}
                >
                {item.day.toString()}
                </CalendarTD>);
            }
            if (this.state.ActiveCell !== undefined)
            {
                if(this.state.ActiveCell.Day == item.day && this.state.ActiveCell.Month == this.state.ActiveCell.Month && this.state.ActiveCell.Year == this.state.ActiveCell.Year)
                {
                    cell = (<CalendarTD
                                tabIndex = {0}
                                key={`Cell${item.day}`}
                                data-day={item.day}
                                data-month={this.state.ActiveCell.Month}
                                data-year={this.state.ActiveCell.Year}
                                onClick={(event) => this.handleClick(event)}
                                onMouseDown={(event) => this.handleClick(event)}
                                style={{background:"#1168b3", color: "white"}}
                            >
                            {item.day.toString()}
                            </CalendarTD>);
                }
            }

            row.push(cell);
            if (item.day == daysOfTheMonth.length && item.weekday != 6)
            {
                row = row.concat(this.loadEndFillers(daysOfTheMonth));
                rows.push(<CalendarTR key={`Row${rows.length}`}>{row}</CalendarTR>);   
            }
            else if (item.day == daysOfTheMonth.length && item.weekday == 6)
            {
                rows.push(<CalendarTR key={`Row${rows.length}`}>{row}</CalendarTR>);
                rows.push(<CalendarTR key={`Row${rows.length}`}>{this.loadEndFillers(daysOfTheMonth)}</CalendarTR>);
            }
            else if (item.weekday == 6)
            {
                rows.push(<CalendarTR key={`Row${rows.length}`}>{row}</CalendarTR>);
                row = [];
            }                      
        }
        if (rows.length < 6)
        {
            const lastWeekDay = daysOfTheMonth[daysOfTheMonth.length-1].weekday;
            let startDay = 6 - lastWeekDay;
            if (startDay == 0)
                startDay = 7;                
            rows.push(<CalendarTR key={`Row${rows.length}`}>{this.createRowFromDayOn(startDay)}</CalendarTR>)
        }
        return rows;
    }
}