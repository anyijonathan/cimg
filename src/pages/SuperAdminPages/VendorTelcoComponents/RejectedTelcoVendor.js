import React, {useEffect, useState} from 'react'
import { getAllRejectedMapping, setRejectedList, VendorTelcoSelector } from '../../../Redux/Slices/mappingSlice';
import {userSelector } from '../../../Redux/Slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';


const RejectedVendorTelco = () => {


  const dispatch = useDispatch();
  const {emailAddress, userRole} = useSelector(userSelector)
	const { rejectedList } = useSelector(VendorTelcoSelector)

  const [notificationText, setNotificationText] = useState("")
  const [status, setStatus] = useState("");





  const getCurrentMappings = async ()=>{
    try{

  const response = await getAllRejectedMapping(emailAddress, userRole)
     dispatch(setRejectedList(response.dataList))
       
    }
    catch(error){
      setStatus("failure")
      setNotificationText("error fetching current mappings")
   
    }

  } 

useEffect(() => {
getCurrentMappings()
}, [])


  return (

    
    <div className='col-span-6 h-[27.1875rem]'>
       {/* ---------------------------------------------- Modals ------------------------------------------- */}


 {/*   ------------------------------------------- Modals ----------------------------------------------------  */}

    <div className="overflow-x-auto relative bg-white pl-6 pr-14 pb-2 rounded-lg">
        <table className="w-full text-sm text-left">
            <thead className="text-sm text-black-primary bg-dashboard-background">
            <tr>
                    <th scope="col" className="py-3 px-6">
                    Telco name
                    </th>
                    <th scope="col" className="py-3 px-6">
                    Vendor
                    </th>
                    <th scope="col" className="py-3 px-6">
                    Actions
                   </th>
                   <th scope="col" className="py-3 px-6">
                  
                   </th>
                </tr>
            </thead>
            <tbody>
               {rejectedList.map((mapping, i) => (
              <tr key={i} className="bg-white border-b py-4 px-6">
              <td className="py-6 px-6 font-sm text-black-secondary whitespace-nowrap">
                {mapping.telcoName}
                  </td>
                  <td className="py-6 px-6 text-black-secondary">
                 { mapping.vendorName}
                  </td>
                  <td className="py-6 px-6">
                    <div className='flex justify-around'>
                      <button className='text-base font-[450] text-black-secondary opacity-50' disabled>Approve</button>
                      <button  className='text-base font-[450] text-black-secondary opacity-50' disabled>Decline</button>
                    </div>
                </td>
              
              </tr>
                
    
                ))} 
          
            </tbody>
        </table> 
    </div>
    
    </div>
       
  )
}

export default RejectedVendorTelco