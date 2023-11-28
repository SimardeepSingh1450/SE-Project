import React, { useState,useEffect} from 'react'
import './FriendsPage.css'
import randomPerson from './assets/random.jpeg'
import ButtonAppBar from '../Navbar/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const dummyData = [
  {friendID:1,friendUsername:'Simardeep',Email:'simar9389@gmail.com',status:'Inactive',reqStatus:'Send'},
  {friendID:2,friendUsername:'Jaiver',Email:'jaiveer@gmail.com',status:'Active',reqStatus:'Send'},
  {friendID:3,friendUsername:'ArshGoyal',Email:'arshgoyal@gmail.com',status:'Inactive',reqStatus:'Sent'},
  {friendID:4,friendUsername:'Sukhraj',Email:'sukhraj2311@gmail.com',status:'Inactive',reqStatus:'Send'},
  {friendID:5,friendUsername:'Jaskaran',Email:'jaskaran@gmail.com',status:'Active',reqStatus:'Sent'}
]

const FriendsPageNew = () => {
  const [friendName,setFriendName] = useState('');
  const [notFriendName,setNotFriendName] = useState('');
  const [friendsList,setFriendsList] = useState([]);
  const [notFriends,setNotFriends] = useState([]);
  
  const cookies = new Cookies();
  const playerID = cookies.get("userId");
  const senderUsername = cookies.get("username");
  const navigate = useNavigate();

  //fetching all users which are not friends of this user
  const fetchNotFriends = async()=>{
    var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const data = await fetch('http://localhost:3005/friends/fetchNotFriends', {
            method: 'POST',
            redirect: 'follow',
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: headers,
            body: JSON.stringify({playerID:playerID})
        })


        const res = await data.json();
        setNotFriends(res.result);
  }
  
  const handleSubmitClick=()=>{
      if(friendName != ''){
        const results = friendsList.filter((item)=>{
          return item.friendUsername.toLowerCase().startsWith(friendName.toLowerCase());
        });
        //Setting the new Filtered out Data in the State
        setFriendsList(results);
      }else{
        //refetch the friends
        fetchFriendsFn();

        setFriendsList(friendsList);
      }
  }

  const handleSubmitClickTwo=()=>{
      if(notFriendName != ''){
        const results = notFriends.filter((item)=>{
          return item.username.toLowerCase().startsWith(notFriendName.toLowerCase());
        });
        //Setting the new Filtered out Data in the State
        setNotFriends(results);
      }else{
        //refetch not Friends
        fetchNotFriends();

        setNotFriends(notFriends);
      }
  }

  //fetching my friends list
  const fetchFriendsFn = async()=>{
    // console.log('player id is :',playerID);
    // const friendsList = await axios.get('http://localhost:3005/friends/fetchFriends',{playerID:playerID});
    // console.log('friends list from backend:',friendsList);

    var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      const data = await fetch('http://localhost:3005/friends/fetchFriends', {
          method: 'POST',
          redirect: 'follow',
          credentials: 'include', // Don't forget to specify this if you need cookies
          headers: headers,
          body: JSON.stringify({playerID:playerID})
      })


      const res = await data.json();
      setFriendsList(res.friendsList);
  }

  //Now we will check wether user is logged in by checking the loggedIn route
  const checkFn = async()=>{
    const res = await axios.get('http://localhost:3005/loggedIn',{withCredentials:true});
    if(!res.data.loggedIn){
        navigate("/loginPage");
        console.log('Did not pass restrictToLoginUsers code :',res.data);
    }
  }

  //Handle-Send-Button
  const handleSendButton = async(otherPersonID,item) =>{
    // console.log('Inside handle send button')
    //add the person to friends list of this user and put status as pending 
    // const res = await axios.post('http://localhost:3005/friends/addFriend',{friendID:otherPersonID,friendUsername:item.username,playerID:playerID,status:"pending"});
    // console.log(res.data);

    var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      const data = await fetch('http://localhost:3005/friends/addFriend', {
          method: 'POST',
          redirect: 'follow',
          credentials: 'include', // Don't forget to specify this if you need cookies
          headers: headers,
          body: JSON.stringify({friendID:otherPersonID,friendUsername:item.username,playerID:playerID,status:"pending"})
      })


      const res = await data.json();
      // console.log(res);

    //refetch fetchnotfriends()
    fetchNotFriends();

    //send the notification to the friendUser
    var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      const data2 = await fetch('http://localhost:3005/notifications/sendNotification', {
          method: 'POST',
          redirect: 'follow',
          credentials: 'include', // Don't forget to specify this if you need cookies
          headers: headers,
          body: JSON.stringify({senderID:playerID,receiverID:otherPersonID,senderUsername})
      })

      const res2 = await data2.json();
      console.log('Sent notification');
  }

  //handleRemoveClick
  const handleRemoveClick = async(friendID)=>{
      console.log('Inside handleRemoveClick Function');

      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      const data = await fetch('http://localhost:3005/friends/deleteFriend', {
          method: 'DELETE',
          redirect: 'follow',
          credentials: 'include', // Don't forget to specify this if you need cookies
          headers: headers,
          body: JSON.stringify({friendID:friendID,playerID:playerID})
      })

      //refetch the friends
      fetchFriendsFn();
      //refetch not friends
      fetchNotFriends();

      const res = await data.json();
      console.log(res);
  }


  useEffect(()=>{
    checkFn();
    fetchFriendsFn();
    fetchNotFriends();

},[]);

  return (
    <>
        <ButtonAppBar/>
        <div className='bg-slate-800 mainFriendsPage'>
        {/* <div className='ballOne rounded-full w-[70vh] h-[90vw] ml-[-20vw] mb-[-20vw] bg-pink-500 blur-3xl opacity-70'></div>
        <div className='ballTwo rounded-full w-[60vh] h-[80vw] mr-[-50vh] bg-blue-500 blur-3xl opacity-70'></div> */}
        </div>

        <div className='pt-5 full-container'>
            <div class="">
                <div class="">
                        {/* Friends Search Bar */}
                        <div className='searchFriends'>
                            <h1 className='friendListHeader text-5xl font-sans text-white'>My Friends List</h1>
                            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div class="relative search-container">
                                {/* <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div> */}
                                <input onChange={(e)=>setFriendName(e.target.value)} type="search" id="default-search" class="max-w-screen-lg w-[600px] block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Friend Name" required/>
                                <button onClick={()=>{handleSubmitClick()}} type="submit" class="btn btn-primary" id='friend-btn'>Search/ViewAll</button>
                            </div>
                        </div>

                        {/* <div className='container w-[600px]'>
                            <div className='row'>
                                <div className='col-4'>USERNAME</div>
                                <div className='col-4'>EMAIL</div>
                                <div className='col-2'>STATUS</div>
                                <div className='col-2'>REMOVE FRIEND</div>
                            </div>
                        </div> */}

                        <div className='friendsListComponent'>
                <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
                 
                  <div class="overflow-y-hidden rounded-lg border">
                    <div class="overflow-x-auto">
                      <table class="w-full">
                        <thead>
                          <tr class="bg-black text-center text-s font-semibold uppercase tracking-widest text-white">
                          <th class="px-5 py-3">Username</th>
                            <th class="px-5 py-3">GAME ID</th>
                            {/* <th class="px-5 py-3">Email</th> */}
                            {/* <th class="px-5 py-3">Status</th> */}
                            <th class="px-5 py-3">Remove Friend</th>
                          </tr>
                        </thead>

                        <tbody class="text-white">
                          {
                            friendsList?friendsList.map((item)=>{
                              return (
                                  <tr className='text-center'>
                                    <td class="border-b border-gray-200 bg-none px-5 py-5 text-s">
                                      <div class="d-flex align-items-center">
                                        <div class="h-10 w-10 flex-shrink-0 ml-5">
                                          <img class="h-full w-full rounded-full" src={randomPerson} alt="" />
                                        </div>
                                        <div class="ml-3">
                                          <div class="">{item.friendUsername}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td class="border-b border-gray-200 bg-none px-5 py-5 text-s">
                                      <div class="whitespace-no-wrap">{item.friendID}</div>
                                    </td>
                                    {/* <td class="border-b border-gray-200 bg-none px-5 py-5 text-sm">
                                      <p class="whitespace-no-wrap">{item.Email}</p>
                                    </td> */}
                                    {/* <td class="border-b border-gray-200 bg-none px-5 py-5 text-s">
                                      <span class={`rounded-full ${item.status=='Active'?'bg-green-200':'bg-red-200'} px-3 py-1 text-xs font-semibold ${item.status=='Active'?'text-green-900':'text-red-900'}`}>{item.status}</span>
                                    </td> */}
                                    <td class="px-6 py-4 border-b">
                                        <button onClick={()=>{handleRemoveClick(item.friendID)}} className="rounded-full text-red-900 bg-red-200 px-3 py-1 text-base font-semibold cursor-pointer">Remove</button>
                                    </td>
                                </tr>
                              )
                            }
                            
                            ):(<></>)
                          }

                        </tbody>

                      </table>
                    </div>
                  </div>
                </div>
                </div>
                       



                </div>
                <div class="pt-5 mt-5">
                    <div className='searchFriends'>
                        <h1 className='friendListHeader text-5xl font-sans text-white'>Add friend</h1>
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            {/* <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div> */}
                            <input onChange={(e)=>setNotFriendName(e.target.value)} type="search" id="default-search" class="max-w-full w-[400px] block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Friend" required/>
                            <button onClick={()=>{handleSubmitClickTwo()}} type="submit" class="btn btn-primary" id='search-btn'>Search/ViewAll</button>
                        </div>
                    </div>

                    <div className='friendsListComponent'>
                <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
                 
                  <div class="overflow-y-hidden rounded-lg border">
                    <div class="overflow-x-auto">
                      <table class="w-full">
                        <thead>
                          <tr class="bg-black text-center text-s font-semibold uppercase tracking-widest text-white">
                            <th class="px-5 py-3">Username</th>
                            <th class="px-5 py-3">Game ID</th>
                            <th class="px-5 py-3">Send Request</th>
                          </tr>
                        </thead>

                        <tbody class="text-white">
                          {
                            notFriends.map((item)=>{
                              return (
                                  <tr className='text-center'>
                                    <td className="border-b border-gray-200 bg-none px-5 py-5 text-s">
                                      <div className="d-flex align-items-center ml-8">
                                        <div className="h-10 w-10 flex-shrink-0 ml-8 mr-2">
                                          <img className="h-full w-full rounded-full" src={randomPerson} alt="" />
                                        </div>
                                        <div className="ml-3">
                                          <div className="">{item.username}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td class="border-b border-gray-200 bg-none px-5 py-5 text-s">
                                      <div class="whitespace-no-wrap">{item.PlayerID}</div>
                                    </td>
                                    <td class="border-b border-gray-200 bg-none px-5 py-5 text-s">
                                        <button onClick={()=>{handleSendButton(item.PlayerID,item)}} class={`cursor-pointer rounded-full bg-blue-200 px-3 py-1 text-base font-semibold text-blue-900`}>Send</button>
                                    </td>
                                </tr>
                              )
                            })
                          }

                        </tbody>

                      </table>
                    </div>
                  </div>
                </div>
                </div>
          
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

export default FriendsPageNew