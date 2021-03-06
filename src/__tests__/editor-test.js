import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { wrapInTestDNDContext } from './dndutils';

import Editor from '../Editor';

describe("Editor", function() {
  let renderedEditor
  let newName, newPhoto

  beforeEach(function() {
    renderedEditor = renderIntoDocument(<Editor
      cards={[ "julz", "gareth" ]}
      photos={{ "julz": "some-url", "gareth": "another-url" }}
      onAdd={(name, photo) => { newName = name; newPhoto = photo }}
    />)
  })

  it("contains a row for each card, plus the 'new row' bar", function() {
    const rows = scryRenderedDOMComponentsWithTag(renderedEditor, "tr")
    expect(rows.length).toEqual(3)
  })

  it("contains card name column", function() {
    const rows = scryRenderedDOMComponentsWithTag(renderedEditor, "tr")
    expect(rows.map(tr => tr.getElementsByTagName("input")[0].value)).toContain("julz", "gareth")
  })

  it("contains photo url column", function() {
    const rows = scryRenderedDOMComponentsWithTag(renderedEditor, "tr")
    expect(rows.map(tr => tr.getElementsByTagName("input")[1].value)).toContain("some-url", "another-url")
  })

  it("sends the entered name and photo when the Add Card button is clicked", function() {
    const rows = scryRenderedDOMComponentsWithTag(renderedEditor, "tr")
    const lastRow = rows[rows.length-1]
    lastRow.getElementsByTagName("input")[0].value = "foo"
    lastRow.getElementsByTagName("input")[1].value = "url"

    Simulate.change(lastRow.getElementsByTagName("input")[0])
    Simulate.change(lastRow.getElementsByTagName("input")[1])
    Simulate.click(lastRow.getElementsByTagName("button")[0])
    expect(newName).toEqual("foo")
    expect(newPhoto).toEqual("url")
  })
})
