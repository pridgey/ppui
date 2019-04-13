import * as React from "react";
import styled from 'styled-components';
import { theme } from "../../theming/theme";

export interface ISecondaryButtonProps {
    Caption: string;
    ButtonType?: "button" | "submit" | "reset";
    TextColor?: string;
    BorderColor?: string;
    Disabled?: boolean;
    OnClick: () => void;
}

interface ISecondaryButtonStyledProps {
    TextColor: string;
    BorderColor: string;
}

const Button = styled.button<ISecondaryButtonStyledProps>`
    padding: 18px 25px;
    color: ${(props) => props.TextColor};
    background-color: transparent;
    border: 2px solid ${(props) => props.BorderColor};
    font-weight: 700;
    font-size: 17px;
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

export class SecondaryButton extends React.PureComponent<ISecondaryButtonProps> {
    public render() {
        return (
            <Button
                type={this.props.ButtonType || "button"}
                onClick={this.handleClick}
                TextColor={this.props.TextColor || this.props.BorderColor || theme.colorSecondary}
                BorderColor={this.props.BorderColor || theme.colorSecondary}
                disabled={this.props.Disabled}
            >
                {this.props.Caption}
            </Button>
        );
    }

    private handleClick = () => {
        !this.props.Disabled && this.props.OnClick();
    }
}
