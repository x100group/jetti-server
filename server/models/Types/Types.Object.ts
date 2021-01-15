import { Type } from 'jetti-middle';
import { RegisteredDocumentsTypes } from '../documents.factory';
import { TypesBase } from './TypesBase';

export class TypesObject extends TypesBase {
  getTypes() {
    return RegisteredDocumentsTypes(type => Type.isRefType(type));
  }
}
