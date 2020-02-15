import React, { Component } from 'react';
import './App.css';
import * as date_time_utility from './date_time_utility.js';
import Konva from 'konva';
import { Stage, Layer, Text, Rect, Line, Group} from 'react-konva';
import Calendar, {get_schedule_height_px} from './calendar.js';


export default class App extends Component {

    

    constructor() {
        super();
        this.state = {
            tasks: [
                {name:"Learn Angular",category:"plan", bgcolor: "yellow", x0: "100px", y0: "100px"},
                {name:"React", category:"plan", bgcolor:"pink", x0: "200px", y0: "200px"},
                {name:"Vue", category:"plan", bgcolor:"skyblue", x0: "300px", y0: "300px"}
              ],
              calendar: {
                            days_number: 7, 
                            input_date_time: '2020-10-02 01:30:20', 
                            start_time :'09:00', 
                            end_time :'18:00', 
                            time_step: 10,
                            schedule_row_height_px: 20,
                            schedule_time_column_width_px: 60
                            
                        },
            menu:   [
                {id: 0, title:"ЕЖЕДНЕВНИК", color: "#EEAA7B", x0: 10, y0: 0, width: 100, height: 30, shadow: 0},
                {id: 1, title:"ДЕРЕВО ЦЕЛЕЙ", color:"#EEAA7B", x0: 120, y0: 0, width: 100, height: 30, shadow: 0},
                {id: 2, title:"ЦЕЛЬ", color:"#EEAA7B", x0: 230, y0: 0, width: 100, height: 30, shadow: 0},
                {id: 3, title:"ПОИСК", color:"#EEAA7B", x0: 340, y0: 0, width: 100, height: 30, shadow: 0},
                {id: 4, title:"ТАЙМЕР", color:"#EEAA7B", x0: 450, y0: 0, width: 100, height: 30, shadow: 0}
              ],
              screen:{
                  width:200,
                  height:200
              }  
                   
            
          };

          this.onMenuClick = this.onMenuClick.bind(this);
          this.onMenuOver = this.onMenuOver.bind(this);
          this.onMenuOut = this.onMenuOut.bind(this);
    }

    componentDidMount() {
        this.checkSize();
        // here we should add listener for "container" resize
        // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
        // for simplicity I will just listen window resize
        window.addEventListener("resize", this.checkSize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkSize);
    }

    checkSize = () => {
        const new_width = window.innerWidth;
        const new_height = window.innerHeight;

        const menu = this.state.menu.map((item, i) => {return {...item, x0: 10 + i*((new_width-6*10)/5+10), width: (new_width-6*10)/5}}); 

        this.state.screen.width = new_width;
        this.state.screen.height = get_schedule_height_px(this.state.calendar);
               
        this.setState({menu});
      };

    onMenuClick = (e, txt) => {
        console.log('onMenuClick:', txt);
        console.log('onMenuClick:', this.state.menu[1]);

    }

    onMenuOver = (e, id) => {
        console.log('onMenuOver:', id);

        const menu = this.state.menu.map(item => (item.id !== id) ? item : { ...item, color: "#E37222", shadow: 5}); 
                
        this.setState({menu});
        console.log('onMenuOver:', this.state);
    }

          
    onMenuOut = (e, id) => {
        console.log('onMenuOut:', id);

        const menu = this.state.menu.map(item => (item.id !== id) ? item : { ...item, color: "#EEAA7B", shadow: 0}); 
        this.setState({menu});
        console.log('onMenuOut:', this.state);
    


    }

    

    render() {

        const { onMenuClick, onMenuOver, onMenuOut } = this;
        const { menu, calendar, screen } = this.state;
        

        return (
            <Stage width={screen.width} height={screen.height}>
             
             
             <Layer>
                {Calendar(calendar)}
             </Layer>
             <Layer>
                {menu_blocks(menu, (e, txt) => onMenuClick(e, txt), (e, txt) => onMenuOver(e, txt), (e, txt) => onMenuOut(e, txt))}
             </Layer>
             
             
            </Stage>
        );
    }
}

//Рисуем пункты меню
const menu_blocks = (menu, funk1, funk2, funk3)=>menu.map(menu_block =>
            <MenuBlock key={menu_block.id} m_id = {menu_block.id} x0={menu_block.x0} y0 = {menu_block.y0} 
                base_color = {menu_block.color}
                w={menu_block.width}
                h= {menu_block.height}
                shadow = {menu_block.shadow}
                title ={menu_block.title}
                //callingfunction={(e, txt) => onMenuClick(e, txt)}
                //callingfunction2={(e, txt) => onMenuOver(e, txt)}
                //callingfunction3={(e, txt) => onMenuOut(e, txt)}
                callingfunction={funk1}
                callingfunction2={funk2}
                callingfunction3={funk3}
                 /> 
              
            )
 
 const MenuBlock = ({m_id, x0, y0, w, h, base_color, shadow, title, callingfunction, callingfunction2, callingfunction3}) =>(
    
    <Group id = {m_id} 
    onClick={ (e) => callingfunction(e, m_id)}
    onMouseOver={ (e) => callingfunction2(e, m_id)}
    onMouseOut={ (e) => callingfunction3(e, m_id)}>
    <Rect 
        id = {m_id}
        x={x0}
        y={y0}
        width={w}
        height={h}
        fill={base_color}
        
        shadowBlur = {shadow}
        cornerRadius ={3}
            
    />
    <Text 
        x={x0}
        y={y0} 
        width = {w}
        height={h}
        fontSize={12}
        fontFamily='Calibri' 
        fill='white'
        align = 'center' 
        verticalAlign = 'middle' 
        text={title}
    />
    </Group>
    
       
    );

//Рисуем  КАЛЕНДАРЬ


    
