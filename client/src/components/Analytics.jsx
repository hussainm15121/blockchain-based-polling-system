import Sidebar from './Sidebar';
import Chart from 'react-apexcharts';
import React,{useState} from 'react';
import { Container } from "react-bootstrap";

function Analytics()
{
    const[showtab, setShowtab]= useState(2);
    const handletab = (e)=>{
     setShowtab(e);
       }

    return(<React.Fragment>
        <Container>
            <div>
                <div className="container-admin">
                    <div className="side"><Sidebar /></div>
                    
                        <div className="userHeading">
                            <div className='container-fluid mt-3 mb-3'>
                                <h2> Analytics </h2>
                                
                                <Chart type='line'
                                width={1600}
                                height={550}

                                series={[
                                    {
                                        name: "Users",
                                        data:[234, 45, 67, 987, 345, 221, 345, 995, 654, 756, 987, 654]
                                    }
                                ]}

                                options={{
                                    title:{ text:"Users accessed website in 2022"}, 
                                    xaxis:{
                                        title:{text:"Users accessed website in Months"},
                                        categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                                    },

                                    yaxis:{
                                        title:{text:"Number of Users"},
                                       
                                    }
                                }}
                                >
                                </Chart>
                                </div>
                        
                        </div> 
                        
                </div>
            </div>
        </Container>
        </React.Fragment>);
}

export default Analytics;