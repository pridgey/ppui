// react
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DatePicker, PrimaryButton, SecondaryButton } from "./components";

const root = document.getElementById("app") as HTMLElement;

ReactDOM.render(
    <>
        <PrimaryButton
            Caption="Primary!"
            OnClick={() => alert("You clicked the button!")}
        />
        <PrimaryButton
            Caption="a primary with a custom color"
            OnClick={() => alert("You clicked the button 2!")}
            BackgroundColor="#6DD6FF"
            TextColor="black"
        />
        <PrimaryButton
            Caption="Disabled Primary Button!"
            OnClick={() => alert("You'll never see this.")}
            Disabled={true}
            BackgroundColor="red"
        />
        <br />
        <SecondaryButton
            Caption="Secondary"
            OnClick={() => alert("You've clicked a secondary button")}
        />
        <SecondaryButton
            Caption="Secondary button with new color"
            OnClick={() => alert("You've clicked another secondary button")}
            BorderColor="#00CCAA"
            TextColor="#00CCAA"
        />
        <SecondaryButton
            Caption="A disabled secondary button"
            OnClick={() => alert("You should never see this.")}
            Disabled={true}
            BorderColor="red"
        />
        <div style={{ padding:"20px", display: "flex", justifyContent: "space-between"}}>
            <DatePicker ID="DatePicker1" OnChange={(value) => console.log("The date you have selected: " + value)}/>
        </div>
    </>
    , root);