import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import leftArrow from '../components/leftArrow.svg'
import axios from "axios"


// "proxy"
//   "private": true,
//   "homepage": "https://guliaevae.github.io/Calendar-app/",
//   "dependencies": {


const Background = styled.div`
display: flex;
align-items: center;
background:black ;
flex-flow: column nowrap;
height: 100vh; 
width: 100vw ; 
`

const CalendarBlock = styled.div`
width:740px ;
position:relative ;

@media (max-width: 740px) { 
    width:100vw ;
  }
`

const Title = styled.div`
height: 10vh;
background:white ;
display:flex ;
flex: 0 0 100px;
justify-content:space-between ;
align-items:center ;
padding-left:2.5vw ;
padding-right:2.5vw ;
font-size:2.5vh; 
`
const Days = styled.div`
height: 5vh;
background:rgba(245, 245, 245, 1) ;
box-shadow:inset 0 1px rgba(231, 231, 231, 1) ;
`

const Month = styled(Days)`
box-shadow:inset 0 -1px rgba(231, 231, 231, 1) ;
display:flex ;
justify-content: space-between ;
align-items:center ;
padding-left:95px ;
font-size:2.2vh; 
padding-right:40px ;
@media (max-width: 740px) { 
    padding-left:13.5vw ;
    padding-right:5.5vw; 
  }
`

const Main = styled.div`
max-height:75vh ;
background:white ;
overflow-y:scroll;
::-webkit-scrollbar { width: 0; }
`

const RedText = styled.span`
color: red;
font-size:2.7vh ;
`

const Footer = styled(Days)`
display:flex ;
justify-content:space-between ;
padding-left:2vw ;
padding-right:2vw ;
align-items:center ;
color:red ;
font-size:2.2vh ;
`

const WeekDayWithDay = styled.div`
display:flex ;
flex-direction:column ;
font-size:2.1vh;
text-align:center ;
align-items:center ;
position:relative ;
`

const StyledForGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
padding-left:8vh ;
position: relative ;
`

const StyledForGridCell = styled.div`
border-top: 1px solid rgba(190, 190, 191, 1);
border-right: 1px solid rgba(190, 190, 191, 1);
padding:3px ;
`

const BackForCell = styled.div`
background:${props => props.bg};
height:5vh ;
width:100% ;
`

const StyledForGridCellWithTimes = styled.div`
font-size:2vh ;
position:absolute ;
top: -1.5vh;
left: 3vh;
color: rgba(190, 190, 191, 1) ;
`

const DayFrame = styled.div`
width :2vh;
height:2vh;
display:flex ;
align-items:center ;
justify-content:center ;
`

const TodayFrame = styled(DayFrame)`
background-color: red;  
border-radius:50%;
box-shadow: 0 0 0 0.2vh red;
`

const DayTitle = styled.div`
font-size:2vh; 
`

const WeeksArrows = styled.div`
position:absolute ;
width:100% ;
height:100% ;
display:flex ;
align-items:center ;
padding-left:1vw ;
padding-top:0.5vh ;
`

const Arrow = styled.img`
opacity:0.5 ;
width:5vh ;
height:5vh;

&:hover{
    opacity:1 ;
}
&:active{
    opacity:1 ;  
}
`

export default function Calendar1() {
    const [week, setWeek] = useState([0, 7])
    const [swichOn, setsw] = useState([true, 0])
    const [database, setData] = useState({
        "00:00": {
            162022: "00:15:00",
        },
        "03:00": {
            662022: "03:30:00",
            2062022: "03:20:00"
        },
        "05:00": {
            162022: "05:10:00",
            562022: "05:10:00",
            962022: "05:10:00"
        }

    })
    const [canDelete, setCanDelete] = useState([false, 0, 0])
    const [today] = useState(new Date())
    const [activeCell, setActive] = useState([0, 0])


    useEffect(() => {
        NewScore()
    }, [])








    function renderCell() {
        let helpArray = []
        let arrayWithTime = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
        let theDay = new Date(today.getFullYear(), today.getMonth())

        theDay.setDate(theDay.getDate() + week[0])

        for (let i = 0; i < 7; i++) {
            let code = `${theDay.getDate()}` + `${theDay.getMonth()}` + `${theDay.getFullYear()}`
            helpArray.push(code)
            theDay.setDate(theDay.getDate() + 1)
        }

        let arraWithCellsRow = arrayWithTime.map(times => {
            return (<StyledForGrid id={times}>
                <StyledForGridCellWithTimes>
                    {times}
                </StyledForGridCellWithTimes>
                {helpArray.map(item => {
                    return <StyledForGridCell onClick={(e) => canDeleteOrNot(times, item, e)} id={item}>{
                        <BackForCell bg={checkData(times, item)} />
                    }
                    </StyledForGridCell>
                })}
            </StyledForGrid>)
        })

        function checkData(time, item) {
            if (activeCell[0] === time && activeCell[1] === item) {
                return "rgba(115, 146, 255, 1)"
            }
            if (database[time] && database[time][item]) {

                return "rgba(188, 195, 255, 1)"
            } else return "white"
        }

        return (
            <>
                {arraWithCellsRow.map(item => item)}
            </>
        )
    }

    let months = ["January ",
        "February ",
        "March ",
        "April ",
        "May ",
        "June ",
        "July  ",
        "August ",
        "September ",
        "October ",
        "November ",
        "December "
    ]

    let arrayWithWeekDays = [
        'S',
        'S',
        'M',
        'T',
        'W',
        'T',
        'F'
    ]



    async function NewScore() {
        axios.get(`/`)
            .then(res => {
                
                console.log(res)
            })



        


    }






    let titleOfWeeksDay = []


    function canDeleteOrNot(time, code, e) {

        if (database[time] && database[time][code]) {
            alert(database[time][code])
            setActive([time, code])
            setCanDelete([true, time, code])
        } else {
            setCanDelete([false, time, code])
            setActive([0, 0])
        }
    }

    function deleteData(time, code) {
        let cloneDatabase = Object.assign({}, database);
        delete cloneDatabase[time][code]
        setData(cloneDatabase)
        setCanDelete(canDelete[0] = false)
        setActive([0, 0])
    }

    function nextMonth() {
        let theDate = new Date(today.getFullYear(), today.getMonth())
        theDate.setDate(theDate.getDate() + week[0])
        let daysInMonth = 32 - new Date(theDate.getFullYear(), theDate.getMonth(), 32).getDate();
        let arr = week.map(item => item + daysInMonth)
        setWeek(arr)
    }

    function prevMonth() {
        let theDate = new Date(today.getFullYear(), today.getMonth())
        theDate.setDate(theDate.getDate() + week[0])
        let daysInMonth = 32 - new Date(theDate.getFullYear(), theDate.getMonth(), 32).getDate();
        let arr = week.map(item => item - daysInMonth)
        setWeek(arr)
    }

    function GetDays() {
        let arr = []
        let m = 0
        let y = 0
        let theDate = new Date(today.getFullYear(), today.getMonth())
        function nextDay() {
            theDate.setDate(theDate.getDate() + week[0])

            if (swichOn[0] === true) {
                arrayFilling()

                if (theDate.getFullYear() < today.getFullYear()) {
                    let arr1 = week.map(item => item + 365)
                    setWeek(arr1)
                } else if (theDate.getFullYear() > today.getFullYear()) {

                    let arr1 = week.map(item => item - 365)
                    setWeek(arr1)
                } else if (theDate.getFullYear() === today.getFullYear()) {

                    if (theDate.getMonth() < today.getMonth()) {
                        let arr1 = week.map(item => item + 32 - new Date(theDate.getFullYear(), theDate.getMonth(), 32).getDate())
                        setWeek(arr1)
                    } else if (theDate.getMonth() > today.getMonth()) {
                        let arr1 = week.map(item => item - 32 - new Date(theDate.getFullYear(), theDate.getMonth(), 32).getDate())
                        setWeek(arr1)
                    } else if (theDate.getMonth() === today.getMonth()) {

                        if (arr.includes(today.getDate()) === true) {
                            setsw([false, 0])
                        } else if (theDate.getDate() < today.getDate()) {
                            let arr1 = week.map(item => item + Math.abs(theDate.getDate() - today.getDate()))
                            setWeek(arr1)

                        } else if (theDate.getDate() > today.getDate() + 1) {
                            let arr1 = week.map(item => item - Math.abs(theDate.getDate() - today.getDate()))
                            setWeek(arr1)

                        } else if (theDate.getDate() === today.getDate()) {
                            let arr1 = week.map(item => item + 1)
                            setWeek(arr1)
                            setsw([false, 0])
                        }

                    }
                }
            } else {
                arrayFilling()
            }

            function arrayFilling() {
                for (let i = 0; i < 7; i++) {
                    arr.push(theDate.getDate())
                    titleOfWeeksDay.push(arrayWithWeekDays[theDate.getDay()])
                    theDate.setDate(theDate.getDate() + 1)
                }
            }
            m = theDate.getMonth()
            y = theDate.getFullYear()

        }

        nextDay()
        return { "Days": arr, "Month": m, "Year": y }
    }


    function swichOnToday() {
        setsw([true, 0])
    }

    function addNewInterview() {
        let eventTime = prompt('Enter event time:\n YYYY-MM-DD HH:mm:ss', '2022-07-04 05:10:00');
        let regexp = /[0-9]{4}[-]{1}[0-1]{0,1}[0-9]{1}[-]{1}[0-3]{0,1}[0-9]{1}[\s]{1}[0-2]{0,1}[0-9]{1}[:]{1}[0-5]{0,1}[0-9]{1}[:]{1}[0-9]{2}/gu;
        if (eventTime.match(regexp)[0] !== eventTime) {
            return alert("Данные введены неверно")
        }
        let датаивремя = eventTime.split(" ")
        let толькодата = датаивремя[0].split("-")
        let YYYY
        let MM
        let DD
        if (толькодата[0][0] === "0") { YYYY = толькодата[0].replace(/[0]/, '') } else { YYYY = толькодата[0] }
        if (толькодата[1][0] === "0") { MM = толькодата[1].replace(/[0]/, '') - 1 } else { MM = толькодата[1] - 1 }
        if (толькодата[2][0] === "0") { DD = толькодата[2].replace(/[0]/, '') } else { DD = толькодата[2] }
        if (MM + 1 > 12) {
            return alert("Неверно введен месяц")
        }
        let helpdate = 32 - new Date(YYYY, MM, 32).getDate();
        if (DD > helpdate) {
            return alert("Неверно введен день")
        }
        let code = `${DD}` + `${MM}` + `${YYYY}`
        let тольковремя = датаивремя[1].split(":")
        let часы = тольковремя[0] + ":00"
        let obj = {}
        let obj1 = { [часы]: { [code]: датаивремя[1] } }
        Object.assign(obj, database)
        for (let вр in obj1) {
            for (let дт in obj1[вр]) {
                if (!Object.hasOwn(obj, вр)) {
                    obj[вр] = obj1[вр]
                } else {
                    obj[вр][дт] = obj1[вр][дт]
                }
            }
        }
        setData(obj)
        alert("Данные сохранены")
    }

    function nextWeek() {
        let arr = week.map(item => item + 7)
        setWeek(arr)
    }

    function prevWeek() {
        let arr = week.map(item => item - 7)
        setWeek(arr)
    }

    return (
        <Background>
            <CalendarBlock>
                <Title >
                    <span onClick={prevWeek}>Interview Calendar</span>
                    <RedText onClick={addNewInterview}>+</RedText>
                </Title>
                <Days>
                    <StyledForGrid>
                        {GetDays()["Days"].map(item => {
                            if (today.getDate() === item && today.getMonth() === GetDays()["Month"]) {

                                return <WeekDayWithDay >
                                    <DayTitle >{titleOfWeeksDay[GetDays()["Days"].indexOf(item) + 1]}</DayTitle>
                                    <TodayFrame>{item}</TodayFrame>
                                </WeekDayWithDay>
                            } else {
                                return <WeekDayWithDay >


                                    <DayTitle >{titleOfWeeksDay[GetDays()["Days"].indexOf(item) + 1]}</DayTitle>
                                    <DayFrame >{item}</DayFrame>
                                </WeekDayWithDay>
                            }
                        })}
                        <WeeksArrows>
                            <Arrow onClick={prevWeek} src={leftArrow} ></Arrow>
                            <Arrow onClick={nextWeek} src={leftArrow} style={{ transform: "rotate(180deg)" }}></Arrow>
                        </WeeksArrows>
                    </StyledForGrid>
                </Days>
                <Month>
                    <RedText onClick={prevMonth}>{"<"}</RedText>
                    {`${months[GetDays()["Month"]]} ${GetDays()["Year"]} `}
                    <RedText onClick={nextMonth}>{">"}</RedText>
                </Month>
                <Main>
                    {renderCell()}
                </Main>
                <Footer>
                    <span onClick={swichOnToday}>Today</span>
                    {canDelete[0] && <span onClick={() => deleteData(canDelete[1], canDelete[2])}>Delete</span>}
                </Footer>
            </CalendarBlock>

        </Background>

    )
}