import { link } from '../backendLink.js';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EmployeManagement() {
    const [openMenu, setOpenMenu] = useState(false)
    const [openMenuAddUser, setOpenMenuAddUser] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    async function getRidersLogic() {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        const data = await fetch(`${link}/users/employe`, {
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
        return info;
    }
    const { data: apiData, isLoading: ridersLoading, error: ridersError } = useQuery({
        queryKey: ['riders-employe'],
        queryFn: getRidersLogic,
        retry: 1,
        refetchOnWindowFocus: false,
    })


    const [formData, setFormData] = useState({
        EmployeName: "",
        ContactNo: "",
        EmailAddress: "",
        password: "",
        status: "manager",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updated = { ...prev, [name]: value };
            // if (name === "password" || name === "confPass") {
            //     validatePasswords(updated.password, updated.confPass);
            // }
            return updated;
        });
    };
    // const confPassRef = useRef(null);

    async function addRiderLogic(e) {
        const data = await fetch(`${link}/users/signup-employe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                CompanyName: formData.EmployeName,
                PhoneNo: formData.ContactNo,
                Email: formData.EmailAddress,
                password: formData.password,
                status: formData.status,
            })
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
            const res =await data.json();
            throw new Error(`${res?.message}`);
        }
    }
    const addRiderMutation = useMutation({
        mutationFn: addRiderLogic,
        onSuccess: () => {
            setFormData({
                EmployeName: "",
                ContactNo: "",
                EmailAddress: "",
                password: "",
                status: "",
            });
            setOpenMenuAddUser(false);
            queryClient.invalidateQueries({ queryKey: ['riders-employe'] });
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(`Failed : ${error.message}`, {
                position: "top-right",
                autoClose: 3000,
                style: {
                    background: '#d10115',
                    color: 'white',
                },
            })
        }
    })
    function addRider(e) {
        e.preventDefault();
        addRiderMutation.mutate(formData)
    }


    async function deleteEmployeLogic(id) {
        const data = await fetch(`${link}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
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
    }
    const deleteEmployeMutation = useMutation({
        mutationFn: deleteEmployeLogic,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['riders-employe'] });
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(`Failed : ${error.message}`, {
                position: "top-right",
                autoClose: 3000,
                style: {
                    background: '#d10115',
                    color: 'white',
                },
            })
        }
    })
    function deleteEmploye(id) {
        deleteEmployeMutation.mutate(id)
    }

    const filteredData = apiData?.filter((item) =>
        [
            item?.CompanyName,
            item?._id,
        ].some((field) =>
            String(field).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // function validatePasswords(pass, conf) {
    //     if (!confPassRef.current) return;

    //     if (pass !== conf) {
    //         confPassRef.current.setCustomValidity("Passwords do not match");
    //     } else {
    //         confPassRef.current.setCustomValidity("");
    //     }
    // }

    const formRef = useRef(null);

    if (ridersLoading) {
        return (
            <div className="pt-25! overflow-scroll! bg-white flex flex-col p-4 justify-center items-center w-screen h-screen">
                <div className="text-center">
                    <p className="text-lg">Loading employees...</p>
                </div>
            </div>
        );
    }
    // Error state
    if (ridersError) {
        return (
            <div className="pt-25! overflow-scroll! bg-white flex flex-col p-4 justify-center items-center w-screen h-screen">
                <div className="text-center text-red-600">
                    <p className="text-lg">Error loading employees: {ridersError.message}</p>
                    <button
                        onClick={() => queryClient.refetchQueries({ queryKey: ['userOrders'] })}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className=" overflow-y-scroll bg-gray-100 flex flex-col gap-4 p-2 justify-start items-start w-7/8! sm:w-3/4 h-screen">

            <ToastContainer
                pauseOnHover
            />

            <div className="bg-white px-[2%] py-[2%] text-center rounded flex items-center justify-start w-full">
                <label htmlFor="search"><i className="fas fa-search text-gray-400 m-0 p-0"></i></label>
                <input onChange={(e) => setSearchTerm(e.target.value)} id="search" className="rounded pl-2 w-[150px] sm:w-full focus:outline-0 text-md! font-medium" type="search" placeholder="Search" />
                <button onClick={() => setOpenMenuAddUser(true)} className="bg-[#d10115] text-gray-100 font-medium py-2 px-4 rounded text-nowrap">Add Employee</button>
                <Dialog
                    open={openMenuAddUser}
                    onClose={() => setOpenMenuAddUser(false)}
                    md
                    maxWidth={false}
                >
                    <DialogTitle
                        sx={{
                            paddingY: "10px",
                            width: "45vw",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: 'flex-start',
                            gap: "1px",
                        }}
                    >
                        <div className="w-full flex flex-col gap-0 items-start">
                            {/* <h3 className='! text-md! font-medium!' > Create Rider Account </h3> */}
                            <form ref={formRef} onSubmit={addRider} className='w-full flex flex-col'>
                                <div className="flex gap-[5%]">
                                    <div className="w-full">
                                        <label className=' text-[17px]'>Empoyee Name:</label>
                                        <input required name="EmployeName" value={formData.EmployeName} onChange={handleChange} type="text" className='text-gray-900 h-13! focus:outline-blue-500! mb-2! shadow-sm shadow-black/20 border w-full rounded py-2 pl-3 text-[17px]!' placeholder='Employe Name' />
                                        <label className=' text-[17px]'>Contact No:</label>
                                        <input required name="ContactNo" value={formData.ContactNo} onChange={handleChange} type="number" className='text-gray-900 h-13! focus:outline-blue-500! mb-2! shadow-sm shadow-black/20 border w-full rounded py-2 pl-3 text-[17px]!' placeholder='Contact No' />
                                        <label className=' text-[17px]'>Email Address:</label>
                                        <input required name="EmailAddress" value={formData.EmailAddress} onChange={handleChange} type="email" className='text-gray-900 h-13! focus:outline-blue-500! mb-2! shadow-sm shadow-black/20 border w-full rounded py-2 pl-3 text-[17px]!' placeholder='Email Address' />
                                        <label className=' text-[17px]'>Status:</label>
                                        <select required name="status" value={formData.status} onChange={handleChange} className='text-gray-900 h-13! focus:outline-blue-500! mb-2! shadow-sm shadow-black/20 border w-full rounded py-2 pl-3 text-[17px]!'>
                                            <option value="manager">Manager</option>
                                            <option value="accountant">Accountant</option>
                                        </select>
                                        <label className=' text-[17px]'>Password:</label>
                                        <input required name="password" value={formData.password} onChange={handleChange} type="text" className='text-gray-900 h-13! focus:outline-blue-500! mb-2! shadow-sm shadow-black/20 border w-full rounded py-2 pl-3 text-[17px]!' placeholder='password' />
                                        <button
                                            type="submit"
                                            className="w-full bg-red-400 text-white rounded py-1"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </DialogTitle>
                </Dialog>
            </div>

            <div className="flex items-center justify-between w-full">
                <h4>Employees</h4>
            </div>

            <div className="w-full h-auto text-white">
                {
                    filteredData?.length !== 0 ?
                        filteredData?.map((a) => (
                            <>
                                <div className='px-10! bg-gray-50 flex justify-between items-center mb-3! shadow shadow-black/30 py-3 pl-2 rounded-xl'>
                                    <div className='flex items-center justify-between! w-full'>
                                        <div className='flex items-center'>
                                            <div className='mr-10 bg-blue-900 rounded-[50%] h-20 w-20 flex justify-center items-center'>
                                                <h2 className="p-4 text-center text-nowrap">{a?.CompanyName[0]?.toUpperCase()}</h2>
                                            </div>
                                            <div className="text-black flex flex-col justify-between h-15">
                                                <h3 className="text-justify text-wrap! font-bold">{a?.CompanyName}</h3>
                                                <div className="text-justify text-wrap!">{a?.Email}</div>
                                            </div>
                                        </div>

                                        <div className="text-black flex flex-col justify-between h-15">
                                            <h3 className="mr-5 mt-2 text-2xl! text-justify text-nowrap font-extrabold">
                                                {a?.status}
                                            </h3>
                                        </div>
                                        <div>
                                            <button onClick={() => deleteEmploye(a?._id)} className='bg-red-400 p-2 rounded'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                        : <h1 className='text-black'>No Employee</h1>
                }
            </div>
        </div>
    )
}