import * as React from "react";
import styled from 'styled-components';
import { theme } from "../../theming/theme";

export interface IButtonProps {
    Caption: string;
    ButtonType?: "button" | "submit" | "reset";
    OrdinalType?: "primary" | "secondary";
    TextColor?: string;
    ButtonColor?: string;
    Disabled?: boolean;
    Size?: "small" | "medium" | "large";
    OnClick: () => void;
    OnBlur?: (event: React.FocusEvent<HTMLElement>) => void;
}

interface IButtonStyledProps {
    TextColor: string;
    ButtonColor: string;
    BackgroundColor: string;
    Size: string;
    Padding: string;
}

const StyledButton = styled.button<IButtonStyledProps>`
    padding: ${(props) => props.Padding};
    color: ${(props) => props.TextColor};
    background-color: ${(props) => props.BackgroundColor};
    border: 2px solid ${(props) => props.ButtonColor};
    font-weight: 700;
    font-size: ${(props) => props.Size};
    text-transform: uppercase;
    cursor: pointer;
    box-sizing: border-box;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin: 2px 5px;

    &:hover {
        opacity: 0.8;
        transition: opacity 0.3s;
    }

    &:disabled {
        opacity: 0.2;
        cursor: not-allowed;
    }
`;

export class Button extends React.PureComponent<IButtonProps> {
    public render() {
        return (
            <StyledButton
                type={this.props.ButtonType || "button"}
                onClick={this.handleClick}
                TextColor={this.props.TextColor || "#000"}
                ButtonColor={this.props.ButtonColor || theme.colorPrimary}
                disabled={this.props.Disabled}
                onBlur={this.handleBlur}
                BackgroundColor={this.calculateBackgroundColor()}
                Size={this.calculateFontSize()}
                Padding={this.calculatePadding()}
            >
                {this.props.Caption}
            </StyledButton>
        );
    }

    private handleClick = () => {
        !this.props.Disabled && this.props.OnClick();
    }

    private handleBlur = (event: React.FocusEvent<HTMLElement>) => {
        this.props.OnBlur && this.props.OnBlur(event);
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
                return "9px 10px";
            case "medium":
            default:
                return "12px 18px";
            case "large":
                return "18px 25px";
        }
    }

    private calculateBackgroundColor = (): string => {
        switch (this.props.OrdinalType) {
            case "primary":
            default:
                return this.props.ButtonColor || theme.colorPrimary;
            case "secondary":
                return "transparent";
        }
    }
}
