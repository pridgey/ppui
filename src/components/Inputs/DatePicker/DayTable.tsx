import * as React from "react";
import styled from "styled-components";

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
`;

const CalendarTH = styled.th`
    color: #cccccc;
    font-size: 14px;
    font-weight: 200;
    border-spacing: 0;
    border-bottom: 1px solid #202020;
    padding-bottom: 5px;
`;

const CalendarTD = styled.td`
    text-align: center;
    border-radius: 50px;
    border: 1px solid #fefefe;

    &:hover {
        border: 1px solid black;
        background: #1168b3;
        color: white;
    }
`;

const CalendarTDButton = styled.button`
    cursor: pointer;
    padding: 10px;
    border: none;
    background: none;
    height: 100%;
    width: 100%;
`;

const Weekday: { [decimal: string]: string } = {
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
    OnBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
}

export interface IDayTableState {
    ActiveCell: { Day: number, Month: number, Year: number};
}

const Today: Date = new Date();

export class DayTable extends React.Component<IDayTableProps, IDayTableState> {
    public static getDerivedStateFromProps(nextProps: IDayTableProps) {
        return {
            ActiveCell: nextProps.ActiveCell ? nextProps.ActiveCell : null,
        };
    }

    constructor(props: any) {
        super(props);
        this.state = {
            ActiveCell: this.props.ActiveCell,
        };
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

    private handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        const year = Number((event.target as HTMLButtonElement).dataset.year);
        const month = Number((event.target as HTMLButtonElement).dataset.month);
        const day = Number((event.target as HTMLButtonElement).dataset.day);
        this.props.OnClick(year, month, day);
    }

    private handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        const enterKey: number = 13;
        if (event.keyCode === enterKey) {
            const year = Number((event.target as HTMLButtonElement).dataset.year);
            const month = Number((event.target as HTMLButtonElement).dataset.month);
            const day = Number((event.target as HTMLButtonElement).dataset.day);
            this.props.OnClick(year, month, day);
        }
    }

    private handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
        this.props.OnBlur(event);
    }

    private firstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    }

    private daysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    }

    private createDaysOfTheMonth = () => {
        let weekday = this.firstDayOfMonth(this.state.ActiveCell.Year, this.state.ActiveCell.Month);
        const numDays = this.daysInMonth(this.state.ActiveCell.Year, this.state.ActiveCell.Month);
        const daysOfTheMonth = [];
        for (let day = 1; day < numDays + 1; day++) {
            const item = {
                day,
                weekday,
            };
            daysOfTheMonth.push(item);

            weekday++;
            if (weekday > 6) {
                weekday = 0;
            }
        }
        return daysOfTheMonth;
    }

    private createDayCell = (day: number, month: number, year: number, key: string, cellStyle: object, buttonStyle: object): JSX.Element => {
        return (
            <CalendarTD
            key={key}
            style={cellStyle}
            >
                <CalendarTDButton
                    onMouseDown={this.handleMouseDown}
                    onKeyDown={this.handleKeyDown}
                    onBlur={this.handleBlur}
                    data-day={day}
                    data-month={month}
                    data-year={year}
                    style={buttonStyle}
                >
                    {day.toString()}
                </CalendarTDButton>
        </CalendarTD>
        );
    }

    private loadStartFillers = (daysOfTheMonth: any) => {
        let year: number = this.state.ActiveCell.Year;
        let month: number = Number(this.state.ActiveCell.Month) - 1;
        if (this.state.ActiveCell.Month === 0) {
            year--;
            month = 11;
        }
        const numDays = this.daysInMonth(year, month);
        const numFillers = daysOfTheMonth[0].weekday - 1;
        const rowFillers: any[] = [];
        for (let idx = 0; idx <= numFillers; idx++) {
            const day = numDays - numFillers + idx;
            rowFillers.push(this.createDayCell(day, month, year, `StartFillerCell${day}`, undefined, {color: "#dddddd"}));
        }
        return rowFillers;
    }

    private loadEndFillers = (daysOfTheMonth: any) => {
        let year: number = this.state.ActiveCell.Year;
        let month: number = Number(this.state.ActiveCell.Month) + 1;
        if (this.state.ActiveCell.Month === 11) {
            year++;
            month = 0;
        }

        let numFillers = 6 - daysOfTheMonth[daysOfTheMonth.length - 1].weekday;
        if (numFillers === 0) {
            numFillers = 7;
        }
        const rowFillers: JSX.Element[] = [];
        for (let idx = 0; idx < numFillers; idx++) {
            const day = idx + 1;
            rowFillers.push(this.createDayCell(day, month, year, `EndFillerCell${day}`, undefined, {color: "#dddddd"}));
        }
        return rowFillers;
    }

    private createRowFromDayOn = (day: number) => {
        let year: number = this.state.ActiveCell.Year;
        let month: number = Number(this.state.ActiveCell.Month) + 1;
        if (this.state.ActiveCell.Month === 11) {
            year++;
            month = 0;
        }

        const numFillers = 7;
        const rowFillers: JSX.Element[] = [];
        for (let idx = day; idx < day + numFillers; idx++) {
            const currDay = idx + 1;
            rowFillers.push(this.createDayCell(currDay, month, year, `EndFillerCell${currDay}`, undefined, {color: "#dddddd"}));
        }
        return rowFillers;
    }

    private loadMonth = (daysOfTheMonth: any) => {
        const rows: JSX.Element[] = [];
        let row: JSX.Element[] = this.loadStartFillers(daysOfTheMonth);
        for (const item of daysOfTheMonth) {
            let cell: JSX.Element;
            // if current day == ActiveCell
            if ((this.state.ActiveCell !== undefined) &&
                (this.state.ActiveCell.Day === item.day && this.state.ActiveCell.Month === this.state.ActiveCell.Month && this.state.ActiveCell.Year === this.state.ActiveCell.Year)) {
                    cell = this.createDayCell(item.day, this.state.ActiveCell.Month, this.state.ActiveCell.Year, `Cell${item.day}`, {background: "#1168b3"}, {color: "white"});
            // if current day == today
            } else if (Today.getDate() === item.day && Today.getMonth() === this.state.ActiveCell.Month && Today.getFullYear() === this.state.ActiveCell.Year) {
                cell = this.createDayCell(item.day, this.state.ActiveCell.Month, this.state.ActiveCell.Year, `Cell${item.day}`, {background: "#eeeeee"}, undefined);
            // if current day != ActiveCell && != today
            } else {
                cell = this.createDayCell(item.day, this.state.ActiveCell.Month, this.state.ActiveCell.Year, `Cell${item.day}`, undefined, undefined);
            }

            row.push(cell);
            if (item.day === daysOfTheMonth.length && item.weekday !== 6) {
                row = row.concat(this.loadEndFillers(daysOfTheMonth));
                rows.push(<CalendarTR key={`Row${rows.length}`}>{row}</CalendarTR>);
            } else if (item.day === daysOfTheMonth.length && item.weekday === 6) {
                rows.push(<CalendarTR key={`Row${rows.length}`}>{row}</CalendarTR>);
                rows.push(<CalendarTR key={`Row${rows.length}`}>{this.loadEndFillers(daysOfTheMonth)}</CalendarTR>);
            } else if (item.weekday === 6) {
                rows.push(<CalendarTR key={`Row${rows.length}`}>{row}</CalendarTR>);
                row = [];
            }
        }
        if (rows.length < 6) {
            const lastWeekDay = daysOfTheMonth[daysOfTheMonth.length - 1].weekday;
            let startDay = 6 - lastWeekDay;
            if (startDay === 0) {
                startDay = 7;
            }
            rows.push(<CalendarTR key={`Row${rows.length}`}>{this.createRowFromDayOn(startDay)}</CalendarTR>);
        }
        return rows;
    }
}
