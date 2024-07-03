import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { CBadge, CNavLink, CSidebarNav } from '@coreui/react'
import { Client, Feature } from 'htmljs-code'

export const AppSidebarNav = () => {
  const navLink = (name, icon, badge, indent = false) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
          )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item) => {
    const { component, name, badge, icon, ...rest } = item
    return (
      <div key={item.Id} className="nav-item">
        <a className="nav-link" href={"#/" + item.Name}><i className={item.Icon}></i>{item.Name}</a>
      </div>
    )
  }

  const navGroup = (item, index) => {
    const { component, name, icon, items, to, ...rest } = item
    const Component = component
    return (
      <Component compact as="div" key={index} toggler={navLink(name, icon)} {...rest}>
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index, true),
        )}
      </Component>
    )
  }


  const dispatch = useDispatch()
  const features = useSelector((state) => state.features)
  useEffect(() => {
    async function fetchData() {
      let fes = await Client.Instance.SubmitAsync({
        Url: `/api/feature/getMenu`,
        IsRawString: true,
        Method: "GET"
      });
      dispatch({ type: 'set', features: fes })
    }
    fetchData();
  }, [])

  return (
    <CSidebarNav as={SimpleBar}>
      {features &&
        features.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </CSidebarNav>
  )
}
