export interface DocumentsState {
  documents: Document[];
}

type ContentType = 'counter' | 'note';

export interface DocumentContent<T> {
  type: ContentType;
  head?: string;
  body: T;
}

export interface Document<T = number> {
  title: string;
  content?: T;
  preview?: string;
  permissions: 'all' | 'modify' | 'view';
  createdAt?: string;
  updatedAt?: string;
}