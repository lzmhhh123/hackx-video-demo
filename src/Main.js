import React, {Component} from 'react';
import {Menu, Alert, Tag, Icon} from 'antd';
import Album from './Album';
import "video-react/dist/video-react.css";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      labels: {"Aaa": 123},
      selectedKey: 'overview'
    }
    this.clickMenuItem = this.clickMenuItem.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedKey: nextProps.value
    });
  }
  clickMenuItem(item, key) {
    this.setState({
      selectedKey: key
    });
  }
  render() {
    let label = new Array(26);
    for (let i = 0; i < 26; ++i) {
      let letter = "A".charCodeAt();
      let s = String.fromCharCode(letter + i);
      label[i] = s;
    }
    return (
      <div style={{display: 'table', padding: 20}}>
        <div style={{display: 'inline-table', float: 'left'}}>
          <Alert type="info" message="Tags Menu" showIcon />
          <br />
          <div style={{marginLeft: 10, border: '1px solid #f0f2f5'}}>
            <Menu
              style={{display: 'inline-table', width: 240}}
              defaultSelectedKeys={['overview']}
              defaultOpenKeys={label}
              mode="inline"
              onClick={this.clickMenuItem}
            >
              <Menu.Item key="overview">OverView</Menu.Item>
              {
                label.map((data) => {
                  return (
                    <Menu.SubMenu key={data} title={<span><Icon type="tag" />{`Letter ${data}`}</span>}>
                      {
                        Object.keys(this.state.labels).map(k => {
                          let v = this.state.labels[k];
                          if(k[0] === data) {
                            return (
                              <Menu.Item key={`${k}`}>
                                <Tag color="#2db7f5">{`${k}`}</Tag><Tag color="pink">{` (${v})`}</Tag>
                              </Menu.Item>
                            )
                          } else {
                            return null;
                          }
                        })
                      }
                    </Menu.SubMenu>
                  );
                })
              }
            </Menu>
          </div>
        </div>
        <div style={{display: 'inline-table', marginLeft: 50, float: 'right'}}>
          <Album val={this.state.selectedKey} />
        </div>
      </div>
    );
  }
}
