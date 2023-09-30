export type EffectorMessage = {
	id: number
	name: string
	kind: string
	value: any

	meta: {
		config?: {
			derived?: boolean
		}
	}

	stack?: {
		fxID?: string
	}

	derived?: boolean
}

export type DisplayMessage = {
	split: boolean
	id: number
	name: string
	kind: string
	value: any
	derived: boolean
}
