import * as React from "react";
import styled from "styled-components";
//import { theme } from "../../../theming/theme";

const PreviewWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

/*const H1 = styled.h1`

`;

const H2 = styled.h2`

`;*/

interface IMarkdownPreviewProps {
    Value: string;
}

export class MarkdownPreview extends React.PureComponent<IMarkdownPreviewProps> {
    public constructor(props: IMarkdownPreviewProps) {
        super(props);
    }

    public render() {
        return this.buildPreview();
    }

    private buildPreview = (): JSX.Element => {
        const elements: JSX.Element[] = [];
        const lines: string[] = this.props.Value.split(/\n/g);
        lines.map((line) => {
            elements.push(this.buildLine(line));
            elements.push(<br />)
        });
        return <PreviewWrapper>{elements}</PreviewWrapper>;
    }

    private buildLine = (line: string): JSX.Element => {
        return <span>{line}</span>;
    }
}
