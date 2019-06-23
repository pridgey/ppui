// react
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, DatePicker, MarkdownEditor, TextInput, Toast } from "./components";

const root = document.getElementById("app") as HTMLElement;

ReactDOM.render(
    <div style={{ fontFamily: "sans-serif" }}>
        <Toast Message="I am an information message." Timeout={4} ID={1} Type={"Information"} OnTimeout={undefined}/>
        <Toast Message="This is what success looks like." Timeout={4} ID={2} Type={"Success"} OnTimeout={undefined}/>
        <Toast Message="If you continue, don't say we didn't warn you. We clearly did." Timeout={4} ID={3} Type={"Warning"} OnTimeout={undefined}/>
        <Toast Message="You broke something. Nice job chump!" Timeout={4} ID={4} Type={"Error"} OnTimeout={undefined}/>
        <Toast Message="When we display a lot of information we will need more butter because the size of our toast increases. This message needs to be larger so I am typing this right now." Timeout={4} ID={5} Type={"Information"} OnTimeout={undefined}/>
        <Button
            Caption="Small"
            OnClick={() => alert("You clicked the best button")}
            Size="small"
            TextColor="Black"
        />
        <Button
            Caption="Medium"
            OnClick={() => alert("You clicked the best button")}
            Size="medium"
            ButtonColor="#6DD6FF"
            TextColor="Black"
        />
        <Button
            Caption="Large"
            OnClick={() => alert("You clicked the best button")}
            Size="large"
            TextColor="White"
        />
        <Button
            Caption="Disabled"
            OnClick={() => alert("You clicked the best button")}
            Size="large"
            Disabled={true}
        />
        <br />
        <Button
            Caption="Small"
            OnClick={() => alert("You clicked the best button")}
            Size="small"
            OrdinalType="secondary"
        />
        <Button
            Caption="Medium"
            OnClick={() => alert("You clicked the best button")}
            Size="medium"
            OrdinalType="secondary"
            ButtonColor="#00CCAA"
            TextColor="#00CCAA"
        />
        <Button
            Caption="Large"
            OnClick={() => alert("You clicked the best button")}
            Size="large"
            OrdinalType="secondary"
        />
        <Button
            Caption="Disabled"
            OnClick={() => alert("You clicked the best button")}
            Size="large"
            OrdinalType="secondary"
            Disabled={true}
        />
        <br />
        <TextInput
            Type="text"
            OnChange={undefined}
            Size="small"
            Placeholder="Itty Bitty"
            Label="Is this too small?"
        />
        <TextInput
            Type="text"
            OnChange={undefined}
            Value="Regular"
            BorderColor="#00CCAA"
            Label="Medium Text Input"
        />
        <TextInput
            Type="text"
            OnChange={undefined}
            Size="large"
            Placeholder="It is gigantic"
            Label="Big Boy Text Input"
            BorderColor="#6DD6FF"
        />
        <TextInput
            Type="text"
            OnChange={undefined}
            BorderColor="red"
            Label="I've been disabled"
            Disabled={true}
            Value="You cannot change me!"
        />
        <div style={{ padding: "20px", display: "flex", justifyContent: "space-between" }}>
            <DatePicker ID="DatePicker1" OnChange={(value) => console.log("The date you have selected: " + value)} />
        </div>
        <div style={{width: "600px"}}>
            <MarkdownEditor
                Placeholder="Go crazy..."
            />
        </div>
    </div>
    , root);