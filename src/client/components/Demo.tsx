import * as React from "react";
import styled from 'styled-components';
import { theme } from "../theming/theme";

export interface IComponentProps {
    Caption: string;
}

const Wrapper = styled.div`
    font-family: ${theme.fontMain};
    text-align: center;
`;

export class Demo extends React.Component<IComponentProps> {
   public render() {
       return (
           <Wrapper>
               {this.props.Caption}
          </Wrapper>
       );
   }
}
