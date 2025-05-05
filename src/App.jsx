import { Route, Routes } from 'react-router-dom'
import './css/App.css';
import './css/Responsive.css';

import AuthLayout from './Components/Auth-Layout/AuthLayout';
import { DefaultLayout, HomeLayout } from './Components/Default-Layout/DefaultLayout';
import Dashboard from './Pages/Dashboard/Dashboard'
import DataCatalog from './Pages/Data-Catalog/DataCatalog';
import Database from './Pages/Database/Database';
import TableList from './Pages/TableList/TableList';
import TableDetails from './Pages/Table-Details/TableDetails';
import UserManagement from './Pages/User-Management/UserManagement';
import AddMember from './Pages/User-Management/AddMember';
import CloudResource from './Pages/CloudResource/CloudResource';
import VPC from './Pages/CloudResource/VPC/VPC';
import ResourcesIAM from './Pages/CloudResource/ResourcesIAM/ResourcesIAM';
import CredentialConfigure from './Pages/CloudResource/CredentialConfigure/CredentialConfigure';
import AddVPC from './Pages/CloudResource/VPC/AddVPC';
import AddResourcesIAM from './Pages/CloudResource/ResourcesIAM/AddResourcesIAM';
import AddCredentialConfigure from './Pages/CloudResource/CredentialConfigure/AddCredentialConfigure';

import SigUp from './Pages/SignUp/SignUp';
import SigIn from './Pages/SignIn/SignIn';
import CreateProfile from './Pages/Create-Profile/CreateProfile';

import './css/WebPage.css';
import WebLayout from './Components/WebPage-Layout/WebLayout';
import Home from './Pages/Home/Home';
import EditResourcesIAM from './Pages/CloudResource/ResourcesIAM/EditResourcesIAM';
import EditVPC from './Pages/CloudResource/VPC/EditVPC';
import EditCredentialConfigure from './Pages/CloudResource/CredentialConfigure/EditCredentialConfigure';
import Contactus from './Pages/Contactus/Contactus';
import CreateDataSource from './Pages/Data-Catalog/CreateDataSource';
import Additional from './Pages/Data-Catalog/Additional';
import Credential from './Pages/Data-Catalog/Credential';
import LandingPage from './Pages/LandingPage/LandingPage';
import Cluster from './Components/Cluster/Cluster';
import AddCluster from './Components/Cluster/AddCluster';
import Subscription from './Pages/Subscription/Subscription';
import Family from './Pages/Family/Family';
import AddFamily from './Pages/Family/AddFamily';
import Organization from './Pages/Organization/Organization';
import AddOrganization from './Pages/Organization/AddOrganization';
import OrganizationDash from './Pages/Organization/OrganizationDash';
import Home2 from './Pages/Home/NewHome';
import { NewDefaultLayout } from './Components/Default-Layout/NewDefaultLayout';
import NewHome from './Pages/Home/NewHome';
import Billing from './Pages/Billing/Billing';
import SubscriptionList from './Pages/Subscription/SubscriptionList';
import EditSubscription from './Pages/Subscription/EditSubscription';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Setting from './Pages/Setting/Setting';
import EditOrganization from './Pages/Organization/EditOrganization';
import EditFamily from './Pages/Family/EditFamily';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import Blog from './Pages/Blog/Blog';
import BlogDetail from './Pages/Blog/BlogDetail';
import ClusterDetails from './Components/Cluster/ClusterDetails';

function App() {

    const [openCloudOption, setOpenCloudOption] = useState(() => {
        return JSON.parse(localStorage.getItem("openCloudOption")) || false;
    });
    // const openCloudOption = JSON.parse(localStorage.getItem("openCloudOption"));

    // useEffect(() => {
    //     toast.warn(openCloudOption);
    // }, [openCloudOption])


    // useEffect(() => {
    //     // Watch localStorage for changes and update state accordingly
    //     const handleStorageChange = () => {
    //         const newCloudOption = JSON.parse(localStorage.getItem("openCloudOption"));
    //         setOpenCloudOption(newCloudOption);
    //     };

    //     // Add event listener for storage changes
    //     window.addEventListener('storage', handleStorageChange);

    //     // Cleanup listener on unmount
    //     return () => {
    //         window.removeEventListener('storage', handleStorageChange);
    //     };
    // }, [openCloudOption]);

    return (
        <>

            <Routes>
                {/* Web-Page */}
                <Route element={<WebLayout />}>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/blog' element={<Blog />} />

                    <Route path='/blog/what-is-data-management' element={<BlogDetail />} />
                </Route>

                <Route path='/privacy-policy' element={<PrivacyPolicy />} />

                {/* Admin */}
                <Route element={<AuthLayout />}>
                    {/* SigIn */}
                    <Route path='/sign-in' element={<SigIn />} />
                    {/* SigUp */}
                    <Route path='/sign-up' element={<SigUp />} />

                    {/* Create-Profile */}
                    <Route path='/create-profile' element={<CreateProfile />} />

                    {/* Subscription */}
                    <Route path='/subscription' element={<Subscription />} />

                    {/* Billing */}
                    <Route path='/billing' element={<Billing />} />

                </Route>


                <Route element={<DefaultLayout />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    {/* <Route path={`${openCloudOption === true ? '/home2' : '/home'}`} element={openCloudOption === true ? <Home /> : <NewHome />} /> */}

                    <Route path={`/home`} element={<NewHome />} />
                    <Route path={`/home2`} element={<Home />} />


                    <Route path='/family' element={<Family />} />
                    <Route path='/add-family' element={<AddFamily />} />
                    <Route path='/edit-family' element={<EditFamily />} />

                    <Route path='/organization' element={<Organization />} />
                    <Route path='/organization-dash/:id' element={<OrganizationDash />} />
                    <Route path='/add-organization' element={<AddOrganization />} />
                    <Route path='/edit-organization' element={<EditOrganization />} />

                    {/* <Route path='/cloud-resource' element={<CloudResource />} /> */}
                    <Route path='/vpc' element={<VPC />} />
                    <Route path='/add-vpc' element={<AddVPC />} />
                    <Route path='/edit-vpc' element={<EditVPC />} />

                    <Route path='/resourcesIAM' element={<ResourcesIAM />} />
                    <Route path='/add-resourcesIAM' element={<AddResourcesIAM />} />
                    <Route path='/edit-resourcesIAM' element={<EditResourcesIAM />} />

                    <Route path='/credential-configure' element={<CredentialConfigure />} />
                    <Route path='/add-credential-configure' element={<AddCredentialConfigure />} />
                    <Route path='/edit-credential-configure' element={<EditCredentialConfigure />} />

                    <Route path='/data-catalog' element={<DataCatalog />} />
                    <Route path='/create-data-source' element={<CreateDataSource />} />
                    <Route path='/additional' element={<Additional />} />
                    <Route path='/credential' element={<Credential />} />

                    <Route path='/database' element={<Database />} />
                    <Route path='/table-list' element={<TableList />} />
                    <Route path='/table-details' element={<TableDetails />} />

                    <Route path='/user-management' element={<UserManagement />} />
                    <Route path='/add-member' element={<AddMember />} />

                    <Route path='/cluster' element={<Cluster />} />
                    <Route path='/add-cluster' element={<AddCluster />} />
                    <Route path='/cluster-details' element={<ClusterDetails />} />

                    <Route path='/contact-us' element={<Contactus />} />

                    <Route path='/setting' element={<Setting />} />


                    <Route path='/subscription-list' element={<SubscriptionList />} />
                    <Route path='/subscription-upgrade' element={<EditSubscription />} />

                </Route>



                {/* <Route element={<NewDefaultLayout />}>
                    <Route path='/new/home' element={<Home />} />

                    <Route path='/new/family' element={<Family />} />
                    <Route path='/new/add-family' element={<AddFamily />} />

                    <Route path='/new/organization' element={<Organization />} />
                    <Route path='/new/organization-dash' element={<OrganizationDash />} />
                    <Route path='/new/add-organization' element={<AddOrganization />} />
                </Route> */}
            </Routes>

        </>
    )
}

export default App;
