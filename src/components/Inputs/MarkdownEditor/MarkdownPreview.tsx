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

const UnstyledText = styled.span``;

const Italic = styled.span`
    font-style: italic;
`;

const Bold = styled.span`
    font-weight: bold;
`;

const BoldItalic = styled.span`
    font-style: italic;
    font-weight: bold;
`;

interface IMarkdownElement {
    Element: StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<any>, any>, any, React.DetailedHTMLProps<React.HTMLAttributes<any>, any>>;
    Children?: IMarkdownElement[];
    Text: string;
    TextAfter?: string;
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
        const mdElement: IMarkdownElement = this.findAndApplyHeader(line);
        line = mdElement.Text;
        if (mdElement.Element) {
            mdElement.Children = [{Element: UnstyledText, Text: line.substring(0, line.indexOf("*") === -1 ? line.length : line.indexOf("*"))}];
        } else {
            mdElement.Element = UnstyledText;
            mdElement.Children = [];
            mdElement.Text = line.substring(0, line.indexOf("*") === -1 ? line.length : line.indexOf("*"));
        }
        const boldItalics: IMarkdownElement = this.findAndApplyBoldItalic(line.substring(line.indexOf("*"), line.length), []);
        if (boldItalics) {
            mdElement.Children = mdElement.Children.concat([boldItalics]).concat(boldItalics.Children);
        }
        let element = <span>{mdElement.Text}</span>;
        if (mdElement.Element !== undefined)
        {
            const children: any[] = [];
            if (mdElement.Children) {
                mdElement.Children.filter((val) => val.Element !== undefined).map((child) => { children.push(<span><child.Element>{child.Text}</child.Element>{child.TextAfter}</span>); });
            }
            element = React.createElement(mdElement.Element, undefined, children);
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
    private repeatString = (value: string, times: number): string => {
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

    private findAndApplyBoldItalic = (line: string, children: IMarkdownElement[]): IMarkdownElement => {
        const markdownElement: IMarkdownElement = { Element: undefined, Children: children, Text: line };
        const first: number = line.indexOf("*");
        const last: number = line.lastIndexOf("*");
        if (first !== -1 && first !== last) {
            let repeatCount: number = this.getFirstCharRepeatCount(line.substring(first, line.length));
            let next: number = line.indexOf(this.repeatString("*", repeatCount), first + repeatCount);
            if (next === -1) {
                while (next === -1 && repeatCount > 1) {
                    repeatCount--;
                    next = line.indexOf(this.repeatString("*", repeatCount), first + repeatCount);
                }
            }
            while (next !== -1) {
                console.log(repeatCount);
                switch (repeatCount) {
                    case 0:
                        return undefined;
                    case 1:
                        markdownElement.Element = Italic;
                        break;
                    case 2:
                        markdownElement.Element = Bold;
                        break;
                    default:
                        markdownElement.Element = BoldItalic;
                        break;

                }
                markdownElement.Text = `${line.substring(first + repeatCount, next)}`;
                markdownElement.TextAfter = `${line.substring(next + repeatCount, line.indexOf("*", next + repeatCount) === -1 ? next + repeatCount : line.indexOf("*", next + repeatCount))}`;
                line = line.substring(next + repeatCount, line.length);
                children.unshift(this.findAndApplyBoldItalic(line, children));
                next = -1;
                repeatCount = this.getFirstCharRepeatCount(line.substring(first, line.length));
            }
        }
        markdownElement.Children = children;
        markdownElement.TextAfter = line;
        return markdownElement;
    }
}
