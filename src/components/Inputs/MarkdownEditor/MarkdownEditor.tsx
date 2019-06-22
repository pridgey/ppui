import * as React from "react";
import styled from "styled-components";
import { Button, MarkdownPreview } from "../../";
// import { theme } from "../../../theming/theme";

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

enum MarkdownMode {
    Write,
    Preview,
}

interface ISelectionIndices {
    Start: number;
    End: number;
}

interface IMarkdownEditorProps {
    Value?: string;
    Placeholder?: string;
}

interface IMarkdownEditorState {
    Value: string;
    Selected: ISelectionIndices;
    Mode: MarkdownMode;
}

export class MarkdownEditor extends React.Component<IMarkdownEditorProps, IMarkdownEditorState> {
    public constructor(props: IMarkdownEditorProps) {
        super(props);
        this.state = {
            Value: this.props.Value || "",
            Selected: {Start: 0, End: 0},
            Mode: MarkdownMode.Write,
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
                                OnClick={() => this.setState({ Mode: MarkdownMode.Write })}
                                Size="small"
                                TextColor="Black" // use theme?
                                ButtonColor="#6DD6FF" // use theme?
                            />
                            <Button
                                Caption="Preview"
                                OnClick={() => this.setState({ Mode: MarkdownMode.Preview })}
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
                { this.state.Mode === MarkdownMode.Write ?
                    <TextArea
                        value={this.state.Value}
                        placeholder={this.props.Placeholder}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    />
                :
                    <MarkdownPreview Value={this.state.Value}/>
                }
            </MDEWrapper>
        );
    }

    private handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({Value: event.target.value});
    }

    private handleSelect = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textArea: HTMLTextAreaElement = event.target;
        this.setState({ Selected: { Start: textArea.selectionStart, End: textArea.selectionEnd }});
    }

    private repeatString = (value: string, times: number): string => {
        let repeatedValue: string = "";
        while (times > 0) {
            repeatedValue += value;
            times--;
        }
        return repeatedValue;
    }

    private applyHeader = (rank: number) => {
        const val: string = this.state.Value;
        const start: number = this.state.Selected.Start;
        this.setState(
            {
                Value: `${val.substring(0, start)}${this.repeatString("#", rank)} ${val.substring(start, val.length)}`,
                Selected: { Start: start, End: val.length + rank + 1 },
            },
        );
    }

    private applyBold = () => {
        const val: string = this.state.Value;
        const start: number = this.state.Selected.Start;
        const end: number = this.state.Selected.End;
        this.setState(
            {
                Value: `${val.substring(0, start)}**${val.substring(start, end)}**${val.substring(end, val.length)}`,
                Selected: { Start: start, End: end + 4 },
            },
        );
    }

    private applyItalic = () => {
        const val: string = this.state.Value;
        const start: number = this.state.Selected.Start;
        const end: number = this.state.Selected.End;
        this.setState(
            {
                Value: `${val.substring(0, start)}*${val.substring(start, end)}*${val.substring(end, val.length)}`,
                Selected: { Start: start, End: end + 2 },
            },
        );
    }

    private applyStrikethrough = () => {
        const val: string = this.state.Value;
        const start: number = this.state.Selected.Start;
        const end: number = this.state.Selected.End;
        this.setState(
            {
                Value: `${val.substring(0, start)}~~${val.substring(start, end)}~~${val.substring(end, val.length)}`,
                Selected: { Start: start, End: end + 4 },
            },
        );
    }

    private applyURL = () => {
        const val: string = this.state.Value;
        const start: number = this.state.Selected.Start;
        const end: number = this.state.Selected.End;
        this.setState(
            {
                Value: `${val.substring(0, start)}[${val.substring(start, end)}](url)${val.substring(end, val.length)}`,
                Selected: { Start: start, End: end + 7 },
            },
        );
    }

    private applyBlockquote = () => {
        const val: string = this.state.Value;
        const start: number = this.state.Selected.Start;
        this.setState(
            {
                Value: `${val.substring(0, start)}> ${val.substring(start, val.length)}`,
                Selected: { Start: start, End: val.length + 2 },
            },
        );
    }
}
