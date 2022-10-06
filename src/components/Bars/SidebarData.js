import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as ImUser from "react-icons/im";
import * as FaBus from "react-icons/fa";
import * as FaUserPlus from "react-icons/fa";
import * as AiFillSchedule from "react-icons/ai";
import * as MdPlace from "react-icons/md";
import * as GiJourney from "react-icons/gi";
// import * as TiMessages from "react-icons/ti";
import * as AiFillCreditCard from "react-icons/ai";
import * as TiMessages from "react-icons/ti";
import * as RiAdminFill from "react-icons/ri";
import { useState } from 'react';
// import * as GiJourney from "react-icons/gi";


export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Users',
    path: '/users',
    icon: <ImUser.ImUser />,
    cName: 'nav-text'
  },
  {
    title: 'Cards',
    path: '/useracount',
    icon: <AiFillCreditCard.AiFillCreditCard />,
    cName: 'nav-text'

  },
  {
    title: 'Users Journey',
    path: '/userjourney',
    icon: <GiJourney.GiJourney />,
    cName: 'nav-text'
  },

  {
    title: 'User Queries',
    path: '/userqueries',
    icon: < TiMessages.TiMessages />,
    cName: 'nav-text'
  },
  {
    title: 'Stops',
    path: '/stops',
    icon: < MdPlace.MdPlace />,
    cName: 'nav-text'
  },
  {
    title: 'Admins',
    path: '/admins',
    icon: <RiAdminFill.RiAdminFill />,
    cName: 'nav-text'
  },
  {
    title: 'Add new Admin',
    path: '/signup',
    icon: <FaUserPlus.FaUserPlus />,
    cName: 'nav-text'
  },


];
