import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
//import { theme } from "../../../theming/theme";

const PreviewWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const H1 = styled.h1`

`;

const H2 = styled.h2`

`;

interface IMarkdownElement {
    Element: StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<any>, any>, any, React.DetailedHTMLProps<React.HTMLAttributes<any>, any>>;
    Text: string;
}

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
            elements.push(<br />);
        });
        return <PreviewWrapper>{elements}</PreviewWrapper>;
    }

    private buildLine = (line: string): JSX.Element => {
        const mdElements: IMarkdownElement[] = [];
        mdElements.push(this.findAndApplyHeader(line));
        line = mdElements[0].Text;
        let element = <span>{mdElements[0].Text}</span>;
        if (mdElements[0].Element !== undefined)
        {
            element = React.createElement(mdElements[0].Element, undefined, [<span>{mdElements[0].Text}</span>]);
        }
        return element;
    }

    private findAndApplyHeader = (line: string): IMarkdownElement => {
        const markdownElement: IMarkdownElement = { Element: undefined, Text: line };
        if (line[0] === "#") {
            const rank: number = line.split(" ")[0].length;
            switch (rank) {
                case 1:
                    markdownElement.Element = H1;
                    markdownElement.Text = line.substring(rank, line.length);
                    break;
                case 2:
                    markdownElement.Element = H2;
                    markdownElement.Text = line.substring(rank, line.length);
                    break;
                default:
                    markdownElement.Element = H2;
                    markdownElement.Text = line.substring(rank, line.length);
                    break;
            }
        }
        return markdownElement;
    }

    // DUPLICATE FUNCTIOn -- is also in MarkdownEditor.tsx
    /*private repeatString = (value: string, times: number): string => {
        let repeatedValue: string = "";
        while (times > 0) {
            repeatedValue += value;
            times--;
        }
        return repeatedValue;
    }

    private getFirstCharRepeatCount = (value: string): number => {
        let count: number = 0;
        if (value.length > 0) {
            const char: string = value[0];
            while(value[count] === char) {
                count++;
            }
        }
        return count;
    }

    private findAndApplyBoldItalic = (line: string): IMarkdownElement => {
        const markdownElement: IMarkdownElement = { Element: <></>, Text: line };
        const first: number = line.indexOf("*");
        const last: number = line.lastIndexOf("*");
        if (first !== -1 && first !== last) {
            let repeatCount: number = this.getFirstCharRepeatCount(line.substring(first, line.length));
            let next: number = line.indexOf("*", first + 1);
            while (next !== last) {
                console.log(next);
                console.log(repeatCount);

                next = last;// line.indexOf("*", next + 1);
                repeatCount = 1;
            }
        } else {
            // take out this else statement when everything is working
            console.log(first);
            console.log(first === last);
        }
        return markdownElement;
    }*/
}
