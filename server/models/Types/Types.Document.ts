import { Type } from 'jetti-middle';
import { RegisteredDocumentsTypes } from '../documents.factory';
import { TypesBase } from './TypesBase';

export class TypesDocument extends TypesBase {

  getTypes() {
    return RegisteredDocumentsTypes(type => Type.isDocument(type) && !Type.isOperation(type));
  }
}
