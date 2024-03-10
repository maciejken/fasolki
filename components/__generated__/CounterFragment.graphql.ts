/**
 * @generated SignedSource<<d53601e80667c2ade13867c5854b9c71>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CounterFragment$data = {
  readonly accessLevel: number | null | undefined;
  readonly content: string;
  readonly id: string;
  readonly title: string | null | undefined;
  readonly type: string | null | undefined;
  readonly " $fragmentType": "CounterFragment";
};
export type CounterFragment$key = {
  readonly " $data"?: CounterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CounterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CounterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "accessLevel",
      "storageKey": null
    }
  ],
  "type": "Document",
  "abstractKey": null
};

(node as any).hash = "052d729b3f7020f75addfa2448167394";

export default node;
