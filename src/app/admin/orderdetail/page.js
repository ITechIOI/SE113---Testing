"use client"
import React, { useEffect, useState } from 'react'
import OrderDetailItem from '@/components/OrderDetailItem';
import { useSearchParams } from 'next/navigation';
import { getOrderById } from '@/api/orderApi';
import { getDetailByOrderId } from '@/api/orderDetailApi';
import { getUserById } from '@/api/userApi';

export default function OrderDetailsPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id');
    const [order, setOrder] = useState({});
    const [details, setDetails] = useState([]);
    const [user, setUser] = useState({});
    const [subtotal, setSubtotal] = useState(0);

    const fetchOrder = async (id) => {
        const response = await getOrderById(id);
        if (response) {
            setOrder(response);
        } else {
            console.log("Failed to fetch order");
        }
    }

    const fetchOrderDetails = async (id) => {
        const reponse = await getDetailByOrderId(id);
        if (reponse && reponse.length > 0) {
            setDetails(reponse);
        } else {
            console.log("Failed to fetch order details");
        }
    }

    const fetchUser = async (id) => {
        const response = await getUserById(id);
        if (response) {
            setUser(response);
        } else {
            console.log("Failed to fetch user");
        }
    }

    useEffect(() => {
        const fetchAll = async () => {
            await fetchOrder(orderId);
            await fetchOrderDetails(orderId);
        };
        if (orderId) fetchAll();
    }, [orderId]);

    useEffect(
        () => {
            if (order && order.userId) {
                fetchUser(order.userId);
            }
        }, [order.userId]
    );

    useEffect(() => {

        // Tính subtotal khi details thay đổi
        let st = 0;
        for (const item of details) {
            st += item.price * item.quantity;
        }
        setSubtotal(st);
    }, [details]);

    return (
        <div className='px-2 py-5'>
            <div className='flex justify-between items-end'>
                <div>
                    <h1 className='text-3xl font-bold'>Order Detail</h1>
                    <div id="roadmap" className="flex items-center mt-2">
                        <a className="text-[#ff8200]" href="/admin/dashboard">Dashboard</a>
                        <label className="ml-3 mr-3">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.59467 3.96967C6.30178 4.26256 6.30178 4.73744 6.59467 5.03033L10.5643 9L6.59467 12.9697C6.30178 13.2626 6.30178 13.7374 6.59467 14.0303C6.88756 14.3232 7.36244 14.3232 7.65533 14.0303L12.4205 9.26516C12.5669 9.11872 12.5669 8.88128 12.4205 8.73484L7.65533 3.96967C7.36244 3.67678 6.88756 3.67678 6.59467 3.96967Z" fill="#A3A9B6" />
                            </svg>
                        </label>
                        <a className="text-[#ff8200]" href="/admin/order">Order List</a>
                        <label className="ml-3 mr-3">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.59467 3.96967C6.30178 4.26256 6.30178 4.73744 6.59467 5.03033L10.5643 9L6.59467 12.9697C6.30178 13.2626 6.30178 13.7374 6.59467 14.0303C6.88756 14.3232 7.36244 14.3232 7.65533 14.0303L12.4205 9.26516C12.5669 9.11872 12.5669 8.88128 12.4205 8.73484L7.65533 3.96967C7.36244 3.67678 6.88756 3.67678 6.59467 3.96967Z" fill="#A3A9B6" />
                            </svg>
                        </label>
                        <a className="text-[#667085]" href="/admin/orderdetail">Order Detail</a>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <div className='rounded-md bg-white border border-[#E0E2E7] px-4 py-2 flex items-center gap-2'>
                        <select className='w-full  outline-none' name="status" id="status" defaultValue={order ? order.status : "pending"} value={order?order.status:"pending"}>
                            <option value="Order Placed">Order Placed</option>
                            <option value="pending">Processing</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <button className='flex gap-2 bg-[#ff8200] text-white px-4 py-2 rounded-md'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.99935 13.3333C4.99935 12.8731 5.37245 12.5 5.83268 12.5H7.49935C7.95959 12.5 8.33268 12.8731 8.33268 13.3333C8.33268 13.7936 7.95959 14.1667 7.49935 14.1667H5.83268C5.37245 14.1667 4.99935 13.7936 4.99935 13.3333Z" fill="white" />
                            <path d="M5.83268 9.16667C5.37245 9.16667 4.99935 9.53976 4.99935 10C4.99935 10.4602 5.37245 10.8333 5.83268 10.8333H10.8327C11.2929 10.8333 11.666 10.4602 11.666 10C11.666 9.53976 11.2929 9.16667 10.8327 9.16667H5.83268Z" fill="white" />
                            <path d="M4.99935 6.66667C4.99935 6.20643 5.37245 5.83333 5.83268 5.83333H10.8327C11.2929 5.83333 11.666 6.20643 11.666 6.66667C11.666 7.1269 11.2929 7.5 10.8327 7.5H5.83268C5.37245 7.5 4.99935 7.1269 4.99935 6.66667Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.66602 5.83333C1.66602 3.99238 3.1584 2.5 4.99935 2.5H11.666C13.507 2.5 14.9993 3.99238 14.9993 5.83333V8.33333H15.8327C17.2134 8.33333 18.3327 9.45262 18.3327 10.8333V15C18.3327 16.3807 17.2134 17.5 15.8327 17.5H4.99935C3.1584 17.5 1.66602 16.0076 1.66602 14.1667V5.83333ZM15.8327 15.8333C16.2929 15.8333 16.666 15.4602 16.666 15V10.8333C16.666 10.3731 16.2929 10 15.8327 10H14.9993V15C14.9993 15.4602 15.3724 15.8333 15.8327 15.8333ZM13.3327 15C13.3327 15.2922 13.3828 15.5727 13.4749 15.8333H4.99935C4.07887 15.8333 3.33268 15.0871 3.33268 14.1667V5.83333C3.33268 4.91286 4.07887 4.16667 4.99935 4.16667H11.666C12.5865 4.16667 13.3327 4.91286 13.3327 5.83333V15Z" fill="white" />
                        </svg>
                        Invoice
                    </button>
                </div>
            </div>
            <div className='flex justify-between mt-5'>
                <div className='p-5 bg-white rounded-md shadow-md w-2/7 h-fit'>
                    <div className='flex gap-3 items-center'>
                        <h1 className='text-xl font-semibold'>Order #{order.id}</h1>
                        <div className={`py-1 px-2 rounded-full w-fit ${order.status === "pending" ?
                            "bg-[#FDF1E8] text-[#ff8200]" : (order.status === "Shipped" ?
                                "bg-[#E8F8FD] text-[#13B2E4]" : (order.status === "cancelled" ?
                                    "bg-[#FEEDEC] text-[#F04438]" : "bg-[#E7F4EE] text-[#0D894F]"))}`}>
                            {order.status}
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <div className='flex gap-2 items-center'>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#E0E2E7" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#F0F1F3" strokeWidth="4" />
                                <path d="M23.9666 20.6975C24.3519 20.3017 24.3433 19.6686 23.9475 19.2834C23.5517 18.8982 22.9186 18.9068 22.5334 19.3025L19.2737 22.6517L17.8755 21.5309C17.4446 21.1854 16.8152 21.2547 16.4698 21.6856C16.1244 22.1166 16.1936 22.7459 16.6246 23.0914L19.0857 25.0643C19.2867 25.2254 19.5771 25.2075 19.7567 25.0229L23.9666 20.6975Z" fill="#667085" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M16 10C16.5523 10 17 10.4477 17 11H23C23 10.4477 23.4477 10 24 10C24.5523 10 25 10.4477 25 11H26C27.6569 11 29 12.3431 29 14V27C29 28.6569 27.6569 30 26 30H14C12.3431 30 11 28.6569 11 27V14C11 12.3431 12.3431 11 14 11H15C15 10.4477 15.4477 10 16 10ZM27 14V15H13V14C13 13.4477 13.4477 13 14 13H15C15 13.5523 15.4477 14 16 14C16.5523 14 17 13.5523 17 13H23C23 13.5523 23.4477 14 24 14C24.5523 14 25 13.5523 25 13H26C26.5523 13 27 13.4477 27 14ZM13 27V17H27V27C27 27.5523 26.5523 28 26 28H14C13.4477 28 13 27.5523 13 27Z" fill="#667085" />
                            </svg>
                            Added
                        </div>
                        <div>
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })}
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <div className='flex gap-2 items-center'>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#E0E2E7" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#F0F1F3" strokeWidth="4" />
                                <path d="M23.9666 20.6975C24.3519 20.3017 24.3433 19.6686 23.9475 19.2834C23.5517 18.8982 22.9186 18.9068 22.5334 19.3025L19.2737 22.6517L17.8755 21.5309C17.4446 21.1854 16.8152 21.2547 16.4698 21.6856C16.1244 22.1166 16.1936 22.7459 16.6246 23.0914L19.0857 25.0643C19.2867 25.2254 19.5771 25.2075 19.7567 25.0229L23.9666 20.6975Z" fill="#667085" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M16 10C16.5523 10 17 10.4477 17 11H23C23 10.4477 23.4477 10 24 10C24.5523 10 25 10.4477 25 11H26C27.6569 11 29 12.3431 29 14V27C29 28.6569 27.6569 30 26 30H14C12.3431 30 11 28.6569 11 27V14C11 12.3431 12.3431 11 14 11H15C15 10.4477 15.4477 10 16 10ZM27 14V15H13V14C13 13.4477 13.4477 13 14 13H15C15 13.5523 15.4477 14 16 14C16.5523 14 17 13.5523 17 13H23C23 13.5523 23.4477 14 24 14C24.5523 14 25 13.5523 25 13H26C26.5523 13 27 13.4477 27 14ZM13 27V17H27V27C27 27.5523 26.5523 28 26 28H14C13.4477 28 13 27.5523 13 27Z" fill="#667085" />
                            </svg>
                            Payment Method
                        </div>
                        <div>{order.paymentMethod || ""}</div>
                    </div>
                </div>
                <div className='p-5 bg-white rounded-md shadow-md w-2/7 '>
                    <h1 className='text-xl font-semibold'>Customer</h1>
                    <div className='flex justify-between items-center mt-2'>
                        <div className='flex gap-2 items-center'>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#E0E2E7" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#F0F1F3" strokeWidth="4" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M24.5 14.5C24.5 16.9853 22.4853 19 20 19C17.5147 19 15.5 16.9853 15.5 14.5C15.5 12.0147 17.5147 10 20 10C22.4853 10 24.5 12.0147 24.5 14.5ZM22.5 14.5C22.5 15.8807 21.3807 17 20 17C18.6193 17 17.5 15.8807 17.5 14.5C17.5 13.1193 18.6193 12 20 12C21.3807 12 22.5 13.1193 22.5 14.5Z" fill="#667085" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M11 26.9231C11 23.0996 14.0996 20 17.9231 20H22.0769C25.9004 20 29 23.0996 29 26.9231C29 28.0701 28.0701 29 26.9231 29H13.0769C11.9299 29 11 28.0701 11 26.9231ZM13 26.9231C13 24.2041 15.2041 22 17.9231 22H22.0769C24.7959 22 27 24.2041 27 26.9231C27 26.9656 26.9656 27 26.9231 27H13.0769C13.0344 27 13 26.9656 13 26.9231Z" fill="#667085" />
                            </svg>

                            Customer
                        </div>
                        <div>{user.name || ""}</div>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <div className='flex gap-2 items-center'>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#E0E2E7" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#F0F1F3" strokeWidth="4" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M10 15C10 13.3431 11.3431 12 13 12H27C28.6569 12 30 13.3431 30 15V25C30 26.6569 28.6569 28 27 28H13C11.3431 28 10 26.6569 10 25V15ZM26.3334 14H13.6667L19.4 18.3C19.7556 18.5667 20.2445 18.5667 20.6 18.3L26.3334 14ZM12 15.25V25C12 25.5523 12.4477 26 13 26H27C27.5523 26 28 25.5523 28 25V15.25L21.8 19.9C20.7334 20.7 19.2667 20.7 18.2 19.9L12 15.25Z" fill="#667085" />
                            </svg>
                            Email
                        </div>
                        <div>{user.email || ""}</div>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <div className='flex gap-2 items-center'>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#E0E2E7" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#F0F1F3" strokeWidth="4" />
                                <path d="M18.5 25C17.9477 25 17.5 25.4477 17.5 26C17.5 26.5523 17.9477 27 18.5 27H21.5C22.0523 27 22.5 26.5523 22.5 26C22.5 25.4477 22.0523 25 21.5 25H18.5Z" fill="#667085" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.5 13C13.5 11.3431 14.8431 10 16.5 10H23.5C25.1569 10 26.5 11.3431 26.5 13V27C26.5 28.6569 25.1569 30 23.5 30H16.5C14.8431 30 13.5 28.6569 13.5 27V13ZM16.5 12H23.5C24.0523 12 24.5 12.4477 24.5 13V27C24.5 27.5523 24.0523 28 23.5 28H16.5C15.9477 28 15.5 27.5523 15.5 27V13C15.5 12.4477 15.9477 12 16.5 12Z" fill="#667085" />
                            </svg>
                            Phone
                        </div>
                        <div>{user.phone || ""}</div>
                    </div>
                </div>
                {/* <div className='p-5 bg-white rounded-md shadow-md w-2/7 h-fit'>
                    <h1 className='text-xl font-semibold'>Document</h1>
                    <div className='flex justify-between items-center mt-2'>
                        <div className='flex gap-2 items-center'>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#E0E2E7" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#F0F1F3" strokeWidth="4" />
                                <path d="M14 24C14 23.4477 14.4477 23 15 23H17C17.5523 23 18 23.4477 18 24C18 24.5523 17.5523 25 17 25H15C14.4477 25 14 24.5523 14 24Z" fill="#667085" />
                                <path d="M15 19C14.4477 19 14 19.4477 14 20C14 20.5523 14.4477 21 15 21H21C21.5523 21 22 20.5523 22 20C22 19.4477 21.5523 19 21 19H15Z" fill="#667085" />
                                <path d="M14 16C14 15.4477 14.4477 15 15 15H21C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17H15C14.4477 17 14 16.5523 14 16Z" fill="#667085" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M10 15C10 12.7909 11.7909 11 14 11H22C24.2091 11 26 12.7909 26 15V18H27C28.6569 18 30 19.3431 30 21V26C30 27.6569 28.6569 29 27 29H14C11.7909 29 10 27.2091 10 25V15ZM27 27C27.5523 27 28 26.5523 28 26V21C28 20.4477 27.5523 20 27 20H26V26C26 26.5523 26.4477 27 27 27ZM24 26C24 26.3506 24.0602 26.6872 24.1707 27H14C12.8954 27 12 26.1046 12 25V15C12 13.8954 12.8954 13 14 13H22C23.1046 13 24 13.8954 24 15V26Z" fill="#667085" />
                            </svg>
                            Invoice
                        </div>
                        <div>{order.invoice}</div>
                    </div>
                </div> */}
            </div>
            <div className='flex gap-[7%] w-full mt-5'>
                <div className='w-9/14 p-5 bg-white rounded-md shadow-md h-fit'>
                    <div className='flex w-full gap-4 items-center px-5'>
                        <div className='text-lg font-semibold'>Product List</div>
                        <div className='bg-[#E7F4EE] text-[#0D894F] rounded-full px-2 py-1'>{details.length} Product{details.length < 2 ? "" : "s"}</div>
                    </div>
                    <table className='w-full mt-5'>
                        <thead className='bg-[#F9FAFB] font-medium'>
                            <tr className='text-center bg-[#F9F9FC] font-semibold border-b border-[#E0E2E7]'>
                                <th className='py-2 px-4'>Product</th>
                                <th className='py-2 px-4'>Quantity</th>
                                <th className='py-2 px-4'>Price</th>
                                <th className='py-2 px-4'>Total</th>


                            </tr>
                        </thead>
                        <tbody className='text-[#344054] font-normal text-center'>
                            {details.map((item) => (
                                <OrderDetailItem
                                    key={item.id}
                                    item={item} />
                            ))}

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='py-2 px-4 '>SubTotal</td>
                                <td className='py-2 px-4 '>${subtotal}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='py-2 px-4 '>Shipping Rate</td>
                                <td className='py-2 px-4 '>${order.shippingAmount}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='py-2 px-4 font-semibold'>Grand Total</td>
                                <td className='py-2 px-4 font-semibold'>${order ? order.totalPrice : 0}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='w-2/7 '>
                    <div className='p-5 bg-white rounded-md shadow-md w-full'>
                        <h1 className='text-xl font-semibold'>Address</h1>
                        <div className='flex gap-2 items-center'>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#E0E2E7" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#F0F1F3" strokeWidth="4" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M24 18C24 20.2091 22.2091 22 20 22C17.7909 22 16 20.2091 16 18C16 15.7909 17.7909 14 20 14C22.2091 14 24 15.7909 24 18ZM22 18C22 19.1046 21.1046 20 20 20C18.8954 20 18 19.1046 18 18C18 16.8954 18.8954 16 20 16C21.1046 16 22 16.8954 22 18Z" fill="#667085" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M28 18C27.9999 24.8707 22.0992 28.791 20.4332 29.7609C20.1612 29.9192 19.8388 29.9192 19.5668 29.7609C17.9008 28.791 12 24.8707 12 18C12 14 15 10 20 10C25 10 28 14 28 18ZM14 18C14 14.9372 16.2648 12 20 12C23.7352 12 26 14.9372 26 18C26 21.2825 24.3677 23.8038 22.5857 25.5858C21.7002 26.4714 20.8093 27.1401 20.1406 27.5859C20.0924 27.618 20.0455 27.6489 20 27.6785C19.9544 27.6489 19.9075 27.618 19.8594 27.5859C19.1907 27.1401 18.2998 26.4714 17.4142 25.5858C15.6322 23.8038 14 21.2825 14 18Z" fill="#667085" />
                            </svg>
                            <div>
                                <div className='text-gray-500'>{order.phone}</div>
                                <div>{order.address}</div>
                            </div>
                        </div>
                    </div>
                    <div className='p-5 bg-white rounded-md shadow-md w-full mt-5 flex flex-col gap-5'>
                        <h1 className='text-xl font-semibold'>Order Status</h1>
                        <div className='flex gap-2 items-center'>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill="#FBE3CA" />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke="#EFEFFD" strokeWidth="4" />
                                <path d="M14.638 12.1223C14.4569 11.1806 13.6329 10.5 12.674 10.5H11C10.4477 10.5 10 10.9477 10 11.5C10 12.0523 10.4477 12.5 11 12.5L12.674 12.5L14.55 22.2554C14.9122 24.1388 16.5602 25.5 18.478 25.5H24.6873C26.5044 25.5 28.0932 24.2752 28.5556 22.518L29.8068 17.7635C30.3074 15.8612 28.8726 14 26.9056 14H25.5C24.9477 14 24.5 14.4477 24.5 15C24.5 15.5523 24.9477 16 25.5 16H26.9056C27.5613 16 28.0395 16.6204 27.8727 17.2545L26.6215 22.009C26.3903 22.8876 25.5959 23.5 24.6873 23.5H18.478C17.5191 23.5 16.6951 22.8194 16.514 21.8777L15.3837 16H18C18.5523 16 19 15.5523 19 15C19 14.4477 18.5523 14 18 14H14.9991L14.638 12.1223Z" fill="#FF8200" />
                                <path d="M16.75 29.5C15.9216 29.5 15.25 28.8284 15.25 28C15.25 27.1716 15.9216 26.5 16.75 26.5C17.5784 26.5 18.25 27.1716 18.25 28C18.25 28.8284 17.5784 29.5 16.75 29.5Z" fill="#FF8200" />
                                <path d="M25.5 29.5C24.6716 29.5 24 28.8284 24 28C24 27.1716 24.6716 26.5 25.5 26.5C26.3284 26.5 27 27.1716 27 28C27 28.8284 26.3284 29.5 25.5 29.5Z" fill="#FF8200" />
                                <path d="M18.0429 17.7929C18.4334 17.4024 19.0666 17.4024 19.4571 17.7929L20.75 19.0858V12C20.75 11.4477 21.1977 11 21.75 11C22.3023 11 22.75 11.4477 22.75 12V19.0858L24.0429 17.7929C24.4334 17.4024 25.0666 17.4024 25.4571 17.7929C25.8476 18.1834 25.8476 18.8166 25.4571 19.2071L22.1036 22.5607C21.9083 22.7559 21.5917 22.7559 21.3964 22.5607L18.0429 19.2071C17.6524 18.8166 17.6524 18.1834 18.0429 17.7929Z" fill="#FF8200" />
                            </svg>
                            <div>
                                <div className='text-lg'>Order Placed</div>
                                <div className='text-gray-500'>An order has been placed.</div>
                                <div className='text-gray-500 text-sm'>
                                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill={order.status === "pending" ? "#FBE3CA" : "#E0E2E7"} />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke={order.status === "pending" ? "#EFEFFD" : "#F0F1F3"} strokeWidth="4" />
                                <path d="M13.9359 16.5007C15.1477 14.4058 17.4103 13 20 13C23.5525 13 26.4869 15.6463 26.9395 19.0752L26.2071 18.3429C25.8166 17.9523 25.1834 17.9523 24.7929 18.3429C24.4024 18.7334 24.4024 19.3665 24.7929 19.7571L27.6464 22.6106C27.8417 22.8059 28.1583 22.8059 28.3536 22.6106L31.2071 19.7571C31.5976 19.3665 31.5976 18.7334 31.2071 18.3429C30.8166 17.9523 30.1834 17.9523 29.7929 18.3429L28.9625 19.1732C28.5451 14.5902 24.6918 11 20 11C16.6675 11 13.7593 12.8118 12.2047 15.4993C11.9281 15.9773 12.0915 16.5891 12.5695 16.8656C13.0476 17.1421 13.6593 16.9788 13.9359 16.5007Z" fill={order.status === "pending" ? "#FF8200" : "#667085"} />
                                <path d="M13.7929 22.2571C14.1834 22.6476 14.8166 22.6476 15.2071 22.2571C15.5976 21.8666 15.5976 21.2334 15.2071 20.8429L12.3536 17.9894C12.1583 17.7941 11.8417 17.7941 11.6464 17.9894L8.79289 20.8429C8.40237 21.2334 8.40237 21.8666 8.79289 22.2571C9.18342 22.6476 9.81658 22.6476 10.2071 22.2571L11.1024 21.3619C11.7588 25.6862 15.4924 29 20 29C22.8426 29 25.3779 27.681 27.0256 25.6255C27.3711 25.1946 27.3018 24.5652 26.8708 24.2198C26.4399 23.8743 25.8106 23.9436 25.4651 24.3745C24.1806 25.9769 22.2101 27 20 27C16.707 27 13.9451 24.7262 13.1987 21.663L13.7929 22.2571Z" fill={order.status === "pending" ? "#FF8200" : "#667085"} />
                            </svg>
                            <div>
                                <div className='text-lg'>Processing</div>
                                <div className='text-gray-500'>Seller has proccessed your order.</div>
                                <div className='text-gray-500 text-sm'>{order.processTime ? order.processTime : "yyyy-MM-dd"}</div>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill={order.status === "Shipping" ? "#FBE3CA" : "#E0E2E7"} />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke={order.status === "Shipping" ? "#EFEFFD" : "#F0F1F3"} strokeWidth="4" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M13 13H21C21.5523 13 22 13.4477 22 14V16V23H15.5H13C12.4477 23 12 22.5523 12 22V14C12 13.4477 12.4477 13 13 13ZM22 25H18.3293C18.4398 25.3128 18.5 25.6494 18.5 26C18.5 27.6569 17.1569 29 15.5 29C13.8431 29 12.5 27.6569 12.5 26C12.5 25.6429 12.5624 25.3004 12.6768 24.9828C11.172 24.8216 10 23.5477 10 22V14C10 12.3431 11.3431 11 13 11H21C22.6569 11 24 12.3431 24 14V16H25.6459C26.7822 16 27.821 16.642 28.3292 17.6584L29.7889 20.5777C29.9277 20.8554 30 21.1616 30 21.4721V23C30 23.8316 29.4924 24.5447 28.7702 24.8463C28.9182 25.2015 29 25.5912 29 26C29 27.6569 27.6569 29 26 29C24.3431 29 23 27.6569 23 26C23 25.6494 23.0602 25.3128 23.1707 25H22ZM26 23H28V21.4721L26.5403 18.5528C26.3709 18.214 26.0247 18 25.6459 18H24V23H26ZM26 25C25.4477 25 25 25.4477 25 26C25 26.5523 25.4477 27 26 27C26.5523 27 27 26.5523 27 26C27 25.4477 26.5523 25 26 25ZM14.5 26C14.5 25.4477 14.9477 25 15.5 25C16.0523 25 16.5 25.4477 16.5 26C16.5 26.5523 16.0523 27 15.5 27C14.9477 27 14.5 26.5523 14.5 26Z" fill={order.status === "Shipping" ? "#FF8200" : "#667085"} />
                            </svg>

                            <div>
                                <div className='text-lg'>Shipping</div>
                                <div className='text-gray-500 text-sm'>{order.shippingTime ? order.shippingTime : "yyyy-MM-dd"}</div>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="36" height="36" rx="18" fill={order.status === "Delivered" ? "#FBE3CA" : "#E0E2E7"} />
                                <rect x="2" y="2" width="36" height="36" rx="18" stroke={order.status === "Delivered" ? "#EFEFFD" : "#F0F1F3"} strokeWidth="4" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M27.1364 13.7287C27.5624 14.0801 27.6229 14.7104 27.2714 15.1364L18.6925 25.5351C18.5126 25.7531 18.1879 25.7788 17.976 25.5918L13.3384 21.4999C12.9243 21.1345 12.8848 20.5025 13.2502 20.0884C13.6156 19.6743 14.2475 19.6348 14.6616 20.0002L18.1365 23.0662L25.7286 13.8636C26.0801 13.4376 26.7104 13.3772 27.1364 13.7287Z" fill={order.status === "Delivered" ? "#FF8200" : "#667085"} />
                            </svg>

                            <div>
                                <div className='text-lg'>Delivered</div>
                                <div className='text-gray-500 text-sm'>{order.deliverTime ? order.deliverTime : "yyyy-MM-dd"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
