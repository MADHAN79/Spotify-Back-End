import { useEffect, useState } from 'react'
import { url } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListSong = () => {

    //all songs gets stored in this data state.
    const [data, setData] = useState([]);

    //func. to fetch all the song data:
    const fetchSongs = async () =>{
        try {

            //inside get we are adding the end point of the API
            //url - contains 'http://localhost:4000' which is mentioned in App.jsx after import lines.
            const response = await axios.get(`${url}/api/song/list`);

            //console.log(response.data); click on list song tab to see this output.
            if (response.data.success) {
                setData(response.data.songs)
            }


        } catch (error) {
            toast.error("Failed to fetch the songs list")   
        }
    }

    //adding logic to remove song based on id:
    const removeSong = async (id) => {
        try {
            
            //calling the API:
            const response = await axios.post(`${url}/api/song/remove`, {id});

            if (response.data.success) {
                toast.success(response.data.message);
                //after the mentioned id song got deleted, we are fetching the songs list and redisplaying it.
                await fetchSongs(); 
            }
        } catch (error) {
            toast.error("Song removal unsuccessful");
        }
    }

    //its an on-mount useEffect, since dependency array is empty.
    //fetching songs and storing in the [data] state.
    useEffect(()=>{
        fetchSongs();
    },[]);

  return (
    <div>
        <p>All Songs List</p>
        <br />
        <div>
            <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                <b>Image</b>
                <b>Name</b>
                <b>Album</b>
                <b>Duration</b>
                <b>Action</b>
            </div>
            
            {/* using data state */}
            {data.map((item, index) =>{
                return (
                    <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5' >
                        <img className='w-12' src={item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.album}</p>
                        <p>{item.duration}</p>
                        <p onClick={()=>{removeSong(item._id)}} className='cursor-pointer bg-black w-[20px] text-center text-white rounded-[50px] hover:bg-red-600'>x</p>
                    </div>
                )
            })}

        </div>
    </div>
  )
}

export default ListSong