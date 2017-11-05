import React, {Component} from 'react';
import {Menu, Alert, Tag, Icon} from 'antd';
import Album from './Album';
import "video-react/dist/video-react.css";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      labels: {},
      selectedKey: 'overview'
    }
    this.clickMenuItem = this.clickMenuItem.bind(this);
    this.addTags = this.addTags.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log('mainreceiveprops', nextProps);
    this.setState({
      selectedKey: nextProps.val
    });
  }
  clickMenuItem(item) {
    console.log('clickMenuItem', item.key);
    this.setState({
      selectedKey: item.key
    });
  }
  addTags(data) {
    let {labels} = this.state;
    for (let i = 0; i < data.length; ++i) {
      for (let key in data[i].scenes) {
        let val = data[i].scenes[key];
        if (labels[val.scenes_categories] === undefined) {
          labels[val.scenes_categories] = 1;
        } else labels[val.scenes_categories]++;
      }
    }
    console.log(labels);
    this.setState({labels});
  }
  render() {
    let label = new Array(26);
    for (let i = 0; i < 26; ++i) {
      let letter = "a".charCodeAt();
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
          <Album val={this.state.selectedKey} addTags={this.addTags} />
        </div>
      </div>
    );
  }
}
