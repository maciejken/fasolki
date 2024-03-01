/**
 * @generated SignedSource<<327b4281f275bd7c440a184f0485d577>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FasolkiQuery$variables = Record<PropertyKey, never>;
export type FasolkiQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"FasolkiViewerFragment">;
  } | null | undefined;
};
export type FasolkiQuery = {
  response: FasolkiQuery$data;
  variables: FasolkiQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FasolkiQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FasolkiViewerFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FasolkiQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isViewer"
          },
          (v1/*: any*/),
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
              (v0/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isDocument"
              },
              (v1/*: any*/),
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
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "447a4cf7d3acaa9f9b44089484da733c",
    "id": null,
    "metadata": {},
    "name": "FasolkiQuery",
    "operationKind": "query",
    "text": "query FasolkiQuery {\n  viewer {\n    __typename\n    ...FasolkiViewerFragment\n    id\n  }\n}\n\nfragment CounterDocumentFragment on Document {\n  __isDocument: __typename\n  id\n  type\n  title\n  content\n  accessLevel\n}\n\nfragment FasolkiViewerFragment on Viewer {\n  __isViewer: __typename\n  id\n  firstName\n  documents {\n    __typename\n    ...CounterDocumentFragment\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "31b13978a781839cd5972c185cc359c8";

export default node;
