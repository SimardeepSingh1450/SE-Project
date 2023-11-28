import Cookies from 'universal-cookie';
import axios from 'axios';

export default function NotificationList({fetchNotifications,randomPerson,friendsList})
{
    const cookies = new Cookies();
    const playerID = cookies.get("userId");
    const username = cookies.get("username");

    const handleNotificaionAccept = async(senderUsername,senderID)=>{
        //call to acceptNotification
        console.log('senderUsername is :',senderUsername);
        const acceptCall = await axios.post('http://localhost:3005/notifications/acceptNotification',{senderUsername,senderID,playerID,username});

        //then delete the notification and refetch() the notifications using prop-drilled fetchNotifications
        const deleteCall = await axios.post('http://localhost:3005/notifications/deleteNotification',{senderID,receiverID:playerID});

        //refetchNotificaations
        fetchNotifications();
    }

    const handleNotificaionReject = async(senderID) =>{
      //call to delete api
      const deleteCall = await axios.post('http://localhost:3005/notifications/deleteNotification',{senderID,receiverID:playerID});

      //remove the playerID from pending status in friendsList of senderID using deleteFriend api call
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      const data = await fetch('http://localhost:3005/friends/deleteFriend', {
          method: 'DELETE',
          redirect: 'follow',
          credentials: 'include', // Don't forget to specify this if you need cookies
          headers: headers,
          body: JSON.stringify({friendID:playerID,playerID:senderID})
      })

      console.log('After pending deletion:',data);

      //refetchNotificaations
      fetchNotifications();
    }

    return (
        <div className='friendsListComponent'>
                      <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
                      
                        <div class="overflow-y-hidden rounded-lg border">
                          <div class="overflow-x-auto">
                            <table class="w-full">
                              <thead>
                                <tr class="bg-black text-center  font-semibold uppercase tracking-widest text-white">
                                  <th class="px-5 py-3">Username</th>
                                  <th class="px-5 py-3">Game ID</th>
                                  <th class="px-5 py-3">Accept/Reject</th>
                                </tr>
                              </thead>

                              <tbody class="text-white">
                                {
                                  friendsList.map((item,indx)=>{
                                    return (
                                        <tr className='text-center'>
                                
                                          <td className="border-b border-gray-200 bg-none px-5 py-5 ">
                                            <div className="d-flex align-items-center ml-5">
                                              <div className="h-10 w-10 flex-shrink-0">
                                                <img className="h-full w-full rounded-full" src={randomPerson} alt="" />
                                              </div>
                                              <div className="ml-3">
                                                <div className="">{item.senderUsername}</div>
                                              </div>
                                            </div>
                                          </td>
                                          <td class="border-b border-gray-200 bg-none px-5 py-5 align-items-center">
                                            <div class="whitespace-no-wrap">{item.senderID}</div>
                                          </td>
                                          <td class="border-b border-gray-200 bg-none px-5 py-5">
                                              <div className="d-flex align-items-center justify-content-center">
                                              {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16" id="check">
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                              </svg> */}
                                              <div className='col'>
                                                <button onClick={()=>{handleNotificaionAccept(item.senderUsername,item.senderID)}} className='btn btn-success'>Accept</button>
                                              </div>
                                              <div className='col'>
                                              <button onClick={()=>{handleNotificaionReject(item.senderID)}} className='btn btn-danger pl-1'>Reject</button>
                                              </div>
                                              
                                              </div>
                                              {/* <div class={`${(indx%2) === 0 ? 'first' : 'second'}`} id='changew'>{item.wins}</div> */}
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
    )
}