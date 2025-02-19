export type Position = [number, number, number];

export type Size = [number, number, number] | [number, number];

export interface Primitive {
	id: string;
	type: 'box' | 'pyramid';
	position: Position;
	size: Size;
}