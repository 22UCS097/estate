import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
      const [landlord,setLanlord]=useState(null);
      const [message,setMessage]=useState('');

      const onChange=(e)=>{
          setMessage(e.target.value);
      };
          
      useEffect(()=>{
         const fetchLandlord=async ()=>{
            try {
                const res=await fetch(`/api/user/${listing.userRef}`);
                const data=await res.json();
                setLanlord(data);
                
            } catch (error) {
                console.log(error);
                
            }
         }
         fetchLandlord();

      },[listing.userRef]);

  return (
      <>
      {
      landlord && (
        <div className="flex flex-col gap-2 ">
            <p>Contact <span className='font font-semibold'>  {landlord.username}
                </span> for <span className='font font-semibold'> {listing.name.toLowerCase()}</span></p>
                 <textarea placeholder='enter your message here...' className='w-full border p-3 rounded-lg' name="message" id="message" row='2' value={message} onChange={onChange} ></textarea>
                  <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}  className='bg-slate-700 text=-center text-white p-3 uppercase rounded-lg hover:opacity-95'>
                  Send Message
                  </Link>
        </div>
      )}
      </>
  )
}
