import React, { Component } from 'react';
import './App.css';
import './App.js';
import  {timeConvert, week_dates, get_date_of_nearest_monday}  from './dtu.js';
import Konva from 'konva';
import { Stage, Layer, Text, Rect, Line, Group} from 'react-konva';


export default class Calendar extends Component{

    constructor (props)
    {
        
            super(props);
            console.log('calendar props', props);
                        
            //console.log('this.props.props.calendar', props.props.calendar);
            
                      
            this.state = {
                actions: this.props.props.actions,
                start_hrs: props.props.calendar.start_time.substring(0, 2),
                start_mins: props.props.calendar.start_time.substring(3),
                end_hrs: props.props.calendar.end_time.substring(0, 2),
                end_mins: props.props.calendar.end_time.substring(3),
                sch_time_column_width_px: props.props.calendar.schedule_time_column_width_px,
                time_step_min: props.props.calendar.time_step,
                sch_row_height: props.props.calendar.schedule_row_height,
                days_num: props.props.calendar.days_number,
                some_date: props.props.calendar.date,
                screen: {
                    width: props.props.screen.width, 
                    height: props.props.screen.height
               }
               
            }
            
     
            console.log('calendar this.state.actions', this.state.actions);
            
            
            console.log('calendar this.state', this.state);
        
 
        

        this.state.all_minites_in_day_schedule = Number(this.state.end_hrs) * 60 + Number(this.state.end_mins) - 
                                           Number(this.state.start_hrs) * 60 - Number(this.state.start_mins);
    
        this.state.free_time_labels_row_number = this.state.all_minites_in_day_schedule / this.state.time_step_min;
        console.log('sch_row_height', this.state.sch_row_height);
        console.log('free_time_labels_row_number', this.state.free_time_labels_row_number);

        this.state.sch_height = this.state.sch_row_height * (this.state.free_time_labels_row_number + 2);
        //this.sch_height = 2*3;
        console.log('sch_row_height', this.state.sch_row_height);
        console.log('sch_height', this.state.sch_height);

        
        console.log('screen', this.state.screen);

        this.state.sch_day_column_width_px = (this.state.screen.width - this.state.sch_time_column_width_px) / this.state.days_num;

    
        //Рассчитываем временной масштаб: сколько пикселей соответствует одной минуте  
        //(для расчета положения меток Действий по вертикали)
        this.state.time_scale = this.state.sch_row_height/this.state.time_step_min;
       
        console.log('this.state', this.state);
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

        
        this.state.screen.width = new_width;
        this.state.screen.height = new_height;
        this.state.sch_day_column_width_px = (this.state.screen.width - this.state.sch_time_column_width_px) / this.state.days_num;
        console.log('from checkSize this.state.screen:', this.state.screen);
               
        
        
      };

    

    get schedule_row_height()
    {
        return this.sch_row_height;
    }

    get schedule_height()
    {

        return this.sch_height;
    }
    
    get get_schedule_day_column_width_px(){
    
        return this.sch_day_column_width_px;
    }
    
    get action_label_height(){
    
        var action_label_height = 20;
    
        return action_label_height;
    }
    
    
    
    draw_calendar_desks() {
   
        //Рисуем полоски календаря
        var calendar_lines = [];
        var color_flag = true;
        var i;
    
        console.log('from draw_calendar_desks this.state.sch_row_height', this.state.sch_row_height);
        for (i = 0; i < this.state.free_time_labels_row_number + 2; i++)
        {
            if (color_flag===true)
            {
                calendar_lines.push(
                    <Rect x={0} key={"time_desk"+i} 
                    y={this.state.sch_row_height * i}
                    width={window.innerWidth}
                    height={this.state.sch_row_height}
                    fill={"White"}
                    
                    />
                );
    
                color_flag = false;
            }
            else
            {
                calendar_lines.push(
                    <Rect x={0} key={"time_desk"+i} 
                    y={this.state.sch_row_height * i}
                    width={this.state.screen.width}
                    height={this.state.sch_row_height}
                    fill={"PaleTurquoise"}
                    
                    />
                );
    
                color_flag = true;
            }
    
        }
    
        return (calendar_lines);
    }
    
    
    draw_time_labels_marks(){
                
        var time_label; //Текст метки времени               
        var time_labels_marks = []; //Массив меток времени с разметкой React
        
        var i;
        //Выводим надписи шкалы времени
        for (i = 0; i < this.state.free_time_labels_row_number; i++)
        {        
                    
                    time_label = timeConvert(Number(this.state.start_hrs) * 60 + Number(this.state.start_mins) + this.state.time_step_min * i);
                    time_labels_marks.push(
                                                <Text 
                                                    key={"time_label"+i} 
                                                    x={0}
                                                    y={2*this.state.sch_row_height + this.state.sch_row_height * i} 
                                                    width = {this.state.sch_time_column_width_px}
                                                    height={this.state.sch_row_height}
                                                    fontSize={12}
                                                    fontFamily='Calibri' 
                                                    fill='#07889B'
                                                    align = 'center' 
                                                    verticalAlign = 'middle' 
                                                    text={time_label}
                                                />
                                               
                                          );
    
        } 
    
        return (time_labels_marks);                             
    
    }
    
    //Рисуем шапку календаря
    draw_table_header(){
    
        var primitives = []; //Массив примитивов (графических элементов) шапки календаря с разметкой React
        
        //Рисуем две горизонтальные линии, отделяющие клетки дат и дней недели от клеток вида действий (ПЛАН или ФАКТ), 
        //и клетки вида действий - от строк времени и помещаем из в primitives
        var i;
        for (i = 0; i < 3; i++)
        {
            primitives.push(
                <Line
                    key={"pl_"+i}
                    x={0}
                    y={this.state.sch_row_height * i}
                    points={[0, 0, this.state.screen.width, 0]}
                  
                    stroke="#07889B"
                    
                  />
            );
        }
    
       
        //Рисуем прямоугольник ВРЕМЯ и добавляем его в primitives
        primitives.push(
            <Rect 
                key={"v"}
                x={0}
                y={1}
                width={this.state.sch_time_column_width_px}
                height={this.state.sch_row_height * 2 - 2}
                fill={"White"}
                
            />
        );
    
        //Выводим надпись ВРЕМЯ
        primitives.push(
            <Text 
            key={"v_t"}
            x={0}
            y={0} 
            width = {this.state.sch_time_column_width_px}
            height={this.state.sch_row_height * 2 - 1}
            fontSize={14}
            fontFamily='Calibri' 
            fill='#07889B'
            align = 'center' 
            verticalAlign = 'middle' 
            text={"Время"}
        />
        );
            
        //Выводим Даты и Названия дней недели, а также рисуем вертикальные линии - разделители дней

        console.log('week_dates: some_date = ', this.state.some_date);
        var week_dates_for_some_date = week_dates(this.state.some_date);
        //var week_dates_for_some_date = ['22.01.01', '22.01.01', '22.01.01', '22.01.01', '22.01.01', '22.01.01', '22.01.01'];
        console.log('week_dates:', week_dates_for_some_date);
        var weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'] ;
    

        for (i = 0; i < weekdays.length; i++)
        {
            primitives.push(
                <Text 
                key={"t"+i}
                x={this.state.sch_time_column_width_px + i * this.state.sch_day_column_width_px}
                y={0} 
                width = {this.state.sch_day_column_width_px}
                height={this.state.sch_row_height}
                fontSize={14}
                fontFamily='Calibri' 
                fill='#07889B'
                align = 'center' 
                verticalAlign = 'middle' 
                text={week_dates_for_some_date[i] + ', ' + weekdays[i]}
                
            />
            );
    
            primitives.push(
                <Line
                    key={"l_"+i}
                    x={this.state.sch_time_column_width_px + i * this.state.sch_day_column_width_px}
                    y={0}
                    points={[0, 0, 0, this.state.screen.height]}
                  
                    stroke='#07889B'
                    
                />
            );
    
        } 
    
        return (primitives);
    
    }

    draw_actions(){

        //По дате и времени Действий определяем их положение на экране
        this.transform_actions_date_time_to_px();

        var i, primitives = [];
        for (i = 0; i < this.state.actions.length; i++)
        {
            primitives.push(
                <Group id = {'act_leb'+i} key ={'act_leb'+i}>
        
                    <Rect 
                    id = {this.state.actions[i].id}
                    x={this.state.actions[i].x0}
                    y={this.state.actions[i].y0}
                    width={this.state.sch_day_column_width_px}
                    height={this.state.actions[i].height}
                    fill={'#07889B'}
                    
                    shadowBlur = {3}
                    cornerRadius ={3}
                    
                    />
                    <Text 
                        x={this.state.actions[i].x0}
                        y={this.state.actions[i].y0} 
                        width = {this.state.sch_day_column_width_px}
                        height={this.state.actions[i].height}
                        fontSize={12}
                        fontFamily='Calibri' 
                        fill='white'
                        align = 'center' 
                        verticalAlign = 'middle' 
                        text={this.state.actions[i].order_line_name + '. ' + this.state.actions[i].task}
                    />
                </Group>
            );

        }

        return (primitives);

    }

    transform_actions_date_time_to_px()
    {
       
        var action_plan_date_time;
        var diff_time;
        var diff_days;
        var diff_hrs;
        var diff_mins;
        const start_date_time = get_date_of_nearest_monday(this.state.some_date);
        console.log("transform_actions start_date_time = ", start_date_time);
        console.log("transform_actions this.state.start_hrs = ", this.state.start_hrs);
        console.log("transform_actions this.state.start_mins = ", this.state.start_mins);
        start_date_time.setMinutes(Number(this.state.start_hrs) * 60 + Number(this.state.start_mins));
        console.log("transform_actions start_date_time after adding hh mm = ", start_date_time);


         this.state.actions.map(action =>{
                //plan_date_time: "2020-02-11 11:50:00"
                action_plan_date_time = new Date(action.plan_date_time);
                console.log("transform_actions action_plan_date_time = ", action_plan_date_time);

                //1. ОПРЕДЕЛЯЕМ РАЗМЕЩЕНИЕ МЕТКИ ДЕЙСТВИЯ ПО ОСИ Х
                //1.1. Определяем временное отстояние в милисекундах для каждого Действия от начала временного диапазона календаря
                diff_time = Math.abs(start_date_time - action_plan_date_time); //Разница между датами в милисекундах
                console.log("transform_actions diff_time = ", diff_time);

                //1.2. Определяем временное отстояние в днях для каждого Действия от начала временного диапазона календаря
                diff_days = Math.floor(diff_time / (1000 * 60 * 60 * 24)); 
                console.log("transform_actions diff_days = ", diff_days);

                //1.3. Преобразуем отстояние в дня от начальной даты календаря в экранные пиксели
                action.x0 = this.state.sch_time_column_width_px + diff_days * this.state.sch_day_column_width_px;

                //2. ОПРЕДЕЛЯЕМ РАЗМЕЩЕНИЕ МЕТКИ ДЕЙСТВИЯ ПО ОСИ Y
                //2.1. Определяем временное отстояние в минутах для каждого Действия от начального времени дня, 
                //установленного у календаря
                diff_mins = Math.round((diff_time - diff_days * 1000 * 60 * 60 * 24)/(1000 * 60)); 
                console.log("transform_actions action_plan_date_time = ", action_plan_date_time);
                console.log("transform_actions start_date_time = ", start_date_time);
                console.log("transform_actions diff_mins in mins = ", diff_mins);

                //2.2. Определяем временное отстояние по оси Y в писелях для каждого Действия
                action.y0 = this.state.sch_row_height *2 + this.state.time_scale * diff_mins;

                //3. ОПРЕДЕЛЯЕМ ВЫСОТУ МЕТКИ ДЕЙСТВИЯ в ПИКСЕЛЯХ (plan_duration.: "00:10:00")
                action.height = this.state.time_scale * (action.plan_duration.substring(0, 2)*60 + action.plan_duration.substring(3, 5));


           }

            
        );

       
        
    }


    render()
    {
        var calendar_desks = this.draw_calendar_desks();
        var time_labels_marks= this.draw_time_labels_marks();
        var calendar_header_primitives = this.draw_table_header();
        var actions_labels = this.draw_actions();
        console.log('actions_labels', actions_labels);

        var result = [...calendar_desks, ...time_labels_marks, ...calendar_header_primitives, ...actions_labels];
        console.log('render result', result);
        return (result); 
        
       /*
       return( <Rect 
        id = {145}
        x={200}
        y={200}
        width={100}
        height={100}
        fill={"Black"}
             />)
        */
    }


}       