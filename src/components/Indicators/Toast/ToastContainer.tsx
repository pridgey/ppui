import * as React from "react";
import styled from "styled-components";
import { IToast, Toast } from "./Toast";

const Container = styled.div`
    position: fixed;
    top: 25px;
    right: 25px;
    z-index: 2;
`;

export interface IToastContainerProps {
    Toasts: IToast[];
    HandleTimeout: (ID: number) => void;
}

export interface IToastContainerState {
    Toasts: IToast[];
}

export class ToastContainer extends React.Component<IToastContainerProps, IToastContainerState> {
    public static getDerivedStateFromProps(nextProps: IToastContainerProps) {
        return nextProps;
    }

    constructor(props: any) {
        super(props);
        this.state = {
            Toasts: [].concat(this.props.Toasts),
        };
    }

    public render() {
        return (
            <Container>
                {this.props.Toasts.map((toast) =>
                    <Toast key={toast.ID} ID={toast.ID} Message={toast.Message} Type={toast.Type} Timeout={toast.Timeout ? toast.Timeout : 4} OnTimeout={this.handleTimeout} />,
                )}
            </Container>
        );
    }

    private handleTimeout = (ID: number) => {
        this.props.HandleTimeout(ID);
    }
}
