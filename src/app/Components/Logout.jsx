'use client'


import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { homeUrl } from '../Utils/variables';

export default function Logout(){


    const navigate = useRouter();

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate.push(`${homeUrl}login`);
    };
  
    return <button onClick={handleLogout}>Logout</button>;
  };





