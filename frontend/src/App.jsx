import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './HomePage.jsx/layout'
import Section1 from './HomePage.jsx/section1'
import AdminPage1 from './Admin/AdminPage'
import AdminLayout from './Admin/AdminLayout'
import Riders from './Manager/Riders'
import UnassignedOrders from './Manager/UnassignedOrders'
import UnapprovedUsers from './Manager/UnapprovedUsers'
import Users from './Manager/Users'
import Orders from './Manager/Orders'
import WarehouseScanner from './Manager/WarehouseScanner'
import OrdersAtWarehouse from './Manager/OrdersAtWarehouse'
import CancelManagement from './Manager/CancelManagement'
import DeliveryManagement from './Manager/DeliveryManagement'
import InvoiceReport from './Manager/InvoiceReport'
import OrderForm from './HomePage.jsx/OrderForm'
import RiderPage from './Rider.jsx/RiderPage'
import RiderLayout from './Rider.jsx/RiderLayout'
import RiderAssignedOrders from './Rider.jsx/AssignedOrders'
import RiderScanOrders from './Rider.jsx/RiderScanOrders'
import OrdersWithRider from './Rider.jsx/OrdersWithRider'
import TrackingId from './trackingId/trackingId'
import Signup from './Auth/signup'
import Login from './Auth/login'
import ContactUs from './HomePage.jsx/contactUs'
import AboutUs from './HomePage.jsx/aboutUs'
import RidersDetails from './Manager/riders-details'
import UsersDetail from './Manager/users-details'
import OrdersCancelledByVendor from './Manager/vendor-cancelled'
import Delivery from './Rider.jsx/delivery'
import Return from './Rider.jsx/return'
import Accounts from './Admin/Accounts'
import AccountantAccounts from './Accountant/Accounts'
import VendorsManagement from './Manager/VendorsManagement'
import VendorPage from './HomePage.jsx/vendor-page'
import VendorDetails from './Manager/vendors-details'
import FormLoader from './HomePage.jsx/loader'
import RidersDeleted from './Manager/deleted-riders'
import AccountsLayout from './Accountant/AccountsLayout'
import EmployeManagement from './Admin/EmployeManagement'
import ManagerLayout from './Manager/ManagerLayout'

function App() {
  return (
    <Routes>
      {/* ------------User Routes----------------------------- */}
      <Route path='/form-loader' element={<FormLoader />} />
      <Route path='/' element={<Layout />}>
        <Route path='home' element={<Section1 />} />
        <Route index element={<Section1 />} />
        <Route path='/order-form' element={<OrderForm />} />
        <Route path='/vendor-page' element={<VendorPage />} />
        <Route path='/tracking-id' element={<TrackingId />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/about-us' element={<AboutUs />} />
      </Route>

      {/* -------------Admin Routes--------------------------- */}
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<AdminPage1 />} />
        {/* <Route path='riders' element={<Riders />} />
        <Route path='deleted-riders' element={<RidersDeleted />} />
        <Route path='vendors-management' element={<VendorsManagement />} />
        <Route path='vendors-management/:vid/:vendorName' element={<VendorDetails />} />
        <Route path='riders/:rid' element={<RidersDetails />} />
        <Route path='unassigned-orders' element={<UnassignedOrders />} />
        <Route path='unapproved-users' element={<UnapprovedUsers />} />
        <Route path='vandor-cancelled' element={<OrdersCancelledByVendor />} />
        <Route path='users' element={<Users />} />
        <Route path='users/:uid' element={<UsersDetail />} />
        <Route path='orders' element={<Orders />} />
        <Route path='warehouse-scanner' element={<WarehouseScanner />} />
        <Route path='order-at-warehouse' element={<OrdersAtWarehouse />} />
        <Route path='cancel-management' element={<CancelManagement />} />
        <Route path='return-management' element={<DeliveryManagement />} />
        <Route path='invoice-report' element={<InvoiceReport />} />
        <Route path='accounts' element={<Accounts />} /> */}
        <Route path='employe-management' element={<EmployeManagement />} />
      </Route>

      {/* -------------Accountant Routes--------------------------- */}
      <Route path='/Accountant' element={<AccountsLayout />}>
        <Route index element={<AccountantAccounts />} />
      </Route>


      {/* -------------Manager Routes--------------------------- */}
      <Route path='/Manager' element={<ManagerLayout />}>
        <Route index element={<UnassignedOrders />} />
        <Route path='riders' element={<Riders />} />
        <Route path='deleted-riders' element={<RidersDeleted />} />
        <Route path='vendors-management' element={<VendorsManagement />} />
        <Route path='vendors-management/:vid/:vendorName' element={<VendorDetails />} />
        <Route path='riders/:rid' element={<RidersDetails />} />
        <Route path='unapproved-users' element={<UnapprovedUsers />} />
        <Route path='vandor-cancelled' element={<OrdersCancelledByVendor />} />
        <Route path='users' element={<Users />} />
        <Route path='users/:uid' element={<UsersDetail />} />
        <Route path='orders' element={<Orders />} />
        <Route path='warehouse-scanner' element={<WarehouseScanner />} />
        <Route path='order-at-warehouse' element={<OrdersAtWarehouse />} />
        <Route path='cancel-management' element={<CancelManagement />} />
        <Route path='return-management' element={<DeliveryManagement />} />
        <Route path='invoice-report' element={<InvoiceReport />} />
        <Route path='accounts' element={<Accounts />} />
      </Route>

      {/* --------------Rider Routes------------------------------------- */}
      <Route path='/rider' element={<RiderLayout />}>
        <Route index element={<RiderPage />} />
        <Route path='orders-with-rider' element={<OrdersWithRider />} />

        <Route path='delivery' element={<Delivery />} />
        <Route path='return' element={<Return />} />

        <Route path='assigned-orders' element={<RiderAssignedOrders />} />
        <Route path='scan-orders' element={<RiderScanOrders />} />
      </Route>

      {/* ----------------Auth-------------------------------------------- */}
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App