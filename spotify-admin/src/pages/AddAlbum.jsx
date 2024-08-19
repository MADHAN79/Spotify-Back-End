//it has mostly similar logic with AddSong.jsx, so while reading this file have AddSong.jsx aside

import { useState } from 'react'
import {assets} from '../assets/assets'
import { url } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddAlbum = () => {

  const [image, setImage] = useState(false);
  const [colour, setColour] = useState("#121212");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  
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
            formData.append('bgColour', colour);

            const response = await axios.post(`${url}/api/album/add`, formData); //sending formData as response.
            
            //if response is success showing one toast notification to the user & resetting the input fields.
            if(response.data.success) {
                toast.success("Album added");
                //resetting the input fields:
                setImage(false);
                setName("");
                setDesc("");
                setColour("#121212");
            }else {
                toast.error("Upload album not successful")
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

      <form onSubmit={onSubmitHandler}  className="flex flex-col items-start gap-8 text-gray-600" >
          <div className="flex flex-col gap-4">
            <p>Upload Image</p>
            <input onChange={(e) =>setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
            <label htmlFor="image">
              <img src={image ?   URL.createObjectURL(image)  : assets.upload_area} className='w-36 cursor-pointer border-2 border-green-600' alt="" />
            </label>

          </div>

          <div className='flex flex-col gap-2.5'>
            <p>Album name</p>
            <input onChange={(e) =>setName(e.target.value)} value={name} type='text' placeholder='Type here' className='bg-transparent outline-green-600 border-2 border-gray-400 rounded-xl p-2.5 w-[max(40vw,250px)]' />
          </div>

          <div className='flex flex-col gap-2.5'>
            <p>Album description</p>
            <input onChange={(e) =>setDesc(e.target.value)} value={desc} type='text' placeholder='Type here' className='bg-transparent outline-green-600 border-2 border-gray-400 rounded-xl p-2.5 w-[max(40vw,250px)]' />
          </div>

          <div className='flex flex-col gap-3'>
            <p>Background Colour</p>
            <input onChange={(e) =>setColour(e.target.value)} value={colour} type='color'  />
          </div>

          <button className='text-base bg-black text-white py-2.5 px-14 cursor-pointer hover:bg-green-800 rounded-[60px]' type='submit' >ADD</button>

      </form>
  )
}

export default AddAlbum