import { useGetStudentOrdersQuery } from "../../store/api/authApi";
import React from "react";
import Loader from "../ui/Loader";
import ErrorComponent from "../ui/ErrorComponent";

const OrderHistory = ({userId}) => {
  const {data,isLoading,isError,refetch}=useGetStudentOrdersQuery(userId);
  console.log(data);
  
  return (
    <>
    {isLoading && <Loader/>}
    {isError && <ErrorComponent onRetry={()=>{refetch()}} />}
      <div className="student-profile-orders-wrapper">
        <div className="student-profile-orders">
        <div
              className="font-bold student-profile-order custom-height-80 flex items-center px-8"
            >
              <div className="w-1/3">
                <span>Order_id</span>
              </div>
              <div className="w-1/3">
                <span>Course Name</span>
              </div>
              <div className="w-1/6">
                <span>Paid Amount</span>
              </div>
              <div className="w-1/6">
                Payment Status                
              </div>
            </div>
          {data?.orders && data.orders?.map((item) => (
            <div
              key={item._id}
              className="student-profile-order custom-height-80 flex items-center px-8"
            >
              <div className="w-1/3">
                <span>{item._id}</span>
              </div>
              <div className="w-1/3">
                <span>{item.course.title}</span>
              </div>
              <div className="w-1/6">
                <span>Rs.{item.amount}</span>
              </div>
              <div className="w-1/6">
                {item.status === "created" ? <span className="text-green-500" >Success</span>
                : <span className="text-red-500" >Failed</span>}
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
