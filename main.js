'use strict'

const electron = require('electron')
const {app, BrowserWindow} = electron
const path = require('path')

app.on('ready', _ => {
	let displays = electron.screen.getAllDisplays()
	let primary = electron.screen.getPrimaryDisplay()

	displays.forEach(display => {
		if(display.id != primary.id){
			// create a fullscreen, frameless, black window
			let win = new BrowserWindow({
				x: display.bounds.x,
				y: display.bounds.y,
				frame: false,
				fullscreen: true,
				backgroundColor: '#000'
			})

			// load HTML with double-click handler that'll close the window
			win.loadFile(path.join(__dirname, 'index.html'))

			// close all windows when one closes
			win.on('closed', _ => {
				app.quit()
			})
		}
	})
})
