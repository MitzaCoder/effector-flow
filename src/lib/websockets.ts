import { io } from 'socket.io-client'

export function connect() {
	const socket = io('http://localhost:3000')
	socket.on('connect', () => {
		console.log('connected')
	})

	socket.on('disconnect', () => {
		console.log('disconnected')
	})

	socket.on('error', (error: Error) => {
		console.log(error)
	})
	return socket
}
