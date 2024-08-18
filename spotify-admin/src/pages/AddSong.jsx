
import { useState } from 'react';
import { assets } from '../assets/assets'

//to call the API we use axios package
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const AddSong = () => {

    //this manages the state of songs image
    const [image, setImage] = useState(false);
    const [song, setSong] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [album, setAlbum] = useState("none");
    const [loading, setLoading] = useState(false); //while adding files, loading animation will be displayed.
    const [albumData, setAlbumData] = useState([]); //used to store the albumdata received from the backend.

    const onSubmitHandler = async (e) =>{
        //preventing the webpage reload after submitting the form.
        e.preventDefault();

        setLoading(true);
        try {

            const formData = new FormData();

            //adding input values in formData one by one:
            //'name'- read as field name is name. & it stores the state of name
            formData.append('name', name);
            
            //'name'- read as field name is desc. & it stores the state of desc
            formData.append('desc', desc);
            
            formData.append('image', image);
            formData.append('audio', song);
            formData.append('album', album);

            //inside post we are adding the end point of the API
            //url - contains 'http://localhost:4000' which is mentioned in App.jsx after import lines.
            const response = await axios.post(`${url}/api/song/add`, formData); //sending formData as response.
            
            //if response is success showing one toast notification to the user & resetting the input fields.
            if(response.data.success) {
                toast.success("Song added");
                //resetting the input fields:
                setName("");
                setDesc("");
                setAlbum("none");
                setImage(false);
                setSong(false);
            }else {
                toast.error("Upload song not successful")
            }
            
        } catch (error) {
            toast.error("Error occured")
        }
        setLoading(false);
    }

//we can use if loading is true then display loading animation div or else display the form.
  return loading ?  (
        <div className='grid place-items-center min-h-[80vh]'>
            {/* border-4 border-gray-400 border-t-green-800 for complete regular circle loading animation*/}
            <div className='w-16 h-16 place-self-center border-x-4 border-green-600 rounded-full animate-spin'></div>
        </div>
  ) : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>

        <div className='flex gap-8'>
            <div className='flex flex-col gap-4'>
                <p>Upload song</p>
                
                {/* 'audio/*'  accepts all type of audio files */}
                {/* below we are hiding the choose file box & transfering that logic to the image by referencing id, wow! */}
                <input onChange={(e)=>setSong(e.target.files[0])} type="file" id='song' accept='audio/*' hidden />
                <label htmlFor="song">
                    {/* if the song is added the upload_added tick image is displayed or default upload_song image is displayed */}
                    <img src={song ? assets.upload_added : assets.upload_song} className='w-24 cursor-pointer rounded-[50%] border-x-4 border-green-600' alt="" />
                </label>

            </div>

            <div className='flex flex-col gap-4'>
                <p>Upload image</p>

                {/* 'audio/*'  accepts all type of audio files */}
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
                <label htmlFor="image">
                    {/* if the image is added the uploaded image itself is displayed or default upload_area image is displayed */}
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='w-24 cursor-pointer rounded-[50%] border-x-4 border-green-600' alt="" />
                </label>

            </div>
        </div>

        <div className='flex flex-col gap-2.5'>
            <p>Song name</p>
            {/* any changes in input field's value get saved in value={name}i.e: name state */}
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Type Here' required  className='bg-transparent outline-green-600 border-2 border-gray-400 rounded-xl p-2.5 w-[max(40vw,250px)]' />                
        </div>

        <div className='flex flex-col gap-2.5'>
            <p>Song description</p>
            {/* any changes in input field's value get saved in value={desc}i.e: desc state */}
            <input onChange={(e)=>setDesc(e.target.value)} value={desc}  type="text" placeholder='Type Here' required  className='bg-transparent outline-green-600 border-2 border-gray-400 rounded-xl p-2.5 w-[max(40vw,250px)]' />                
        </div>

        <div className='flex flex-col gap-2.5'>
            <p>Album</p>
            <select onChange={(e)=>setAlbum(e.target.value)} defaultValue={album} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px] rounded-xl'>
                <option value="none">None</option>
            </select>
        </div>

        <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer hover:bg-green-800 rounded-[60px]'>ADD</button>

    </form>
  )
}

export default AddSong