import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ipcRender } from './ElectronHelpers';

function App() {
    const onSendMessage = () => ipcRender.send('test-channel', 'hello world2!');

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <div>
                <button onClick={onSendMessage}>Send Message!</button>
            </div>
        </div>
    );
}

export default App;
