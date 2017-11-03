import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Layout, Input, Upload, Icon, Button, message} from 'antd';
import Main from './Main';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      value: 'overview',
    }
    this.setTag = this.setTag.bind(this);
    this.changeFile = this.changeFile.bind(this);
  }
  setTag() {
    let value = ReactDOM.findDOMNode(this.refs.input).value;
    this.setState({ value });
  }
  changeFile(info) {
    if (info.file.status === 'uploading') {
      let circul = document.getElementById("circul");
      circul.style.display = 'inline-table';
      console.log('in-uploading');
      setTimeout(() => {
        window.location.reload();
      }, 30000);
    }
  }
  render() {
    const Props = {
      name: 'file',
      action: '/api/upload',
      headers: {
        authorization: 'authorization-text',
      },
      data: {time: Date.now()},
      onChange: this.changeFile,
      showUploadList: false
    }
    return (
      <Layout>
        <Layout.Header className="layout" style={{backgroundColor: 'white'}}>
          <div className="logo">
            <span>
              <Icon type="book" style={{fontSize: 24}} />
              <span style={{marginLeft: 10}}>IV_Album</span>
            </span>
          </div>
          <Input placeholder="Search for tag" prefix={<Icon type="search" />}
            style={{width: '20vw', display: 'inline-table', marginLeft: '10vw'}}
            onPressEnter={this.setTag} ref="input" />
          <Upload
            style={{marginLeft: '30vw'}}
            {...Props}
          >
            <Button type="primary" icon="upload">Upload video file</Button>
          </Upload>
          <MuiThemeProvider><CircularProgress style={{display: 'none'}} id="circul"/></MuiThemeProvider>
        </Layout.Header>
        <Layout.Content style={{
          width: '80vw',
          margin: 'auto',
          marginTop: '5vh',
          backgroundColor: 'white'
        }}>
          <Main val={this.state.value} />
        </Layout.Content>
      </Layout>
    );
  }
}
