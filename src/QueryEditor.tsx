import React, { PureComponent, ChangeEvent } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { GenericDatasource } from './GenericDatasource';
import { GenericQuery, GenericOptions} from './types';
type Props = QueryEditorProps<GenericDatasource, GenericQuery, GenericOptions>;

interface State {
  showJSON: boolean;
  type: string;
  target: string;
  metric: string[];
}

export class QueryEditor extends PureComponent<Props, State> {
  state = {
    showJSON: false,
    type: this.props.query.type,
    target: this.props.query.target,
    metric: []
  };
  componentWillMount() {
    // fetch metric
    this.findMetrics("");
  }
  onTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      type: event.currentTarget.value
    });
  }
  onMetricChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, type: this.state.type, target: event.currentTarget.value});
    onRunQuery();
  }
  findMetrics(query: string) {
    this.props.datasource.metricFindQuery(query, undefined, this.state.type).then((result: any) => {
      this.setState({
        metric: result
      });
    });
  }
  render() {
    return (
      <div>
        <div className="gf-form">
          <div className="gf-form-inline">
            <div className="gf-form">
              <label className="gf-form-label width-6 query-keyword">Format as</label>
              <div className="gf-form-select-wrapper">
                <select
                  className="gf-form-input gf-size-auto"
                  onChange={this.onTypeChange}
                  defaultValue={this.state.type}
                >
                  <option value="timeseries">Time Series</option>
                  <option value="table">Table</option>
                </select>
              </div>
            </div>
            <div className="gf-form">
              <label className="gf-form-label width-6 query-keyword"> Metirc</label>
              <div className="gf-form-select-wrapper">
                <select
                  className="gf-form-input gf-size-auto"
                  onClick={() => this.findMetrics("")}
                  onChange={this.onMetricChange}
                  value={this.state.target || "select metric"}
                >
                  <option value="select metric">select metric</option>
                  {this.state.metric.map((item: any) => (
                    <option value={item.value} key={item.value}>{item.text}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="gf-form gf-form--grow right">
              <label className="gf-form-label gf-form-label--grow query-keyword" onClick={() => {
                this.setState({showJSON: !this.state.showJSON});
                }}>Additional JSON Data
                <i className={this.state.showJSON ? "fa fa-caret-down" : "fa fa-caret-right"}></i>
              </label>
            </div>
          </div>
        </div>
        {this.state.showJSON && <div className="gf-form-inline">
        <div className="gf-form gf-form--grow">
          <textarea className="gf-form-input"/>
        </div>
      </div>}
    </div>
    );
  }
}
