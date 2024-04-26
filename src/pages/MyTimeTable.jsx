import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BlankCard from "../components/course-details/BlankCard";
import { useAuth, useCourse, useHome } from "../hooks/hooks";
import GradientButton from "../components/form/GradientButton";
import { toast } from "react-toastify";
import { useCreateStudentTimeTableEventsMutation, useGetStudentTimeTableEventsQuery } from "../store/api/authApi";
import { IconCheck } from "@tabler/icons";
import Loader from "../components/ui/Loader";
import LoadingOverlay from "../components/molecules/LoadingOverlay";

const MyTimeTable = () => {
    const [createStudentTimeTableEvents,{isLoading:createEventLoading}]=useCreateStudentTimeTableEventsMutation();
    const {data:studentsEvents,isLoading,isFetching,refetch}=useGetStudentTimeTableEventsQuery();
    const {allCourses}=useCourse();
    const {subjects}=useHome();
    const [events, setEvents] = useState(studentsEvents?studentsEvents.myEvents:[]);
    const { userDetails } = useAuth();
    const [openAddEventDialog, setOpenAddEventDialog] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [color, setColor] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState("");
    const handleOpenAddEventDialog = () => {
        setOpenAddEventDialog(true);
    };
    
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
    const handleCellClick = (arg) => {
        if(arg.date < new Date()){
            toast.error('You cannot add event on past date',
                {
                    position: "top-center",
                    autoClose: 2000,
                });
            return;
        }
        if (arg.date && !arg.event) {
            setOpenAddEventDialog(true);
            setStartDate(arg.date);
            setEventTitle("");
            setEndDate("");
        }
    };

    const handleCloseAddEventDialog = () => {
        setOpenAddEventDialog(false);
    };
    const getCourseName=(courseId)=>{
        const course=allCourses.find(course=>course._id===courseId);
        return course?.title;
    }
    const getSubjectName=(subjectId)=>{
        const subject=subjects.find(subject=>subject._id===subjectId);
        return subject?.title;
    }

    const handleAddEvent = async() => {
        if(!eventTitle || !endDate || !endTime || !startDate){
            toast.error('Please fill all the fields',
                {
                    position: "top-center",
                    autoClose: 2000,
                    
                });
                return;
        }
        const ampm=endTime.split(' ')[1];
        let hrs=(ampm==='PM'?parseInt(endTime.split(' ')[0].split(':')[0])+12:parseInt(endTime.split(' ')[0].split(':')[0])).toString();
        hrs=(ampm==='PM' && endTime.split(' ')[0].split(':')[0]==='12')?'12':hrs;
        hrs=(ampm==='AM' && endTime.split(' ')[0].split(':')[0]==='12')?'00':hrs;
        const etime=hrs+':'+endTime.split(' ')[0].split(':')[1]+':00';
        const selectedEndTime = new Date(endDate);
        const endTimeString = selectedEndTime.toISOString().substring(0, 10) + "T" + etime;
        const endT=new Date(endTimeString);
        endT.setDate(endT.getDate() + 1);
        if(startDate>=endT){
            toast.error('End time should be greater than start time',
                {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            return;
        }
        //If any event is overlapping just return as it is not allowed
        let overlapping=false;
        events?.forEach(event=>{
            if((new Date(event.start)<=startDate && new Date(event.end)>=startDate) || (new Date(event.start)<=endT && new Date(event.end)>=endT)||(new Date(event.start)>=startDate && new Date(event.end)<=endT)||(new Date(event.start)>=startDate && new Date(event.start)<=endT)||(new Date(event.end)>=startDate && new Date(event.end)<=endT)){
                overlapping=true;
                return;
            }
        }
        );
        if(overlapping){
            toast.error('Event is overlapping with existing event',
                {
                    position: "top-center",
                    autoClose: 3000,
                });
            return;
        }
        const newEvent = {
            title: eventTitle,
            start: startDate,
            end: endT,
            description:'Student TimeTable Event',
            color: color?color:'#1a97f5',
        };
        const result=await createStudentTimeTableEvents(newEvent);
        console.log(result);
        if(result.data){
            refetch();
            setOpenAddEventDialog(false);
            toast.success('Event added successfully',
                {
                    position: "top-center",
                    autoClose: 2000,
                });
        }
        handleCloseAddEventDialog();
    };

    const handleOpenDialog = (content) => {
        setDialogContent(content);
        setOpenDialog(true);
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
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const endTimeOptions = [
        "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
        "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
        "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM"
    ];

    const renderEventContent = (e) => {
        const col=ColorVariation.find(mcolor=>mcolor.eColor===e.backgroundColor);
        if(col){
        e.backgroundColor = col?.eColor;
        }
        
        return (
            <div className="text-center cursor-pointer w-full" style={{borderRadius:'8px',backgroundColor:e.backgroundColor}}>
                <Typography sx={{ fontWeight: 'bold', color: "white" }}> {e.event.title}</Typography>
                <Typography sx={{ fontSize: '0.8rem', color: "white" }}>{e.timeText}</Typography>
            </div>
        );
    };
    useEffect(() => {
        if(studentsEvents){
            //concat array of events myEvents and courseEvents
            let allEvent=studentsEvents.myEvents;
            studentsEvents.allCourseEvents.map(course=>course.courseEvents.map(event=>{
                allEvent=[...allEvent,event];
            }));
            setEvents(allEvent);
        }
    }, [studentsEvents])
    

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "0 6%",
                overflowX: 'scroll',
            }}>
            <LoadingOverlay open={(isFetching && !isLoading)} message={'Updating your timetable, please wait...'}/>
            {/* <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                <Typography variant="h4" sx={{ margin: "1rem 0", color: "#4B4B4D" }}>
                    TimeTable
                </Typography>
            </Box> */}
            {isLoading? <div style={{minHeight:'70vh',display:'flex',alignItems:'center',justifyContent:'center'}}><Loader message={'Loading your timetable, please wait...'}/></div>
            :<BlankCard variant='outlined' overflow='scroll'>
                <DialogContent sx={{ fontWeight: 'bold',width:'auto',color: '#4B4B4D' }}>
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
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        dayHeaderContent={({ date }) => {
                            return (
                                <div style={{ padding: '10px 0px',width:'120px', backgroundColor: '#207EB820' }}>
                                    {date.toLocaleString('en-US', { weekday: 'long' })}
                                </div>
                            );
                        }}
                        dateClick={handleCellClick}
                    />
                </DialogContent>
            </BlankCard>}
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
                        {dialogContent.courseId && getCourseName(dialogContent.courseId) && <p><span style={{ fontWeight: 'bold' }}>Course:</span> {getCourseName(dialogContent?.courseId)}</p>}
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
            <Dialog
                open={openAddEventDialog}
                onClose={handleCloseAddEventDialog}
                aria-labelledby="add-event-dialog-title"
                aria-describedby="add-event-dialog-description"
            >
                <DialogTitle id="add-event-dialog-title">Add New Event</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="event-title"
                        label="Event Title"
                        type="text"
                        fullWidth
                        value={eventTitle}
                        sx={{ my:'0.5rem' }}
                        onChange={(e) => setEventTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="start-date"
                        label="Start Date"
                        type="text"
                        fullWidth
                        value={startDate? dateRenderFormat(startDate):''}
                        sx={{ my:'0.5rem' }}
                        disabled
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    required
                    label="End Date"
                    sx={{
                      width: '100%',
                      my:'0.5rem',
                      '& .MuiInputBase-root': {
                        height: '45px',
                        lineHeight: '40px',
                        width: '100%'
                      },
                      '& .MuiPickersBasePicker-pickerView': {
                        maxHeight: '200px'
                      }
                    }}
                    onChange={newDate => {
                      const formattedDate = dayjs(newDate).toISOString();
                      setEndDate(formattedDate);
                    }}
                    value={
                      endDate
                        ? dayjs(endDate)
                        : null
                    }
                    defaultValue={
                      endDate
                        ? dayjs(endDate)
                        : 'MM-DD-YYYY'
                    }
                  />
                </LocalizationProvider>
                    <TextField
                        select
                        margin="dense"
                        id="end-time"
                        label="End Time"
                        fullWidth
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        {endTimeOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Typography variant='body1' my={2}>
              Select Event Color
            </Typography>
                    {ColorVariation.map(mcolor => {
              return (
                <Fab
                  color='primary'
                  style={{ backgroundColor: mcolor.eColor }}
                  sx={{
                    marginRight: '3px',
                    transition: '0.1s ease-in',
                    scale: mcolor.value === color ? '0.9' : '0.7'
                  }}
                  size='small'
                  key={mcolor.id}
                  onClick={() => setColor(mcolor.eColor)}
                >
                  {mcolor.eColor === color ? (
                    <IconCheck width={16} />
                  ) : (
                    ''
                  )}
                </Fab>
              );
            })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddEventDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddEvent} disabled={createEventLoading} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MyTimeTable;