import React, { useState,useEffect} from 'react'
import {getDownloadURL, getStorage,list,ref, uploadBytesResumable} from 'firebase/storage'
 import { useRef } from 'react';
import { useSelector } from 'react-redux'
import { app } from '../firebase';
import {Link} from 'react-router-dom'

import { deleteUserStart, deleteUserSuccess, delteUserFailure, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure,updateUserStart,updateUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


export default function Profile(){
     const fileRef=useRef(null);
   const {currentUser,loading,error}=useSelector(state=>state.user);
     const [file,setFile]=useState(undefined);
      const [fileperc,setFilePerc]=useState(0);
      const [fileUploadErr,setFileUploadErr]=useState(false);
       const [formData,setFormData]=useState({});
        const [updateSuccess,setUpadteSuccess]=useState(false);
        const [showListingError,setShowListingError]=useState(false);
        const [userListing,setUserListing]=useState([]);

        const dispatch=useDispatch();

       
       useEffect(()=>{
           if(file){
             handleFileUpload(file);
           }
       },[file]);

       const handleFileUpload=(file)=>{
          const  storage=getStorage(app);
          const fileName=new Date().getTime() + file.name;
           const StorageRef=ref(storage,fileName);
           const uploadTask=uploadBytesResumable(StorageRef,file);

           uploadTask.on('state_changed',
            (snapshot)=>{
              const progress =(snapshot.bytesTransferred/
                 snapshot.totalBytes)*100;
                 setFilePerc(Math.round(progress))
              },
            
            (error)=>{
                setFileUploadErr(true);
            },
            ()=>{
               getDownloadURL(uploadTask.snapshot.ref).then(
                 (downloadURL)=>{
                  setFormData({...formData,avatar:downloadURL})
                 }
               )
            }
          )
       }

       const handleChange =(e)=>{
         setFormData({...formData,[e.target.id]: e.target.value});
       }

       const handleSubmit = async(e)=>{
         e.preventDefault();
         try {
            dispatch(updateUserStart());
            const res= await fetch(`/api/user/update/${currentUser?._id}`,{
                method:'POST',
                headers:{
                  'Content-Type':'application/json',
                },
                body:JSON.stringify(formData),
            });
              
            const data=await res.json();
             if(data.success===false){
               dispatch(updateUserFailure(data.message));
                return ;
             }
            dispatch(updateUserSuccess(data));
            setUpadteSuccess(true);
          
         } catch (error) {
            dispatch(updateUserFailure(error.message));
         }
       }

       const handleDeleteUser=async()=>{
          try {
             dispatch(deleteUserStart());
             const res=await fetch(`/api/user/delete/${currentUser?._id}`,{
                 method:'DELETE',
             });

             const data=await res.json();
              console.log(data);
             if(data.success===false){
               dispatch(delteUserFailure(data.message));
                return ;
             }
             dispatch(deleteUserSuccess(data));
          } catch (error) {
            dispatch(delteUserFailure(error.message))
            
          }
       }

       const hadleSignOut= async()=>{
         try {
            dispatch(signOutUserStart());
            const res=await fetch('/api/auth/signout');
             const data=await res.json();
             if(data.success===false){
               dispatch(signOutUserFailure(data.message));
               return ;
             }
             dispatch(signOutUserSuccess(data));     
         } catch (error) {
          dispatch(signOutUserFailure(data.message));
        }
       }

       const handleListingDelete=async(listingId)=>{
           try {
             const res=await fetch(`/api/listing/delete/${listingId}`,{
                  method:'DELETE',

             });

             const data=await res.json();
             if(data.success===false){
               console.log(data.message);
               return;
             }
             setUserListing((prev)=>prev.filter((listing)=>listing._id!==listingId));
            
           } catch (error) {
            console.log(error.message);
           }
       }

       const handleShowListing= async ()=>{
         try {
             setShowListingError(false);
          const res=await fetch(`/api/user/listing/${currentUser._id}`);
          const data=await res.json();
           if(data.success===false){
            setShowListingError(true);
            return ;
           }
           setUserListing(data);
          
         } catch (error) {
           setShowListingError(true);
          
         }
       }

  return (
    <div className='p-3 max-w-lg  mx-auto'>
       <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input onClick={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden  
            accept='image/*' />
          <img onClick={()=>fileRef.current.click()} src={formData.avatar||currentUser.avatar}  alt="profile"
             className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
              <p>
                {fileUploadErr ?(
                 <span className='text-red-700'>Error Image upload(image must be less than 2 mb)
                 </span> ):
                    fileperc>0 && fileperc<100 ?(
                     <span className='text-slate-700'>
                     {`Uploading ${fileperc}%`}
                      </span>
                    ):
                      fileperc===100?
                     ( <span className='text-green-700'>successfully uploaded!
                      </span>):(
                         ''
                      ) }
                      
              </p>
             <input 
             type="text" 
             placeholder='username' 
             defaultValue={currentUser.username}
              id='username'
              className='border p-3 rounded-lg'
                 onChange={handleChange}
              />
             <input type="email" 
             placeholder='email' 
              defaultValue={currentUser.email}
               id='email'
                className='border p-3 rounded-lg'
                onChange={handleChange}
                />
              <input type="password" placeholder='password' 
               id='password' className='border p-3 rounded-lg'/>
                <button disabled={ loading}  className='bg-slate-700 text-white rounded-lg p-3 uppercase 
                hover:opacity-95 disabled:opacity-80 cursor-pointer'>
                   {loading ? 'Loading...':'update'}
                   </button>
                   <Link  className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 '   to="/create-listing">
                   Create Listing</Link>
        </form>
         <div className='flex  justify-between mt-5'>
          <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer '>Delete account</span>
          <span onClick={hadleSignOut} className='text-red-700 cursor-pointer '>Sign out</span>
         </div>

         <p className='text-red-700 mt-5'>{error?error:''}</p>

         <p className='text-green-700 mt-5'>{updateSuccess?'user is updated Successfuly':''}</p>
         <button onClick={handleShowListing}  className='text-green-700 w-full'>
             Show Listing
         </button>
         <p className='text-red-700 mt-5'>  {showListingError? 'Error showing listing': ''}</p>

          {userListing&& userListing.length>0 && 
           <div className="flex flex-col gap-4">
             <h1 className='text-center mt-7 text-2xl font-semibold'> Your Listing</h1>
             {userListing.map((listing)=>(
                  <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
                    <Link   to={`listing/${listing._id}`}>
                    <img className=' h-16 w-16 object-contain '  src={listing.imageUrls[0]} alt="listing cpver" />
                    </Link>
                    <Link className='flex-1 text-slate-700 font-semibold  hover:underline truncate' to={`listing/${listing._id}`} >
                     <p >{listing.name}</p>
                    </Link>
                    <div className="flex flex-col items-center">
                      <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase'>Delete</button>
                        <Link to={`/update-listing/${listing._id}`}>
                      <button className='text-green-700 uppercase'>Edit</button>
                        </Link>
                    </div>
                    </div>
              ))}
           </div>
            }   
    </div>
  )
}
