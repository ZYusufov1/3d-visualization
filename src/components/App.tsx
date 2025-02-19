import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Box, Button, List, ListItem, Dialog, DialogTitle, TextField } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import PyramidPrimitive from './primitives/PyramidPrimitive.tsx'
import BoxPrimitive from './primitives/BoxPrimitive.tsx'
import '../styles/App.css'
import { Primitive, Size } from '../types/types.ts'
import { getRandomPosition } from '../utils/utils.ts'

const App: React.FC = () => {
    const [primitives, setPrimitives] = useState<Primitive[]>([])
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [type, setType] = useState<'box' | 'pyramid'>('box')
    const [count, setCount] = useState<number>(1)
    const [size, setSize] = useState<Size>([3, 5, 2])

    const toggleSelection = (id: string) => {
        setSelectedId(prevId => (prevId === id ? null : id))
    }

    const addPrimitives = () => {
        const newPrimitives: Primitive[] = Array.from({ length: count }, () => ({
            id: uuidv4(),
            type,
            position: getRandomPosition(primitives, size),
            size: type === 'pyramid' ? [size[0], size[2] ?? 1] : size
        }))
        setPrimitives([...primitives, ...newPrimitives])
        setOpen(false)
    }

    return (
        <Box display="flex" height="100vh">
            <Box
                width={300}
                p={2}
                flexShrink={0}
                bgcolor="#fff"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                { /* Panel with the add button and list */ }

                <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                        Add primitives
                    </Button>

                    { /* Scrollable list */ }

                    <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 120px)', mt: 2 }}>
                        <List>
                            { primitives.map((p) => (
                                <ListItem
                                    key={p.id}
                                    onClick={() => toggleSelection(p.id)}
                                    sx={{
                                        p: 2,
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease',
                                        backgroundColor: selectedId === p.id ? 'rgba(0, 150, 255, 0.3)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: selectedId === p.id ? 'rgba(0, 150, 255, 0.5)' : 'rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                    component="li"
                                >
                                    { `${p.type} ${p.position.map((v) => v.toFixed(2)).join(', ')} Size: ${p.size.join(' x ')}` }
                                </ListItem>
                            )) }
                        </List>
                    </Box>
                </Box>

                { /* Clear scene button */ }

                <Button variant="contained" color="secondary" onClick={() => setPrimitives([])}>
                    Clear scene
                </Button>
            </Box>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add primitives</DialogTitle>

                <Box p={2} display="flex" flexDirection="column" gap={2}>
                    <TextField select SelectProps={{ native: true }} label="Type" value={type} onChange={(e) => setType(e.target.value as 'box' | 'pyramid')}>
                        <option value="box">Cube</option>

                        <option value="pyramid">Pyramid</option>
                    </TextField>

                    <TextField label="Count" type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)} />

                    <TextField label="Length (radius for pyramid)" type="number" value={size[0]} onChange={(e) => setSize([parseFloat(e.target.value) || 1, size[1], size[2] ?? 1])} />

                    <TextField label="Width (not for pyramid)" type="number" disabled={type === 'pyramid'} value={size[1]} onChange={(e) => setSize([size[0], parseFloat(e.target.value) || 1, size[2] ?? 1])} />

                    <TextField label="Height" type="number" value={size[2]} onChange={(e) => setSize([size[0], size[1], parseFloat(e.target.value) || 1])} />

                    <Button variant="contained" color="primary" onClick={addPrimitives}>Add</Button>
                </Box>
            </Dialog>

            <Box flex={2} style={{ background: '#000' }}>
                <Canvas camera={{ position: [10, 10, 10] }}>
                    <ambientLight intensity={0.5} />

                    <pointLight position={[10, 10, 10]} />

                    <OrbitControls />

                    { primitives.map((p) =>
                        p.type === 'box' ? (
                            <BoxPrimitive key={p.id} id={p.id} position={p.position} size={p.size as [number, number, number]} selected={selectedId === p.id} toggleSelection={toggleSelection} />
                        ) : (
                            <PyramidPrimitive key={p.id} id={p.id} position={p.position} size={p.size  as [number, number]} selected={selectedId === p.id} toggleSelection={toggleSelection} />
                        )
                    ) }
                </Canvas>
            </Box>
        </Box>
    )
}

export default App
