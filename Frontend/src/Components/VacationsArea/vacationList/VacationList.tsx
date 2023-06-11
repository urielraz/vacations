import  { useEffect, useState } from 'react';
import VacationModel from '../../../Models/VacationModel';
import vacataionsService from "../../../Services/VacationsService";

import VcationCard from '../VcationCard/VacationCard';
import useAuth from '../../../Services/useAuth';
import { useNavigate } from 'react-router-dom';
import notifyService from '../../../Services/NotifyService';
import followService from '../../../Services/FollowService';
import "./VacationList.css"
import { Button } from 'react-bootstrap';
import UpdateVacation from '../UpdateVacation/UpdateVacation';
import ReactPaginate from 'react-paginate';
// import FollowVacation from '../FollowVacation/FollowVacation';



function VacationList(): JSX.Element{


  // Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems } : {currentItems:any}) {
    return (
      <>
        {currentItems &&
          currentItems.map((item:any) => (
            <div>
              <h3>Item #{item}</h3>
            </div>
          ))}
      </>
    );
  }
  function PaginatedItems({ itemsPerPage }:{ itemsPerPage:any }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event:any) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
   
    }

    const [vacation, setVacation] = useState<VacationModel[]>([]);
    const [follow, setFollow] = useState<VacationModel[]>([]);
    const [toggle, setToggle] = useState(true)

    const { isAdmin } = useAuth();

    const { isLoggedIn } = useAuth()
    const { getUserId } = useAuth()
    const navigate = useNavigate();

    // console.log(getUserId())

    
    
    useEffect(() => {
        
        // if (!isLoggedIn()) {
        //     notifyService.error("You must logged in");
        //     navigate("/login");
        //     return;
        // }


        vacataionsService.getAllVacations()
        .then(vacations => setVacation(vacations))
        .catch(err => notifyService.error(err));

        followService.GetAllFollowersByUser(getUserId())
        .then(follow => setFollow(follow))
        .catch(err => notifyService.error(err))

        

                  
            
        }, []);


     
        

    // console.log(vacation)
    

    return( 
        <div className="VacationsList">
        


        {/* <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" id="customSwitch1" checked/>
        </div> */}

            
            {/* <Button className="btn btn-danger" type="button" data-bs-toggle="collapse">filter</Button> */}
            
          {!isAdmin() &&<>
            <label  className="switch">
                <input  onClick={() => setToggle(!toggle)} type="checkbox" />
           
                
                 <span className="slider round" > Filter</span>
              </label>
          </>
            }
              <hr />
              {/* <hr /> */}

              {
                isAdmin() &&
                vacation.map( v => <UpdateVacation key={v.vacation_id} vacation={v}  />)
              }

              {
                !isAdmin() && <>
                { toggle &&
                  
                    vacation.map( v => 
                    <>
                    <VcationCard key={v.vacation_id} vacation={v} />
                    </>

                    )
                }
         
                { !toggle &&
                    follow.map( v => <VcationCard key={v.vacation_id} vacation={v}  />)
                  
                   
                }
                {
                  !toggle && follow.length === 0 &&<>.אתה לא עוקב אחרי שום חופשה.
                  
                  או פשוט רענן את הדף</>
                }
                </>
              }


{/* 
          <PaginatedItems itemsPerPage={5}  />

          <Items currentItems={vacation} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        
    */}


              
      
           
        </div>

        
    )
}

export default VacationList;



