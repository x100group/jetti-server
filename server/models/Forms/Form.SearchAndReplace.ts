import { FormBase, JForm } from 'jetti-middle';
import { Props, Ref } from 'jetti-middle';

@JForm({
  type: 'Form.SearchAndReplace',
  description: 'Search and replace',
  icon: 'fab fa-searchengin',
  menu: 'Search & replace',
})
export class FormSearchAndReplace extends FormBase {

  @Props({ type: 'Types.Catalog', label: 'Искомое значение' })
  OldValue: Ref = null;

  @Props({ type: 'string', label: 'Старое значение exchange code', readOnly: true })
  OldValueExchangeCode = '';

  @Props({ type: 'string', label: 'Старое значение exchange base', readOnly: true })
  OldValueExchangeBase = '';

  @Props({ type: 'Types.Catalog', label: 'Новое значение' })
  NewValue: Ref = null;

  @Props({ type: 'string', label: 'Новое значение exchange code', readOnly: true })
  NewValueExchangeCode = '';

  @Props({ type: 'string', label: 'Новое значение exchange base', readOnly: true })
  NewValueExchangeBase = '';

  @Props({ type: 'boolean', label: 'Заменять exchange code' })
  ReplaceExchangeCode = false;

  @Props({
    type: 'table', label: 'Search result', readOnly: true
  })
  SearchResult: SearchResult[] = [new SearchResult()];

  @Props({
    type: 'table', label: 'dynamicProps', hidden: true,
  })
  dynamicProps: any = [new SearchResult()];
}

export class SearchResult {

  @Props({ type: 'string', hidden: true, label: 'Источник' })
  Source = '';

  @Props({ type: 'string', label: 'Тип' })
  Type = '';

  @Props({ type: 'number', totals: 1, label: 'Количество' })
  Records = 0;

}

