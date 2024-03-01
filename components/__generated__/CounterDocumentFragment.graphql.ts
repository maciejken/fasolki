/**
 * @generated SignedSource<<4e8d03d4e2007bbf1f851a8d236d382b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CounterDocumentFragment$data = {
  readonly accessLevel: number | null | undefined;
  readonly content: string;
  readonly id: string;
  readonly title: string | null | undefined;
  readonly type: string | null | undefined;
  readonly " $fragmentType": "CounterDocumentFragment";
};
export type CounterDocumentFragment$key = {
  readonly " $data"?: CounterDocumentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CounterDocumentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CounterDocumentFragment",
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
  "abstractKey": "__isDocument"
};

(node as any).hash = "d556f12d32598935d4c4d709a15df7d1";

export default node;
