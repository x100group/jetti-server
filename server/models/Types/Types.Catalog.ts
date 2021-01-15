import { Type } from 'jetti-middle';
import { RegisteredDocumentsTypes } from '../documents.factory';
import { TypesBase } from './TypesBase';

export class TypesCatalog extends TypesBase {

  getTypes() {
    return RegisteredDocumentsTypes(type => Type.isCatalog(type));
  }

}
