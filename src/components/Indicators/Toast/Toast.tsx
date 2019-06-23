import * as React from "react";
import styled, { keyframes } from "styled-components";

export interface IToast {
    ID: number;
    Message: string;
    Timeout?: number; // default = 4 seconds
    Type?: string; // default = "Standard"
}

/*
const rightToLeft = keyframes`
    0% {
        left: 100%;
    }
    100% {
        left: 0;
    }
`;
*/

const translateY = keyframes`
    from {
        transform: translateY(-10px);
    }
    to {
        transform: translateY(0);
    }
`;

const ToastContainer = styled.div`
    min-height: 60px;
    width: 350px;
    border-radius: 5px;
    align-items: center;
    position: relative;
    font-family: Roboto;
    font-size: 15px;
    letter-spacing: 0.2px;
    animation: ${translateY} .5s;
    margin: 10px 0;
    box-shadow: #e3e3e3 1px 3px 8px 1px;
    cursor: pointer;
    transition: all 1s ease-in-out;
`;

interface ITimeoutHolder {
    BackgroundColor: string;
}

const TimeoutHolder = styled.div<ITimeoutHolder>`
    width: 25px;
    background-color: ${(props) => props.BackgroundColor};
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
    border-radius: 5px 0 0 5px;
`;

interface IIconWrapper {
    Color: string;
}

const IconWrapper = styled.div<IIconWrapper>`
    position: absolute;
    top: 5px;
    left: 2.5px;
    color: ${(props) => props.Color};
`;

const topToBottom = keyframes`
    from {
        height: 100%;
    }
    to {
        height: 0%;
    }
`;

interface ITimeout {
    Timeout: number;
    BackgroundColor: string;
}

const Timeout = styled.div<ITimeout>`
    background: ${(props) => props.BackgroundColor};
    height: 100%;
    width: 100%;
    animation: ${topToBottom} ${(props) => props.Timeout}s linear;
    position: absolute;
    bottom: 0;
    left: 0;
`;

interface IMessageWrapper {
    BackgroundColor: string;
    Color: string;
}

const MessageWrapper = styled.div<IMessageWrapper>`
    min-height: 60px;
    width: 325px;
    word-break: break-word;
    background-color: ${(props) => props.BackgroundColor};
    color: ${(props) => props.Color}
    padding: 5px 10px;
    box-sizing: border-box;
    margin-left: 25px;
    display: flex;
    border-radius: 0 5px 5px 0;
`;

export interface IToastProps {
    ID: number;
    Message: string;
    Timeout: number;
    Type: string;

    OnTimeout: (ID: number) => void;
}

interface IColors {
    Primary: string;
    Secondary: string;
    Background: string;
    Text: string;
    Icon: JSX.Element;
}

const TypeMap: { [key: string]: IColors } = {
    Information: {
        Primary: "#1D7FFF", Secondary: "#005AD0", Background: "#E2EAFF", Text: "#0E115C",
        Icon: <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M13.5,17.625 L13.5,15.375 C13.5,15.2656245 13.4648441,15.1757816 13.3945312,15.1054687 C13.3242184,15.0351559 13.2343755,15 13.125,15 L10.875,15 C10.7656245,15 10.6757816,15.0351559 10.6054688,15.1054687 C10.5351559,15.1757816 10.5,15.2656245 10.5,15.375 L10.5,17.625 C10.5,17.7343755 10.5351559,17.8242184 10.6054688,17.8945312 C10.6757816,17.9648441 10.7656245,18 10.875,18 L13.125,18 C13.2343755,18 13.3242184,17.9648441 13.3945312,17.8945312 C13.4648441,17.8242184 13.5,17.7343755 13.5,17.625 Z M16.5,9.75 C16.5,9.06249656 16.2832053,8.42578418 15.8496094,7.83984375 C15.4160135,7.25390332 14.8750032,6.80078285 14.2265625,6.48046875 C13.5781218,6.16015465 12.9140659,6 12.234375,6 C10.335928,6 8.88672375,6.83202293 7.88671875,8.49609375 C7.76953066,8.68359469 7.80078035,8.84765555 7.98046875,8.98828125 L9.52734375,10.1601562 C9.58203152,10.2070315 9.65624953,10.2304688 9.75,10.2304688 C9.87500063,10.2304688 9.9726559,10.1835942 10.0429688,10.0898438 C10.4570333,9.55859109 10.7929675,9.19921969 11.0507813,9.01171875 C11.3164076,8.82421781 11.6523417,8.73046875 12.0585938,8.73046875 C12.4335956,8.73046875 12.7675767,8.83203023 13.0605469,9.03515625 C13.3535171,9.23828227 13.5,9.46874871 13.5,9.7265625 C13.5,10.023439 13.4218758,10.2617179 13.265625,10.4414062 C13.1093742,10.6210946 12.8437519,10.7968741 12.46875,10.96875 C11.97656,11.1875011 11.5253927,11.5253883 11.1152344,11.9824219 C10.7050761,12.4394554 10.5,12.9296849 10.5,13.453125 L10.5,13.875 C10.5,13.9843755 10.5351559,14.0742184 10.6054688,14.1445312 C10.6757816,14.2148441 10.7656245,14.25 10.875,14.25 L13.125,14.25 C13.2343755,14.25 13.3242184,14.2148441 13.3945312,14.1445312 C13.4648441,14.0742184 13.5,13.9843755 13.5,13.875 C13.5,13.7265618 13.5839835,13.5332043 13.7519531,13.2949219 C13.9199227,13.0566394 14.1328112,12.863282 14.390625,12.7148438 C14.6406263,12.574218 14.8320306,12.462891 14.9648438,12.3808594 C15.0976569,12.2988277 15.2773426,12.1621103 15.5039062,11.9707031 C15.7304699,11.7792959 15.9042963,11.5917978 16.0253906,11.4082031 C16.146485,11.2246085 16.2558589,10.9882827 16.3535156,10.6992188 C16.4511724,10.4101548 16.5,10.0937517 16.5,9.75 Z M21,12 C21,13.6328207 20.5976603,15.138665 19.7929688,16.5175781 C18.9882772,17.8964913 17.8964913,18.9882772 16.5175781,19.7929688 C15.138665,20.5976603 13.6328207,21 12,21 C10.3671793,21 8.86133502,20.5976603 7.48242188,19.7929688 C6.10350873,18.9882772 5.01172277,17.8964913 4.20703125,16.5175781 C3.40233973,15.138665 3,13.6328207 3,12 C3,10.3671793 3.40233973,8.86133502 4.20703125,7.48242187 C5.01172277,6.10350873 6.10350873,5.01172277 7.48242188,4.20703125 C8.86133502,3.40233973 10.3671793,3 12,3 C13.6328207,3 15.138665,3.40233973 16.5175781,4.20703125 C17.8964913,5.01172277 18.9882772,6.10350873 19.7929688,7.48242187 C20.5976603,8.86133502 21,10.3671793 21,12 Z"></path>
              </svg>,
    },
    Success: {
        Primary: "#50B83C", Secondary: "#377E29", Background: "#E6FFE0", Text: "#146803",
        Icon: <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M15.2928932,9.29289322 L10.5,14.0857864 L8.70710678,12.2928932 C8.31658249,11.9023689 7.68341751,11.9023689 7.29289322,12.2928932 C6.90236893,12.6834175 6.90236893,13.3165825 7.29289322,13.7071068 L9.79289322,16.2071068 C10.1834175,16.5976311 10.8165825,16.5976311 11.2071068,16.2071068 L16.7071068,10.7071068 C17.0976311,10.3165825 17.0976311,9.68341751 16.7071068,9.29289322 C16.3165825,8.90236893 15.6834175,8.90236893 15.2928932,9.29289322 Z"></path>
              </svg>,
    },
    Warning: {
        Primary: "#FFBE00", Secondary: "#E5AB00", Background: "#FFF4D4", Text: "#665012",
        Icon: <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,3 C7.0294,3 3,7.0292 3,12 C3,16.9708 7.0294,21 12,21 C16.9706,21 21,16.9708 21,12 C21,7.0292 16.9706,3 12,3 Z M12,17.8906 C11.277,17.8906 10.691,17.3046 10.691,16.5816 C10.691,15.8586 11.277,15.2726 12,15.2726 C12.723,15.2726 13.3092,15.8586 13.3092,16.5816 C13.3092,17.3046 12.723,17.8906 12,17.8906 Z M13.421,7.7718 L12.9162,13.7016 C12.9162,14.2076 12.506,14.6178 12,14.6178 C11.494,14.6178 11.0836,14.2076 11.0836,13.7016 L10.579,7.7718 C10.5678,7.6992 10.56,7.6252 10.56,7.549 C10.56,6.7538 11.205,6.1092 12,6.1092 C12.7954,6.1092 13.44,6.7538 13.44,7.549 C13.44,7.6252 13.4324,7.6992 13.421,7.7718 Z"></path>
              </svg>,
    },
    Error: {
        Primary: "#FF3B30", Secondary: "#E30C00", Background: "#FFE0DE", Text: "#621915",
        Icon: <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M13.6666667,12 L17,8.66666667 L15.3333333,7 L12,10.3333333 L8.66666667,7 L7,8.66666667 L10.3333333,12 L7,15.3333333 L8.66666667,17 L12,13.6666667 L15.3333333,17 L17,15.3333333 L13.6666667,12 Z"></path>
              </svg>,
    },
};

export class Toast extends React.Component<IToastProps> {
    private countdown: HTMLElement;
    private toastContainer: HTMLElement;

    public static getDerivedStateFromProps(nextProps: IToastProps) {
        return nextProps;
    }

    constructor(props: any) {
        super(props);
        this.state = {
            Countdown: undefined,
        };
    }

    public componentDidMount() {
        this.countdown = document.getElementById(`ToastTimeout_${this.props.ID}`);
        this.toastContainer = this.countdown.parentElement.parentElement;
        this.countdown.addEventListener("animationend", this.hide);
        this.toastContainer.addEventListener("transitionend", this.timeout);
        this.toastContainer.setAttribute("animation-complete", "false")
    }

    public render() {
        return (
            <ToastContainer data-animation-complete="false" onClick={() => this.props.OnTimeout(this.props.ID)} onMouseOver={this.pause} onMouseOut={this.run}>
                <TimeoutHolder BackgroundColor={TypeMap[this.props.Type].Primary}>
                    <Timeout BackgroundColor={TypeMap[this.props.Type].Secondary} className="ToastTimeout" id={`ToastTimeout_${this.props.ID}`} Timeout={this.props.Timeout} onMouseOver={this.pause} onMouseOut={this.run} />
                    <IconWrapper Color={TypeMap[this.props.Type].Background}>
                        {TypeMap[this.props.Type].Icon}
                    </IconWrapper>
                </TimeoutHolder>
                <MessageWrapper BackgroundColor={TypeMap[this.props.Type].Background} Color={TypeMap[this.props.Type].Text}>
                    {this.props.Message}
                </MessageWrapper>
            </ToastContainer>
        );
    }

    private pause = () => {
        const toasts = document.getElementsByClassName("ToastTimeout");
        for (let i = 0; i < toasts.length; i++) {
            // toggle animation off
            const currentToast: HTMLElement = toasts[i] as HTMLElement;
            currentToast.style.animationPlayState = "paused";

            // toggle transition on (show)
            const currentToastContainer = currentToast.parentElement.parentElement;
            currentToastContainer.style.opacity = "1";
        }
    }

    private run = () => {
        const toasts = document.getElementsByClassName("ToastTimeout");
        for (let i = 0; i < toasts.length; i++) {
            // toggle animation on
            const currentToast: HTMLElement = toasts[i] as HTMLElement;
            currentToast.style.animationPlayState = "running";
            
            // toggle transition on (hide) - if it isn't already hiding
            const currentToastContainer: HTMLElement = currentToast.parentElement.parentElement;
            if (currentToastContainer.style.opacity !== "0" && currentToastContainer.getAttribute("animation-complete") === "true") {
                currentToastContainer.style.opacity = "0";
            }
        }
    }

    // private onKeyUp = (event: React.KeyboardEvent) => {
    //     if (event.keyCode === 13 /* enter */ || event.keyCode === 32 /* space */) {
    //         this.timeout();
    //     }
    // }

    private hide = () => {
        this.toastContainer.setAttribute("animation-complete", "true");
        this.toastContainer.style.opacity = "0";
    }

    private timeout = () => {
        if (this.toastContainer.style.opacity === "0") {
            this.run();
            this.props.OnTimeout(this.props.ID);
        }
    }
}
