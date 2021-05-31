import { FormListFilter, FilterInterval } from 'jetti-middle';

export interface IQueryFilter {
  tempTable: string;
  where: string;
}

export interface IUserContext {
  isAdmin: boolean;
  email: string;
}

export const userContextFilter = (context: IUserContext, compField = '"company.id"') =>
  context.isAdmin ? '' :
    ` AND EXISTS (
    SELECT 1 FROM [rls].[company]
    WHERE
      [user] = N'${context.email}'
      AND company = ${compField})`;

// export const userContextFilter = (context: IUserContext, compField = '"company.id"') =>
//   context.isAdmin ? '' :
//     ` AND ${compField} IN (
//     SELECT '00000000-0000-0000-0000-000000000000'
//     UNION ALL
//     SELECT [company] FROM [rls].[company] r
//     WHERE r.[user] = N'${context.email}' AND r.company = ${compField}
//   )`;

export const filterBuilder = (filter: FormListFilter[],
  excludesTypes = ['Catalog.Operation.Group', 'Catalog.User', 'Catalog.Operation']): IQueryFilter => {

  let where = ' (1 = 1) '; let tempTable = '';
  const filterList = filter
    .filter(el => !(el.right === null || el.right === undefined) || el.center === 'is null' || el.center === 'is not null')
    .map(f => ({ ...f, leftQ: `\"${f.left}\"` }));

  const dateToSQLLiteral = (date: Date) => `N'${date.toJSON()}'`;

  for (const f of filterList) {
    switch (f.center) {
      case '=': case '>=': case '<=': case '>': case '<': case '<>':
        if (Array.isArray(f.right)) { // time interval
          if (f.right[0]) where += ` AND ${f.leftQ} >= '${f.right[0]}'`;
          if (f.right[1]) where += ` AND ${f.leftQ} <= '${f.right[1]}'`;
          break;
        }
        if (typeof f.right === 'string') f.right = f.right.toString().replace('\'', '\'\'');
        if (typeof f.right === 'number') { where += ` AND ${f.leftQ} ${f.center} '${f.right}'`; break; }
        if (typeof f.right === 'boolean') { where += ` AND ${f.leftQ} ${f.center} '${f.right}'`; break; }
        if (f.right instanceof Date) { where += ` AND ${f.leftQ} ${f.center} ${dateToSQLLiteral(f.right)}`; break; }
        if (typeof f.right === 'object') {
          if (!f.right.id) where += ` AND ${f.leftQ} IS NULL `;
          else if (f.left === 'parent.id') where += ` AND ${f.leftQ} = '${f.right.id}'`;
          else if (excludesTypes.includes(f.right.type)) where += ` AND ${f.leftQ} = '${f.right.id}'`;
          else if (tempTable.indexOf(`[#${f.left}]`) < 0) {
            tempTable += `SELECT id INTO [#${f.left}] FROM dbo.[Descendants]('${f.right.id}', '${f.right.type}');\n`;
            where += ` AND ${f.leftQ} IN (SELECT id FROM [#${f.left}])`;
          }
          break;
        }
        if (!f.right) where += ` AND ${f.leftQ} IS NULL `; else where += ` AND ${f.leftQ} ${f.center} N'${f.right}'`;
        break;
      case 'like':
        where += ` AND ${f.leftQ} LIKE N'%${(f.right['value'] || f.right).toString().replace('\'', '\'\'')}%' `;
        break;
      case 'not like':
        where += ` AND ${f.leftQ} NOT LIKE N'%${(f.right['value'] || f.right).toString().replace('\'', '\'\'')}%' `;
        break;
      case 'start with':
        where += ` AND ${f.leftQ} LIKE N'${(f.right['value'] || f.right).toString().replace('\'', '\'\'')}%' `;
        break;
      case 'end with':
        where += ` AND ${f.leftQ} LIKE N'%${(f.right['value'] || f.right).toString().replace('\'', '\'\'')}' `;
        break;
      case 'matching':
        where += ` AND ${f.leftQ} LIKE N'${(f.right['value'] || f.right).toString().replace('\'', '\'\'')}' `;
        break;
      case 'don\'t matching':
        where += ` AND ${f.leftQ} NOT LIKE N'${(f.right['value'] || f.right).toString().replace('\'', '\'\'')}' `;
        break;
      case 'beetwen':
        if (Array.isArray(f.right)) {
          if (f.right[0] instanceof Date)
            where += ` AND ${f.leftQ} >= ${dateToSQLLiteral(f.right[0])} AND ${f.leftQ} <= ${dateToSQLLiteral(f.right[1])}`;
          else if (typeof f.right[0] === 'number') {
            if (f.right[0]) where += ` AND ${f.leftQ} >= '${f.right[0]}'`;
            if (f.right[1]) where += ` AND ${f.leftQ} <= '${f.right[1]}'`;
          }
        } else {
          const interval = f.right as FilterInterval;
          if (typeof interval.start === 'number') {
            where += ` AND ${f.leftQ} >= '${interval.start}'`;
            where += ` AND ${f.leftQ} <= '${interval.end}'`;
          } else if (interval.start)
            where += ` AND ${f.leftQ} BEETWEN '${interval.start}' AND '${interval.end}' `;
        }
        break;
      case 'in':
        if (f.right['value'] || f.right)
          where += ` AND ${f.leftQ} IN (${(f.right['value'] || f.right)}) `;
        break;
      case 'not in':
        where += ` AND ${f.leftQ} NOT IN (${(f.right['value'] || f.right)}) `;
        break;
      case 'is null':
        where += ` AND ${f.leftQ} IS NULL `;
        break;
      case 'is not null':
        where += ` AND ${f.leftQ} IS NOT NULL `;
        break;
    }
  }
  return { where: where, tempTable: tempTable };
};
