const electron = require('electron');
const BrowserView = electron.BrowserView;

class BrowserTab {
    _browserPane;
    _navBar;

    constructor(options) {
        this.options = options;
        this._browserPane = new BrowserView({
            webPreferences: {
                // preload: path.join(__dirname, "./preload.js"),
                sandbox: true,
                nodeIntegrationInSubFrames: true
            }
        });

        this._browserPane.webContents.on('did-start-navigation', (event, url, isInPlace, isMainFrame) => {
            console.log('did-start-navigation');
            // if (isMainFrame && !isInPlace) {
            //     this.videos.next([]);
            //     this.subtitles.next([]);
            // }
            // this.apiSources.forEach(async api => {
            //     const id = api.getVideoId(url);
            //     if (id != null) {
            //         const apiVideos = await api.getUrls(id, await this.getRequestHeaders(url));
            //         const videos = apiVideos.map(v => this.apiToVideoInfo(v, this.rootPageInfo));
            //         this.addVideos(videos);
            //     }
            // });
        });

        this._browserPane.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
            console.log('onBeforeSendHeaders');
        });

        this._browserPane.webContents.session.webRequest.onResponseStarted(async (details) => {
            console.log('onResponseStarted');
        });

        this._browserPane.webContents.loadURL("http://www.google.com");

        // this._navBar = new nav_bar_1.NavBar({ browserPane: this.browserPane });
    }

    get navBar() {
        return this._navBar;
    }

    get browserPane() {
        return this._browserPane;
    }

    addToWindow(window) {
        let bounds = window.getBounds();
        // let navHeight = this.options.navBarHeight || nav_bar_1.navBarHeight;
        let navHeight = 56;
        // this.removeFromWindow(window);
        window.addBrowserView(this.browserPane);
        this.browserPane.setBounds({ x: 0, y: navHeight, width: bounds.width, height: bounds.height - navHeight });
        this.browserPane.setAutoResize({ width: true, height: true });
        window.addBrowserView(this.navBar);
        this.navBar.setBounds({ x: 0, y: 0, width: bounds.width, height: navHeight });
        this.navBar.setAutoResize({ width: true, height: false });
    }

    removeFromWindow(window) {
        window.removeBrowserView(this.navBar);
        window.removeBrowserView(this.browserPane);
    }

    openDevTools() {
        this.navBar.webContents.openDevTools();
        this.browserPane.webContents.openDevTools();
    }
}

exports.BrowserTab = BrowserTab;
