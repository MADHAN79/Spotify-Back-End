import { useEffect, useState } from 'react'
import { url } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListAlbum = () => {

    //all albums gets stored in this data state.
    const [data, setData] = useState([]);

    //func. to fetch all the album data:
    const fetchAlbums = async () =>{
        try {

            //inside get we are adding the end point of the API
            //url - contains 'http://localhost:4000' which is mentioned in App.jsx after import lines.
            const response = await axios.get(`${url}/api/album/list`);

            //console.log(response.data); click on list album tab to see this output.
            if (response.data.success) {
                setData(response.data.albums)
            }


        } catch (error) {
            toast.error("Failed to fetch the albums list")   
        }
    }

    //adding logic to remove album based on id:
    const removeAlbum = async (id) => {
        try {
            
            //calling the API:
            const response = await axios.post(`${url}/api/album/remove`, {id});

            if (response.data.success) {
                toast.success(response.data.message);
                //after the mentioned id album got deleted, we are fetching the albums list and redisplaying it.
                await fetchAlbums(); 
            }
        } catch (error) {
            toast.error("album removal unsuccessful");
        }
    }

    //its an on-mount useEffect, since dependency array is empty.
    //fetching albums and storing in the [data] state.
    useEffect(()=>{
        fetchAlbums();
    },[]);

  return (
    <div>
        <p>All Albums List</p>
        <br />
        <div>
            <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                <b>Image</b>
                <b>Name</b>
                <b>Description</b>
                <b>Album Colour</b>
                <b>Action</b>
            </div>
            
            {/* using data state */}
            {data.map((item, index) =>{
                return (
                    <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5' >
                        <img className='w-12' src={item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.desc}</p>
                        <input type="color" value={item.bgColour} />
                        <p onClick={()=>{removeAlbum(item._id)}} className='cursor-pointer bg-black w-[20px] text-center text-white rounded-[50px] hover:bg-red-600'>x</p>
                    </div>
                )
            })}

        </div>
    </div>
  )
}

export default ListAlbum;