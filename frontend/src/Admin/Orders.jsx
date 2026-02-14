import { link } from '../backendLink.js';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material'
import { useState, useContext, useEffect } from 'react'
import { Global } from "../global";
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function Orders() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [searchTerm, setSearchTerm] = useState("")

    async function getOrders() {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
        
        const data = await fetch(`${link}/orders/get-all-orders/filteredData?filterStartDate=${filterStartDate}&filterEndDate=${filterEndDate}&search=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        if (data?.status === 401) {
            localStorage.removeItem('token');
            navigate('/');
            return;
        }
        if (data?.status === 403) {
            // Not authorized (not admin)
            navigate('/');
            return;
        }
        if (!data?.ok) {
            throw new Error(`HTTP error! status: ${data.status}`);
        }
        const info = await data.json()
        // console.log(info)
        return info?.orders || [];
    }
    const { data: apiData, isLoading: ordersLoading, error: ordersError } = useQuery({
        queryKey: ['assignedOrders'],
        queryFn: getOrders,
        retry: 1,
        refetchOnWindowFocus: false
    })

    const getYesterdayDate = () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    };
    const getTodayDate = () => {
        const today = new Date().toISOString().split('T')[0];
        return today;
    }
    const [filterStartDate, setFilterStartDate] = useState(getYesterdayDate())
    const [filterEndDate, setFilterEndDate] = useState(getTodayDate())

    const filteredOrders = apiData?.filter(order => {
        if (!filterStartDate && !filterEndDate) {
            return true;
        }
        const orderDate = new Date(order?.OrderDate);
        const startDate = filterStartDate ? new Date(filterStartDate) : null;
        const endDate = filterEndDate ? new Date(filterEndDate) : null;

        // Adjust endDate to end of day (11:59:59 PM)
        if (endDate) {
            endDate.setHours(23, 59, 59, 999);
        }
        // Check if order date is within range
        if (startDate && endDate) {
            // Both dates selected: order must be between start and end
            return orderDate >= startDate && orderDate <= endDate;
        } else if (startDate && !endDate) {
            // Only start date selected: order must be on or after start
            return orderDate >= startDate;
        } else if (!startDate && endDate) {
            // Only end date selected: order must be on or before end
            return orderDate <= endDate;
        }

        return true;
    })

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['assignedOrders'] });
    }, [filterStartDate, filterEndDate]);


    const filteredData = filteredOrders?.filter((item) =>
        [
            item?.trackingId,
        ].some((field) =>
            String(field).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );


    // Loading state
    if (ordersLoading) {
        return (
            <div className="overflow-y-scroll bg-gray-100 flex flex-col gap-4 p-2 justify-center items-center w-full h-screen">
                <div className="text-center">
                    <p className="text-lg">Loading data...</p>
                </div>
            </div>
        );
    }
    // Error state
    if (ordersError) {
        return (
            <div className="overflow-y-scroll bg-gray-100 flex flex-col gap-4 p-2 justify-center items-center w-full h-screen">
                <div className="text-center text-red-600">
                    <p className="text-lg">Error loading data: {ordersError?.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className=" overflow-y-scroll bg-gray-100 flex flex-col gap-4 p-2 justify-start items-start w-7/8! sm:w-3/4 h-screen">
            <div className="bg-white px-[2%] p-4 text-center rounded flex items-center justify-start w-full">
                <label htmlFor="search"><i className="fas fa-search text-gray-400 m-0 p-0"></i></label>
                <input onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (filteredData?.find(item => item?.trackingId !== e.target.value)) {
                        queryClient.invalidateQueries({ queryKey: ['assignedOrders'] });
                    }
                }} id="search" className="rounded pl-2 w-[150px] sm:w-full focus:outline-0 text-md! font-medium" type="search" placeholder="Search" />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                <h4>Orders</h4>
                <div className="flex items-center justify-between">
                    {/* <h2>{filterStartDate !== "" || filterEndDate !== "" ? filterStartDate + " to " + filterEndDate : "All Orders"}</h2> */}
                    {/* <button onClick={generatePDF} className="bg-green-600 rounded text-white p-2">Generate PDF</button> */}
                    <div className="flex items-center gap-2">
                        <label className="text-red-500 font-bold">Set Filter : </label>
                        <h5 className="m-0 p-0">from</h5>
                        <input className="bg-blue-200 rounded" type="date" value={filterStartDate} onChange={(e) => setFilterStartDate(e.target.value)} />
                        <h5 className="m-0 p-0">to</h5>
                        <input className="bg-red-200 rounded" type="date" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)} />
                    </div>
                </div>
            </div>

            {
                filteredData.length > 0
                    ?
                    <div className='w-full h-auto overflow-scroll'>
                        <table className="bg-white border w-full rounded-lg shadow-md">
                            <thead className="text-white bg-[#041026]">
                                <tr>
                                    <td className="p-4 text-center text-nowrap font-semibold">Sender Name </td>
                                    <td className="p-4 text-center text-nowrap font-semibold">Receiver Name </td>
                                    <td className="p-4 text-center text-nowrap font-semibold">Delivery City </td>
                                    <td className="p-4 text-center text-nowrap font-semibold">Order tracking Id </td>
                                    <td className="p-4 text-center text-nowrap font-semibold">Order Date </td>
                                    <td className="p-4 text-center text-nowrap font-semibold">Receiver Contact No </td>
                                    <td className="p-4 text-center text-nowrap font-semibold">Pickup Address </td>
                                    <td className="p-4 text-center text-nowrap font-semibold">Order Type</td>
                                    <td className="p-4 text-center text-nowrap font-semibold">Order Amount</td>
                                    <td className="p-4 text-center text-nowrap font-semibold">Delivery Address </td>
                                    <td className="p-4 text-center text-nowrap font-semibold">Status</td>
                                    <td className="p-4 text-center text-nowrap font-semibold">Dimensions </td>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData?.map((a) => (
                                    <tr>
                                        <td className="p-4 text-center text-nowrap">{a?.creatorName}</td>
                                        <td className="p-4 text-center text-nowrap">{a?.CustomerName}</td>
                                        <td className="p-4 text-center text-nowrap">{a?.DeliveryCity}</td>
                                        <td className="p-4 text-center text-nowrap">{a?.trackingId}</td>
                                        <td className="p-4 text-center text-nowrap">{a?.OrderDate}</td>
                                        <td className="p-4 text-center text-nowrap">{a?.CustomerContactNo}</td>
                                        <td className="p-4 text-center text-nowrap max-w-[100px] text-wrap!">{a?.PickupAddress}</td>

                                        <td className="p-4 text-center text-nowrap">{a?.OrderType}</td>
                                        <td className="p-4 text-center text-nowrap">{a?.OrderAmount}</td>
                                        <td className="p-4 text-center text-nowrap max-w-[100px] text-wrap!">{a?.DeliveryAddress}</td>
                                        <td className="p-4 text-center text-nowrap">{a?.status}</td>
                                        <td className="p-4 text-center text-nowrap">{a?.Dimensions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :
                    <h1>No Order Found</h1>
            }
        </div>
    )
}