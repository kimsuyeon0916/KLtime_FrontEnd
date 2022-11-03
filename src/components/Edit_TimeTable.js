import TimeTable from "../components/TimeTable";
import LectureList from "../components/LectureList";
import { useEffect, useState, useRef, useReducer, createContext } from "react";
import Search from "../components/Search";
import SelectTimeTable  from "../components/SelectTimeTable"
import { UserTableProvider } from "../context/UserTableContext";
import Time_Table_Menu from "../components/Time_Table_Menu";
import Time_Table_Detail from "../components/Time_Table_Detail";
import styled from "styled-components";

// [
//     {
//         id: "H030-2-0448-02",
//         lectureName: "디지털논리",
//         professor: "김진우",
//         department: "소프트웨어학부",
//         day: "월",
//         startTime: "15:00",
//         endTime: "16:30" ,
//         level: 2,
//         section: "전선",
//         credit: 3,
//         notes: ""
//     },
//     {
//     id: "H030-2-0448-02",
//     lectureName: "디지털논리",
//     professor: "김진우",
//     department: "소프트웨어학부",
//     day: "수",
//     startTime: "16:30",
//     endTime: "18:00" ,
//     level: 2,
//     section: "전선",
//     credit: 3,
//     notes: ""
//     }
// ],

const Total_Container = styled.div `
    display: flex;
`;

const Right_Container = styled.div `
    display: flex;
    flex-direction: column;
`;

const Left_Container = styled.div `
    display: flex;
`;

const testtotalLectures=[
    {
        id: "H030-2-0448-02",
        lectureName: "디지털논리",
        professor: "김진우",
        department: "소프트웨어학부",
        lectureTimes: [
            { day: "월", startTime: "15:00", endTime: "16:30" },
            { day: "수", startTime: "16:30", endTime: "18:00" },
        ],
        level: 2,
        section: "전선",
        credit: 3,
        notes: ""
    },
    {
        id: "0000-1-0670-01",
        lectureName: "법과생활",
        professor: "손명지",
        department: "전체공통",
        lectureTimes: [
            { day: "화", startTime: "08:00", endTime: "13:30" },
            { day: "목", startTime: "13:30", endTime: "15:00" },
        ],
        level: 1,
        section: "교선",
        credit: 3,
        notes: ""
    },
    {
        id: "H030-2-1183-01",
        lectureName: "이산구조",
        professor: "최민규",
        department: "소프트웨어학부",
        lectureTimes: [
            { day: "금", startTime: "9:00", endTime: "12:00" }
        ],
        level: 2,
        section: "전선",
        credit: 3,
        notes: ""
    },
    {
        id: "H030-2-3403-03",
        lectureName: "고급프로그래밍",
        professor: "이강훈",
        department: "소프트웨어학부",
        lectureTimes: [
            { day: "화", startTime: "16:30", endTime: "18:00" },
            { day: "목", startTime: "15:00", endTime: "16:30" },
        ],
        level: 2,
        section: "전선",
        credit: 3,
        notes: ""
    },
    {
        id: "H030-3-3663-01",
        lectureName: "데이터베이스",
        professor: "문승현",
        department: "소프트웨어학부",
        lectureTimes: [
            { day: "화", startTime: "15:00", endTime: "16:30" },
            { day: "목", startTime: "16:30", endTime: "18:00" },
        ],
        level: 3,
        section: "전선",
        credit: 3,
        notes: ""
    },
    {
        id: "H030-2-8484-01",
        lectureName: "리눅스활용실습",
        professor: "박병준",
        department: "소프트웨어학부",
        lectureTimes: [
            { day: "금", startTime: "15:00", endTime: "18:00" },
        ],
        level: 2,
        section: "전필",
        credit: 2,
        notes: ""
    },
    {
        id: "H040-2-9616-02",
        lectureName: "빅데이터언어",
        professor: "임동혁",
        department: "정보융합학부",
        lectureTimes: [
            { day: "월", startTime: "16:30", endTime: "18:00" },
            { day: "수", startTime: "15:00", endTime: "16:30" },
        ],
        level: 2,
        section: "일선",
        credit: 3,
        notes: ""
    },
    {
        id: "1160-1-3415-01",
        lectureName: "대학화학및실험1",
        professor: "양재규",
        department: "환경공학과",
        lectureTimes: [
            { day: "월", startTime: "09:00", endTime: "12:30" },
            { day: "수", startTime: "10:30", endTime: "12:00" },
        ],
        level: 1,
        section: "기필",
        credit: 3,
        notes: ""
    },
];




function MyTimeTable() {

    
    const [selectedLectures,setSelectedLectures]=useState([]);
    const [totalLectures, setTotalLectures]=useState(testtotalLectures);
    const [searchedLectures, setSearchedLectures]=useState(testtotalLectures);
    const [hoveredLecture,setHoveredLecture]=useState();


    
    return (
        <Total_Container>
            <UserTableProvider>
                <Right_Container>
                        <Search
                        totalLectures={testtotalLectures}
                        />
                        <LectureList />
                </Right_Container>
                <Left_Container>
                    <TimeTable
                    width={600}
                    height={250}
                    />
                </Left_Container>
            </UserTableProvider>
        </Total_Container>

    )
}



export default MyTimeTable;