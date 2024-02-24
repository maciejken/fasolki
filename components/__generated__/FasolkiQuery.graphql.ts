/**
 * @generated SignedSource<<04556df9e494abb69d1e0c8628ac74c2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type FasolkiQuery$variables = Record<PropertyKey, never>;
export type FasolkiQuery$data = {
  readonly viewer: {
    readonly documents: ReadonlyArray<{
      readonly content: string | null | undefined;
      readonly id: string;
      readonly title: string | null | undefined;
    } | null | undefined>;
    readonly email: string | null | undefined;
    readonly id: string;
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
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "documents",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
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
          (v4/*: any*/),
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "documents",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              (v0/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2a1adc956f72e059be71f46b946ac2b2",
    "id": null,
    "metadata": {},
    "name": "FasolkiQuery",
    "operationKind": "query",
    "text": "query FasolkiQuery {\n  viewer {\n    __typename\n    id\n    email\n    documents {\n      __typename\n      id\n      title\n      content\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cc58a95e006045ff782fc739b999b509";

export default node;
