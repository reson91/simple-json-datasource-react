import { DataQuery, DataSourceJsonData } from '@grafana/data';
export interface GenericQuery extends DataQuery {
  target: string;
  type: string;
}

export interface GenericOptions extends DataSourceJsonData {}

