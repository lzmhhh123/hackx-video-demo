import React, {Component} from 'react';
import {Row, Col, Card} from 'antd';
import axios from 'axios';
import {Player} from 'video-react';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      urlTable: []
    }
    this.mapVideo = this.mapVideo.bind(this);
    this.mapVideoItem = this.mapVideoItem.bind(this);
  }
  componentDidMount() {
    axios.get('/api/getFiles')
      .then(res => {
        this.setState({
          urlTable: res.data.data
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
  mapVideoItem(i) {
    if (i >= this.state.urlTable.length) return null;
    let URL = this.state.urlTable[i];
    return (
      <Card title={
        <div>
          <span>{`${URL}.mp4`}</span><br />
        </div>}
        style={{width: 250, height: 400}}
      >
        <img src="" className="cover" />
      </Card>
    )
  }
  mapVideo() {
    let ret = [];
    for(let i = 0; i < this.state.urlTable.length / 3; ++i) {
      ret = ret.concat([
        <Row gutter={16}>
          <Col span={8}>{this.mapVideoItem(i * 3)}</Col>
          <Col span={8}>{this.mapVideoItem(i * 3 + 1)}</Col>
          <Col span={8}>{this.mapVideoItem(i * 3 + 2)}</Col>
        </Row>
      ]);
    }
    return ret;
  }
  render() {
    console.log(this.state.urlTable);
    return (
      <div>
        {this.mapVideo()}
      </div>
    );
  }
}
