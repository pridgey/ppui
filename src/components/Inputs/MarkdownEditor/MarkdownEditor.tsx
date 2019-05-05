import * as React from "react";
import styled from 'styled-components';
import { theme } from "../../theming/theme";

interface IMarkdownEditordProps {

}

interface IMarkdownEditordState {

}

export class MarkdownEditor extends React.Component<IMarkdownEditordProps, IMarkdownEditordState> {
    public render() {
        return (
            <textarea>
            </textarea>
        );
    }
}
