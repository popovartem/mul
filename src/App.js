import React, { Component} from 'react';
import './App.css';
import Konva from 'konva';
import { Stage, Layer, Text, Rect, Line, Group} from 'react-konva';
import Calendar from './calendar.js';


export default class App extends Component {

    constructor() {
        super();
        this.state = {
            actions: [
                        {
                            transaction_id:"19435",
                            order_line_name: "Иркутск_КС_БАЙКАЛСИ",
                            transaction_type_id: 1, //Исходящий звонок по тел
                            transaction_status_id: 1,
                            task: "Предложить оспаривание КС", 
                            result: "", 
                            plan_date_time: "2020-02-11 11:50:00", 
                            plan_duration: "00:10:00",
                            x0: 0,
                            y0: 0,
                            width: 100,
                            height: 20

                        },
                        {
                            transaction_id:"19436",
                            order_line_name: "Ангарск_КС_Ширшов",
                            transaction_type_id: 4, //Исходящий email
                            transaction_status_id: 1,
                            task: "Составить и выслать договор на оценку", 
                            result: "", 
                            plan_date_time: "2020-02-12 15:50:00", 
                            plan_duration: "00:20:00",
                            x0: 0,
                            y0: 0,
                            width: 100,
                            height: 20
                        },
                        {
                            transaction_id:"19437",
                            order_line_name: "ВТБ_Нитрон",
                            transaction_type: 16, //Встреча
                            transaction_status_id: 1,
                            task: "Узнать, состоялся ли осмотр объекта оценки", 
                            result: "", 
                            plan_date_time: "2020-02-14 14:10:00", 
                            plan_duration: "00:05:00",
                            x0: 0,
                            y0: 0,
                            width: 100,
                            height: 20
                        }
              ],
              calendar: {
                            days_number: 7, 
                            input_date_time: '2020-10-02 01:30:20', 
                            start_time :'09:00', 
                            end_time :'18:00', 
                            time_step: 10,
                            schedule_row_height: 20,
                            schedule_time_column_width_px: 60,
                            date: ""
                            
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
        this.transform_action_movement_to_date_time = this.transform_action_movement_to_date_time.bind(this);
        this.transform_action_date_time_to_X = this.transform_action_date_time_to_X.bind(this);
        this.transform_action_date_time_to_Y = this.transform_action_date_time_to_Y.bind(this);
        
        this.state.calendar.date = new Date();
        console.log(this.state.calendar);
        
        
    }

    componentDidMount() {
        this.checkSize();
        // here we should add listener for "container" resize
        // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
        // for simplicity I will just listen window resize
        window.addEventListener("resize", this.checkSize);
        
        //this.calculate_actions_labels_width_height();

    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkSize);
    }

    //calculate_actions_labels_width_height = () =>
    //{
    //    this.state.actions.map((action) => {action.x0 = this. })
    //}

    checkSize = () => {
        const new_width = window.innerWidth;
        const new_height = window.innerHeight;

        const menu = this.state.menu.map((item, i) => {return {...item, x0: 10 + i*((new_width-6*10)/5+10), width: (new_width-6*10)/5}}); 

        this.state.screen.width = new_width;
        this.state.screen.height = new_height;
        console.log('from checkSize this.state.screen:', this.state.screen);
               
        this.setState({menu});
        //this.calen.set_screen_size(this.state.screen);
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

    handleDragMove= (e, id) => {
        console.log('handleDragStart:', id);

        const actions = this.state.actions.map(item => (item.id !== id) ? 
        item : { ...item, plan_date_time: this.transform_action_movement_to_date_time(id, 
                                                                                 e.target.x(), 
                                                                                 e.target.y())
                }); 
                
        this.setState({actions});
        console.log('onMenuOut:', this.state);
    


    }

    transform_action_movement_to_date_time=(action_id, x, y)=>{

        var str_action_date_time = "2020-02-13 10:00:00";

        return str_action_date_time;
    }

    transform_action_date_time_to_X = (action_id)=>{
    
        var  x = 0;
        return x;

    }

    transform_action_date_time_to_Y = (action_id)=>{
    
        var  y = 0;
        return y;
    }


    

    render() {

        const { onMenuClick, onMenuOver, onMenuOut } = this;
        const { menu, screen, calendar, actions } = this.state;
        //onst calendar_input_props = [...this.state.calendar];
        //const screen_input_props =  [...this.state.screen];
        //console.log('calendar_input_props', calendar_input_props);
        //console.log('screen_input_props', screen_input_props);   
        //Object.assign({}, item, { location: response });     
        console.log('{[{...calendar}, {...screen}]}', [{...calendar}, {...screen}]);   
        
        
        

        return (
            <Stage width={screen.width} height={screen.height}>
             
            
             <Layer>
                {menu_blocks(menu, (e, txt) => onMenuClick(e, txt), (e, txt) => onMenuOver(e, txt), (e, txt) => onMenuOut(e, txt))}
             </Layer>
             <Layer y={20 * 2}>
                <Calendar props = {this.state}/>
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
                callingfunction={funk1}
                callingfunction2={funk2}
                callingfunction3={funk3}
                 /> 
              
            )

 const actions_labels = (actions, in_x0, in_y0, in_w, in_h, click_funk, mouse_over_func, mouse_out_func)=>actions.map(action =>
                <MenuBlock key={action.id} 
                    m_id = {action.id} 
                    x0={in_x0} 
                    y0 = {in_y0} 
                    base_color = {"#07889B"}
                    w={in_w}
                    h= {in_h}
                    title ={action.task}
                    calling_function_click={click_funk}
                    calling_function_mouse_over={mouse_over_func}
                    calling_function_mouse_out={mouse_out_func}
                     /> 
                  
                    )

const ActionLabel = ({m_id, x0, y0, w, h, base_color, shadow, title, callingfunction, callingfunction2, callingfunction3}) =>(
    
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





    
