/**
 * @generated SignedSource<<8dba3c462426009fb9eb087ba151725a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CounterMutation$variables = {
  content?: string | null | undefined;
  id: string;
  title?: string | null | undefined;
};
export type CounterMutation$data = {
  readonly updateDocument: {
    readonly documentEdge: {
      readonly " $fragmentSpreads": FragmentRefs<"CounterUpdateFragment">;
    } | null | undefined;
  } | null | undefined;
};
export type CounterMutation = {
  response: CounterMutation$data;
  variables: CounterMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "content"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v3 = [
  {
    "kind": "Variable",
    "name": "content",
    "variableName": "content"
  },
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "title",
    "variableName": "title"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CounterMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "DocumentMutationResponseWithEdge",
        "kind": "LinkedField",
        "name": "updateDocument",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "DocumentsConnectionEdge",
            "kind": "LinkedField",
            "name": "documentEdge",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CounterUpdateFragment"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CounterMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "DocumentMutationResponseWithEdge",
        "kind": "LinkedField",
        "name": "updateDocument",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "DocumentsConnectionEdge",
            "kind": "LinkedField",
            "name": "documentEdge",
            "plural": false,
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
    "cacheID": "c63759279800dfe9b72a59370045fbbe",
    "id": null,
    "metadata": {},
    "name": "CounterMutation",
    "operationKind": "mutation",
    "text": "mutation CounterMutation(\n  $id: String!\n  $title: String\n  $content: String\n) {\n  updateDocument(id: $id, title: $title, content: $content) {\n    documentEdge {\n      ...CounterUpdateFragment\n    }\n  }\n}\n\nfragment CounterFragment on Document {\n  id\n  type\n  title\n  content\n  accessLevel\n}\n\nfragment CounterUpdateFragment on DocumentsConnectionEdge {\n  node {\n    ...CounterFragment\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "abf4da09fbb81a3afd2daf6eb03c96b2";

export default node;
