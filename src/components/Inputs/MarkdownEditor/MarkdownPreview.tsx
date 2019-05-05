import * as React from "react";
import { Converter } from "showdown";
import styled from "styled-components";
//import { theme } from "../../../theming/theme";

const PreviewWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

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
        const converter = new Converter({
            omitExtraWLInCodeBlocks: false, /* default = false */
            noHeaderId: true, /* default = false */
            customizedHeaderId: false, /* default = false */
            ghCompatibleHeaderId: false, /* default = false */
            prefixHeaderId: false, /* default = false, can be string to set ID */
            parseImgDimensions: false, /* default = false */
            headerLevelStart: 1, /* default = 1 */
            simplifiedAutoLink: false, /* default = false */
            excludeTrailingPunctuationFromURLs: false, /* default = false */
            literalMidWordUnderscores: false, /* default = false */
            strikethrough: true, /* default = false */
            tables: true, /* default = false */
            tablesHeaderId: false, /* default = false */
            ghCodeBlocks: true, /* default = true */
            tasklists: false, /* default = false */
            smoothLivePreview: false, /* default = false */
            smartIndentationFix: false, /* default = false */
            disableForced4SpacesIndentedSublists: false, /* default = false */
            simpleLineBreaks: false, /* default = false */
            requireSpaceBeforeHeadingText: false, /* default = false */
            openLinksInNewWindow: true, /* default = false */
            backslashEscapesHTMLTags: false, /* default = false */
            emoji: true, /* default = false */
            underline: true, /* default = false */
            completeHTMLDocument: false, /* default = false */
            metadata: false, /* default = false */
            splitAdjacentBlockquotes: false, /* default = false */
        });
        const html = converter.makeHtml(this.props.Value);
        return <PreviewWrapper dangerouslySetInnerHTML={{__html: html}}/>;
    }
}
