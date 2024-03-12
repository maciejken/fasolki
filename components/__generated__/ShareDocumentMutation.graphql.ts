/**
 * @generated SignedSource<<4ecda91efc7446f6e65eec4ba2f3c214>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShareDocumentMutation$variables = {
  id: string;
  permissionKey: string;
  permissionValue: number;
};
export type ShareDocumentMutation$data = {
  readonly updateDocumentPermissions: {
    readonly viewer: {
      readonly " $fragmentSpreads": FragmentRefs<"FasolkiViewerFragment">;
    } | null | undefined;
  } | null | undefined;
};
export type ShareDocumentMutation = {
  response: ShareDocumentMutation$data;
  variables: ShareDocumentMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "permissionKey"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "permissionValue"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "items": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "key",
            "variableName": "permissionKey"
          },
          {
            "kind": "Variable",
            "name": "value",
            "variableName": "permissionValue"
          }
        ],
        "kind": "ObjectValue",
        "name": "permissions.0"
      }
    ],
    "kind": "ListValue",
    "name": "permissions"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ShareDocumentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DocumentMutationResponse",
        "kind": "LinkedField",
        "name": "updateDocumentPermissions",
        "plural": false,
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
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShareDocumentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DocumentMutationResponse",
        "kind": "LinkedField",
        "name": "updateDocumentPermissions",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "viewer",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isViewer"
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "firstName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "DocumentsConnection",
                "kind": "LinkedField",
                "name": "documents",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DocumentsConnectionEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Document",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
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
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "documents(first:10)"
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "FasolkiViewerFragment_documents",
                "kind": "LinkedHandle",
                "name": "documents"
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
    "cacheID": "1ec8062b24f184d76b7a156c5a851df6",
    "id": null,
    "metadata": {},
    "name": "ShareDocumentMutation",
    "operationKind": "mutation",
    "text": "mutation ShareDocumentMutation(\n  $id: String!\n  $permissionKey: String!\n  $permissionValue: Int!\n) {\n  updateDocumentPermissions(id: $id, permissions: [{key: $permissionKey, value: $permissionValue}]) {\n    viewer {\n      __typename\n      ...FasolkiViewerFragment\n      id\n    }\n  }\n}\n\nfragment CounterFragment on Document {\n  id\n  type\n  title\n  content\n  accessLevel\n}\n\nfragment FasolkiViewerFragment on Viewer {\n  __isViewer: __typename\n  id\n  firstName\n  documents(first: 10) {\n    edges {\n      node {\n        ...CounterFragment\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8381bdf79d844be5ff918de09ea3b5df";

export default node;
