import { appWindow } from '@tauri-apps/api/window';



export const App = {
	saveState: function(key, value) {
		localStorage.setItem(key, value);
	},
	loadState: function(key) {
		return localStorage.getItem(key);
	},
	audio: {
		collection: {
			'interface-click': document.getElementById('audio-interface-click'),
		},
		elements: Array.from(document.getElementsByClassName('audio-interface-click')),
		enable: function() {
			App.audio.collection['interface-click'].volume = Number(App.loadState('interface-volume'));
			App.saveState('interface-audio-enabled', true);
		},
		disable: function() {
			App.audio.collection['interface-click'].volume = 0;
			App.saveState('interface-audio-enabled', false);
		},
		setVolume: function(volume) {
			App.audio.collection['interface-click'].volume = volume;
			App.saveState('interface-volume', volume);
		},
		getVolume: function() {
			return App.loadState('interface-volume') || DEFAULTS['audio-volume'];
		},
		play: (sound) => {
			if (App.loadState('interface-audio-enabled') === 'true') {
				if (App.audio.collection[sound].ended) {
					App.audio.collection[sound].play();
				} else {
					App.audio.collection[sound].load();
					App.audio.collection[sound].play();
				}
			}
		},
		init: function() {
			App.audio.elements.map((element) => {
				element.addEventListener('click', function () {
					if (App.loadState('interface-audio-enabled') === 'true') {
						if (App.audio.collection['interface-click'].ended) {
							App.audio.collection['interface-click'].play();
						} else {
							App.audio.collection['interface-click'].load();
							App.audio.collection['interface-click'].play();
						}
					}
				});
			});
		}
	},
	settings: {
		audio: {
			enable: document.getElementById('enable-audio'),
			volume: document.getElementById('audio-volume'),
		},
		window: {
			alwaysOnTop: document.getElementById('window-always-on-top'),
			fullscreen: document.getElementById('window-fullscreen'),
		},
		init: function () {
			// set the checkbox to saved value
			if (App.loadState('interface-audio-enabled') === 'false') {
				App.settings.audio.enable.checked = false;
			}
			// set the interface volume slider to saved value
			App.settings.audio.volume.value = Number(App.loadState('audio-volume')) || 0.5;
			App.audio.setVolume(App.settings.audio.volume.value);

			// setting audio volume
			App.settings.audio.enable.addEventListener('change', function (event) {
				let interfaceVolume = App.loadState('audio-volume') || 0.5;
				event.target.checked ? App.audio.setVolume(interfaceVolume) : App.audio.setVolume(0);
				App.saveState('interface-audio-enabled', event.target.checked ? true : false);
			});
			// setting audio volume
			App.settings.audio.volume.addEventListener('change', function (event) {
				App.audio.setVolume(Number(event.target.value));
				App.settings.audio.volume.value = event.target.value;
				App.saveState('audio-volume', event.target.value);
			});
			// window settings
			App.settings.window.alwaysOnTop.addEventListener('change', function (event) {
				if (event.target.checked) {
					appWindow.setAlwaysOnTop(true);
				} else {
					appWindow.setAlwaysOnTop(false);
				}
			});
			App.settings.window.fullscreen.addEventListener('change', function (event) {
				if (event.target.checked) {
					appWindow.setFullscreen(true);
				} else {
					appWindow.setFullscreen(false);
				}
			});

			// port scanner
			App.port.scannerIntervalSlider.value = App.loadState('scanner-interval') || 1000;
			App.port.scannerIntervalLabel.textContent = `${App.port.scannerIntervalSlider.value} ms`;

			App.port.scannerIntervalSlider.addEventListener('change', function (event) {
				App.port.setScanInterval(Number(event.target.value));
				App.saveState('scanner-interval', event.target.value);
				App.port.scannerIntervalLabel.textContent = `${event.target.value} ms`;
			});
		}
	},
	container: document.getElementById('root'),
	portView: {
		init: () => {
			App.port.scanner.addEventListener('port-scan-done',
			(event) => {
				let ports = JSON.parse(event.detail);
				for (let port of ports) {
					let rollPage = document.createElement('roll-page');
					rollPage.setAttribute('port', port.name);
					
					let portView = document.createElement('port-view');
					portView.setAttribute('port-info', JSON.stringify(port));
					portView.setAttribute('port', port.name);
					
					rollPage.appendChild(portView);
					App.portView.add(rollPage);
				}
				App.portView.clearMissing(ports);
			});
		},
		goTo: (name) => App.container.goTo(name),
		add: (view) => {
			let viewForPort = view.getAttribute('port');
			if (App.portView.list().find((portView) => portView.getAttribute('port') === viewForPort)) {
				return;
			} else {
				App.container.appendChild(view);
			}
		},
		remove: (name) => {
			Array.from(document.getElementsByTagName('roll-page'))
				.find((container) => container.getAttribute('port') === name)
			.remove();
		},
		list: () => {
			return Array.from(document.getElementsByTagName('port-view'));
		},
		clearMissing: (ports) => {
			for (let portView of App.portView.list()) {
				if (!ports.find((port) => port.name === portView.getAttribute('port'))) {
					App.portView.remove(portView.getAttribute('port'));
				}
			}
		}
	},
	port: {
		scanner: document.getElementById('port-scanner'),
		scannerIntervalLabel: document.getElementById('port-scanner-interval-label'),
		scannerIntervalSlider: document.getElementById('port-scanner-interval-slider'),
		getScanInterval: () => App.port.scanner.getAttribute('scan-interval'),
		setScanInterval: (interval) => App.port.scanner.setAttribute('scan-interval', interval),
	},
	log: (level, message) => undefined,
	init: function () {
		App.audio.init();
		App.settings.init();
		App.portView.init();
	}
}
