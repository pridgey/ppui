import * as React from "react";
import styled from 'styled-components';
import { theme } from "../../theming/theme";

export interface IPrimaryButtonProps {
    Caption: string;
    ButtonType?: "button" | "submit" | "reset";
    TextColor?: string;
    BackgroundColor?: string;
    Disabled?: boolean;
    OnClick: () => void;
}

interface IPrimaryButtonStyledProps {
    TextColor: string;
    BackgroundColor: string;
}

const Button = styled.button<IPrimaryButtonStyledProps>`
    padding: 18px 25px;
    color: ${(props) => props.TextColor};
    background-color: ${(props) => props.BackgroundColor};
    border: 0;
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

export class MarkdownEditor extends React.Component<IPrimaryButtonProps> {
    public render() {
        return (
            <Button
                type={this.props.ButtonType || "button"}
                onClick={this.handleClick}
                TextColor={this.props.TextColor || theme.colorWhite}
                BackgroundColor={this.props.BackgroundColor || theme.colorPrimary}
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
