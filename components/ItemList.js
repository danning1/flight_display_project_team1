import { Box } from '@mui/system'
import styles from './ItemList.module.css'

export default function ItemList({items}){
    
    return(
        <Box className={`${styles.main_container}`} sx={{
            flex:1}}>
        </Box>
    )
}