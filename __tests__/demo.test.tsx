// // starrez component creator
import * as axe from "axe-core";
import * as enzyme from "enzyme";
import * as React from "react";
import * as ReactDom from "react-dom";

const EnzymeAdapter = require("enzyme-adapter-react-16");
enzyme.configure({ adapter: new EnzymeAdapter() });

import { Demo } from "../src/Components/Demo";

describe("<Footer />", () => {
    it("Fail fast quick test!", () => {
        const inputControl = enzyme.mount(<Demo Caption="test" />);
        expect(inputControl.length).toEqual(1);
    });

    it("should be acccessable", (done) => {
        const div = document.createElement("div");
        document.body.appendChild(div);

        const dom = ReactDom.render(<Demo Caption="test" />, div);
        const node = ReactDom.findDOMNode(div) as axe.ElementContext;

        return new Promise((resolve) => {
            axe.run(node, (error, results) => {
                resolve(results.violations.length);
            });
        })
        .then(((result) => {
            expect(result).toEqual(0);
            done();
        }));
    });
});
