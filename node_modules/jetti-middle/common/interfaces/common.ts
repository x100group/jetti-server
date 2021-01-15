
export interface RefValue {
  id: string;
  type: string;
  code: string;
  value: string | number | boolean;
}

export interface PatchValue {
  [x: string]: (boolean | number | string | RefValue | {});
}

export interface ITree {
  id: string;
  description: string;
  parent: string;
}

export interface ISuggest {
  id: string;
  type: string;
  code: string;
  value: string;
  deleted: boolean;
  description?: string;
}

export interface IAttachmentsSettings {
  AttachmentType: string;
  AttachmentTypeDescription: string;
  StorageType: 'URL' | 'FILE';
  MaxFileSize: number;
  FileFilter: string;
  Tags: string[];
}

