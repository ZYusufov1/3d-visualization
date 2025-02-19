import { useRef, useEffect, useState, FC } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { getRandomColor } from '../../utils/utils.ts'

interface PrimitiveProps {
	id: string;
	position: [number, number, number];
	size: [number, number];
	selected: boolean;
	toggleSelection: (id: string) => void;
}

const PyramidPrimitive: FC<PrimitiveProps> = ({ id, position, size, selected, toggleSelection }) => {
	const ref = useRef<THREE.Mesh | null>(null)
	const [time, setTime] = useState(0)
	const [originalColors, setOriginalColors] = useState<Float32Array>(new Float32Array())

	useEffect(() => {
		if (ref.current) {
			const geometry = new THREE.BufferGeometry()

			// Pyramid vertices
			const vertices = new Float32Array([
				// Base (two triangular faces)
				-size[0] / 2, 0, -size[0] / 2,
				size[0] / 2, 0, -size[0] / 2,
				size[0] / 2, 0, size[0] / 2,

				size[0] / 2, 0, size[0] / 2,
				-size[0] / 2, 0, size[0] / 2,
				-size[0] / 2, 0, -size[0] / 2,

				// Side faces
				-size[0] / 2, 0, -size[0] / 2,
				size[0] / 2, 0, -size[0] / 2,
				0, size[1], 0,

				size[0] / 2, 0, -size[0] / 2,
				size[0] / 2, 0, size[0] / 2,
				0, size[1], 0,

				size[0] / 2, 0, size[0] / 2,
				-size[0] / 2, 0, size[0] / 2,
				0, size[1], 0,

				-size[0] / 2, 0, size[0] / 2,
				-size[0] / 2, 0, -size[0] / 2,
				0, size[1], 0,
			])

			// Generate one color for the base
			const baseColor = getRandomColor()

			// Generate random colors for 4 side faces
			const faceColors = [
				baseColor, baseColor, // Base (both triangles use the same color)
				getRandomColor(), // Face 1
				getRandomColor(), // Face 2
				getRandomColor(), // Face 3
				getRandomColor()  // Face 4
			]

			// Assign colors to each vertex
			const colors: number[] = []
			faceColors.forEach((color) => {
				for (let j = 0; j < 3; j++) {
					colors.push(color.r, color.g, color.b)
				}
			})

			const colorArray = new Float32Array(colors)

			geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
			geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorArray, 3))
			geometry.computeVertexNormals()

			ref.current.geometry = geometry
			setOriginalColors(colorArray)
		}
	}, [size])

	// Blinking animation when selected
	useFrame((_, delta) => {
		if (!ref.current) return

		if (selected) {
			setTime((prev) => prev + delta * 8) // Faster blinking
			const factor = (Math.sin(time) + 1) / 2 // Smooth transition from 0 to 1

			// Interpolate from original color to white
			const newColors = originalColors.map((val) =>
				val * (1 - factor) + factor
			)

			ref.current.geometry.setAttribute('color', new THREE.Float32BufferAttribute(newColors, 3))
		} else {
			// Reset to original colors
			ref.current.geometry.setAttribute('color', new THREE.Float32BufferAttribute(originalColors, 3))
		}
	})

	return (
		<mesh ref={ref} position={position} onClick={() => toggleSelection(id)}>
			<meshStandardMaterial vertexColors={true} side={THREE.DoubleSide} />
		</mesh>
	)
}

export default PyramidPrimitive
