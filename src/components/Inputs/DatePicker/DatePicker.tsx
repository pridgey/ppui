import * as React from "react";
import styled from "styled-components";
import { DayTable, Dropdown, IDropdownOption } from "../../../components";

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
    height: 350px;
    width: 300px;
    border-radius: 7.5px;
    position: absolute;
    top: 65px;
    left: 5px;
    outline: none;
    border: 1px solid black;


    &::after {
        content:"";
        position: absolute;
        top: -15px;
        left: 5%;
        background: black;
        width: 20px;
        height: 15px;

        /* The points are: (left top: x y, right top: x y, center bottom: x y) */
        -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
`;

const CalendarBanner = styled.div`
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: space-evenly;
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
}

export interface IDatePickerProps { 
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
    Active: boolean;
    ActiveCell: { Day: number, Month: number, Year: number};
    DateFormat: string;
    Display: boolean;
}

export class DatePicker extends React.Component<IDatePickerProps, IDatePickerState> {
    private DefaultDateFormat: string = "mm/dd/yyyy";

    constructor(props: any) {
        super(props);

        const today: Date = new Date();
        const startValue: boolean = this.props.StartDate !== undefined;
        const startYear: number = this.props.StartDate ? this.props.StartDate.getFullYear() : today.getFullYear();
        const startMonth: number = this.props.StartDate ? this.props.StartDate.getMonth() : today.getMonth();
        const startDay: number = this.props.StartDate ? this.props.StartDate.getDate() : today.getDate();

        this.state = {
            Value: startValue ? `${("0" + (Number(this.props.StartDate.getMonth()) + 1).toString()).slice(-2)}/${("0" + this.props.StartDate.getDate().toString()).slice(-2)}/${this.props.StartDate.getFullYear().toString()}` : "",
            HasValue: startValue ? true : false,
            HasDate: startValue ? true : false,
            Active: false,
            ActiveCell: { Day: startDay, Month: startMonth, Year: startYear},
            DateFormat: this.props.DateFormat !== undefined ? this.props.DateFormat : this.DefaultDateFormat,
            Display: false,
        };
    }

    public render() {
        return (
            <ComponentWrapper>
                <InputWrapper>
                    <DateInput
                        onFocus={(event: React.FocusEvent<HTMLInputElement>) => this.handleInputFocus(event)}
                        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>  this.handleInputBlur(event)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(event)}
                        value={this.state.HasDate ? 
                            `${("0" + (Number(this.state.ActiveCell.Month)+1).toString()).slice(-2)}/${("0" + this.state.ActiveCell.Day.toString()).slice(-2)}/${this.state.ActiveCell.Year.toString()}`
                            :
                            this.state.Value}
                    />
                        {(this.state.HasValue) ?
                            <FloatingLabel><span>Pick a Date</span></FloatingLabel>
                        :
                            <InputLabel><span>Pick a Date</span></InputLabel>
                        }
                </InputWrapper>
                { this.state.Display ?
                    <CalendarWrapper>
                        <CalendarBanner>
                            <Dropdown Value={this.state.ActiveCell.Month.toString()} Options={this.getMonthDropdownOptions()} OnChange={this.setMonth}/>
                            <Dropdown Value={this.state.ActiveCell.Year.toString()} Options={this.getYearDropdownOptions()} OnChange={this.setYear}/>
                        </CalendarBanner>
                        <DayTable
                            ActiveCell={this.state.ActiveCell}
                            OnClick={this.setDay}
                        />
                    </CalendarWrapper>
                    :
                    undefined
                }
            </ComponentWrapper>
        );
    }

    private getMonthDropdownOptions = (): IDropdownOption[] => {
        const options: IDropdownOption[] = [];
        for (let month = 0; month < 12; month++) {
            options.push({Caption: Month[month], Value: month.toString()});
        }
        return options;
    }

    private getYearDropdownOptions = (): IDropdownOption[] => {
        const options: IDropdownOption[] = [];
        const minYear: number = this.props.MinYear ? this.props.MinYear : 1800;
        const maxYear: number = this.props.MaxYear ? this.props.MaxYear : 2200;
        for (let year = minYear; year <= maxYear; year++) {
            options.push({Caption: year.toString(), Value: year.toString()});
        }
        return options;
    }

    private formatValue = (day: number, month: number, year: number) => {
        return `${("0" + (Number(month) + 1).toString()).slice(-2)}/${("0" + day.toString()).slice(-2)}/${year.toString()}`;
    }

    private setDay = (year: number, month: number, day: number) => {
        this.setState({Active: false, ActiveCell: { Day: day, Month: month, Year: year },
                       Display: false,
                       Value: this.formatValue(day, month, year),
                       HasValue: true, HasDate: true,}, () => {
                           this.props.OnChange(this.state.Value);
                       });
    }

    private setMonth = (value: string) => {
        const day = this.state.ActiveCell.Day;
        const month: number = Number(value);
        const year = this.state.ActiveCell.Year;
        this.setState({HasValue: true, HasDate: true, Display: true,
                       Value: this.formatValue(day, month, year),
                       ActiveCell: {Day: day, Month: month, Year: year}}, () => {
                        this.props.OnChange(this.state.Value);
                       });
    }

    private setYear = (value: string) => {
        const day = this.state.ActiveCell.Day;
        const month = this.state.ActiveCell.Month;
        const year: number = Number(value);
        this.setState({HasValue: true, HasDate: true, Display: true,
                       Value: this.formatValue(day, month, year),
                       ActiveCell: {Day: day, Month: month, Year: year}}, () => {
                        this.props.OnChange(this.state.Value);
                       });
    }

    private handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (this.props.DateFormat !== undefined) {
            event.target.placeholder = this.props.DateFormat;
        } else {
            event.target.placeholder = this.DefaultDateFormat;
        }
        this.setState({Display: true});
    }

    private handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const currValLength: number = event.target.value.length;
        if (event.relatedTarget === null ||
            !event.target.parentElement.parentElement.contains(event.relatedTarget as Node))
        {
            if (currValLength > 0) {
                this.setState({HasValue: true});
            } else {
                this.setState({HasValue: false});
            }
            if (currValLength === this.state.DateFormat.length) {
                this.setState({HasDate: true});
            } else {
                this.setState({HasDate: false});
            }
            this.setState({Display: false});
            event.target.removeAttribute("placeholder");
        }
    }

    private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currVal: string = event.target.value;
        const reNumber = new RegExp("\\d");
        const reDelimiter = new RegExp("\/");
        if ((reNumber.test(currVal.substring(currVal.length - 1, currVal.length)) && currVal.length < 11) || currVal.length === 0)
        {
            if ((currVal.length === 2 || currVal.length === 5) && currVal > this.state.Value) {
                this.setState({Value: currVal + "/"});
            } else {
                this.setState({Value: currVal});
            }
        } else if (reDelimiter.test(currVal.substring(currVal.length-1, currVal.length)) && currVal.length < 11) {
            this.setState({Value: currVal});
        }

        // update ActiveCell if new value's length matches DateFormat's length
        if (currVal.length === 10)
        {
            const month = Number(currVal.substring(0, 2));
            const day = Number(currVal.substring(3, 5));
            const year = Number(currVal.substring(6, 10));
            this.setState({ActiveCell: {Day: day, Month: month - 1, Year: year}}, () => {
                this.props.OnChange(this.state.Value);
            });
        } else if (currVal.length === 9) {
            this.setState({HasDate: false});
        }
    }
}