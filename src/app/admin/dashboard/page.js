"use client"
import React, { use, useState } from 'react'
import SaleProgress from '@/components/SaleProgress';
import RevenueChart from '@/components/RevenueChart';
import BestSellingProductItem from '@/components/AdminBestSellingProductItem';
import AdminOrderItem from '@/components/AdminOrderItem';

export default function DashboardPage() {
    const [selectedOption, setSelectedOption] = useState('all-times');
    const totalRevenue = 0;
    const revenueRatio = 15;
    const totalSales = 0;
    const salesRatio = 20;
    const productSKU = 0;
    const productSKURatio = -10;
    const balance = 0;
    const balanceRatio = 0;
    const [isAllChecked, setIsAllChecked] = useState(false); // Trạng thái checkbox của thead

    const [listBestSellingProduct, setListBestSellingProduct] = useState([
        { id: "pro001", name: "Product 1", image: "/images/product1.png", price: 166, quantity: 50, discount: 40, stock: 100 },
        { id: "pro002", name: "Product 2", image: "/images/product1.png", price: 166, quantity: 60, discount: 10, stock: 100 },
        { id: "pro003", name: "Product 3", image: "/images/product1.png", price: 166, quantity: 70, discount: 25, stock: 13 },
        { id: "pro004", name: "Product 4", image: "/images/product1.png", price: 166, quantity: 89, discount: 0, stock: 0 },
    ])

    const [orders, setOrders] = useState([
        {
            id: "1",
            total: 345,
            date: "2025-05-01",
            customer: { username: "customer1", email: "cus1@gmail.com" },
            payment: "Cash On Delivery",
            state: "Delivered",
            isChecked: false,
            products: [
                { id: "pro001", name: "Product 1", image: "/images/product1.png", price: 166, quantity: 2 },
                { id: "pro002", name: "Product 2", image: "/images/product1.png", price: 200, quantity: 1 },
            ],
        },
        {
            id: "2",
            total: 456,
            date: "2025-05-02",
            customer: { username: "customer1", email: "cus1@gmail.com" },
            payment: "Bank Transfer",
            state: "Shipped",
            isChecked: false,
            products: [
                { id: "pro001", name: "Product 1", image: "/images/product1.png", price: 166, quantity: 2 },
            ],
        }, 
        {
            id: "3",
            total: 288,
            date: "2025-05-04",
            customer: { username: "customer1", email: "cus1@gmail.com" },
            payment: "Bank Transfer",
            state: "Processing",
            isChecked: false,
            products: [
                { id: "pro001", name: "Product 3", image: "/images/product1.png", price: 189, quantity: 1 },
                { id: "pro002", name: "Product 2", image: "/images/product1.png", price: 99, quantity: 1 },

            ],
        },     
        {
            id: "4",
            total: 288,
            date: "2025-05-04",
            customer: { username: "customer1", email: "cus1@gmail.com" },
            payment: "Cash On Delivery",
            state: "Cancelled",
            isChecked: false,
            products: [
                { id: "pro001", name: "Product 3", image: "/images/product1.png", price: 189, quantity: 1 },
                { id: "pro002", name: "Product 2", image: "/images/product1.png", price: 99, quantity: 1 },

            ],
        },   
    ]);

    const handleSelectAll = () => {
        const newCheckedState = !isAllChecked;
        setIsAllChecked(newCheckedState);
        setOrders(orders.map(order => ({ ...order, isChecked: newCheckedState })));
    };

    // Hàm xử lý khi checkbox trong tbody được chọn
    const handleOrderCheck = (id) => {
        const updatedOrders = orders.map(order =>
            order.id === id ? { ...order, isChecked: !order.isChecked } : order
        );
        setOrders(updatedOrders);

        // Kiểm tra nếu tất cả các checkbox con đều được chọn
        const allChecked = updatedOrders.every(order => order.isChecked);
        setIsAllChecked(allChecked);
    };

    return (
        <div className='font-inter'>
            <div className='flex justify-between'>
                <div className='text-[#667085] border border-[#E0E2E7] rounded-md p-1 flex items-center gap-2'>
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value="all-times"
                            className="hidden peer"
                            checked={selectedOption === 'all-times'}
                            onChange={() => setSelectedOption('all-times')}
                        />
                        <span className="px-4 py-2 rounded-md cursor-pointer peer-checked:bg-[#ff8200] peer-checked:text-white">
                            All Times
                        </span>
                    </label>

                    {/* 12 Months */}
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value="12-months"
                            className="hidden peer"
                            checked={selectedOption === '12-months'}
                            onChange={() => setSelectedOption('12-months')}
                        />
                        <span className="px-4 py-2 rounded-md cursor-pointer peer-checked:bg-[#ff8200] peer-checked:text-white">
                            12 months
                        </span>
                    </label>

                    {/* 30 Days */}
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value="30-days"
                            className="hidden peer"
                            checked={selectedOption === '30-days'}
                            onChange={() => setSelectedOption('30-days')}
                        />
                        <span className="px-4 py-2 rounded-md cursor-pointer peer-checked:bg-[#ff8200] peer-checked:text-white">
                            30 days
                        </span>
                    </label>

                    {/* 7 Days */}
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value="7-days"
                            className="hidden peer"
                            checked={selectedOption === '7-days'}
                            onChange={() => setSelectedOption('7-days')}
                        />
                        <span className="px-4 py-2 rounded-md cursor-pointer peer-checked:bg-[#ff8200] peer-checked:text-white">
                            7 days
                        </span>
                    </label>

                    {/* 24 Hours */}
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value="24-hours"
                            className="hidden peer"
                            checked={selectedOption === '24-hours'}
                            onChange={() => setSelectedOption('24-hours')}
                        />
                        <span className="px-4 py-2 rounded-md cursor-pointer peer-checked:bg-[#ff8200] peer-checked:text-white">
                            24 hours
                        </span>
                    </label>
                </div>
                <div className='flex gap-3'>
                    <button className='text-[#667085] border border-[#E0E2E7] rounded-md px-4 py-2 flex items-center gap-2'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2.49984C7.5 2.0396 7.1269 1.6665 6.66667 1.6665C6.20643 1.6665 5.83333 2.0396 5.83333 2.49984H5C3.61929 2.49984 2.5 3.61913 2.5 4.99984V15.8332C2.5 17.2139 3.61929 18.3332 5 18.3332H15C16.3807 18.3332 17.5 17.2139 17.5 15.8332V4.99984C17.5 3.61913 16.3807 2.49984 15 2.49984H14.1667C14.1667 2.0396 13.7936 1.6665 13.3333 1.6665C12.8731 1.6665 12.5 2.0396 12.5 2.49984H7.5ZM15.8333 5.83317V4.99984C15.8333 4.5396 15.4602 4.1665 15 4.1665H14.1667C14.1667 4.62674 13.7936 4.99984 13.3333 4.99984C12.8731 4.99984 12.5 4.62674 12.5 4.1665H7.5C7.5 4.62674 7.1269 4.99984 6.66667 4.99984C6.20643 4.99984 5.83333 4.62674 5.83333 4.1665H5C4.53976 4.1665 4.16667 4.5396 4.16667 4.99984V5.83317H15.8333ZM4.16667 7.49984V15.8332C4.16667 16.2934 4.53976 16.6665 5 16.6665H15C15.4602 16.6665 15.8333 16.2934 15.8333 15.8332V7.49984H4.16667Z" fill="#667085" />
                        </svg>
                        Select Dates
                    </button>
                    <button className='bg-[#FBE3CA] text-[#FF8200] rounded-md px-4 py-2 flex items-center gap-2'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.0891 6.00582C12.7637 6.33126 12.236 6.33126 11.9106 6.00582L10.8332 4.92841V12.9166C10.8332 13.3768 10.4601 13.7499 9.99984 13.7499C9.5396 13.7499 9.1665 13.3768 9.1665 12.9166V4.92841L8.08909 6.00582C7.76366 6.33126 7.23602 6.33126 6.91058 6.00582C6.58514 5.68039 6.58514 5.15275 6.91058 4.82731L9.70521 2.03268C9.86793 1.86997 10.1317 1.86996 10.2945 2.03268L13.0891 4.82731C13.4145 5.15275 13.4145 5.68039 13.0891 6.00582Z" fill="#FF8200" />
                            <path d="M14.9998 7.08323C16.8408 7.08323 18.3332 8.57562 18.3332 10.4166V14.5832C18.3332 16.4242 16.8408 17.9166 14.9998 17.9166H4.99984C3.15889 17.9166 1.6665 16.4242 1.6665 14.5832V10.4166C1.6665 8.57562 3.15889 7.08323 4.99984 7.08323H6.6665C7.12674 7.08323 7.49984 7.45633 7.49984 7.91657C7.49984 8.37681 7.12674 8.7499 6.6665 8.7499H4.99984C4.07936 8.7499 3.33317 9.49609 3.33317 10.4166V14.5832C3.33317 15.5037 4.07936 16.2499 4.99984 16.2499H14.9998C15.9203 16.2499 16.6665 15.5037 16.6665 14.5832V10.4166C16.6665 9.49609 15.9203 8.7499 14.9998 8.7499H13.3332C12.8729 8.7499 12.4998 8.37681 12.4998 7.91657C12.4998 7.45633 12.8729 7.08323 13.3332 7.08323H14.9998Z" fill="#FF8200" />
                        </svg>
                        Export
                    </button>
                </div>
            </div>
            <div className='flex justify-between mt-10'>
                <div className='bg-white rounded-md shadow-md p-5 w-6/25'>
                    <div className='flex justify-between items-center rounded-full bg-[#EFEFFD] p-1 w-fit'>
                        <div className='flex items-center justify-center rounded-full bg-[#DEDEFA] p-2'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.9666 10.4475C16.3519 10.0517 16.3433 9.41859 15.9475 9.03339C15.5517 8.64819 14.9186 8.65675 14.5334 9.05253L11.2737 12.4017L9.8755 11.2809C9.44459 10.9354 8.81522 11.0047 8.46979 11.4356C8.12435 11.8666 8.19365 12.4959 8.62457 12.8414L11.0857 14.8143C11.2867 14.9754 11.5771 14.9575 11.7567 14.7729L15.9666 10.4475Z" fill="#000E8A" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7ZM18.1707 6H19C19.5523 6 20 6.44771 20 7V7.82929C19.1476 7.52801 18.472 6.85241 18.1707 6ZM16.1 6H7.89998C7.5023 7.95913 5.95913 9.5023 4 9.89998V14.1C5.95913 14.4977 7.5023 16.0409 7.89998 18H16.1C16.4977 16.0409 18.0409 14.4977 20 14.1V9.89998C18.0409 9.5023 16.4977 7.95913 16.1 6ZM20 16.1707C19.1476 16.472 18.472 17.1476 18.1707 18H19C19.5523 18 20 17.5523 20 17V16.1707ZM5.82929 18C5.52801 17.1476 4.85241 16.472 4 16.1707V17C4 17.5523 4.44772 18 5 18H5.82929ZM4 7.82929C4.85241 7.52801 5.52801 6.85241 5.82929 6H5C4.44772 6 4 6.44772 4 7V7.82929Z" fill="#000E8A" />
                            </svg>
                        </div>
                    </div>
                    <div className='flex flex-col mt-5 gap-2'>
                        <label className='text-[#667085]'>Total Revenue</label>
                        <div className='flex items-center gap-2'>
                            <label className='text-2xl font-semibold'>${totalRevenue}</label>
                            <div className={`py-1 px-2 rounded-2xl ${revenueRatio > 0 ? "bg-[#E7F4EE] text-[#0D894F]"
                                : (revenueRatio == 0 ? "bg-[#F0F1F3] text-[#667085]"
                                    : "bg-[#FEEDEC] text-[#F04438]")}`}>{revenueRatio > 0 ? "+" : ""}{revenueRatio}%</div>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-md shadow-md p-5 w-6/25'>
                    <div className='flex justify-between items-center rounded-full bg-[#E7F4EE] p-1 w-fit'>
                        <div className='flex items-center justify-center rounded-full bg-[#CFE7DC] p-2'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.638 4.12231C6.45691 3.18063 5.63292 2.5 4.67398 2.5H3C2.44772 2.5 2 2.94772 2 3.5C2 4.05228 2.44772 4.5 3 4.5L4.67398 4.5L6.55002 14.2554C6.91221 16.1388 8.56018 17.5 10.478 17.5H16.6873C18.5044 17.5 20.0932 16.2752 20.5556 14.518L21.8068 9.76348C22.3074 7.86122 20.8726 6 18.9056 6H6.99909L6.638 4.12231ZM7.38371 8L8.51403 13.8777C8.69513 14.8194 9.51911 15.5 10.478 15.5H16.6873C17.5959 15.5 18.3903 14.8876 18.6215 14.009L19.8727 9.25449C20.0395 8.62041 19.5613 8 18.9056 8H7.38371Z" fill="#0D894F" />
                                <path d="M8.74997 21.5C7.92154 21.5 7.24997 20.8284 7.24997 20C7.24997 19.1716 7.92154 18.5 8.74997 18.5C9.5784 18.5 10.25 19.1716 10.25 20C10.25 20.8284 9.5784 21.5 8.74997 21.5Z" fill="#0D894F" />
                                <path d="M17.5 21.5C16.6715 21.5 16 20.8284 16 20C16 19.1716 16.6715 18.5 17.5 18.5C18.3284 18.5 19 19.1716 19 20C19 20.8284 18.3284 21.5 17.5 21.5Z" fill="#0D894F" />
                            </svg>

                        </div>
                    </div>
                    <div className='flex flex-col mt-5 gap-2'>
                        <label className='text-[#667085]'>Total Sales</label>
                        <div className='flex items-center gap-2'>
                            <label className='text-2xl font-semibold'>${totalSales}</label>
                            <div className={`py-1 px-2 rounded-2xl ${salesRatio > 0 ? "bg-[#E7F4EE] text-[#0D894F]"
                                : (salesRatio == 0 ? "bg-[#F0F1F3] text-[#667085]"
                                    : "bg-[#FEEDEC] text-[#F04438]")}`}>{salesRatio > 0 ? "+" : ""}{salesRatio}%</div>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-md shadow-md p-5 w-6/25'>
                    <div className='flex justify-between items-center rounded-full bg-[#FEEDEC] p-1 w-fit'>
                        <div className='flex items-center justify-center rounded-full bg-[#FCDAD7] p-2'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 5C5.44772 5 5 5.44772 5 6V8C5 8.55228 4.55228 9 4 9C3.44772 9 3 8.55228 3 8V6C3 4.34315 4.34315 3 6 3H9C9.55228 3 10 3.44772 10 4C10 4.55228 9.55228 5 9 5H6Z" fill="#F04438" />
                                <path d="M18 5C18.5523 5 19 5.44772 19 6V8C19 8.55228 19.4477 9 20 9C20.5523 9 21 8.55228 21 8V6C21 4.34315 19.6569 3 18 3H15C14.4477 3 14 3.44772 14 4C14 4.55228 14.4477 5 15 5H18Z" fill="#F04438" />
                                <path d="M5 18C5 18.5523 5.44772 19 6 19H9C9.55228 19 10 19.4477 10 20C10 20.5523 9.55228 21 9 21H6C4.34315 21 3 19.6569 3 18V16C3 15.4477 3.44772 15 4 15C4.55228 15 5 15.4477 5 16V18Z" fill="#F04438" />
                                <path d="M18 19C18.5523 19 19 18.5523 19 18V16C19 15.4477 19.4477 15 20 15C20.5523 15 21 15.4477 21 16V18C21 19.6569 19.6569 21 18 21H15C14.4477 21 14 20.5523 14 20C14 19.4477 14.4477 19 15 19H18Z" fill="#F04438" />
                                <path d="M4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H4Z" fill="#F04438" />
                            </svg>

                        </div>
                    </div>
                    <div className='flex flex-col mt-5 gap-2'>
                        <label className='text-[#667085]'>Product SKU</label>
                        <div className='flex items-center gap-2'>
                            <label className='text-2xl font-semibold'>${productSKU}</label>
                            <div className={`py-1 px-2 rounded-2xl ${productSKURatio > 0 ? "bg-[#E7F4EE] text-[#0D894F]"
                                : (productSKURatio == 0 ? "bg-[#F0F1F3] text-[#667085]"
                                    : "bg-[#FEEDEC] text-[#F04438]")}`}>{productSKURatio > 0 ? "+" : ""}{productSKURatio}%</div>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-md shadow-md p-5 w-6/25'>
                    <div className='flex justify-between items-center rounded-full bg-[#FDF1E8] p-1 w-fit'>
                        <div className='flex items-center justify-center rounded-full bg-[#FAE1CF] p-2'>
                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 9.5C12.4477 9.5 12 9.94771 12 10.5C12 11.0523 12.4477 11.5 13 11.5H15C15.5523 11.5 16 11.0523 16 10.5C16 9.94771 15.5523 9.5 15 9.5H13Z" fill="#E46A11" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M18 3.5C19.1046 3.5 20 4.39543 20 5.5V15C20 16.6569 18.6569 18 17 18H3C1.34315 18 0 16.6569 0 15V3C0 1.34315 1.34315 0 3 0H15C16.6569 0 18 1.34315 18 3V3.5ZM15 2H3C2.44772 2 2 2.44772 2 3V15C2 15.5523 2.44772 16 3 16H17C17.5523 16 18 15.5523 18 15V5.5H7C6.44772 5.5 6 5.05228 6 4.5C6 3.94772 6.44772 3.5 7 3.5H16V3C16 2.44772 15.5523 2 15 2Z" fill="#E46A11" />
                            </svg>

                        </div>
                    </div>
                    <div className='flex flex-col mt-5 gap-2'>
                        <label className='text-[#667085]'>Balance</label>
                        <div className='flex items-center gap-2'>
                            <label className='text-2xl font-semibold'>${balance}</label>
                            <div className={`py-1 px-2 rounded-2xl ${balanceRatio > 0 ? "bg-[#E7F4EE] text-[#0D894F]"
                                : (balanceRatio == 0 ? "bg-[#F0F1F3] text-[#667085]"
                                    : "bg-[#FEEDEC] text-[#F04438]")}`}>{balanceRatio > 0 ? "+" : ""}{balanceRatio}%</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-5 items-stretch">
                {/* Card 1: Sales Progress */}
                <div className="flex-1 min-w-[320px] max-w-sm h-full ">
                    <SaleProgress />
                </div>

                {/* Card 2: Statistics Line Chart */}
                <div className="flex-[2] min-w-[400px] h-full ">
                    <RevenueChart />
                </div>
            </div>

            <div className='mt-5 shadow-md bg-white rounded-md py-5'>
                <div className='flex w-full justify-between items-center px-5'>
                    <div className='text-lg font-semibold'>Top Selling Product</div>
                    <button className='text-[#667085] border border-[#E0E2E7] rounded-md px-4 py-2 flex items-center gap-2'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.8333 6.66667C10.8333 7.1269 11.2064 7.5 11.6667 7.5C12.1269 7.5 12.5 7.1269 12.5 6.66667V5.83333H16.6667C17.1269 5.83333 17.5 5.46024 17.5 5C17.5 4.53976 17.1269 4.16667 16.6667 4.16667H12.5V3.33333C12.5 2.8731 12.1269 2.5 11.6667 2.5C11.2064 2.5 10.8333 2.8731 10.8333 3.33333V6.66667Z" fill="#667085" />
                            <path d="M2.5 10C2.5 9.53976 2.8731 9.16667 3.33333 9.16667H4.58333C4.81345 9.16667 5 9.35321 5 9.58333V10.4167C5 10.6468 4.81345 10.8333 4.58333 10.8333H3.33333C2.8731 10.8333 2.5 10.4602 2.5 10Z" fill="#667085" />
                            <path d="M7.5 7.5C7.03976 7.5 6.66667 7.8731 6.66667 8.33333V11.6667C6.66667 12.1269 7.03976 12.5 7.5 12.5C7.96024 12.5 8.33333 12.1269 8.33333 11.6667V10.8333H16.6667C17.1269 10.8333 17.5 10.4602 17.5 10C17.5 9.53976 17.1269 9.16667 16.6667 9.16667H8.33333V8.33333C8.33333 7.8731 7.96024 7.5 7.5 7.5Z" fill="#667085" />
                            <path d="M2.5 5C2.5 4.53976 2.8731 4.16667 3.33333 4.16667H8.75C8.98012 4.16667 9.16667 4.35321 9.16667 4.58333V5.41667C9.16667 5.64679 8.98012 5.83333 8.75 5.83333H3.33333C2.8731 5.83333 2.5 5.46024 2.5 5Z" fill="#667085" />
                            <path d="M12.5 13.3333C12.5 12.8731 12.8731 12.5 13.3333 12.5C13.7936 12.5 14.1667 12.8731 14.1667 13.3333V14.1667H16.6667C17.1269 14.1667 17.5 14.5398 17.5 15C17.5 15.4602 17.1269 15.8333 16.6667 15.8333H14.1667V16.6667C14.1667 17.1269 13.7936 17.5 13.3333 17.5C12.8731 17.5 12.5 17.1269 12.5 16.6667V13.3333Z" fill="#667085" />
                            <path d="M2.5 15C2.5 14.5398 2.8731 14.1667 3.33333 14.1667H10.4167C10.6468 14.1667 10.8333 14.3532 10.8333 14.5833V15.4167C10.8333 15.6468 10.6468 15.8333 10.4167 15.8333H3.33333C2.8731 15.8333 2.5 15.4602 2.5 15Z" fill="#667085" />
                        </svg>
                        Filters
                    </button>
                </div>
                <table className='w-full mt-5'>
                    <thead className='bg-[#F9FAFB] font-medium'>
                        <tr className='text-left text-[#344054] font-semibold py-4'>
                            <th className='py-2 px-4'>Product</th>
                            <th className='py-2 px-4'>Quantity</th>
                            <th className='py-2 px-4'>Price</th>
                            <th className='py-2 px-4'>Status</th>
                        </tr>
                    </thead>
                    <tbody className='text-[#344054] font-normal'>
                        {listBestSellingProduct.map((product, index) => (
                            <BestSellingProductItem key={index} {...product} />
                        ))}
                    </tbody>
                </table>
                {/* Pagination*/}
            </div>
            <div className='mt-5 shadow-md bg-white rounded-md py-5'>
                <div className='flex w-full justify-between items-center px-5'>
                    <div className='text-lg font-semibold'>Recent Orders</div>
                    <div className='flex gap-5'>
                        <button className='text-[#667085] border border-[#E0E2E7] rounded-md px-4 py-2 flex items-center gap-2'>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.8333 6.66667C10.8333 7.1269 11.2064 7.5 11.6667 7.5C12.1269 7.5 12.5 7.1269 12.5 6.66667V5.83333H16.6667C17.1269 5.83333 17.5 5.46024 17.5 5C17.5 4.53976 17.1269 4.16667 16.6667 4.16667H12.5V3.33333C12.5 2.8731 12.1269 2.5 11.6667 2.5C11.2064 2.5 10.8333 2.8731 10.8333 3.33333V6.66667Z" fill="#667085" />
                                <path d="M2.5 10C2.5 9.53976 2.8731 9.16667 3.33333 9.16667H4.58333C4.81345 9.16667 5 9.35321 5 9.58333V10.4167C5 10.6468 4.81345 10.8333 4.58333 10.8333H3.33333C2.8731 10.8333 2.5 10.4602 2.5 10Z" fill="#667085" />
                                <path d="M7.5 7.5C7.03976 7.5 6.66667 7.8731 6.66667 8.33333V11.6667C6.66667 12.1269 7.03976 12.5 7.5 12.5C7.96024 12.5 8.33333 12.1269 8.33333 11.6667V10.8333H16.6667C17.1269 10.8333 17.5 10.4602 17.5 10C17.5 9.53976 17.1269 9.16667 16.6667 9.16667H8.33333V8.33333C8.33333 7.8731 7.96024 7.5 7.5 7.5Z" fill="#667085" />
                                <path d="M2.5 5C2.5 4.53976 2.8731 4.16667 3.33333 4.16667H8.75C8.98012 4.16667 9.16667 4.35321 9.16667 4.58333V5.41667C9.16667 5.64679 8.98012 5.83333 8.75 5.83333H3.33333C2.8731 5.83333 2.5 5.46024 2.5 5Z" fill="#667085" />
                                <path d="M12.5 13.3333C12.5 12.8731 12.8731 12.5 13.3333 12.5C13.7936 12.5 14.1667 12.8731 14.1667 13.3333V14.1667H16.6667C17.1269 14.1667 17.5 14.5398 17.5 15C17.5 15.4602 17.1269 15.8333 16.6667 15.8333H14.1667V16.6667C14.1667 17.1269 13.7936 17.5 13.3333 17.5C12.8731 17.5 12.5 17.1269 12.5 16.6667V13.3333Z" fill="#667085" />
                                <path d="M2.5 15C2.5 14.5398 2.8731 14.1667 3.33333 14.1667H10.4167C10.6468 14.1667 10.8333 14.3532 10.8333 14.5833V15.4167C10.8333 15.6468 10.6468 15.8333 10.4167 15.8333H3.33333C2.8731 15.8333 2.5 15.4602 2.5 15Z" fill="#667085" />
                            </svg>
                            Filters
                        </button>
                        <button className='bg-[#ff8200] rounded-md text-white px-4 py-2'>See more</button>
                    </div>

                </div>
                <table className='w-full mt-5'>
                    <thead className='bg-[#F9FAFB] font-medium'>
                        <tr className='text-left text-[#344054] font-semibold '>
                            <th>
                                <input
                                    type='checkbox'
                                    className='w-5 h-5 accent-[#ff8200] ml-5'
                                    checked={isAllChecked}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className='py-2 px-4'>OrderID</th>
                            <th className='py-2 px-4'>Product</th>
                            <th className='py-2 px-4'>Date</th>
                            <th className='py-2 px-4'>Customers</th>
                            <th className='py-2 px-4'>Total</th>
                            <th className='py-2 px-4'>Payment</th>
                            <th className='py-2 px-4'>State</th>
                            <th className='py-2 px-4'>Action</th>


                        </tr>
                    </thead>
                    <tbody className='text-[#344054] font-normal'>
                        {orders.map((order) => (
                            <AdminOrderItem
                                key={order.id}
                                order={order}
                                onCheck={() => handleOrderCheck(order.id)} />
                        ))}
                    </tbody>
                </table>
                {/* Pagination*/}
            </div>
        </div>
    )
}
