import { useEffect, useRef, useState } from "react";
import { UserTableProvider } from "../context/UserTableContext";
import ModifyTimeTableModal from "../components/ModifyTimeTableModal";
import { useUserTableState, useUserTableDispatch} from '../context/UserTableContext';
import styled from "styled-components";
// import KwangWoon_Logo from '../components/image/KwangWoon_Logo.png'

// const Logo_Image = styled.div`
//     width: 200px;
//     height: 200px;
//     border-radius: 50%;
//     overflow: hidden;
// `;
const Total_Container = styled.div`
    // width: 650px;
    // height: 800px;
    // display: flex;
    // flex-direction: column;
    // border: 2px solid black;
    // border-radius: 20px;
`;

const Select = styled.select`
    width: 100px;
    height: 25px;
    margin-right: 10px;
`

const Select_Semester = styled.div`
    display: flex;
    width: 600px;
    height: 100px;
`;

const Time_table_list = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    width: 600px;
    height: 700px;
`;

const Time_table_box = styled.div`
    width: 160px;
    height: 140px;
    border: 2px solid black;
    border-radius: 20px;
    margin: 10px;
`;

const Add_Button_Box = styled.div`
    width: 180px;
    height: 160px;
    border: 2px solid black;
    border-radius: 20px;
    margin: 10px;
`;

const Add_Button = styled.button`
    width: 60px;
    height: 60px;
    border: 2px solid black;
    border-radius: 10px;
    margin: 10px;
`;

function Time_Table_Menu(){

    const userTableDispatch = useUserTableDispatch(); //
    const userTableState = useUserTableState();
    
                                                                // JSON.parse(localStorage.getItem('시간표'))를 하면 새로고침을 해도 유지가 됨, 다만 일부 버그가 존재
                                                                // useRef를 사용해도 될까?


    const nextNumber = useRef(2);
    const selectTimeTableOption = useRef(null);
    const isFirstAddTable = useRef(true);
    
    
    const selectTimeTable = (e) => {
        
        const idx = e.target.selectedIndex;
        const option = e.target.querySelectorAll('option')[idx];
        const name = option.getAttribute('name');

        userTableDispatch({
            type: 'READ_TABLE',
            id: parseInt(e.target.value),
        });  
    };

    const addTimeTable = () => {

        nextNumber.current += 1;

        userTableDispatch({
            type: 'CREATE_TABLE', 
            timeTable: {
                id: nextNumber.current,
                tableName: `시간표${nextNumber.current}`,
                lectureList: [],
            },
            selectedId: nextNumber.current,
        });

        isFirstAddTable.current = false;
    };

    const deleteTimeTable = () => {
        userTableDispatch({
            type: 'DELETE_TABLE',
            id: parseInt(selectTimeTableOption.current.value),
        });

        console.log(userTableState.totalTimeTable);
    };


    useEffect(() => {
        if(!isFirstAddTable.current){
            selectTimeTableOption.current.defaultValue=userTableState.totalTimeTable[userTableState.totalTimeTable.length-1].id;
            selectTimeTableOption.current.value=userTableState.totalTimeTable[userTableState.totalTimeTable.length-1].id;
        }
    }, [userTableState.totalTimeTable]);  /// table select바 렌더링 처리



    const [isModifyTimeTable, setIsModifyTimeTable] = useState(false);

    const handleClick = () => {
        setIsModifyTimeTable(true);
    }



    return (
        <Total_Container>
            <UserTableProvider>
            <Select_Semester>
                <Select ref={selectTimeTableOption} defaultValue={userTableState.totalTimeTable_big[0].id} 
                key={userTableState.totalTimeTable_big[0].id} onChange={selectTimeTable}>
                    {userTableState.totalTimeTable_big.map((table)=> { return (
                        <option value={table.id} key={table.id}> {table.year} </option>
                    )})}
                </Select>
                <Select ref={selectTimeTableOption} defaultValue={userTableState.totalTimeTable_big[0].id} 
                key={userTableState.totalTimeTable_big[0].id} onChange={selectTimeTable}>
                    {userTableState.totalTimeTable_big.map((table)=> { return (
                        <option value={table.id} key={table.id}> {table.semester} </option>
                    )})}
                </Select>
            </Select_Semester>
            <Time_table_list>
                {userTableState.totalTimeTable.map((table)=> { return (
                    <Time_table_box value={table.id} key={table.id}> {table.tableName} </Time_table_box>
                )})}
                <Time_table_box>
                    <h1>추천 시간표</h1>
                </Time_table_box>
                <Add_Button onClick={addTimeTable}>+</Add_Button>
            </Time_table_list>
            </UserTableProvider>
        </Total_Container>
    );

}

export default Time_Table_Menu;