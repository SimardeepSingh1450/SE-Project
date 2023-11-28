import React, { useState,useEffect } from 'react'
import './Notifications.css'
import randomPerson from './assets/random.jpeg'
import NotificationList from './Notificationlist'
import NotFound from './notfound'
import ButtonAppBar from '../Navbar/navbar';
import ParticlesBg from 'particles-bg';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';


const dummyData = [
  {gameId:1,userName:'Simardeep',Email:'simar9389@gmail.com',status:'Inactive',reqStatus:'Send',wins:'10'},
  {gameId:2,userName:'Jaiver',Email:'jaiveer@gmail.com',status:'Active',reqStatus:'Send', wins:'8'},
  {gameId:3,userName:'ArshGoyal',Email:'arshgoyal@gmail.com',status:'Inactive',reqStatus:'Sent', wins:'7'},
  {gameId:4,userName:'Sukhraj',Email:'sukhraj2311@gmail.com',status:'Inactive',reqStatus:'Send', wins:'6'},
  {gameId:5,userName:'Jaskaran',Email:'jaskaran@gmail.com',status:'Active',reqStatus:'Sent',wins:'5'}
]


const Notifications = () => {
  const [friendName,setFriendName] = useState('');
  const [friendsList,setFriendsList] = useState([]);

  const cookies = new Cookies();
  const playerID = cookies.get("userId");
  const navigate = useNavigate();

  //Now we will check wether user is logged in by checking the loggedIn route
  const checkFn = async()=>{
    const res = await axios.get('http://localhost:3005/loggedIn',{withCredentials:true});
    if(!res.data.loggedIn){
        navigate("/loginPage");
        console.log('Did not pass restrictToLoginUsers code :',res.data);
    }
  }

  const fetchNotifications = async() =>{
    const res = await axios.post('http://localhost:3005/notifications/fetchNotifications',{playerID:playerID});
    console.log('Fetched notifications array',res.data);
    setFriendsList(res.data.notificationsArray);
  }

  useEffect(()=>{
    checkFn();

    //fetching the notifications list
    fetchNotifications();
  },[])


  return (
    <>
        <ButtonAppBar/>
        <ParticlesBg type="lines" bg={true} />

        <div className='pt-5 full-container'>
            <div class="">
                <div class="">
                    <div className='searchFriends'>
                        <h1 className='friendListHeader text-5xl font-sans text-white'>Notifications</h1>
                    </div>

                    {friendsList.length === 0 ? <NotFound /> : <NotificationList fetchNotifications={fetchNotifications} friendsList={friendsList} randomPerson={randomPerson}/>}
          
                </div>
                
            </div>

        </div>
    </>
  )
  
  
//   return (
//     <div className='bg-slate-800 mainFriendsPage'>
//         <div className='ballOne rounded-full w-[70vh] h-[90vw] ml-[-20vw] mb-[-20vw] bg-pink-500 blur-3xl opacity-70'></div>
//         <div className='ballTwo rounded-full w-[60vh] h-[80vw] mr-[-50vh] bg-blue-500 blur-3xl opacity-70'></div>
        
//         <div className='mainFriendsManagementDiv'>

//           <div className='friendsManagementLeftSide'>
//             <div className='searchFriends'>
//                     <h1 className='friendListHeader text-5xl font-sans text-white'>My Friends List</h1>
//                     <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//                     <div class="relative">
//                         <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                             <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                             </svg>
//                         </div>
//                         <input onChange={(e)=>setFriendName(e.target.value)} type="search" id="default-search" class="max-w-screen-lg w-[600px] block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Friend Name" required/>
//                         <button onClick={()=>{handleSubmitClick()}} type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search/ViewAll</button>
//                     </div>
//               </div>


//               <div className='friendsListComponent'>
//                 <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
                 
//                   <div class="overflow-y-hidden rounded-lg border">
//                     <div class="overflow-x-auto">
//                       <table class="w-full">
//                         <thead>
//                           <tr class="bg-black text-center text-xs font-semibold uppercase tracking-widest text-white">
//                             <th class="px-5 py-3">GAME ID</th>
//                             <th class="px-5 py-3">Username</th>
//                             <th class="px-5 py-3">Email</th>
//                             <th class="px-5 py-3">Status</th>
//                             <th class="px-5 py-3">Remove Friend</th>
//                           </tr>
//                         </thead>

//                         <tbody class="text-white">
//                           {
//                             friendsList.map((item)=>{
//                               return (
//                                   <tr>
//                                     <td class="border-b border-gray-200 bg-none px-5 py-5 text-sm">
//                                       <p class="whitespace-no-wrap">{item.gameId}</p>
//                                     </td>
//                                     <td class="border-b border-gray-200 bg-none px-5 py-5 text-sm">
//                                       <div class="flex items-center">
//                                         <div class="h-10 w-10 flex-shrink-0">
//                                           <img class="h-full w-full rounded-full" src={randomPerson} alt="" />
//                                         </div>
//                                         <div class="ml-3">
//                                           <p class="whitespace-no-wrap">{item.userName}</p>
//                                         </div>
//                                       </div>
//                                     </td>
//                                     <td class="border-b border-gray-200 bg-none px-5 py-5 text-sm">
//                                       <p class="whitespace-no-wrap">{item.Email}</p>
//                                     </td>
//                                     <td class="border-b border-gray-200 bg-none px-5 py-5 text-sm">
//                                       <span class={`rounded-full ${item.status=='Active'?'bg-green-200':'bg-red-200'} px-3 py-1 text-xs font-semibold ${item.status=='Active'?'text-green-900':'text-red-900'}`}>{item.status}</span>
//                                     </td>
//                                     <td class="px-6 py-4 border-b">
//                                         <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
//                                     </td>
//                                 </tr>
//                               )
//                             })
//                           }

//                         </tbody>

//                       </table>
//                     </div>
//                   </div>
//                 </div>

//             </div>
            
//           </div>

//           <div className='friendsManagementRightSide'>
//           <div className='searchFriends'>
//                     <h1 className='friendListHeader text-5xl font-sans text-white'>Add friend</h1>
//                     <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//                     <div class="relative">
//                         <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                             <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                             </svg>
//                         </div>
//                         <input onChange={(e)=>setFriendName(e.target.value)} type="search" id="default-search" class="max-w-full w-[400px] block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Friend" required/>
//                         <button onClick={()=>{handleSubmitClick()}} type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
//                     </div>
//               </div>


//               <div className='friendsListComponent'>
//                 <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
                 
//                   <div class="overflow-y-hidden rounded-lg border">
//                     <div class="overflow-x-auto">
//                       <table class="w-full">
//                         <thead>
//                           <tr class="bg-black text-center text-xs font-semibold uppercase tracking-widest text-white">
//                             <th class="px-5 py-3">Username</th>
//                             <th class="px-5 py-3">Game ID</th>
//                             <th class="px-5 py-3">Send Request</th>
//                           </tr>
//                         </thead>

//                         <tbody class="text-white">
//                           {
//                             friendsList.map((item)=>{
//                               return (
//                                   <tr>
//                                     <td class="border-b border-gray-200 bg-none px-5 py-5 text-sm">
//                                       <div class="flex items-center">
//                                         <div class="h-10 w-10 flex-shrink-0">
//                                           <img class="h-full w-full rounded-full" src={randomPerson} alt="" />
//                                         </div>
//                                         <div class="ml-3">
//                                           <p class="whitespace-no-wrap">{item.userName}</p>
//                                         </div>
//                                       </div>
//                                     </td>
//                                     <td class="border-b border-gray-200 bg-none px-5 py-5 text-sm">
//                                       <p class="whitespace-no-wrap">{item.gameId}</p>
//                                     </td>
//                                     <td class="border-b border-gray-200 bg-none px-5 py-5 text-sm">
//                                         <span class={`rounded-full ${item.reqStatus=='Sent'?'bg-blue-200':'bg-yellow-200'} px-3 py-1 text-xs font-semibold ${item.reqStatus=='Sent'?'text-blue-900':'text-yellow-900'} `}>{item.reqStatus=='Send'?'Send':'Sent'}</span>
//                                     </td>
//                                 </tr>
//                               )
//                             })
//                           }

//                         </tbody>

//                       </table>
//                     </div>
//                   </div>
//                 </div>
//                 </div>
//           </div>

//         </div>
//     </div>
//   )
}

export default Notifications