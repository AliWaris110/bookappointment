import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DropDown from '../dropdown/dropdown'
import Themes from '../themes/themes'
import { logout } from '../../../redux-store/actions/auth'
import './topnav.css'
import notifications from '../../assets/JsonData/notification.json'
import { Link,Redirect } from 'react-router-dom'
import user_image from '../../assets/images/user_profile.png'
import user_menu from '../../assets/JsonData/user_menus.json'

const curr_user = {
  display_name: 'Decoder',
  image: user_image,
}

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
)

const renderUserToggle = (user) => (
  
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user.image} alt="user-profile" />
    </div>
    <div className="topnav__right-user__name">{user.display_name}</div>
  </div>
)



const TopNav = () => {
  
  const { user:currentUser,isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  

  useEffect(() => {
   curr_user.display_name=currentUser.user.firstName;
  }, [currentUser])

  const renderLogout=(url,content)=>{
    if( content==='Profile'){
     <Redirect to={url}/>
    }
    else if(content==='Logout'){
      dispatch(logout());

    }
  }
  const renderUserMenu = (item, index) => (
   
    <Link to={item.url} key={index}
    onClick={()=>renderLogout(item.url,item.content)}
    >
      
      <div className="notification-item">
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
  
    </Link>
  )
  return (
    <div className="topnav">
      <div className="topnav__search">
        <input type="text" placeholder="Search" />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/*** dropdown here */}
          <DropDown
            customToggle={() =>renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav__right-item">
          {/*** dropdown here*/}
          <DropDown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/admin/dashboard">View All</Link>}
          />
        </div>
        <div className="topnav__right-item">
          {/*** Theme settings */}
          <Themes/>
         
        </div>
      </div>
    </div>
  )
}

export default TopNav
