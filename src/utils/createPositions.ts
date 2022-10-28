import { BoardPositionsType } from './../types/board';


const BOARD_SIZE = 8

export default (): BoardPositionsType => {
    const positions = []
    for (let i=0; i<BOARD_SIZE; i++) {
        const row = []
        for (let j=0; j<BOARD_SIZE; j++) {
            row.push(null)
        }
        positions.push(row)
    }
    return positions
}