import React from 'react';
import connect from '@vkontakte/vk-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import Testik from './panels/Testik';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'testik',
			fetchedUser: null,
			accessToken: null,
			iframe: null,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					console.log(e.detail.data)
					break;
				case 'VKWebAppAccessTokenReceived':
					console.info('VKWebAppAccessTokenReceived')
					console.log(e.detail.data.access_token)
					const accessToken = e.detail.data.access_token
					this.setState({ accessToken });
					connect.send("VKWebAppCallAPIMethod", {"method": "status.get", "request_id": "test", "params": {"user_id": "9744575", "v":"5.101", "access_token": accessToken}});
					break
				case 'VKWebAppCallAPIMethodResult': 
					console.info('VKWebAppCallAPIMethodResult')
					console.log(e.detail);
					const iframe = "https://m.vk.com/audio?act=search&q=%D0%B8%D0%BD%D0%BA%D0%BE%D0%B3%D0%BD%D0%B8%D1%82%D0%BE%20%D0%B1%D0%B5%D1%81%D0%BA%D0%BE%D0%BD%D0%B5%D1%87%D0%BD%D0%BE%D1%81%D1%82%D1%8C";
					this.setState({ iframe });
					break
				default:
					console.info('default case');
					console.log(e.detail.type);
					console.log(e.detail.data);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
		connect.send("VKWebAppGetAuthToken", {"app_id": 7143878, "scope": "status"});
		// fetch("/audio?act=search&q=%D0%B8%D0%BD%D0%BA%D0%BE%D0%B3%D0%BD%D0%B8%D1%82%D0%BE%20%D0%B1%D0%B5%D1%81%D0%BA%D0%BE%D0%BD%D0%B5%D1%87%D0%BD%D0%BE%D1%81%D1%82%D1%8C")
		// .then(response => console.log(response.text))
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		const ifr = '<iframe height="265" style="width: 100%;" scrolling="no" src="https://vk.com/audio?act=search&q=%D0%B8%D0%BD%D0%BA%D0%BE%D0%B3%D0%BD%D0%B8%D1%82%D0%BE%20%D0%B1%D0%B5%D1%81%D0%BA%D0%BE%D0%BD%D0%B5%D1%87%D0%BD%D0%BE%D1%81%D1%82%D1%8C"></iframe>';
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
				<Testik id="testik" iframe={ifr} />
				<Persik id="persik" go={this.go} />
			</View>
		);
	}
}

export default App;
