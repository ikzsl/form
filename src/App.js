import React from 'react';
import { Tabs } from 'antd';
import { ClockCircleOutlined, RocketOutlined } from '@ant-design/icons';
import logo from './logo.png';
import './App.scss';
import Timer from './components/timer/timer';
import Countdown from './components/countdown/countdown';

const { TabPane } = Tabs;

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>

    <Tabs defaultActiveKey="1">
      <TabPane
        tab={(
          <span>
            <ClockCircleOutlined />
            Timer
          </span>
        )}
        key="1"
      >
        <h2>Timer</h2>
        <Timer />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <RocketOutlined />
            Countdown
          </span>
        )}
        key="2"
      >
        <h2>Countdown</h2>
        <Countdown />
      </TabPane>
    </Tabs>
  </div>
);

export default App;
