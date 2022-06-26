import styles from '../styles/Home.module.css'
// components
import HeadBar from '../components/HeadBar'
import { useEffect,useState } from 'react'
import ItemList from './ItemList'

export default function HomeDisplay({}){
    const [currentContent,setCurrentContent] = useState("XXXX Airlines")
    const [headBar_height_control,setHeadBar_height_control] = useState(0);
    const headBar_height='40%';
    return(
        <div className={`${styles.main_window}`}>
            <HeadBar header_name={currentContent} top_height={headBar_height} headBar_height_state={headBar_height_control} set_headBar_height_state={setHeadBar_height_control}></HeadBar>
            <ItemList></ItemList>
        </div>
    )
}