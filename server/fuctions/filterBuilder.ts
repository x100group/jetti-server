import { FormListFilter, FilterInterval } from 'jetti-middle';
import { MSSQL } from '../mssql';
import { lib } from '../std.lib';

export interface IQueryFilter {
  tempTable: string;
  where: string;
}

export interface IUserContext {
  isAdmin: boolean;
  email: string;
}

const defaultExcludesTypes = ['Catalog.Operation.Group', 'Catalog.User', 'Catalog.Operation'];

export function userContextFilter(context: IUserContext, compField = '"company.id"') {
  return context.isAdmin ? '' :
    ` AND EXISTS (
    SELECT 1 FROM [rls].[company]
    WHERE
      [user] = N'${context.email}'
      AND company = ${compField})`;
}

export async function filterBuilder(filter: FormListFilter[], tx: MSSQL, excludesTypes = defaultExcludesTypes): Promise<IQueryFilter> {

  let where = ' (1 = 1) ';
  let tempTable = '';

  const mapFilter = async (f: FormListFilter) => ({
    ...f,
    column: `\"${f.left}\"`,
    useDescendants: (await useDescendants(f))
  });

  const useDescendants = async (f: FormListFilter) => {
    if (['in group', 'not in group'].includes(f.center) && typeof f.right !== 'object') return true;
    if (!f.right?.id || f.left === 'parent.id' || typeof f.right !== 'object' || excludesTypes.includes(f.right.type))
      return false;
    if (!tx) tx = lib.util.jettiPoolTx();
    return (await lib.doc.haveDescendants(f.right.id, tx));
  };

  const dateToSQLLiteral = (date: Date) => `N'${date.toJSON()}'`;

  const filterList = await Promise.all(filter
    .filter(el => !(el.right === null || el.right === undefined) || el.center === 'is null' || el.center === 'is not null')
    .map(f => mapFilter(f)));

  for (const f of filterList) {
    switch (f.center) {
      case '=': case '>=': case '<=': case '>': case '<': case '<>':
        if (Array.isArray(f.right)) { // time interval
          if (f.right[0]) where += ` AND ${f.column} >= '${f.right[0]}'`;
          if (f.right[1]) where += ` AND ${f.column} <= '${f.right[1]}'`;
          break;
        }
        if (typeof f.right === 'string') f.right = f.right.toString().replace('\'', '\'\'');
        if (typeof f.right === 'number') { where += ` AND ${f.column} ${f.center} '${f.right}'`; break; }
        if (typeof f.right === 'boolean') { where += ` AND ${f.column} ${f.center} '${f.right}'`; break; }
        if (f.right instanceof Date) { where += ` AND ${f.column} ${f.center} ${dateToSQLLiteral(f.right)}`; break; }
        if (f.useDescendants && tempTable.indexOf(`[#${f.left}]`) < 0) {
          tempTable += `SELECT id INTO [#${f.left}] FROM dbo.[Descendants]('${f.right.id}', '${f.right.type}');\n`;
          where += ` AND ${f.column} IN (SELECT id FROM [#${f.left}])`;
          break;
        }
        if (typeof f.right === 'object') {
          if (!f.right.id) where += ` AND ${f.column} IS NULL `;
          else if (f.left === 'parent.id') where += ` AND ${f.column} = '${f.right.id}'`;
          else if (!f.useDescendants || excludesTypes.includes(f.right.type))
            where += ` AND ${f.column} = '${f.right.id}'`;
          break;
        }
        if (!f.right) where += ` AND ${f.column} IS NULL `;
        else where += ` AND ${f.column} ${f.center} N'${f.right}'`;
        break;
      case 'like':
        where += ` AND ${f.column} LIKE N'%${(f.right['value'] || f.right).toString().replace('\'', '\'\'')}%' `;
        break;
      case 'not like':
        where += ` AND ${f.column} NOT LIKE N'%${(f.right['value'] || f.right).toString().replace('\'', '\'\'')}%' `;
        break;
      case 'start with':
        where += ` AND ${f.column} LIKE N'${(f.right['value'] || f.right).toString().replace('\'', '\'\'')}%' `;
        break;
      case 'end with':
        where += ` AND ${f.column} LIKE N'%${(f.right['value'] || f.right).toString().replace('\'', '\'\'')}' `;
        break;
      case 'matching':
        where += ` AND ${f.column} LIKE N'${(f.right['value'] || f.right).toString().replace('\'', '\'\'')}' `;
        break;
      case 'don\'t matching':
        where += ` AND ${f.column} NOT LIKE N'${(f.right['value'] || f.right).toString().replace('\'', '\'\'')}' `;
        break;
      case 'beetwen':
        if (Array.isArray(f.right)) {
          if (f.right[0] instanceof Date)
            where += ` AND ${f.column} >= ${dateToSQLLiteral(f.right[0])} AND ${f.column} <= ${dateToSQLLiteral(f.right[1])}`;
          else if (typeof f.right[0] === 'number') {
            if (f.right[0]) where += ` AND ${f.column} >= '${f.right[0]}'`;
            if (f.right[1]) where += ` AND ${f.column} <= '${f.right[1]}'`;
          }
        } else {
          const interval = f.right as FilterInterval;
          if (typeof interval.start === 'number') {
            where += ` AND ${f.column} >= '${interval.start}'`;
            where += ` AND ${f.column} <= '${interval.end}'`;
          } else if (interval.start)
            where += ` AND ${f.column} BEETWEN '${interval.start}' AND '${interval.end}' `;
        }
        break;
      case 'in':
        if (f.right['value'] || f.right)
          where += ` AND ${f.column} IN (${(f.right['value'] || f.right)}) `;
        break;
      case 'not in':
        where += ` AND ${f.column} NOT IN (${(f.right['value'] || f.right)}) `;
        break;
      case 'in group': case 'not in group':
        if (tempTable.indexOf(`[#${f.left}]`) < 0) {
          tempTable += `SELECT id INTO [#${f.left}] FROM dbo.[Descendants]('${f.right.id}', '${f.right.type}');\n`;
          where += ` AND ${f.column} ${f.center.replace(' group', '').toUpperCase()} (SELECT id FROM [#${f.left}])`;
        }
        break;
      case 'is null':
        where += ` AND ${f.column} IS NULL `;
        break;
      case 'is not null':
        where += ` AND ${f.column} IS NOT NULL `;
        break;
    }
  }
  return { where: where || '', tempTable: tempTable || '' };
}
