import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'; 
import SwiperCore from 'Swiper';
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';



export default function Listing() {
     SwiperCore.use([Navigation]);
    const [listing,setListing]=useState(null);
    const [loading,SetLoading]=useState(false);
    const [error,SetError]=useState(false);

    const params=useParams();

    useEffect(()=>{
        const fetchListing=async()=>{
            try {
                SetLoading(true);
                const res=await fetch(`/api/listing/get/${params.listingId}`);
                const data=await res.json();
                if(data.success===false){
                    SetError(true);
                    SetLoading(false);
                     return ;
                }
                setListing(data);
                SetLoading(false);
                SetError(false);
                
            } catch (error) {
                SetError(true);
                SetLoading(false);     
            }
           
        }
      fetchListing();
    },[params.listingId]);

    console.log(loading);
  return (
    <main>
      {loading &&
       <p className='text-center my-7 text-2xl' >Loading...</p>}
        {error&& <p className='text-center my-7 text-2xl' >something went wrong!</p> }
         {listing && !loading && !error && 
         
            <div>           
            <Swiper navigation>
                {
                listing.imageUrls.map((url)=>(
                  <SwiperSlide key={url}>
                     <h1>{url}</h1>
                        <div className='h-[550px]' style={{ background: `url(${url})  center  no-repeat`,  backgroundSize:'cover'}}>
                        </div>
                    </SwiperSlide>
                ))
             }
            </Swiper> 
            </div>     
         }
    </main>
  )
}
