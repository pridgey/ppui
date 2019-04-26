// react
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, DatePicker } from "./components";

const root = document.getElementById("app") as HTMLElement;

ReactDOM.render(
    <>
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
        <div style={{ padding: "20px", display: "flex", justifyContent: "space-between" }}>
            <DatePicker ID="DatePicker1" OnChange={(value) => console.log("The date you have selected: " + value)} />
        </div>
    </>
    , root);