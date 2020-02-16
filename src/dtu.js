/******************************************************************************************************************
Функция week_dates возвращает массив всех дат недели (с понедельника по воскресенья) в строковом формате dd.mm.YYYY
для некоторой входной даты в формате Date

ВХОДНОЙ ПАРАМЕТР:
some_date - некоторая дата в формате Date (месяц нумеруется с 0 до 11)

ВОЗВРАЩАЕМОЕ ЗНАЧЕНИЕ:
массив всех дат недели (с понедельника по воскресенья) в строковом формате dd.mm.YYYY
*/

export let week_dates = (some_date) => {
                   
    var i;
                    var monday_date = get_date_of_nearest_monday(some_date);
                    console.log('monday_date = ', monday_date)
                    var date;
                    var str_week_dates = [];
                    for (i=0; i<7; i++)
                    {
                        date = get_date_with_adding_days(monday_date.getFullYear(),
                                                         monday_date.getMonth()+1, //принимает значения месяца в формате от 1 до 12
                                                         monday_date.getDate(),
                                                         i);
                       
                        str_week_dates.push(get_date_in_str_format(date));
                
                    }
                
                    return (str_week_dates);
                    
               
  };

/*******************************************************************************************************************************
Функция get_current_date возвращает текущую дату в формале Date
*/
export let get_current_date = () =>{
    let current_date_time = new Date();
    return current_date_time;
}

/*******************************************************************************************************************************
Функция get_current_date_in_str_format возвращает текущую дату в виде строки "dd.mm.YYYY"
*/
export let get_current_date_in_str_format = () =>{
    let current_date_time = new Date();
    
    let current_day_number = current_date_time.getDate();
    if (current_day_number.toString().length < 2)
    {
        current_day_number = '0' + current_day_number.toString();
    }

    let current_month_number = current_date_time.getMonth()+1;
    if (current_month_number.toString().length < 2)
    {
        current_month_number = '0' + current_month_number.toString();
    }

    return current_day_number + "." + current_month_number  + "." + current_date_time.getFullYear();
};


/*******************************************************************************************************************************
Функция get_date_in_str_format возвращает дату в виде строки "dd.mm.YYYY", для некоторой даты, заданной в формате Date
ВХОДНЫЕ ПАРАМЕТРЫ:
input_data - год в виде четырехзначного числа


ВОЗВРАЩАЕМОЕ ЗНАЧЕНИЕ:
Дата в формате Date.
*/
export let get_date_in_str_format = (input_date) =>{
    
    
    let current_day_number = input_date.getDate();
    if (current_day_number.toString().length < 2)
    {
        current_day_number = '0' + current_day_number.toString();
    }

    let current_month_number = input_date.getMonth()+1;
    if (current_month_number.toString().length < 2)
    {
        current_month_number = '0' + current_month_number.toString();
    }

    return current_day_number + "." + current_month_number  + "." + input_date.getFullYear();
};                                    

/***************************************************************************************************************************
Функция get_date_with_adding_days возвращает дату в формате Date, отстоящую от заданной даты на заданное количество дней

ВХОДНЫЕ ПАРАМЕТРЫ:
input_year - год в виде четырехзначного числа,
input_mounth - месяц в виде числа от 1 до 12,
input_day_number - день в виде числа от 1 до 31,
days_for_adding - число дней (может задаваться со знаком "минус").

ВОЗВРАЩАЕМОЕ ЗНАЧЕНИЕ:
Дата в формате Date.
*/
export let get_date_with_adding_days = (input_year, input_mounth, input_day_number, days_for_adding)=>  
{
var result = new Date(input_year, input_mounth-1, input_day_number);
result.setDate(result.getDate() + days_for_adding);
return result;
}  


/******************************************************************************************************************
Функция get_date_of_nearest_monday возвращает дату ближайшего предыдущего понедельника в формате Date, 
для некоторого для недели, задаваемого входными параметрами. Если входная дата соответствует понедельнику,
то она сама и возвращается функцией

ВХОДНЫЕ ПАРАМЕТРЫ:
input_year - год в виде четырехзначного числа,
input_mounth - месяц в виде числа от 1 до 12,
input_day_number - день в виде числа от 1 до 31,


ВОЗВРАЩАЕМОЕ ЗНАЧЕНИЕ:
Дата ближайшего предыдущего понедельника в формате Date. Если входная дата - соответствует понедельнику,
то она сама и возвращается функцией.
*/
export let get_date_of_nearest_monday_by_dd_mm_YYYY = 
(input_year, input_mounth, input_day_number) => { 
                let date_of_nearest_monday;
                
                let input_date = new Date(input_year, input_mounth-1, input_day_number); //Т.к.  в js МЕСЯЦ: 0 - для января и 11 - для декабря
                let selected_day_of_week = input_date.getDay();
                if (selected_day_of_week === 0)
                {
                    //в функцию get_date_with_adding_days месяц подставляется без -1
                    date_of_nearest_monday = get_date_with_adding_days(input_year, input_mounth, input_day_number,-6);
                    
                }
                else
                {
                    date_of_nearest_monday = get_date_with_adding_days(input_year, input_mounth, input_day_number, 1-selected_day_of_week); // Start_Date - дата с нулевым временем {05.02.2018 0:00:00}
                    
                }

                return date_of_nearest_monday;
            }

/******************************************************************************************************************
Функция get_date_of_nearest_monday возвращает дату ближайшего предыдущего понедельника в формате Date, 
для некоторого для недели, задаваемого входным параметром в формате Date. Если входная дата соответствует понедельнику,
то она сама и возвращается функцией

ВХОДНОЙ ПАРАМЕТР:
input_date - некоторая дата в формате Date, для которой нужно определить дату ближайшего понедельника

ВОЗВРАЩАЕМОЕ ЗНАЧЕНИЕ:
Дата ближайшего предыдущего понедельника в формате Date. Если входная дата - соответствует понедельнику,
то она сама и возвращается функцией.
*/
export let get_date_of_nearest_monday = 
(input_date) => { 

let date_of_nearest_monday;

                                
let selected_day_of_week = (input_date).getDay();

if (selected_day_of_week === 0)
{

date_of_nearest_monday = get_date_with_adding_days(input_date.getFullYear(),
                                       input_date.getMonth()+1, 
                                       input_date.getDate(),
                                       -6);

}
else
{
date_of_nearest_monday = get_date_with_adding_days(input_date.getFullYear(),
                                       input_date.getMonth()+1, 
                                       input_date.getDate(), 
                                       1-selected_day_of_week); 
}

return date_of_nearest_monday;
}

/******************************************************************************************************************
Функция timeConvert возвращает время в строковом формате HH.mm

ВХОДНОЙ ПАРАМЕТР:
all_number_of_minutes - некоторое время в минутах (задается числом - Number)

ВОЗВРАЩАЕМОЕ ЗНАЧЕНИЕ:
Соответствующее входному числовому значению время в строковом формате HH.mm
*/
export let timeConvert = 
(all_number_of_minutes) => {
            var number_hours = Math.floor(all_number_of_minutes / 60);
            var number_minutes = all_number_of_minutes - number_hours * 60;

            var hours, mins;
            if (number_hours===0)
            {
                hours = '00';
            }
            else if(number_hours < 10)
            {
                hours = '0' + number_hours.toString();
            }
            else
            {
                hours = number_hours.toString();
            }

            if (number_minutes===0)
            {
                mins = '00';
            }
            else if(number_minutes < 10)
            {
                mins = '0' + number_minutes.toString();
            }
            else
            {
                mins = number_minutes.toString();
            }


           
            return hours + '.' + mins;
        }