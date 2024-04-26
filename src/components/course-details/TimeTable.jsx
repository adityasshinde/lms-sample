import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid';
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { useAuth, useHome } from "../../hooks/hooks";
import { calevents, timings } from "./data";
import BlankCard from "./BlankCard";
import { Box } from "@mui/system";
import { useGetEventsByCourseIdQuery } from "../../store/api/courseApi";
import Loader from "../ui/Loader";
const ColorVariation = [
    {
      id: 1,
      eColor: '#1a97f5',
      value: 'default'
    },
    {
      id: 2,
      eColor: '#39b69a',
      value: 'green'
    },
    {
      id: 3,
      eColor: '#fc4b6c',
      value: 'red'
    },
    {
      id: 4,
      eColor: '#615dff',
      value: 'azure'
    },
    {
      id: 5,
      eColor: '#fdd43f',
      value: 'warning'
    }
  ];
const CalendarComponent = ({course,events,isLoading}) => {
    const { userDetails } = useAuth();
    // const {data:events,isLoading} = useGetEventsByCourseIdQuery(course._id);
    const {subjects}=useHome();
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState("");

    // Function to handle opening the dialog
    const handleOpenDialog = (content) => {
        setDialogContent(content);
        setOpenDialog(true);
    };
    const getSubjectName=(subjectId)=>{
        const subject=subjects.find(subject=>subject._id===subjectId);
        return subject?.title;
    }
    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleEventInfo = (e) => {
        const currentEvent=events.find(event=>event.title===e.event.title && event.start===e.event.start.toISOString() && event.end===e.event.end.toISOString());
        setDialogContent(currentEvent);
        setOpenDialog(true);
    };

     const dateRenderFormat = (date) => {
        const d=date.toDateString().split(' ')[1]+' '+date.toDateString().split(' ')[2]+', '+date.toDateString().split(' ')[3];
        const t=date.toTimeString().substring(0, 5);
        const ampm = t.split(':');
        const hrs=ampm[0]>12?ampm[0]-12:ampm[0];
        const hrsStr=hrs.toString().length===1?'0'+hrs.toString():hrs.toString();
        const tt=hrsStr+':'+ampm[1].toString();
        return d+",  "+tt+(ampm[0] >= 12 ? 'pm' : 'am');
    };

    const renderEventContent = (e) => {
        const col=ColorVariation.find(mcolor=>mcolor.eColor===e.backgroundColor);
        if(col){
        e.backgroundColor = col?.eColor;
        }
        
        return (
            <div className="text-center w-full" style={{borderRadius:'8px',cursor:'pointer',backgroundColor:e.backgroundColor}}>
                <Typography sx={{ fontWeight: 'bold', color: "white" }}> {e.event.title}</Typography>
                <Typography sx={{ fontSize: '0.8rem', color: "white" }}>{e.timeText}</Typography>
            </div>
        );
    };

    return (
        <>{events?.length>0 && <Box
            id='timetable'
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "0 6%",
            }}>
            <Typography variant="h4" sx={{ margin: "1rem 0", color: "#4B4B4D" }}>
                TimeTable
            </Typography>
            {isLoading? <div style={{minHeight:'70vh',display:'flex',alignItems:'center',justifyContent:'center'}}><Loader message={'Loading course timetable, please wait...'}/></div>
              :<BlankCard variant='outlined' overflow='scroll'>
                {/* Calendar */}
                <CardContent sx={{fontWeight:'bold',color:'#4B4B4D'}}>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        themeSystem="Lumen"
                        allDaySlot={false}
                        slotMinTime="08:00:00"
                        slotMaxTime="22:00:00"
                        height="auto"
                        eventContent={renderEventContent}
                        eventClick={handleEventInfo}
                        events={events}
                        slotLabelFormat={{
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                        }}
                        headerToolbar={false}
                        dayHeaderContent={({ date }) => {
                            return (
                                <div style={{padding: '10px 30px', backgroundColor: '#207EB820' }}>
                                    {date.toLocaleString('en-US', { weekday: 'long' })}
                                </div>
                            );
                        }}
                    />
                </CardContent>
            </BlankCard>}
            {/* Dialog for displaying event information */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialogContent?.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p><span style={{ fontWeight: 'bold' }}>Start Time:</span> {dialogContent?.start && dateRenderFormat(new Date(dialogContent?.start))}</p>
                        <p><span style={{ fontWeight: 'bold' }}>End Time:</span> {dialogContent?.end && dateRenderFormat(new Date(dialogContent?.end))}</p>
                        {dialogContent.subject && getSubjectName(dialogContent.subject) && <p><span style={{ fontWeight: 'bold' }}>Subject:</span> {getSubjectName(dialogContent?.subject)}</p>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {!dialogContent.courseId && <Button onClick={handleCloseDialog} autoFocus>
                        Edit
                    </Button>}
                    <Button onClick={handleCloseDialog} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>}</>
    );
};

export default CalendarComponent;
