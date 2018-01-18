import {  Redirect } from 'react-router-dom'
import React from 'react'
import HomeCmp from '../pages/home/HomeCmp';

export const routes = [
                        { path: '/',
                          exact: true,
                          main: () => <Redirect to="/home"/>,
                        },
                        { path: '/home',
                          exact:true,
                          main: HomeCmp,
                        }
                      ]
