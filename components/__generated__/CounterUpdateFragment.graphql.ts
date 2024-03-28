/**
 * @generated SignedSource<<372454274ee22fd3de8a75932d2c0c35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CounterUpdateFragment$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"CounterFragment">;
  } | null | undefined;
  readonly " $fragmentType": "CounterUpdateFragment";
};
export type CounterUpdateFragment$key = {
  readonly " $data"?: CounterUpdateFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CounterUpdateFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CounterUpdateFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Document",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CounterFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "DocumentsConnectionEdge",
  "abstractKey": null
};

(node as any).hash = "fe508d90ca7f6819944c5bf5a9c972ff";

export default node;
