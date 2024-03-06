/**
 * @generated SignedSource<<bff4c300ad87dc8d3334fb0e327f8f9f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CounterComposerFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "CounterComposerFragment";
};
export type CounterComposerFragment$key = {
  readonly " $data"?: CounterComposerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CounterComposerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CounterComposerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Document",
  "abstractKey": null
};

(node as any).hash = "a04db92408e428455acc1dc47e0d160e";

export default node;