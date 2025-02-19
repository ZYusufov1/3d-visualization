import * as THREE from 'three'
import { Position, Primitive, Size } from '../types/types.ts'


export const getRandomColor = () => new THREE.Color(Math.random(), Math.random(), Math.random())

export const getRandomPosition = (existing: Primitive[], size: Size): Position => {
	let position: Position
	let tries = 0

	do {
		position = [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10]
		tries++
		if (tries > 100) break
	} while (existing.some(obj => checkCollision(position, size, obj.position, obj.size)))

	return position
}

const checkCollision = (pos1: Position, size1: Size, pos2: Position, size2: Size): boolean => {
	const buffer = 0.2

	const normalizeSize = (size: Size): [number, number, number] =>
		size.length === 2 ? [size[0] * 2, size[1], size[0] * 2] : size

	const normSize1 = normalizeSize(size1)
	const normSize2 = normalizeSize(size2)

	return (
		pos1[0] + normSize1[0] / 2 + buffer > pos2[0] - normSize2[0] / 2 &&
		pos1[0] - normSize1[0] / 2 - buffer < pos2[0] + normSize2[0] / 2 &&
		pos1[1] + normSize1[1] / 2 + buffer > pos2[1] - normSize2[1] / 2 &&
		pos1[1] - normSize1[1] / 2 - buffer < pos2[1] + normSize2[1] / 2 &&
		pos1[2] + normSize1[2] / 2 + buffer > pos2[2] - normSize2[2] / 2 &&
		pos1[2] - normSize1[2] / 2 - buffer < pos2[2] + normSize2[2] / 2
	)
}
