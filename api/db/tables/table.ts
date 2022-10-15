export class Table {
  public readonly name: string;
  private _fields = () => ({});
  private readonly _options: any;

  constructor(name: string, fieldsFn?: () => any, options: any = {}) {
    this.name = name;
    this._fields = fieldsFn || this._fields;
    this._options = options;
  }

  setFields(fieldsFn: () => any) {
    this._fields = fieldsFn;
  }

  get fields() {
    return this._fields();
  }

  get options() {
    return Object.assign({charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci'}, this._options);
  }


  get constraints() {
    return Object.keys(this.fields)
      .filter((fieldName: string) => !!this.fields[fieldName]._foreignKey)
      .map((fieldName: string) => ({
        tableName: this.name,
        options: {
          name: this.fields[fieldName]._foreignKey.name,
          type: 'foreign key',
          fields: [fieldName],
          references: this.fields[fieldName]._foreignKey,
          onDelete: this.fields[fieldName]._foreignKey.onDelete,
        },
      }))
      .reduce((arr, foreignKey) => ([...arr, foreignKey]), []);
  }
}
