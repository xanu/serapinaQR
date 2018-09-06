import {SCAN,EXIT, GOTO_SETTINGS} from './actionTypes'

export const scan = () => {
	type: SCAN
}

export const exit = () => {
	type: EXIT
}

export const goto_settings = () => {
	type: GOTO_SETTINGS
}