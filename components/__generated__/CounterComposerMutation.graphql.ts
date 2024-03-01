/**
 * @generated SignedSource<<c68533995ebb1dc72d14456b1726f9a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CounterComposerMutation$variables = {
  content: string;
  title?: string | null | undefined;
  type: string;
};
export type CounterComposerMutation$data = {
  readonly addDocument: {
    readonly " $fragmentSpreads": FragmentRefs<"CounterComposerFragment">;
  } | null | undefined;
};
export type CounterComposerMutation = {
  response: CounterComposerMutation$data;
  variables: CounterComposerMutation$variables;
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
  "name": "title"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "type"
},
v3 = [
  {
    "kind": "Variable",
    "name": "content",
    "variableName": "content"
  },
  {
    "kind": "Variable",
    "name": "title",
    "variableName": "title"
  },
  {
    "kind": "Variable",
    "name": "type",
    "variableName": "type"
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
    "name": "CounterComposerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "addDocument",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CounterComposerFragment"
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
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CounterComposerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "addDocument",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isDocument"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2aab0e044c9ef8d9807e2b99795ac109",
    "id": null,
    "metadata": {},
    "name": "CounterComposerMutation",
    "operationKind": "mutation",
    "text": "mutation CounterComposerMutation(\n  $type: String!\n  $title: String\n  $content: String!\n) {\n  addDocument(type: $type, title: $title, content: $content) {\n    __typename\n    ...CounterComposerFragment\n    id\n  }\n}\n\nfragment CounterComposerFragment on Document {\n  __isDocument: __typename\n  id\n}\n"
  }
};
})();

(node as any).hash = "7c4779d826b67c99a2cbe6332c40d5e2";

export default node;
