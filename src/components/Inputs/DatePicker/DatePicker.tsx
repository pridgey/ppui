import * as React from "react";
import styled from "styled-components";
import { DayTable, Dropdown, IDropdownOption, Button } from "../../../components";

const ComponentWrapper = styled.div`
    display: flex;
    position: relative;
    font-family: inherit
    font-weigth: 400;
    color: #606060;
    margin: 20px 20px;
`;

const InputWrapper = styled.div`
    position: relative;
`;

const DateInput = styled.input`
    display: block;
    padding-left: 5px;
    height: 2em;
    width: 200px;
    outline: none;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid black;
    transition: border-width .2s ease-out;

    &:focus {
        border-width: 3px;
        border-color: #1168b3;
    }

    &:focus + span {
        opacity:1;
        transform: scale(0.75) translateY(-100%) translateX(-30px);
    }
`;

const InputLabel = styled.label`
    position: absolute;
    top: .8em;
    left: 5px;
    width: 100%;
    pointer-events: none;
    transition: .3s ease all;
    font-size: 16px;

    ${DateInput}:focus ~ & {
        top: -1.2em;
        left: 0;
        font-size: 12px;
        color: #1168b3;
    }
`;

const FloatingLabel = styled.label`
    position: absolute;
    width: 100%;
    pointer-events: none;
    top: -1.1em;
    transition: .3s ease all;
    font-size: 12px;
    color: black;

    ${DateInput}:focus ~ & {
        color: #1168b3;
    }
`;

const CalendarWrapper = styled.div`
    background: #fefefe;
    width: 300px;
    box-sizing: border-box;
    border-radius: 7.5px;
    position: absolute;
    z-index: 1;
    outline: none;
    border: 1px solid black;
    padding: 15px 0px;


    &::after {
        content:"";
        position: absolute;
        background: black;
        width: 20px;
        height: 15px;

        /* The points are: (left top: x y, right top: x y, center bottom: x y) */
        -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }

    &[data-transformy="bottom"] {
        top: 55px;

        &::after {
            top: -15px;
        }
    }

    &[data-transformy="top"] {
        bottom: 65px;
        &::after {
            bottom: -15px;
            transform: rotate(180deg)
        }
    }

    &[data-transformx="right"] {
        left: 5px;

        &::after {
            left: 5%;
        }
    }

    &[data-transformx="left"] {
        right: 5px;

        &::after {
            right: 50%;
        }
    }

    &[data-transformx="fill"][data-transformy="fill"] {
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
`;

const CalendarHeader = styled.header`
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: space-evenly;
`;

const CalendarFooter = styled.footer`
    display: flex;
    justify-content: center;
`;

const Month: { [decimal: string]: string } = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
};

export interface IDatePickerProps {
    ID: string;
    StartDate?: Date;
    MinYear?: number;
    MaxYear?: number;
    DateFormat?: string;

    OnChange?: (value: string) => void;
    OnHasDate?: (date: string) => void;
}

export interface IDatePickerState {
    Value: string;
    HasValue: boolean;
    HasDate: boolean;
    ActiveCell: { Day: number, Month: number, Year: number };
    DateFormat: string;
    IsCalendarOpen: boolean;
}

const today: Date = new Date();

export class DatePicker extends React.Component<IDatePickerProps, IDatePickerState> {
    private DefaultDateFormat: string = "mm/dd/yyyy";

    constructor(props: any) {
        super(props);

        const startValue: boolean = this.props.StartDate !== undefined;
        const startYear: number = this.props.StartDate ? this.props.StartDate.getFullYear() : today.getFullYear();
        const startMonth: number = this.props.StartDate ? this.props.StartDate.getMonth() : today.getMonth();
        const startDay: number = this.props.StartDate ? this.props.StartDate.getDate() : today.getDate();

        this.state = {
            Value: startValue ? `${("0" + (Number(this.props.StartDate.getMonth()) + 1).toString()).slice(-2)}/${("0" + this.props.StartDate.getDate().toString()).slice(-2)}/${this.props.StartDate.getFullYear().toString()}` : "",
            HasValue: startValue ? true : false,
            HasDate: startValue ? true : false,
            ActiveCell: { Day: startDay, Month: startMonth, Year: startYear },
            DateFormat: this.props.DateFormat !== undefined ? this.props.DateFormat : this.DefaultDateFormat,
            IsCalendarOpen: false,
        };
        window.addEventListener("resize", this.checkOverflow);
    }

    public componentDidUpdate() {
        this.checkOverflow();
    }

    public render() {
        return (
            <ComponentWrapper id={this.props.ID}>
                <InputWrapper>
                    <DateInput
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputBlur}
                        onChange={this.handleInputChange}
                        placeholder={this.state.IsCalendarOpen && !this.state.HasValue ? (this.props.DateFormat ? this.props.DateFormat : this.DefaultDateFormat) : undefined}
                        value={this.state.HasDate ?
                            this.formatValue(this.state.ActiveCell.Day, this.state.ActiveCell.Month, this.state.ActiveCell.Year)
                            :
                            this.state.Value}
                    />
                    {this.state.IsCalendarOpen || this.state.HasValue ?
                        <FloatingLabel><span>Pick a Date</span></FloatingLabel>
                        :
                        <InputLabel><span>Pick a Date</span></InputLabel>
                    }
                </InputWrapper>
                {this.state.IsCalendarOpen ?
                    <CalendarWrapper id={this.props.ID + "_CalendarWrapper"} data-transformx="right" data-transformy="bottom">
                        <CalendarHeader>
                            <Button Size="small" OrdinalType="secondary" OnClick={() => this.changeMonth(-1)} OnBlur={this.handleChildBlur} Caption="Prev" />
                            <Dropdown Value={this.state.HasDate ? this.state.ActiveCell.Month.toString() : today.getMonth().toString()} Options={this.getMonthDropdownOptions()} OnChange={this.setMonth} OnBlur={this.handleChildBlur} />
                            <Dropdown Value={this.state.HasDate ? this.state.ActiveCell.Year.toString() : today.getFullYear().toString()} Options={this.getYearDropdownOptions()} OnChange={this.setYear} OnBlur={this.handleChildBlur} />
                            <Button Size="small" OrdinalType="secondary" OnClick={() => this.changeMonth(1)} OnBlur={this.handleChildBlur} Caption="Next" />
                        </CalendarHeader>
                        <DayTable
                            ActiveCell={this.state.HasDate ? this.state.ActiveCell : { Day: today.getDate(), Month: today.getMonth(), Year: today.getFullYear() }}
                            OnClick={this.setDay}
                            OnBlur={this.handleChildBlur}
                        />
                        <CalendarFooter>
                            <Button Size="small" OrdinalType="primary" OnClick={this.setDateToToday} OnBlur={this.handleChildBlur} Caption="Today" />
                        </CalendarFooter>
                    </CalendarWrapper>
                    :
                    undefined
                }
            </ComponentWrapper>
        );
    }

    private checkOverflow = () => {
        if (this.state.IsCalendarOpen) {
            const element = document.getElementById(this.props.ID + "_CalendarWrapper");
            element.dataset.transformy = "bottom";
            element.dataset.transformx = "right";
            element.parentElement.style.position = "relative";
            // detect if calendar has bottom overflow
            const bottomOverflow: boolean = 0 > (window.innerHeight -
                (element.offsetHeight +
                    element.parentElement.offsetTop +
                    element.parentElement.offsetHeight));
            if (bottomOverflow) {
                element.dataset.transformy = "top";
            }

            // detect if calendar has right overflow
            const rightOverflow: boolean = 0 > (window.innerWidth -
                (element.parentElement.offsetLeft +
                    element.offsetLeft +
                    element.offsetWidth));
            if (rightOverflow) {
                element.dataset.transformx = "left";
            }

            // detect if calendar has top overflow
            const topOverflow: boolean = 0 > (element.parentElement.offsetTop - element.offsetHeight);
            if (topOverflow && bottomOverflow) {
                element.parentElement.style.position = "unset";
                element.dataset.transformy = "fill";
                element.dataset.transformx = "fill";
            }

            // detect if calendar has left overflow ... this might not always work, seems strange
            const leftOverflow: boolean = 0 > (element.parentElement.offsetLeft);
            if (leftOverflow && rightOverflow) {
                element.parentElement.style.position = "unset";
                element.dataset.transformx = "fill";
                element.dataset.transformy = "fill";
            }
            console.log("Should Handle Bottom Overflow: " + bottomOverflow);
            console.log("Should Handle Top Overflow: " + topOverflow);
            console.log("Should Handle Right Overflow: " + rightOverflow);
            console.log("Should Handle Left Overflow: " + leftOverflow);
        }
    }

    private changeMonth = (difference: number) => {
        const activeCell = this.state.ActiveCell;
        const sum = activeCell.Month + difference;
        if (sum < 0) {
            activeCell.Month = 11;
            activeCell.Year--;
        } else if (sum > 11) {
            activeCell.Month = 0;
            activeCell.Year++;
        } else {
            activeCell.Month = sum;
        }
        this.setState({
            ActiveCell: activeCell,
            Value: this.formatValue(activeCell.Day, activeCell.Month, activeCell.Year),
            HasValue: true, HasDate: true,
        });
    }

    private getMonthDropdownOptions = (): IDropdownOption[] => {
        const options: IDropdownOption[] = [];
        for (let month = 0; month < 12; month++) {
            options.push({ Caption: Month[month], Value: month.toString() });
        }
        return options;
    }

    private getYearDropdownOptions = (): IDropdownOption[] => {
        const options: IDropdownOption[] = [];
        const minYear: number = this.props.MinYear ? this.props.MinYear : 1800;
        const maxYear: number = this.props.MaxYear ? this.props.MaxYear : 2200;
        for (let year = minYear; year <= maxYear; year++) {
            options.push({ Caption: year.toString(), Value: year.toString() });
        }
        return options;
    }

    private formatValue = (day: number, month: number, year: number) => {
        return `${("0" + (Number(month) + 1).toString()).slice(-2)}/${("0" + day.toString()).slice(-2)}/${year.toString()}`;
    }

    private setDateToToday = () => {
        const day: number = today.getDate();
        const month: number = today.getMonth();
        const year: number = today.getFullYear();
        this.setState({
            ActiveCell: {
                Day: day,
                Month: month,
                Year: year,
            },
            Value: this.formatValue(day, month, year),
            HasValue: true, HasDate: true,
        });
    }

    private setDay = (year: number, month: number, day: number) => {
        this.setState({
            ActiveCell: { Day: day, Month: month, Year: year },
            IsCalendarOpen: false,
            Value: this.formatValue(day, month, year),
            HasValue: true, HasDate: true
        }, () => {
            this.props.OnChange(this.state.Value);
        });
    }

    private setMonth = (value: string) => {
        const day = this.state.ActiveCell.Day;
        const month: number = Number(value);
        const year = this.state.ActiveCell.Year;
        this.setState({
            HasValue: true, HasDate: true, IsCalendarOpen: true,
            Value: this.formatValue(day, month, year),
            ActiveCell: { Day: day, Month: month, Year: year }
        }, () => {
            this.props.OnChange(this.state.Value);
        });
    }

    private setYear = (value: string) => {
        const day = this.state.ActiveCell.Day;
        const month = this.state.ActiveCell.Month;
        const year: number = Number(value);
        this.setState({
            HasValue: true, HasDate: true, IsCalendarOpen: true,
            Value: this.formatValue(day, month, year),
            ActiveCell: { Day: day, Month: month, Year: year }
        }, () => {
            this.props.OnChange(this.state.Value);
        });
    }

    private handleInputFocus = () => {
        this.setState({ IsCalendarOpen: true });
    }

    private handleChildBlur = (event: React.FocusEvent<HTMLElement>) => {
        if (event.relatedTarget === null ||
            !document.getElementById(this.props.ID).contains(event.relatedTarget as Node)) {
            this.setState({ IsCalendarOpen: false });
        }
    }

    private handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const currValLength: number = event.target.value.length;
        if (event.relatedTarget === null ||
            !document.getElementById(this.props.ID).contains(event.relatedTarget as Node)) {
            if (currValLength > 0) {
                this.setState({ HasValue: true });
            } else {
                this.setState({ HasValue: false });
            }
            if (currValLength === this.state.DateFormat.length) {
                this.setState({ HasDate: true });
            } else {
                this.setState({ HasDate: false });
            }
            this.setState({ IsCalendarOpen: false });
        }
    }

    private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currVal: string = event.target.value;
        const reNumber = new RegExp("\\d");
        const reDelimiter = new RegExp("\/");
        if ((reNumber.test(currVal.substring(currVal.length - 1, currVal.length)) && currVal.length < 11) || currVal.length === 0) {
            if ((currVal.length === 2 || currVal.length === 5) && currVal > this.state.Value) {
                this.setState({ Value: currVal + "/", HasDate: false });
            } else {
                this.setState({ Value: currVal, HasDate: false });
            }
        } else if (reDelimiter.test(currVal.substring(currVal.length - 1, currVal.length)) && currVal.length < 11) {
            this.setState({ Value: currVal });
        }

        // update ActiveCell if new value's length matches DateFormat's length
        if (currVal.length === 10) {
            const month = Number(currVal.substring(0, 2));
            const day = Number(currVal.substring(3, 5));
            const year = Number(currVal.substring(6, 10));
            this.setState({ ActiveCell: { Day: day, Month: month - 1, Year: year }, HasDate: true }, () => {
                this.props.OnChange(this.state.Value);
            });
        } else if (currVal.length === 9) {
            this.setState({ HasDate: false });
        }
    }
}
