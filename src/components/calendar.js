import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'
import leftArrow from '../components/images/leftArrow.svg'
import Logo1 from '../components/images/Logo1.svg'
import close from '../components/images/close.svg'
import RobotoWoff2 from '../components/IMFellFrenchCanonSC-Regular.ttf'
import axios from "axios"
import { doc, setDoc, getDocs, updateDoc, deleteField, collection, query } from "firebase/firestore";

import { Context } from "../index";

import TextareaAutosize from 'react-textarea-autosize';


// import { collection } from 'firebase/firestore';
// import { useCollection } from 'react-firebase-hooks/firestore';

import { useCollection } from 'react-firebase-hooks/firestore';

const Background = styled.div`
display: flex;
align-items: center;
background:black ;
flex-flow: column nowrap;
height: 100vh; 
width: 100vw ; 
justify-content:center ;

`

const CalendarBlock = styled.div`
width:100vw ;
position:relative ;

@media (max-width: 740px) { 
    width:100vw ;
    
  }
`

const Title = styled.div`
@font-face {
  font-family: 'Roboto Condensed';
  src: url(${RobotoWoff2}) format('ttf');
       
}

img{
    height:80% ;
}

height: 10vh;
background:rgba(124, 124, 124, 1) ;
color:white ;
display:flex ;
flex: 0 0 100px;
justify-content:space-between ;
align-items:center ;
padding-left:2.5vw ;
padding-right:2.5vw ;
padding-top:1vh ;
padding-bottom:1vh ;
box-sizing:border-box;
/* font-size:2.7vh;  */
font-family: 'Roboto Condensed' ;



`


const Secword = styled.span`
color: rgba(7, 195, 255, 1);
`
const Wirstword = styled(Secword)`
color: white;
`

const Hr1 = styled.hr`
border: none;
border-bottom: 1px solid white;
`

const Hr2 = styled.hr`
border: none;
border-top: 1px solid rgba(7, 195, 255, 1);

`

const Days = styled.div`
height: 4vh;
font-size:2.4vh;
box-sizing:border-box ;
background:rgba(124, 124, 124, 1);
/* box-shadow:inset 0 1px rgba(231, 231, 231, 1) ; */
@font-face {
  font-family: 'Roboto Condensed';
  src: url(${RobotoWoff2}) format('ttf');
       
}
font-family: 'Roboto Condensed' ;
`

const Month = styled(Days)` 
box-shadow:inset 0 -1px rgba(231, 231, 231, 1) ;
display:flex ;
justify-content: space-between ;
align-items:center ;
padding-left:95px ;
/* font-size:16px;  */
padding-right:40px ;

/* @media (max-width: 740px) { 
    padding-left:13.5vw ;
    padding-right:5.5vw; 
  } */
`

const Main = styled.div`
padding-top:1.9vh ;
max-height:77vh ;
background:white ;
overflow-y:scroll;
box-sizing:border-box;
::-webkit-scrollbar { width: 0; }
`

const RedText = styled.span`
/* color: rgba(7, 195, 255, 1); */
color: white;
font-size:2.7vh ;
`

const Footer = styled(Days)`
display:flex ;
justify-content:space-between ;
padding-left:2vw ;
padding-right:2vw ;
align-items:center ;
color:white ;
font-size:2.7vh ;
/* line-height: 5vh; */
height: 5vh;
/* height:auto ; */

`

const WeekDayWithDay = styled.div`
display:flex ;
flex-direction:column ;
font-size:2.2vh;
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
/* box-sizing:border-box ; */
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
color: white;
`

const TodayFrame = styled(DayFrame)`
/* background-color: rgba(7, 195, 255, 1);   */
border-radius:50%;
/* box-shadow: 0 0 0 0.2vh rgba(7, 195, 255, 1); */
color: rgba(7, 195, 255, 1);
`

const DayTitle = styled.div`
color: white;
/* font-size:2vh;  */
`
const TodayDayTitle = styled(DayTitle)`
color: rgba(7, 195, 255, 1);
`



const WeeksArrows = styled.div`
position:absolute ;
width:100% ;
height:100% ;
display:flex ;
align-items:center ;
padding-left:1vw ;
box-sizing:border-box ;
/* padding-top:1.5vh ; */
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
const Close = styled.img`
width:30px ;
height:30px;
filter: invert(100%);
&:hover{
    filter: invert(0);
}
&:active{
    filter: invert(0); 
}
`

const AlertWindow = styled.div`
position:absolute ;
min-width:250px ;
width:50%;
background:rgba(0, 0, 0, 0.47) ;
border-radius:20px ;
z-index:2 ;
display:flex ;
justify-content:space-between ;
align-items:center ;
flex-direction:column ;
margin: 0 auto;

@media (max-width: 740px) { 
    /* width: 55vw; */
    /* height: 35vh;  */
  }
`
const HeaderForAlert = styled.div`
height: 15%;
width:90% ;
display:flex ;
margin-top:10px ;
justify-content:space-between ;
align-items:center ;



`

const DateAndTimeInAlert = styled.div`
height: 90%;
padding-left:10px ;
width:86% ;
background:rgba(189, 189, 189, 1) ;
border-radius:5px;
`

const MainForAlert = styled.div`
font-size:2.2vh ;
height: 55%;
width: 85%;
/* background:rgba(189, 189, 189, 1) ; */
border-radius:10px ;
padding: 1vh 1vw;
/* box-shadow: 0 0 2px 1px black; */
margin-top:5px ;
display:flex ;
flex-direction:column ;
justify-content:center ;



input{
    border-radius: 10px;
    border: none; 
    margin-right: 10px;
    background:rgba(189, 189, 189, 1);
}


 textarea{
    border:none ;
    width: 100%;
    margin: 5px auto;
    resize:none;
    border-radius: 10px;
    background:rgba(189, 189, 189, 1);
  
}
`
const FooterForAlert = styled.div`
height: auto;
margin-bottom:5px;

display:flex ;
flex-direction:row ;
justify-content:space-between ;
align-items:center ;
width:90% ;
color:white ;
`



export default function Calendar1() {
    const [xANDx, setxANDx] = useState([])
    const [xANDxForTell, setxANDxForTell] = useState([])


    const { firebaseApp, firestore } = useContext(Context)

    const [cutout, setout] = useState(true)
    const [activeAlert, setAlert] = useState(false)
    const [activeAlertForCreate, setAlertForCreate] = useState(false)

   


    const [inputValue, setInputValue] = useState('')
    let [inputForCreate, setCreateInput] = useState([])

    const [database, setData] = useState({})

    useEffect(() => {
        getMes()
    }, [cutout])

    async function getMes() {
        let p1 = {}
        let mes = await getDocs(query(collection(firestore, "dates&times")))
        mes.forEach((doc) => {
            console.log(doc.id, "=>", doc.data())
            p1[doc.id] = doc.data()
        })
        setData(p1)
    }

    const [week, setWeek] = useState([0, 7])
    const [swichOn, setsw] = useState([true, 0])
    const [canDelete, setCanDelete] = useState([false, 0, 0])
    const [today] = useState(new Date())
    const [activeCell, setActive] = useState([0, 0])

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
                        <BackForCell id="gridCell" bg={checkData(times, item)} />
                    }
                    </StyledForGridCell>
                })}
            </StyledForGrid>)
        })

        function checkData(time, item) {
            if (activeCell[0] === time && activeCell[1] === item) {
                return "rgba(7, 195, 255, 1)"
            }
            if (database[time] && database[time][item]) {
                
                return "rgba(124, 124, 124, 1)"
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

    let titleOfWeeksDay = []

   
    function canDeleteOrNot(time, code, e) {
        if (activeAlert === false) {
            if (database[time] && database[time][code] && database[time][`${code}time`] ) {
                
                setActive([time, code, database[time][`${code}time`]])
                setInputValue(database[time][code])
                setCanDelete([true, time, code])
                setAlert(true)
            } else
            if (database[time] && database[time][code]) {

                setActive([time, code])
                setInputValue(database[time][code])
                setCanDelete([true, time, code])
                setAlert(true)
            } else {
                setCanDelete([false, time, code])
                setActive([0, 0])
            }
        }
    }

    async function deleteData(time, code) {
        setAlert(false)
        await updateDoc(doc(firestore, 'dates&times', time), {
            [code]: deleteField(),
            [code+"time"]:deleteField(),
        });
        setCanDelete(canDelete[0] = false)
        setActive([0, 0])
        setout(!cutout)
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


    async function sendMes(nw, time, code, data, originalTime) {
        if (nw === true) {
            // добавление времени
            setNewData(time, code, data, originalTime)
        } else {
            // добавление дня к времени
            updateData(time, code, data, originalTime)
        }
        setCreateInput([])
        setAlertForCreate(false)
    }

    async function setNewData(time, code, data, originalTime) {
        await setDoc(doc(firestore, "dates&times", time), {
            [code]: [data],
            [code+"time"]:[originalTime]
        }).then(getMes)
    }

    async function updateData(time, code, data, originalTime) {
        // if (inputValue !== '') {
            console.log(time, code, data, originalTime)
        await updateDoc(doc(firestore, "dates&times", time), {
            [code]: [data],
            [code+"time"]:originalTime,
        }).then(getMes)
        // }

    }

    function nextWeek() {
        let arr = week.map(item => item + 7)
        setWeek(arr)
    }

    function prevWeek() {
        let arr = week.map(item => item - 7)
        setWeek(arr)
    }

    function screen(e) {
        console.log(e.type)
        console.log(e.target)
    }

    /////////движения мыши 
 
    function dragStartOnTel(e) {
        xANDxForTell[0] = e.touches[0].screenX
        xANDxForTell[1] = e.touches[0].screenY
    }

    function dragEndOnTel(e) {
        if (e.touches[0].screenX > xANDxForTell[0] && (e.touches[0].screenX / xANDxForTell[0]) >= 1.7 && ((e.touches[0].screenY > xANDxForTell[1] && (e.touches[0].screenY / xANDxForTell[1]) <= 1.2) || (e.touches[0].screenY < xANDxForTell[1] && (xANDxForTell[1] / e.touches[0].screenY) <= 1.2))) {
            xANDxForTell[2] = 'prev'
        }
        if (e.touches[0].screenX < xANDxForTell[0] && (xANDxForTell[0] / e.touches[0].screenX) >= 1.7 && ((e.touches[0].screenY > xANDxForTell[1] && (e.touches[0].screenY / xANDxForTell[1]) <= 1.2) || (e.touches[0].screenY < xANDxForTell[1] && (xANDxForTell[1] / e.touches[0].screenY) <= 1.2))) {
            xANDxForTell[2] = 'next'
        }
    }


    function clockScreen(e) {
        if (e.target.id === "close") {
            setAlert(false)
            setAlertForCreate(false)
            setInputValue('')
        }
    }

    function handleChange(e) {
        setInputValue(e.target.value)
        console.log(inputValue)
    }

    function handleChange1(e) {
        if (e.target.type === "time") {
            inputForCreate[0] = e.target.value
            let тольковремя = e.target.value.split(":")
            let часы = тольковремя[0] + ":00"
            // inputForCreate[0] = часы
            

            inputForCreate[3] = true
            Object.keys(database).forEach(key => {
                if (key === часы) {
                    return inputForCreate[3] = false
                }
            })
        }
        if (e.target.type === "date") {
            let толькодата = e.target.value.split("-")
            let YYYY; let MM; let DD
            if (толькодата[0][0] === "0") { YYYY = толькодата[0].replace(/[0]/, '') } else { YYYY = толькодата[0] }
            if (толькодата[1][0] === "0") { MM = толькодата[1].replace(/[0]/, '') - 1 } else { MM = толькодата[1] - 1 }
            if (толькодата[2][0] === "0") { DD = толькодата[2].replace(/[0]/, '') } else { DD = толькодата[2] }
            let code = `${DD}` + `${MM}` + `${YYYY}`
            inputForCreate[1] = code
        }
        if (e.target.type === "text" || e.target.type === "textarea") {

            inputForCreate[2] = e.target.value
        }

    }

    return (
        <Background onClick={(e) => clockScreen(e)}>
            <CalendarBlock onTouchMove={(e) => dragEndOnTel(e)}>
                <Title >
                    <img src={Logo1}/>
                    {/* <span onClick={() => console.log(database)}><Hr1></Hr1>Interview<Secword>Calendar</Secword><Hr2></Hr2> </span> */}
                    <RedText onClick={() => setAlertForCreate(true)}>+</RedText>
                </Title>
                <Days>
                    <StyledForGrid>
                        {GetDays()["Days"].map(item => {
                            if (today.getDate() === item && today.getMonth() === GetDays()["Month"]) {

                                return <WeekDayWithDay >
                                    <TodayDayTitle >{titleOfWeeksDay[GetDays()["Days"].indexOf(item) + 1]}</TodayDayTitle>
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
                    <span><Secword>{months[GetDays()["Month"]]}</Secword> <Wirstword>{GetDays()["Year"]}</Wirstword></span>
                    <RedText onClick={nextMonth}>{">"}</RedText>
                </Month>
                <Main onTouchStart={(e) => dragStartOnTel(e)} onTouchEnd={() => { if (xANDxForTell[2] === 'next') { setxANDxForTell([]); nextWeek() } if (xANDxForTell[2] === 'prev') { setxANDxForTell([]); prevWeek() } }}>
                    {renderCell()}
                </Main>
                <Footer>
                    <span onClick={swichOnToday}>Today</span>
                    <Secword>{canDelete[0] && <span onClick={() => deleteData(canDelete[1], canDelete[2])}>Delete</span>}</Secword>
                </Footer>
            </CalendarBlock>
            {activeAlert && <AlertWindow className="alert">
                <HeaderForAlert>
                    <DateAndTimeInAlert>
                        {activeCell[2]} => {activeCell[1]}
                      
                    </DateAndTimeInAlert>

                    <Close id="close" onClick={() => setAlert(false)} src={close} ></Close>
                </HeaderForAlert>
                <MainForAlert>
                 

                    <TextareaAutosize
                        disabled={0}
                        style={{
                            "border-radius": "10px",
                            "background": "rgba(189, 189, 189, 1)"
                        }}
                        minRows={1}
                        maxRows={20}
                        onChange={(e) => handleChange(e)}>{database[activeCell[0]][activeCell[1]]}
                    </TextareaAutosize>
                   

                </MainForAlert>
                <FooterForAlert>
                    <span onClick={() => updateData(activeCell[0], activeCell[1], inputValue, activeCell[2])}>Update</span>
                    <Secword>{canDelete[0] && <span onClick={() => deleteData(canDelete[1], canDelete[2])}>Delete</span>}</Secword>




                </FooterForAlert>
            </AlertWindow>}



            {/* Добавление через + */}
            {activeAlertForCreate && <AlertWindow className="alert">
                <HeaderForAlert>
                    <DateAndTimeInAlert>
                        <span>Заполните время, дату</span>
                    </DateAndTimeInAlert>

                    <Close id="close" onClick={() => setAlert(false)} src={close} ></Close>
                </HeaderForAlert>
                <MainForAlert>
                   
                    <form>
                        <input type="time" onChange={(e) => handleChange1(e)} ></input>
                        <input type="date" in="123" onChange={(e) => handleChange1(e)} ></input>
                        <TextareaAutosize
                            placeholder="и то, что хотите сохранить"
                            disabled={0}
                            style={{
                                "border-radius": "10px",
                                "background": "rgba(189, 189, 189, 1)"
                            }}
                            minRows={1}
                            maxRows={20}
                            onChange={(e) => handleChange1(e)}>
                        </TextareaAutosize>
                    </form>
                </MainForAlert>
                <FooterForAlert>
                    <span onClick={() => sendMes(inputForCreate[3], inputForCreate[0].split(":")[0] + ":00", inputForCreate[1], inputForCreate[2], inputForCreate[0])}>Create</span>
                </FooterForAlert>
            </AlertWindow>}
        </Background>

    )
}














/////oldCode
// async function addNewInterview() {

    //     let eventTime = prompt('Enter event time:\n YYYY-MM-DD HH:mm:ss', `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 00:10:00`);
    //     let regexp = /[0-9]{4}[-]{1}[0-1]{0,1}[0-9]{1}[-]{1}[0-3]{0,1}[0-9]{1}[\s]{1}[0-2]{0,1}[0-9]{1}[:]{1}[0-5]{0,1}[0-9]{1}[:]{1}[0-9]{2}/gu;
    //     if (eventTime.match(regexp)[0] !== eventTime) {
    //         return alert("Данные введены неверно")
    //     }
    //     let датаивремя = eventTime.split(" ")
    //     let толькодата = датаивремя[0].split("-")
    //     let YYYY
    //     let MM
    //     let DD
    //     if (толькодата[0][0] === "0") { YYYY = толькодата[0].replace(/[0]/, '') } else { YYYY = толькодата[0] }
    //     if (толькодата[1][0] === "0") { MM = толькодата[1].replace(/[0]/, '') - 1 } else { MM = толькодата[1] - 1 }
    //     if (толькодата[2][0] === "0") { DD = толькодата[2].replace(/[0]/, '') } else { DD = толькодата[2] }
    //     if (MM + 1 > 12) {
    //         return alert("Неверно введен месяц")
    //     }
    //     let helpdate = 32 - new Date(YYYY, MM, 32).getDate();
    //     if (DD > helpdate) {
    //         return alert("Неверно введен день")
    //     }
    //     let code = `${DD}` + `${MM}` + `${YYYY}`
    //     let тольковремя = датаивремя[1].split(":")
    //     let часы = тольковремя[0] + ":00"


    //     let a = true
    //     Object.keys(database).forEach(key => {
    //         // if (key === часы && database[key].hasOwnProperty(code)) {
    //         //     return a = false
    //         // }
    //         if (key === часы) {
    //             return a = false
    //         }
    //     })
    //     sendMes(a, часы, code, датаивремя[1])
    // }