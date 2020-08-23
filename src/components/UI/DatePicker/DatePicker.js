import React, {Component} from 'react';
import classes from './DatePicker.module.css';
import ChevronLeft from '../../../assets/icons/chevron-left-solid';
import ChevronRight from '../../../assets/icons/chevron-right-solid';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class DatePicker extends Component {
    state = {
        month: (new Date()).getMonth(),
        year: (new Date()).getFullYear(),
        weeks: []
    }

    componentDidMount(){
        this.renderCalendar();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.month !== this.state.month || prevProps.checkInDate !== this.props.checkInDate
             || prevProps.checkOutDate !== this.props.checkOutDate){
                this.renderCalendar();
        }
    }

    renderCalendar(){
        const newWeeks = [[],[],[],[],[],[]];
        const date = new Date();
        const dateDay = date.getDate();
        const dateMonth = date.getMonth();
        const dateYear = date.getFullYear();
        let firstDay = new Date(this.state.year, this.state.month, 1).getDay();
        let lastDay = (new Date(this.state.year, this.state.month + 1, 0)).getDate();
        
        let firstWeek = true;
        let dayBuilder = 1;

        for(let i = 0; i < 6; i++){
            for(let j = 0; j < 7; j++){
                if((firstWeek && j < firstDay) || dayBuilder > lastDay){
                    newWeeks[i].push(<td 
                                    key={dayBuilder+j}
                                    id={dayBuilder+j}><div></div></td>);
                }else if((dayBuilder >= dateDay && this.state.month >= dateMonth && this.state.year >= dateYear)
                || (this.state.month > dateMonth && this.state.year >= dateYear)
                || (this.state.year > dateYear)){
                    let selectedStyle = '';
                    let dateBuilder = (new Date(this.state.year, this.state.month, dayBuilder)).toISOString().slice(0,10);
                    if(dateBuilder === this.props.checkInDate || dateBuilder === this.props.checkOutDate){
                        selectedStyle = classes.DateSelected;
                    }else{
                        selectedStyle = classes.DateUnselected;
                    }
                    newWeeks[i].push(<td 
                                    onClick={(event)=>this.props.dateClicked(event)}
                                    onMouseOver={this.dayMouseOverHandler}
                                    onMouseOut={this.dayMouseOutHandler}
                                    id={(new Date(this.state.year, this.state.month, dayBuilder)).toISOString().slice(0,10)}
                                    key={new Date(this.state.year, this.state.month, dayBuilder)}
                                    className={classes.AvailableDay}>
                                        <div 
                                            className={selectedStyle}
                                            id={(new Date(this.state.year, this.state.month, dayBuilder)).toISOString().slice(0,10)}>{dayBuilder}</div>
                                    </td>);
                    dayBuilder++;
                }else{
                    newWeeks[i].push(<td 
                                    key={new Date(this.state.year, this.state.month, dayBuilder)}>
                                        <div>{Number(dayBuilder)}</div>
                                    </td>);
                    dayBuilder++;
                }  
            }
            firstWeek = false;
        }
        this.setState({weeks: newWeeks});
    }

    moveMonthLeftHandler = () => {
        let newMonth;
        let newYear = this.state.year;

        if(this.state.month === 0){       
            newMonth = 11;
            newYear = this.state.year - 1;
        }else{
            newMonth = this.state.month - 1;
        }
        this.setState({month: newMonth, year: newYear, weeks: [[],[],[],[],[],[]]});
    };

    moveMonthRightHandler = () => {
        this.setState((prevState)=>{
            let newYear = prevState.year;
            if(prevState.month === 11){
                newYear = prevState.year++;
            }
            return {month: prevState.month++ % 12, year: newYear, weeks: [[],[],[],[],[],[]]};
        });
    };

    render(){
        return (
            <>
                <div className={classes.DatePicker} id="SearchBar">
                    <div>
                        <div className={classes.Month}>
                            <div onClick={this.moveMonthLeftHandler} className={classes.ChevronLeft}><ChevronLeft/></div>
                            <div className={`${classes.MonthTransition} ${classes.MonthLabel}`}>{MONTHS[this.state.month]}</div>
                            <div onClick={this.moveMonthRightHandler} className={classes.ChevronRight}><ChevronRight/></div>
                        </div>
                        <div>
                            <table>
                                <tbody>
                                <tr className={classes.CalendarDaysWeek}>
                                    <td><div>Su</div></td>
                                    <td><div>Mo</div></td>
                                    <td><div>Tu</div></td>
                                    <td><div>We</div></td>
                                    <td><div>Th</div></td>
                                    <td><div>Fr</div></td>
                                    <td><div>Sa</div></td>
                                </tr>
                                <tr>
                                    {this.state.weeks[0]}
                                </tr>
                                <tr>
                                    {this.state.weeks[1]}
                                </tr>
                                <tr>
                                    {this.state.weeks[2]}
                                </tr>
                                <tr>
                                    {this.state.weeks[3]}
                                </tr>
                                <tr>
                                    {this.state.weeks[4]}
                                </tr>
                                <tr>
                                    {this.state.weeks[5]}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DatePicker;