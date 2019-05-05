import * as React from "react";
import styled from "styled-components";
import { Button } from "../../";
//import { theme } from "../../../theming/theme";

const MDEWrapper = styled.div`
    border: 1px solid pink;
`;

// use theme?
const MarkdownBarWrapper = styled.div`
    width: 100%;
    background: gray;
`;

const MarkdownBar = styled.ul`
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    font-size: 1em;
    height: 100%;
    align-items: center;
`;

const MarkdownItem = styled.li`
    margin: 0 5px;
`;

const MarkdownButton = styled.button`
    background: none;
    border: none;
    font: inherit;
    cursor: pointer;
`;

const TextArea = styled.textarea`
    height: 250px;
    width: 100%;
    padding: 10px;
    border: none;
    resize: none;
    box-sizing: border-box;
    font: inherit;
`;

interface ISelectionIndices {
    Start: number;
    End: number;
}

interface IMarkdownPreviewProps {
    Value?: string;
    Placeholder?: string;
}

interface IMarkdownPreviewState {
    Value: string;
    Selected: ISelectionIndices;
}

export class MarkdownPreview extends React.Component<IMarkdownPreviewProps, IMarkdownPreviewState> {
    public constructor(props: IMarkdownPreviewProps) {
        super(props);
        this.state = {
            Value: this.props.Value || "",
            Selected: {Start: 0, End: 0},
        };
    }

    public render() {
        return (
            <MDEWrapper>
                <MarkdownBarWrapper>
                    <MarkdownBar>
                        <MarkdownItem>
                            <Button
                                Caption="Write"
                                OnClick={() => console.log("You clicked the write button")}
                                Size="small"
                                TextColor="Black" // use theme?
                                ButtonColor="#6DD6FF" // use theme?
                            />
                            <Button
                                Caption="Preview"
                                OnClick={() => console.log("You clicked the preview button")}
                                Size="small"
                                TextColor="Black" // use theme?
                                ButtonColor="#6DD6FF" // use theme?
                            />
                        </MarkdownItem>
                        <MarkdownItem>
                            <MarkdownButton onClick={() => this.applyHeader(1)}>H1</MarkdownButton>
                        </MarkdownItem>
                        <MarkdownItem>
                            <MarkdownButton onClick={() => this.applyHeader(2)}>H2</MarkdownButton>
                        </MarkdownItem>
                        <MarkdownItem>
                            <MarkdownButton onClick={this.applyBold}>B</MarkdownButton>
                        </MarkdownItem>
                        <MarkdownItem>
                            <MarkdownButton onClick={this.applyItalic}>I</MarkdownButton>
                        </MarkdownItem>
                        <MarkdownItem>
                            <MarkdownButton onClick={this.applyStrikethrough}>S</MarkdownButton>
                        </MarkdownItem>
                        <MarkdownItem>
                            <MarkdownButton onClick={this.applyURL}>URL</MarkdownButton>
                        </MarkdownItem>
                        <MarkdownItem>
                            <MarkdownButton onClick={this.applyBlockquote}>Quote</MarkdownButton>
                        </MarkdownItem>
                    </MarkdownBar>
                </MarkdownBarWrapper>
                <TextArea
                    value={this.state.Value}
                    placeholder={this.props.Placeholder}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                />
            </MDEWrapper>
        );
    }
}
