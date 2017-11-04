import React, {Component} from 'react';
import {Row, Col, Card, Tag, Icon, Modal} from 'antd';
import axios from 'axios';
import Player from './lib/components/Player';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      val: 'overview',
      urlTableSum: [],
      urlTable: [],
      SM: {}
    }
    this.mapVideo = this.mapVideo.bind(this);
    this.mapVideoItem = this.mapVideoItem.bind(this);
    this.showModal = this.showModal.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
  }
  componentDidMount() {
    axios.get('/api/getFiles')
      .then(res => {
        console.log(res);
        this.props.addTags(res.data.data);
        this.setState({
          urlTableSum: res.data.data
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({val: nextProps.val});
  }
  showModal(i) {
    let SM = this.state.SM;
    SM[i] = true;
    this.setState({SM});
  }
  cancelModal(i) {
    let SM = this.state.SM;
    SM[i] = false;
    this.setState({SM});
  }
  mapVideoItem(i) {
    if (i >= this.state.urlTable.length) return null;
    let URL = this.state.urlTable[i].name;
    let mapTag = () => {
      let cnt = 0;
      let ret = [];
      for (let key in this.state.urlTable[i].scenes) {
        cnt++;
        console.log(key);
        if(cnt > 2) {
          ret = ret.concat([<Tag color="#2db7f5">{'...'}</Tag>]);
          break;
        }
        ret = ret.concat([<Tag color="#2db7f5">{this.state.urlTable[i].scenes[key].scenes_categories}</Tag>]);
      }
      console.log(ret);
      return ret;
    }
    let keyVal = {};
    for (let key in this.state.urlTable[i].scenes) {
      let num = Math.round(this.state.urlTable[i].scenes[key].time);
      keyVal[`${parseInt(num/60)}:${num%60}`] = this.state.urlTable[i].scenes[key].scenes_categories;
    }
    console.log(keyVal);
    return (
      <Card title={<div><span>{`${URL}.mp4`}</span><br /></div>}
        style={{width: 300, height: 400}}
      >
      <div>{mapTag()}</div>
        <Icon type="right-circle" style={{position: 'relative', marginLeft: '100px', marginTop: '120px', fontSize: '60px', color: 'rgb(45, 183, 245)'}} />
        <div style={{backgroundImage: `url(/videos/${URL}.jpg)`, backgroundSize: '100% 100%', marginTop: '-160px'}} className="cover" onClick={() => {this.showModal(i)}} />
        <Modal visible={this.state.SM[i]} maskClosable={true} footer={null} onCancel={() => this.cancelModal(i)}>
          <Player keyValue={keyVal}>
            <source src={`/videos/${URL}.mp4`} />
          </Player>
        </Modal>
      </Card>
    )
  }
  mapVideo() {
    let ret = [];
    for(let i = 0; i < this.state.urlTable.length / 2; ++i) {
      ret = ret.concat([
        <Row gutter={16}>
          <Col span={12}>{this.mapVideoItem(i * 2)}</Col>
          <Col span={12}>{this.mapVideoItem(i * 2 + 1)}</Col>
        </Row>
      ]);
    }
    return ret;
  }
  render() {
    this.state.urlTable = [];
    let { val } = this.state;
    console.log(val);
    for (let i = 0; i < this.state.urlTableSum.length; ++i) {
      for (let key in this.state.urlTableSum[i].scenes) {
        if (this.state.urlTableSum[i].scenes[key].scenes_categories === val) {
          this.state.urlTable = this.state.urlTable.concat([this.state.urlTableSum[i]]);
          break;
        }
      }
    }
    if (val === 'overview') {
      this.state.urlTable = this.state.urlTableSum;
    }
    return (
      <div>
        {this.mapVideo()}
      </div>
    );
  }
}
