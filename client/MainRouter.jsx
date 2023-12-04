
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './core/Home' 
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Signin from './lib/Signin.jsx'
import Profile from './user/Profile.jsx'
import Switch from 'react'
import PrivateRoute from './lib/PrivateRoute.jsx'
import EditProfile from './user/EditProfile.jsx'
import Menu from './core/Menu' 
import Parts from './part/Parts.jsx';
import CreatePart from './part/CreatePart.jsx';
import MyParts from './part/MyParts.jsx';
import EditPart from './part/EditPart.jsx';
import Part from './part/Part.jsx';
import PartResponses from './part/PartResponses.jsx';

function MainRouter() {
    return (
        <div>
            <Menu/>
             
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/parts" element={<Parts />} />
                <Route path="/part/:partId" element={<Part />} />
                <Route path="/responses/:partId" element={<PartResponses />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/user/:userId" element={<Profile />} />
                <Route path="/user/edit/:userId"
                       element={
                           <PrivateRoute>
                               <EditProfile />
                           </PrivateRoute>
                       }/>
                <Route path="/createpart" 
                       element={
                           <PrivateRoute>
                               <CreatePart />
                           </PrivateRoute>
                       } />
                <Route path="/myparts" 
                       element={
                           <PrivateRoute>
                               <MyParts />
                           </PrivateRoute>
                       } />

                <Route path="/part/edit/:partId"
                          element={
                            <PrivateRoute>
                                 <EditPart />
                            </PrivateRoute>
                          } />
                
            </Routes>
        </div>
    );
}

export default MainRouter;
