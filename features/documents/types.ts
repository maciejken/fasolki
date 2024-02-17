export interface DocumentsState {
  documents: Document[];
}

type DocumentType = 'counter' | 'note';
export interface NewDocument {
  type: DocumentType;
  title: string;
  content: string;
  userId: string;
}

export interface Document extends NewDocument {
  id: string;
  permissions: Permissions;
  createdAt: string;
  updatedAt?: string;
}

enum AccessLevel {
  None,
  View,
  Modify,
  Manage,
}

interface Permissions {
  [id: string]: AccessLevel;
}

export interface Permission {
  id: string;
  value: AccessLevel;
};