import * as React from "react";
import styled from 'styled-components';

const Select = styled.select`
`;

const Option = styled.option`
`;

export interface IDropdownOption {
    Caption: string;
    Value: string;
}

export interface IDropdownProps { 
    Value: string;
    Options: IDropdownOption[];
    OnChange?: (value: string) => void;  
}

export interface IDropdownState { 
    Value: string;
}

export class Dropdown extends React.Component<IDropdownProps, IDropdownState> {
    public static getDerivedStateFromProps(nextProps: IDropdownProps) {
        console.log('here');
        return {
            Value: nextProps.Value,
        }
    }

    constructor(props: any){
        super(props);
        this.state = {
            Value: this.props.Value,
        }
    }

    public render() {
        return (
            <Select value={this.state.Value} onChange={this.OnChange}>
                {this.props.Options.map((option, index) => {
                    return <Option key={index} value={option.Value}>{option.Caption}</Option>
                })}
            </Select>
        );
    }

    public OnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value: string = event.target.value;
        this.setState({ Value: value }, () => {
            this.props.OnChange(value);
        });        
    }
}