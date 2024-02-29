/**
 * @generated SignedSource<<f2b7db73a0d354cee493afcc0eeefbec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AccessLevel = "Manage" | "Modify" | "None" | "View" | "%future added value";
export type FasolkiQuery$variables = Record<PropertyKey, never>;
export type FasolkiQuery$data = {
  readonly viewer: {
    readonly documents: ReadonlyArray<{
      readonly accessLevel: AccessLevel | null | undefined;
      readonly content: string | null | undefined;
      readonly id: string;
      readonly title: string | null | undefined;
      readonly type: string | null | undefined;
    } | null | undefined>;
    readonly email: string | null | undefined;
    readonly groups: ReadonlyArray<{
      readonly documents: ReadonlyArray<{
        readonly accessLevel: AccessLevel | null | undefined;
        readonly content: string | null | undefined;
        readonly id: string;
        readonly title: string | null | undefined;
        readonly type: string | null | undefined;
      } | null | undefined>;
      readonly id: string;
    } | null | undefined>;
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
  "name": "type",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accessLevel",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "documents",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "documents",
  "plural": true,
  "selections": [
    (v7/*: any*/),
    (v0/*: any*/),
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
    (v5/*: any*/)
  ],
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
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "groups",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v6/*: any*/)
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
          (v7/*: any*/),
          (v0/*: any*/),
          (v1/*: any*/),
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "groups",
            "plural": true,
            "selections": [
              (v7/*: any*/),
              (v0/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "55cc48825ed1314e6ef704bccabbf05a",
    "id": null,
    "metadata": {},
    "name": "FasolkiQuery",
    "operationKind": "query",
    "text": "query FasolkiQuery {\n  viewer {\n    __typename\n    id\n    email\n    documents {\n      __typename\n      id\n      type\n      title\n      content\n      accessLevel\n    }\n    groups {\n      __typename\n      id\n      documents {\n        __typename\n        id\n        type\n        title\n        content\n        accessLevel\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0813b9b9cc21349058a786c4a416dbc6";

export default node;
