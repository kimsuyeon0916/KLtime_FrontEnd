import Piechart from "../components/Graph";
import TimeTable from "../components/TimeTable";
import Small_info from "../components/Small_info";
import { UserTableProvider } from "../context/UserTableContext";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { call } from "../service/ApiService";
import { isOptionGroup } from "@mui/base";
import Klas from "../components/Klas";


const Head_line = styled.div`
    
    display:flex;
    justify-content:center;

    position: absolute;
    width: 100vw;
    height: 121px;
    left: 0px;
    top: 0px;

    background: #A7A7A7;
`;

const Head_component = styled.div`
    display:flex;    

    position: absolute;
    width: 1600px;
    
`;

const Logo_Image = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 249px;
    height: 72px;
    left: 50px;
    top: 24px;

    /* 학점-숫자 */

    border: 1px solid #5A5A5A;
`;

const Body_line = styled.div`
    display: flex;

    top:162px;
    position: relative;
    width: 100vw;
    height: 100vh;
    
    justify-content:center;

    z-index: 1;
`;


const Component_position = styled.div`
    display: flex;
    // flex-direction: column;

    position: relative;
    width: 1600px;
    height: 1100px;

    text-align: center;

    background: #FFFFFF;

    border: 1px solid #D9D9D9;
    border-radius: 10px;

    
`;

const Left_component = styled.div`
    display:flex;
    flex-direction: column;

    width: 680px;
    height: 100%;

    position: absolute;
    top:5%;
    left:2%;
    
`;


const Header_Chart_Box = styled.div`
    display:flex;
    
    width: 100%;
    height: 340px;

    position:absolute;
    margin-bottom: 30.8px;

    // border: 2px solid black;
    // justify-content: center;
    
`;

const Body_Chart_Box = styled.div`
    display:flex;
    flex-direction: column;
    width:100%;

    position:absolute;
    top: 381px;
    
    
`;

const Upper_Body_Chart_Box = styled.div`
    display:flex;
    width:100%;
`;


const Lower_Body_Chart_Box = styled.div`
    display:flex;
    width:667px;

    position:relative;
    top: 33px;
`;

const Small_Body_Chart_Box = styled.div`
    display:flex;
    flex-direction: column;
    width: 320px;
    height: 368px;
`;

const Su_Body_Chart_Box = styled.div`
    display:flex;
`;

const Sl_Body_Chart_Box = styled.div`
    display:flex;
`;

const Design_Box = styled.div`
    width:100%;
    background: #FFFFFF;
    border-radius: 50px;
    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
`;

const Right_component = styled.div`
    display:flex;
    flex-direction: column;

    width: 750px;

    position: relative;
    top: 150px;
    left: 50%;

    margin-right:20px;

`;

const TimeTableHeader = styled.div`
    position:absolute;

    display:flex;

    margin-bottom:100px;
`;

const TableName = styled.div`
    font-size:50px;
    font-weight: 900;
`;

const TimeTableBody = styled.div`
    
    position: absolute;

    top: 7%;
    width : 100%;
    height: 841px;

    background: #FFFFFF;

    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
`

const Klas_Box = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;

    position: fixed;
    z-index: 10;

    width: 50%;
    height: 60%;

    border-radius: 20px;

    background-color: pink;

    top:25%;
    left:25%;
`;

const P_Button = styled.button`
    display: flex;
    align-items:center;
    justify-content: center;
    width: 20px;
    height: 20px;
`;

function MainPage(){

    const [klas, setKlas] = useState(false);//Klas 연동하기

    const onClose = () => {
        setKlas(false);
    }

    const [data,setData]=useState(
        {
            "gradcondition": {
                "admissionYear": 999,
                "gradCredit": 999,
                "mainCredit": 999,
                "essBalCredit": 999,
                "basicCredit": 999,
                "multiCredit": null
            },
            "credit": {
                "totalCredit": 0,
                "mainCredit": 0,
                "multiCredit": 0,
                "essCredit": 0,
                "balCredit": 0,
                "basicCredit": 0,
                "mathCredit": 0,
                "scienceCredit": 0
            }
        }
    );

    useEffect(
        ()=>{
            const accessToken = localStorage.getItem("ACCESS_TOKEN");
            if (accessToken && accessToken !== null) {

                axios.get("http://localhost:8080/api/gradConditionAndCredit", {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Accept': '*/*',
                        'Authorization': "Bearer " + accessToken
                    }, withCredentials: true,
                }).then(res => {
                    setData(res.data);
                }
                );
            } else {
                window.location.href = "/Login"
            }
        }
    ,[]);
    

    return (
        <UserTableProvider>
            <Head_line>
                <Head_component>
                    <Logo_Image/>
                    <Small_info name="신재민" std_num={2021203022} klas={klas} setKlas={setKlas} />
                </Head_component>
            </Head_line>
            <Body_line>
                <Component_position>
                    <Left_component>
                        <Header_Chart_Box>
                            <Design_Box>
                                <Piechart Full_num={data?.gradcondition.gradCredit} Already_num={data?.credit.totalCredit} Kind="총학점" section="total" Chart_size={280} Width={650} Height={320} Top_css={25} Left_css={0} />
                            </Design_Box>
                        </Header_Chart_Box>
                        <Body_Chart_Box>
                            <Upper_Body_Chart_Box>
                                <Design_Box>
                                    <Piechart Full_num={data?.gradcondition.mainCredit} Already_num={data?.credit.mainCredit} Kind="전공학점" section="main" Chart_size={150} Width={320} Height={207.2} Top_css={35} Left_css={5}/>
                                </Design_Box>
                                <Design_Box>
                                    <Piechart Full_num={999} Already_num={999} Kind="부전공학점" section="sub" Chart_size={150} Width={320} Height={207.2} Top_css={35} Left_css={5}/>
                                </Design_Box>
                            </Upper_Body_Chart_Box>
                            <Lower_Body_Chart_Box>
                                <Design_Box>
                                <Small_Body_Chart_Box>
                                    <Su_Body_Chart_Box>
                                            <Piechart Full_num={data?.gradcondition.basicCredit} Already_num={data?.credit.basicCredit} Kind="기초학점" section="basic" Chart_size={150} Width={325} Height={160} Top_css={35} Left_css={5}/>
                                    </Su_Body_Chart_Box>
                                    <Sl_Body_Chart_Box>
                                        <Piechart Full_num={999} Already_num={data?.credit.mathCredit} Kind="수학" section="math" Chart_size={100} Width={162.5} Height={80} Top_css={35} Left_css={15}/>
                                        <Piechart Full_num={999} Already_num={data?.credit.scienceCredit} Kind="기초과학" section="basicScience" Chart_size={100} Width={162.5} Height={80} Top_css={35} Left_css={15}/>
                                    </Sl_Body_Chart_Box>
                                </Small_Body_Chart_Box>
                                </Design_Box>
                                <Design_Box>
                                <Small_Body_Chart_Box>
                                    <Su_Body_Chart_Box>
                                        <Piechart Full_num={data?.gradcondition.essBalCredit} Already_num={data?.credit.balCredit+data?.credit.essCredit} Kind="교양학점" section="essBal" Chart_size={150} Width={325} Height={160} Top_css={35} Left_css={5}/>
                                    </Su_Body_Chart_Box>
                                    <Sl_Body_Chart_Box>
                                        <Piechart Full_num={999} Already_num={data?.credit.balCredit} Kind="균형" section="bal" Chart_size={100} Width={162.5} Height={80} Top_css={35} Left_css={15}/>
                                        <Piechart Full_num={999} Already_num={data?.credit.essCredit} Kind="필수" section="ess" Chart_size={100} Width={162.5} Height={80} Top_css={35} Left_css={15}/>
                                    </Sl_Body_Chart_Box>
                                </Small_Body_Chart_Box>
                                </Design_Box>
                            </Lower_Body_Chart_Box>
                        </Body_Chart_Box>    
                    </Left_component>
                    <Right_component>
                        <TimeTableHeader>
                            <TableName> 나의 시간표 </ TableName>
                        </TimeTableHeader>
                        <TimeTableBody>
                            <TimeTable width={670} height={700} />    
                        </TimeTableBody>
                    </Right_component>
                    {klas ? <Klas_Box><Klas/> <P_Button onClick={onClose} >X</P_Button></Klas_Box>: <></>} 
                </Component_position>
            </Body_line>
        </UserTableProvider>
        
    )
}

export default MainPage;