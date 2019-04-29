import * as React from "react";
import styled from 'styled-components';
import { theme } from "../../../theming/theme";

export interface ITextInputProps {
    Type: "text" | "number" | "email" | "password" | "tel"
    TextColor?: string;
    BorderColor?: string;
    Disabled?: boolean;
    Size?: "small" | "medium" | "large";
    Label?: string;
    Placeholder?: string;
    Value?: string;
    OnChange: () => void;
}

export interface ITextInputState {
    TextValue: string;
}

interface ITextInputStyledProps {
    TextColor: string;
    BorderColor: string;
    Size: string;
    Padding: string;
}

interface ILabelStyledProps {
    Size: string;
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 10px 5px;
`;

const StyledInput = styled.input<ITextInputStyledProps>`
    padding: ${(props) => props.Padding};
    color: ${(props) => props.TextColor};
    border: 2px solid ${(props) => props.BorderColor};
    font-size: ${(props) => props.Size};
    box-sizing: border-box;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border-left-width: 4px;
    background-color: rgba(0,0,0,0.05);

    &:hover {
        opacity: 0.8;
        transition: opacity 0.3s;
    }

    &:disabled {
        opacity: 0.2;
        cursor: not-allowed;
    }
`;

const StyledLabel = styled.label<ILabelStyledProps>`
    font-size: ${(props) => props.Size};
    font-weight: 700;
`;

export class TextInput extends React.Component<ITextInputProps, ITextInputState> {
    private idValue = Math.random(); // <--- DEFINITELY need a better way of doing this

    constructor(props: ITextInputProps) {
        super(props);
        this.state = {
            TextValue: this.props.Value || "",
        }
    }
    public render() {
        return (
            <Wrapper>
                <StyledLabel
                    htmlFor={this.idValue.toString()}
                    Size={this.calculateFontSize()}>
                    {this.props.Label}
                </StyledLabel>
                <StyledInput
                    id={this.idValue.toString()}
                    aria-label={this.props.Label}
                    type={this.props.Type || "text"}
                    TextColor={this.props.TextColor || "#000"}
                    BorderColor={this.props.BorderColor || theme.colorPrimary}
                    disabled={this.props.Disabled}
                    Size={this.calculateFontSize()}
                    Padding={this.calculatePadding()}
                    onChange={this.handleChange}
                    placeholder={this.props.Placeholder}
                    value={this.state.TextValue}
                />
            </Wrapper>
        );
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ TextValue: event.currentTarget.value });
    }

    private calculateFontSize = (): string => {
        switch (this.props.Size) {
            case "small":
                return "10px";
            case "medium":
            default:
                return "13px";
            case "large":
                return "17px";
        }
    }

    private calculatePadding = (): string => {
        switch (this.props.Size) {
            case "small":
                return "9px 5px";
            case "medium":
            default:
                return "12px 9px";
            case "large":
                return "18px 15px";
        }
    }
}
