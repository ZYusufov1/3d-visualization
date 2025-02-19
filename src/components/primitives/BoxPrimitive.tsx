import { useRef, useEffect, useState, FC } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { getRandomColor } from '../../utils/utils.ts'

interface PrimitiveProps {
	id: string;
	position: [number, number, number];
	size: [number, number, number];
	selected: boolean;
	toggleSelection: (id: string) => void;
}

const BoxPrimitive: FC<PrimitiveProps> = ({ id, position, size, selected, toggleSelection }) => {
	const ref = useRef<THREE.Mesh | null>(null)
	const [time, setTime] = useState(0)
	const [originalColors, setOriginalColors] = useState<Float32Array>(new Float32Array())

	useEffect(() => {
		if (ref.current) {
			const geometry = new THREE.BufferGeometry()

			// Cube vertices (each face separately, without indices)
			const vertices = new Float32Array([
				// Front face
				-size[0] / 2, -size[1] / 2, size[2] / 2,
				size[0] / 2, -size[1] / 2, size[2] / 2,
				size[0] / 2, size[1] / 2, size[2] / 2,

				size[0] / 2, size[1] / 2, size[2] / 2,
				-size[0] / 2, size[1] / 2, size[2] / 2,
				-size[0] / 2, -size[1] / 2, size[2] / 2,

				// Back face
				-size[0] / 2, -size[1] / 2, -size[2] / 2,
				size[0] / 2, -size[1] / 2, -size[2] / 2,
				size[0] / 2, size[1] / 2, -size[2] / 2,

				size[0] / 2, size[1] / 2, -size[2] / 2,
				-size[0] / 2, size[1] / 2, -size[2] / 2,
				-size[0] / 2, -size[1] / 2, -size[2] / 2,

				// Top face
				-size[0] / 2, size[1] / 2, -size[2] / 2,
				size[0] / 2, size[1] / 2, -size[2] / 2,
				size[0] / 2, size[1] / 2, size[2] / 2,

				size[0] / 2, size[1] / 2, size[2] / 2,
				-size[0] / 2, size[1] / 2, size[2] / 2,
				-size[0] / 2, size[1] / 2, -size[2] / 2,

				// Bottom face
				-size[0] / 2, -size[1] / 2, -size[2] / 2,
				size[0] / 2, -size[1] / 2, -size[2] / 2,
				size[0] / 2, -size[1] / 2, size[2] / 2,

				size[0] / 2, -size[1] / 2, size[2] / 2,
				-size[0] / 2, -size[1] / 2, size[2] / 2,
				-size[0] / 2, -size[1] / 2, -size[2] / 2,

				// Left face
				-size[0] / 2, -size[1] / 2, -size[2] / 2,
				-size[0] / 2, -size[1] / 2, size[2] / 2,
				-size[0] / 2, size[1] / 2, size[2] / 2,

				-size[0] / 2, size[1] / 2, size[2] / 2,
				-size[0] / 2, size[1] / 2, -size[2] / 2,
				-size[0] / 2, -size[1] / 2, -size[2] / 2,

				// Right face
				size[0] / 2, -size[1] / 2, -size[2] / 2,
				size[0] / 2, -size[1] / 2, size[2] / 2,
				size[0] / 2, size[1] / 2, size[2] / 2,

				size[0] / 2, size[1] / 2, size[2] / 2,
				size[0] / 2, size[1] / 2, -size[2] / 2,
				size[0] / 2, -size[1] / 2, -size[2] / 2
			])

			// Generate random colors for each face
			const faceColors = Array(6).fill(null).map(() => getRandomColor())

			// Assign colors to vertices
			const colors: number[] = []
			faceColors.forEach((color) => {
				for (let j = 0; j < 6; j++) {
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

			// Interpolating from original color to white
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

export default BoxPrimitive
