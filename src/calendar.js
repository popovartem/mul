import React, { Component } from 'react';
import './App.css';
import './App.js';
import * as date_time_utility from './date_time_utility.js';
import Konva from 'konva';
import { Stage, Layer, Text, Rect, Line, Group} from 'react-konva';


const Calendar =(calendar)=>{
   
    var calendar_desks = draw_calendar_desks(calendar);
    var time_labels_marks= draw_time_labels_marks(calendar);
    var result = calendar_desks.concat(time_labels_marks);

    return (result); 
    
}

export default Calendar;

export const get_schedule_height_px=(calendar)=>{

    var start_hrs = calendar.start_time.substring(0, 2);
    var start_mins = calendar.start_time.substring(3);
    var end_hrs = calendar.end_time.substring(0, 2);
    var end_mins = calendar.end_time.substring(3);


    var schedule_time_column_width_px = calendar.schedule_time_column_width_px;
    var all_minites_in_day_schedule = Number(end_hrs) * 60 + Number(end_mins) - Number(start_hrs) * 60 - Number(start_mins);

    var time_step_min = calendar.time_step;
    var free_time_labels_row_number = all_minites_in_day_schedule / time_step_min;
    var schedule_row_height_px = calendar.schedule_row_height_px;
    var schedule_height_px = schedule_row_height_px * (Number(free_time_labels_row_number) + 2);

    return schedule_height_px;
}



const draw_calendar_desks=(calendar)=>
{//Считываем параметры календаря
    var start_hrs = calendar.start_time.substring(0, 2);
    var start_mins = calendar.start_time.substring(3);
    var end_hrs = calendar.end_time.substring(0, 2);
    var end_mins = calendar.end_time.substring(3);


    var schedule_time_column_width_px = calendar.schedule_time_column_width_px;
    var all_minites_in_day_schedule = Number(end_hrs) * 60 + Number(end_mins) - Number(start_hrs) * 60 - Number(start_mins);

    var time_step_min = calendar.time_step;
    var free_time_labels_row_number = all_minites_in_day_schedule / time_step_min;
    var schedule_row_height_px = calendar.schedule_row_height_px;
    var schedule_height_px = schedule_row_height_px * (Number(free_time_labels_row_number) + 2);

    //Рисуем полоски календаря
    var calendar_lines = [];
    var color_flag = true;
    var i;

    for (i = 0; i < free_time_labels_row_number + 2; i++)
    {
        if (color_flag===true)
        {
            calendar_lines.push(
                <Rect x={0} key={"time_desk"+i} 
                y={schedule_row_height_px * i}
                width={window.innerWidth}
                height={schedule_row_height_px}
                fill={"White"}
                
                />
            );

            color_flag = false;
        }
        else
        {
            calendar_lines.push(
                <Rect x={0} key={"time_desk"+i} 
                y={schedule_row_height_px * i}
                width={window.innerWidth}
                height={schedule_row_height_px}
                fill={"PaleTurquoise"}
                
                />
            );

            color_flag = true;
        }

    }

    return (calendar_lines);
}


const draw_time_labels_marks=(calendar)=>{
            
    var start_hrs = calendar.start_time.substring(0, 2);
    var start_mins = calendar.start_time.substring(3);
    var end_hrs = calendar.end_time.substring(0, 2);
    var end_mins = calendar.end_time.substring(3);
                        
                        
    var schedule_time_column_width_px = calendar.schedule_time_column_width_px;
    var all_minites_in_day_schedule = Number(end_hrs) * 60 + Number(end_mins) - Number(start_hrs) * 60 - Number(start_mins);
                        
    var time_step_min = calendar.time_step;
    var free_time_labels_row_number = all_minites_in_day_schedule / time_step_min;
    var schedule_row_height_px = calendar.schedule_row_height_px;

    var time_label; //Текст метки времени               
    var time_labels_marks = []; //Массив меток времени с разметкой React
    
    var i;
    //Выводим надписи шкалы времени
    for (i = 0; i < free_time_labels_row_number; i++)
    {        
                
                time_label = date_time_utility.timeConvert(Number(start_hrs) * 60 + Number(start_mins) + time_step_min * i);
                time_labels_marks.push(
                                            <Text 
                                                key={"time_label"+i} 
                                                x={0}
                                                y={2*schedule_row_height_px + schedule_row_height_px * i} 
                                                width = {schedule_time_column_width_px}
                                                height={schedule_row_height_px}
                                                fontSize={12}
                                                fontFamily='Calibri' 
                                                fill='Black'
                                                align = 'center' 
                                                verticalAlign = 'middle' 
                                                text={time_label}
                                            />
                                           
                                      );

    } 

    return (time_labels_marks);                             

}