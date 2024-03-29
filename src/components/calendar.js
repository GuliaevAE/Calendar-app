import React, { useState, useEffect, useContext, useRef } from "react";
import styled, { css, keyframes } from 'styled-components'
import leftArrow from '../components/images/LeftAr2.svg'
import ShortLogo from '../components/images/ShortLogo.svg'
import leftAr from '../components/images/LeftAr1.svg'
import profile from '../components/images/profileчб.svg'
import exit2 from '../components/images/exitчб.svg'
import fileadd from '../components/images/addчб.svg'
import RobotoWoff2 from '../components/IMFellFrenchCanonSC-Regular.ttf'
import { doc, setDoc, getDocs, updateDoc, deleteField, collection, query } from "firebase/firestore";
import { Context } from "../index";
import TextareaAutosize from 'react-textarea-autosize';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fadeIn } from 'react-animations';

import '../components/calendar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


////animation
const fader = keyframes(fadeIn);


const Background = styled.div`
display: flex;
align-items: center;
background:black ;
flex-flow: column nowrap;
height: 100vh; 
width: 100vw ; 
justify-content:center ;
background:rgba(124, 124, 124, 1);
animation: 1s ${fader} alternate;

@media screen and (orientation: landscape) {
  
   flex-flow: row wrap;
  
  
}
`

const CalendarBlock = styled.div`
width:100% ;
position:relative ;

overflow: hidden;
@media screen and (orientation: landscape) {
   width:92% ;
  
}
`

const Title = styled.div`
@font-face {
  font-family: 'Roboto Condensed';
  src: url(${RobotoWoff2}) format('ttf'); 
}
    
    img{
        height:100% ;
        width:100% ;
    }

    button{
    border:3px solid rgba(7, 195, 255, 1);
    border-radius:10px ;
    background: transparent ;
    color: rgba(7, 195, 255, 1);
    height:7vh ;
    width:100% ;
    margin-left:2vw;
    transition: background 0.5s;
    font-size:4vh ;
    display:flex ;

    &:hover{
        background:rgba(7, 195, 255, 1);
        color:rgba(124, 124, 124, 1) ;
    }

    @media screen and (orientation: landscape) {
        margin-left:0;
        height:30% ;
        width:100% ;
        margin-top:10px;
        /* writing-mode: vertical-lr;  */
        text-align:center;
        /* transform:rotate(180deg) ; */
     /* text-orientation: upright; */
     
        
    }

    }
     

height: 10vh;
background:rgba(124, 124, 124, 1) ;
color:white ;
display:flex ;
width:100% ;
justify-content:space-between ;
align-items:center ;
padding-left:2.5vw ;
padding-right:2.5vw ;
padding-top:1vh ;
padding-bottom:1vh ;
box-sizing:border-box;
font-family: 'Roboto Condensed' ;
@media screen and (orientation: landscape) {
   flex-direction:column ;
   width:8% ;
   height: 100%;
   padding-left:1vw ;
   padding-right:1vw ;
   justify-content: center;
   align-items:space-between ;
}
`
const TitleLogo = styled.img`
    height:100% ;
    width:100% ;
    @media screen and (orientation: landscape) {
    transform:rotate(90deg) ;
   height:100% ;
   width:30vh ;
    
}
`

TitleLogo.defaultProps = {
    src: ShortLogo
}

const LeftAr = styled.img`
height:70% ;
transition: margin .1s;
&:hover{
    margin:0 20px ;
}
`

LeftAr.defaultProps = {
    src: leftAr
}
const RightAr = styled(LeftAr)`
transform: rotate(180deg);
`
RightAr.defaultProps = {

    src: leftAr
}


const Secword = styled.span`
color: rgba(7, 195, 255, 1);
`
const Wirstword = styled(Secword)`
color: white;
`

const Days = styled.div`
height: 5vh;
font-size:2vh;
box-sizing:border-box ;
background:rgba(124, 124, 124, 1);

@font-face {
  font-family: 'Roboto Condensed';
  src: url(${RobotoWoff2}) format('ttf');
       
}
font-family: 'Roboto Condensed' ;
@media screen and (orientation: landscape) {
    height: 7vh;
    font-size:3vh;
    
}
`

const Month = styled(Days)` 
display:flex ;
justify-content: center ;
align-items:center ;
padding-left:40px ;
padding-right:40px ;

img{
    margin: 0 10px ;
}
`

const Main = styled.div`
padding-top:1.9vh ;
height:75vh ;
background:white ;
overflow-y:scroll;
box-sizing:border-box;
::-webkit-scrollbar { width: 0; }
@media screen and (orientation: landscape) {
    height: 79vh;
    border-radius: 10px 0  0 10px ;
}
`

const Footer = styled(Days)`
display:flex ;
justify-content:space-between ;
padding-left:2vw ;
padding-right:2vw ;
align-items:center ;
color:white ;
font-size:2.7vh ;


@media screen and (orientation: landscape) { 
    font-size:3.5vh;
}
`

const WeekDayWithDay = styled.div`
display:flex ;
flex-direction:column ;
font-size:2vh;
text-align:center ;
align-items:center ;
position:relative ;
@media screen and (orientation: landscape) {
    
    font-size:3vh;
}
`


const StyledForGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
padding-left:6.7vh ;
position: relative ;
@media screen and (orientation: landscape) {
padding-left:8vh ;
}
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
transition: background 0.5s;
@media screen and (orientation: landscape) {
    height: 7vh;
  
}
`

const StyledForGridCellWithTimes = styled.div`
font-size:2vh;
position:absolute ;
top: -1.5vh;
left: 1vh;
color: rgba(190, 190, 191, 1) ;
@media screen and (orientation: landscape) {
    
    font-size:2.5vh;
}
`

const DayFrame = styled.div`
width :2vh;
height:2vh;
display:flex ;
align-items:center ;
justify-content:center ;
color: white;
`
const DayTitle = styled.div`
color: white;
`

const TodayFrame = styled(DayFrame)`
border-radius:50%;
color: rgba(7, 195, 255, 1);
`


const TodayDayTitle = styled(DayTitle)`
color: rgba(7, 195, 255, 1);
`


const Arrow = styled.img`
opacity:1 ;
width:4vh ;
height:5vh;
transition: margin .1s;
&:hover{
    margin:0 20px ;
}

`



export default function Calendar1() {
    ///////////////////////////////////////////////////////////
    /////////место для чужого календаря
    const [arrayguest, setArrayGuest] = useState([])
    const [guestUid, setGuest] = useState('Выберите из списка')
    const [databaseForGuest, setDataForGuest] = useState({})
    const [activeAlertForGuest, setAlertForGuest] = useState(false)

    async function getMesForGuest() {

        let p1 = {}
        let mes = await getDocs(query(collection(firestore, guestUid)))
        mes.forEach((doc) => {
            p1[doc.id] = doc.data()
        })
        setDataForGuest(p1)
    }

    const [activeCellForGuest, setActiveForGuest] = useState([0, 0])
    const [emailInput, setEmail] = useState('')

    ///////////////////////////////////////////////////////////

    const [error, seterror] = useState('')
    const timeInput = useRef(null);
    const dateInput = useRef(null);
    const textInput = useRef(null);

    const { auth } = useContext(Context)
    const user = useAuthState(auth)
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
        getMesForGuest()
    }, [cutout])

    useEffect(() => {

        getMesForGuest()
    }, [guestUid])

    async function getMes() {
        let p1 = {}
        let mes = await getDocs(query(collection(firestore, user[0].uid)))
        mes.forEach((doc) => {
            p1[doc.id] = doc.data()
        })
        setData(p1)
        if (p1.openAsGuest) {
            setArrayGuest(p1.openAsGuest)
        }

        ///////////////////////////////
    }

    const [week, setWeek] = useState([0, 7])
    const [canDelete, setCanDelete] = useState([false, 0, 0])
    const [today] = useState(new Date())
    const [activeCell, setActive] = useState([0, 0])



    function renderCell(clientORguest = true) {
        let db = clientORguest ? database : databaseForGuest
        let clORgs = clientORguest
        let whatModal = clientORguest ? "#exampleModal" : "#guestModal"
        let aC = clientORguest ? activeCell : activeCellForGuest

        let helpArray = []
        let arrayWithTime = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
        let theDay = new Date()

        theDay.setDate(theDay.getDate() + week[0])

        for (let i = 0; i < 7; i++) {
            let MM; let DD
            if (theDay.getMonth() < 10) { MM = `0${theDay.getMonth()}` } else { MM = theDay.getMonth() }
            if (theDay.getDate() < 10) { DD = `0${theDay.getDate()}` } else { DD = theDay.getDate() }
            let code = `${DD}` + `${MM}` + `${theDay.getFullYear()}`
            helpArray.push(code)
            theDay.setDate(theDay.getDate() + 1)
        }

        let arraWithCellsRow = arrayWithTime.map(times => {
            return (<StyledForGrid id={times}>
                <StyledForGridCellWithTimes>
                    {times}
                </StyledForGridCellWithTimes>
                {helpArray.map(item => {
                    return <StyledForGridCell onClick={(e) => canDeleteOrNot(times, item, clORgs)} id={item}>{
                        aC[0] === times && aC[1] === item ? <BackForCell data-bs-toggle="modal" data-bs-target="#exampleModal" id="gridCell" bg="rgba(7, 195, 255, 1)" /> :
                            db[times] && db[times][item] ? <BackForCell data-bs-toggle="modal" data-bs-target={whatModal} id="gridCell" bg="rgba(124, 124, 124, 1)" /> :
                                <BackForCell id="gridCell" bg="white" />
                    }
                    </StyledForGridCell>
                })}
            </StyledForGrid>)
        })

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
        'Сб',
        'Вс',
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт'
    ]

    let titleOfWeeksDay = []


    function canDeleteOrNot(time, code, clientORguest) {
        let db = clientORguest ? database : databaseForGuest
        let aAlert = clientORguest ? activeAlert : activeAlertForGuest
        let sA = clientORguest ? setActive : setActiveForGuest


        if (aAlert === false) {
            if (db[time] && db[time][code] && db[time][`${code}time`]) {
                sA([time, code, db[time][`${code}time`]])
                setInputValue(db[time][code])
                clientORguest ? setCanDelete([true, time, code]) : setCanDelete([false, time, code])
                clientORguest ? setAlert(true) : setAlertForGuest(true)
            } else
                if (database[time] && db[time][code]) {
                    sA([time, code])
                    setInputValue(db[time][code])
                    setCanDelete([true, time, code])
                    clientORguest ? setAlert(true) : setAlertForGuest(true)
                } else {
                    setCanDelete([false, time, code])
                    sA([0, 0])
                }
        }
    }

    async function deleteData(time, code) {
        setAlert(false)
        await updateDoc(doc(firestore, user[0].uid, time), {
            [code]: deleteField(),
            [code + "time"]: deleteField(),
        });
        setCanDelete(canDelete[0] = false)
        setActive([0, 0])
        setout(!cutout)
        setAlert(false)
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
        let theDate = new Date()

        function nextDay() {
            theDate.setDate(theDate.getDate() + week[0])
            arrayFilling()
            function arrayFilling() {

                if (arrayWithWeekDays[theDate.getDay()] !== 'Вс') {
                    let arr1 = week.map(item => item - 1)
                    setWeek(arr1)
                } else {
                    for (let i = 0; i < 7; i++) {
                        if (i === 1) { m = theDate.getMonth() }
                        arr.push(theDate.getDate())
                        titleOfWeeksDay.push(arrayWithWeekDays[theDate.getDay()])
                        theDate.setDate(theDate.getDate() + 1)
                    }
                }
            }

            y = theDate.getFullYear()
        }
        nextDay()
        return { "Days": arr, "Month": m, "Year": y }
    }

    function swichOnToday() {
        setWeek([0, 0])
    }

    async function sendMes(nw, time, code, data, originalTime) {
        if (nw === true) {
            // добавление времени
            setNewData(time, code, data, originalTime)
        } else {
            // добавление дня к времени
            updateData(time, code, data, originalTime)
        }
        setAlertForCreate(false)
    }

    function deleteInputsValue() {
        inputForCreate = []
        setCreateInput([])
        timeInput.current.value = '';
        dateInput.current.value = '';
        textInput.current.value = ''
    }

    function afterDataSaved() {
        seterror('Данные сохранены')
        setTimeout(() => seterror(''), 1000)
        deleteInputsValue()
    }

    async function setNewData(time, code, data, originalTime = false) {
        if (originalTime) {
            await setDoc(doc(firestore, user[0].uid, time), {
                [code]: [data],
                [code + "time"]: [originalTime]
            }).then(getMes).then(afterDataSaved)
        } else {
            await setDoc(doc(firestore, user[0].uid, time), {
                [code]: data,

            }).then(getMes).then(afterDataSaved)
        }

    }

    async function updateData(time, code, data, originalTime = false) {
        if (originalTime) {
            await updateDoc(doc(firestore, user[0].uid, time), {
                [code]: [data],
                [code + "time"]: originalTime,
            }).then(getMes).then(afterDataSaved)
        } else {
            await updateDoc(doc(firestore, user[0].uid, time), {
                [code]: data,

            }).then(getMes).then(afterDataSaved)
        }
    }

    function nextWeek() {
        let arr = week.map(item => item + 7)
        setWeek(arr)
    }

    function prevWeek() {
        let arr = week.map(item => item - 7)
        setWeek(arr)
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
            setAlertForGuest(false)
            setAlertForCreate(false)
            setInputValue('')
        }
    }

    function handleChange(e) {
        setInputValue(e.target.value)
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
            YYYY = толькодата[0]
            if (толькодата[1][0] === "0") { MM = `0${толькодата[1] - 1}` } else { MM = толькодата[1] - 1 }
            DD = толькодата[2]
            let code = `${DD}` + `${MM}` + `${YYYY}`
            inputForCreate[1] = code
        }
        if (e.target.type === "text" || e.target.type === "textarea") {
            inputForCreate[2] = e.target.value
        }
    }

    function timeoutError() {
        seterror('Неправильно введены данные')
        setTimeout(() => seterror(''), 1000)
    }

    async function canBeGuestFor() {

        const docSnap = await getDocs(query(collection(firestore, emailInput)))
        let y = false
        async function isemail() {
            if (!database.openAsGuest) { await setDoc(doc(firestore, user[0].uid, "openAsGuest"), {}) }
            Object.keys(database.openAsGuest).forEach(key => {

                if (database.openAsGuest[key] === emailInput) {
                    y = true
                }
            })
        }
        isemail()

        if (y) {
            seterror('Доступ уже есть')
            setTimeout(() => seterror(''), 1000)
        } else
            if (docSnap.empty) {
                seterror('Такого аккаунта не существует')
                setTimeout(() => seterror(''), 1000)
            } else {
                sendMes(database.openAsGuest ? false : true, 'openAsGuest', emailInput, emailInput, false)
            }
    }

    return (
        <Background onClick={(e) => clockScreen(e)}>
            <Title >

                {/* <TitleLogo small={false} data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" /> */}

                <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"> <img src={profile}></img></button>
                {/* <div style={{ width: "50%" }}> */}
                <button data-bs-toggle="modal" data-bs-target="#createModal" onClick={() => setAlertForCreate(true)}><img src={fileadd}></img></button>
                <button onClick={() => auth.signOut()}><img src={exit2}></img></button>
                {/* </div> */}

            </Title>
            <CalendarBlock onTouchMove={(e) => dragEndOnTel(e)}>

                <Days >
                    <StyledForGrid>
                        {GetDays()["Days"].map(item => {
                            if (today.getDate() === item && ((today.getDay() === GetDays()["Days"].indexOf(item) + 1)|| (today.getDay() === 0 &&GetDays()["Days"].indexOf(item) + 1 ===7)) && (today.getMonth() === GetDays()["Month"] || today.getMonth() - 1 === GetDays()["Month"])) {
                                // 
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
                    </StyledForGrid>
                </Days>
                <Month>

                    <Arrow onClick={prevWeek} src={leftArrow} ></Arrow>
                    <LeftAr onClick={prevMonth}></LeftAr>
                    <span><Secword>{months[GetDays()["Month"]]}</Secword> <Wirstword>{GetDays()["Year"]}</Wirstword></span>
                    <RightAr onClick={nextMonth}></RightAr>
                    <Arrow onClick={nextWeek} src={leftArrow} style={{ transform: "rotate(180deg)" }}></Arrow>
                </Month>
                <Main onTouchStart={(e) => dragStartOnTel(e)} onTouchEnd={() => { if (xANDxForTell[2] === 'next') { setxANDxForTell([]); nextWeek() } if (xANDxForTell[2] === 'prev') { setxANDxForTell([]); prevWeek() } }}>
                    {renderCell()}
                </Main>
                <Footer>
                    <span onClick={swichOnToday}>Today</span>
                    <Secword>{canDelete[0] && <span onClick={() => deleteData(canDelete[1], canDelete[2])}>Delete</span>}</Secword>
                </Footer>
            </CalendarBlock>

            {/* ////////////для клиента///////////////// */}
            <div className="modal fade " data-bs-backdrop="static" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{activeCell[2]} {activeCell[1][0]}{activeCell[1][1]}  {months[+`${activeCell[1][2]}${activeCell[1][3]}`]} {+`${activeCell[1][4]}${activeCell[1][5]}${activeCell[1][6]}${activeCell[1][7]}`}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setAlert(false)}></button>
                        </div>
                        <div className="modal-body">
                            {activeAlert && <TextareaAutosize
                                disabled={0}
                                style={{
                                    borderRadius: "5px",
                                    width: "100%",
                                    border: 0,
                                    resize: "none",
                                    background: "rgb(200, 200, 200)",
                                }}
                                minRows={1}
                                maxRows={20}
                                onChange={(e) => handleChange(e)}>{database[activeCell[0]][activeCell[1]]}
                            </TextareaAutosize>}

                        </div>
                        <div className="modal-footer" style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between" }}>
                            <div>
                                <button type="button" className="btn btn-secondary" style={{ marginRight: "10px" }} onClick={() => {
                                    updateData(activeCell[0], activeCell[1], inputValue, activeCell[2]); seterror('Обновлено')
                                    setTimeout(() => seterror(''), 1000)
                                }}>Update</button>
                                {canDelete[0] && <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => deleteData(canDelete[1], canDelete[2])}>Delete</button>}
                            </div>
                            {error === "Обновлено" ? <div className="spinner-border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </div> : error}
                        </div>
                    </div>
                </div>
            </div>


            {/* Добавление через + */}
            <div className="modal fade " data-bs-backdrop="static" id="createModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Заполните время, дату</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setAlert(false); deleteInputsValue() }}></button>
                        </div>
                        <div className="modal-body" >
                            <form style={{ display: "flex", flexDirection: "column" }}>
                                <input style={{
                                    borderRadius: "5px",
                                    width: "100%",
                                    marginBottom: "10px",
                                    border: 0,
                                    resize: "none",
                                    background: "rgb(200, 200, 200)",
                                }} ref={timeInput} type="time" onChange={(e) => handleChange1(e)} ></input>
                                <input style={{
                                    borderRadius: "5px",
                                    marginBottom: "10px",
                                    border: 0,
                                    resize: "none",
                                    background: "rgb(200, 200, 200)",
                                }} ref={dateInput} type="date" in="123" onChange={(e) => handleChange1(e)} ></input>
                                <TextareaAutosize
                                    ref={textInput}
                                    placeholder="И то, что хотите сохранить..."
                                    disabled={0}
                                    style={{
                                        borderRadius: "5px",
                                        width: "100%",
                                        border: 0,
                                        resize: "none",
                                        background: "rgb(200, 200, 200)",
                                    }}
                                    minRows={1}
                                    maxRows={15}
                                    onChange={(e) => handleChange1(e)}>
                                </TextareaAutosize>

                            </form>

                        </div>
                        <div className="modal-footer" style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between" }} onClick={() => { }}>

                            <button type="button" className="btn btn-secondary" onClick={(e) => { (inputForCreate[0] && inputForCreate[1] && inputForCreate[2]) ? sendMes(inputForCreate[3], inputForCreate[0].split(":")[0] + ":00", inputForCreate[1], inputForCreate[2], inputForCreate[0]) : timeoutError() }}>Create</button>
                            {error}
                        </div>
                    </div>
                </div>
            </div>

            {/* //вне холста */}
            {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Переключатель вверху offcanvas</button> */}

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasTopLabel">Профиль</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-sm-3">
                                <img src={user[0].photoURL} style={{ minWidth: "50px" }} alt="img" className="img-fluid" />
                            </div>
                            <div className="col-sm-9">
                                <span className="d-block">{user[0].displayName}</span>
                                <span className="d-block">{user[0].email}</span>
                                ID:<span className="text-danger">{user[0].uid}</span>
                            </div>

                        </div>
                        <div className="dropdown mb-3">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {guestUid}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {Object.keys(arrayguest).map(key => <li key={key} onClick={() => { setGuest(arrayguest[key]); setActiveForGuest([0, 0]) }} className="dropdown-item" >{key}</li>)}
                                <li key={"Введите ID получателя"} className="dropdown-item" onClick={() => setGuest("Введите ID получателя")} >Добавить календарь</li>

                            </ul>
                        </div>




                        {guestUid === "Введите ID получателя" && <><div className="row"><input type="email" value={emailInput} onChange={(e) => setEmail(e.target.value)}></input>

                            <button className="btn btn-md btn-info mt-1" onClick={() => canBeGuestFor()}>Отправить</button>
                            {error}</div>
                        </>
                        }

                        {guestUid !== "Выберите из списка" && guestUid !== "Введите ID получателя" && <CalendarBlock style={{ borderRadius: "10px" }} onTouchMove={(e) => dragEndOnTel(e)}>
                            <Days >
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
                                </StyledForGrid>
                            </Days>
                            <Month>
                                <Arrow onClick={prevWeek} src={leftArrow} ></Arrow>
                                <LeftAr onClick={prevMonth}></LeftAr>
                                <span><Secword>{months[GetDays()["Month"]]}</Secword> <Wirstword>{GetDays()["Year"]}</Wirstword></span>
                                <RightAr onClick={nextMonth}></RightAr>
                                <Arrow onClick={nextWeek} src={leftArrow} style={{ transform: "rotate(180deg)" }}></Arrow>
                            </Month>
                            <Main onTouchStart={(e) => dragStartOnTel(e)} onTouchEnd={() => { if (xANDxForTell[2] === 'next') { setxANDxForTell([]); nextWeek() } if (xANDxForTell[2] === 'prev') { setxANDxForTell([]); prevWeek() } }}>
                                {renderCell(false)}
                            </Main>
                            <Footer>
                                <span onClick={swichOnToday}>Today</span>

                            </Footer>
                        </CalendarBlock>}

                    </div>
                </div>

                {/* ///////////////////для гостя////////////////// */}
                <div className="modal fade " data-bs-backdrop="static" id="guestModal" tabIndex="-1" aria-labelledby="guestModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="guestModalLabel">{activeCellForGuest[2]}  {months[+`${activeCellForGuest[1][2]}${activeCellForGuest[1][3]}`]} {+`${activeCellForGuest[1][4]}${activeCellForGuest[1][5]}${activeCellForGuest[1][6]}${activeCellForGuest[1][7]}`}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setAlertForGuest(false)}></button>
                            </div>
                            <div className="modal-body">
                                {activeAlertForGuest && <TextareaAutosize
                                    disabled={true}
                                    style={{
                                        borderRadius: "5px",
                                        width: "100%",
                                        border: 0,
                                        resize: "none",
                                        background: "rgb(200, 200, 200)",
                                    }}
                                    minRows={1}
                                    maxRows={20}
                                    onChange={(e) => handleChange(e)}>{databaseForGuest[activeCellForGuest[0]][activeCellForGuest[1]]}
                                </TextareaAutosize>}

                            </div>
                            <div className="modal-footer" style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between" }}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Background>

    )
}
