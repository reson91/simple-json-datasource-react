import { GenericDatasource } from './GenericDatasource';
import { DataSourcePlugin } from '@grafana/data';
import { GenericOptions, GenericQuery } from './types';
import { ConfigEditor } from './ConfigEditor';
import { QueryEditor } from './QueryEditor';
class AnnotationsQueryCtrl {
  static templateUrl = 'partials/annotations.editor.html';
}
export const plugin = new DataSourcePlugin<GenericDatasource, GenericQuery, GenericOptions>(GenericDatasource)
.setConfigEditor(ConfigEditor)
.setQueryEditor(QueryEditor)
.setAnnotationQueryCtrl(AnnotationsQueryCtrl);
