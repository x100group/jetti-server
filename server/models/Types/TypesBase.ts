import { DocTypes } from './../documents.types';
import { createDocument } from '../documents.factory';
import { buildTypesQueryList, DocumentOptions } from 'jetti-middle';
export interface ITypes {
  QueryList(): string;
  getTypes(): string[];
}

export class TypesBase implements ITypes {

  QueryList(): string {

    const select = this.getTypes()
      .map(el => ({ type: el, description: (createDocument(el as DocTypes).Prop() as DocumentOptions).description }));
    return buildTypesQueryList(select);

  }
  getTypes(): string[] {
    throw new Error('Method not implemented.');
  }
}
