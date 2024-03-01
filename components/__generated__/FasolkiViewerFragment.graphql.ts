/**
 * @generated SignedSource<<30620a29e54e335d06bb15001b7fbb63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FasolkiViewerFragment$data = {
  readonly documents: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"CounterDocumentFragment">;
  } | null | undefined>;
  readonly firstName: string | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "FasolkiViewerFragment";
};
export type FasolkiViewerFragment$key = {
  readonly " $data"?: FasolkiViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FasolkiViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FasolkiViewerFragment",
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
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "documents",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CounterDocumentFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": "__isViewer"
};

(node as any).hash = "9f8a3ab2eaf2cc54b31df831521b17de";

export default node;
