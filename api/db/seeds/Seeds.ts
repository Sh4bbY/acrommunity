type DataOrGetter = any[] | (() => any[]) | (() => Promise<any[]>);

export class Seeds {
  public readonly tableName: string;
  public meta: any = {};
  private metaPromises: any = {};
  private metaResolver: any = {};
  private asyncData: Promise<any[]>;
  public postSeedUpdates: any[] = [];

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public setData(dataOrGetter: DataOrGetter) {
    const data = Array.isArray(dataOrGetter) ? dataOrGetter : dataOrGetter();
    this.asyncData = Promise.resolve(data) as Promise<any[]>;
  }

  public setMeta(name: string, data: any) {
    this.meta[name] = data;
    if (this.metaResolver[name]) {
      this.metaResolver[name](data);
    }
  }

  public async getMeta(name: string) {
    if (this.meta[name]) {
      return this.meta[name];
    } else if (this.metaPromises[name]) {
      return this.metaPromises[name];
    } else {
      this.metaPromises[name] = new Promise(resolve => {
        this.metaResolver[name] = resolve;
      });
      return this.metaPromises[name];
    }
  }

  public async getData(): Promise<any[]> {
    return await this.asyncData;
  }

  public setPostSeedingUpdates(updates: any[]) {
    this.postSeedUpdates = updates;
  }
}
