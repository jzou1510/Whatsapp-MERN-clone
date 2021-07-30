import React from 'react'
import "./Sidebar.css";
import SidebarChat from './SidebarChat';
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import {Avatar, IconButton} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

function Sidebar() {
    return ( 
        <div className="sidebar">
            <div className="sidebar__header">
                    <Avatar src="https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2019/11/Stella-F1-2.jpg"/>
                <div className="sidebar__headerRight">
                    {/*IconButton makes button clickable*/}
                    <IconButton> 
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton> 
                        <ChatIcon />
                    </IconButton>
                    <IconButton> 
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    );
}

export default Sidebar
