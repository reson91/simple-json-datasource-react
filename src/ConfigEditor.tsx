import React, { PureComponent } from 'react';
import { DataSourceHttpSettings } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps, DataSourceSettings } from '@grafana/data';
import { GenericOptions } from './types';
interface Props extends DataSourcePluginOptionsEditorProps<GenericOptions> {}

interface State {}

export class ConfigEditor extends PureComponent<Props, State> {

  componentDidMount() {
  }
  onchange = (data: DataSourceSettings) => {
    this.props.onOptionsChange(data);
    // this.setState({
    //   dataSourceSettings: data
    // });
  }
  render() {
    return (
      <DataSourceHttpSettings defaultUrl="" dataSourceConfig={this.props.options} onChange={this.onchange}/>
    );
  }
}
