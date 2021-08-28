import axios from 'axios'
import { useEffect, useState } from 'react'
import {useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Result = () => {

    let query = useQuery();
    let start = query.get("start")
    let end = query.get("end")

    const [history, setHistory] = useState<string[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

    const fetchApi = async () => {
        try {
            const resp =
            await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${start}&end=${end}`)
            let bpiArr = []
                for (const [key, value] of Object.entries(resp.data.bpi)) {
                    bpiArr.push(`${key} - ${Number(value).toLocaleString()} THB`)                    
                }
            setHistory(bpiArr)
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            setError(true)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchApi()
    }, [])

    const render = () =>{
        
        if(loading)
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-2xl'>Loading ...</p>
                </div>   
            )
        else if(error)
            return (
                <div className='text-center space-y-3'>
                   <p className='text-2xl font-semibold'>Historical price</p> 
                    <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>
                </div>
            )
        else
            return(
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-xl font-semibold'> ( From {start} To {end})</p>
                    <p className='text-xl'>{history.map(x=> <p>{x}</p>)}</p>
                </div>
            )
    }

    return(
        <div>
			{render()}
		</div>
    )
}

export default Result