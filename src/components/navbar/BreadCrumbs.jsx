import { Breadcrumbs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { useCourse, useHome } from '../../hooks/hooks';
import { IconCircle } from '@tabler/icons';

const BreadCrumb = () => {
    const {pathname}=useLocation();
    const params=useParams();
    const searchParams=new URLSearchParams(useLocation().search);

    const {allCourses,allTestSeries}=useCourse();
    const {subjects}=useHome();
    function isValidObjectId(str) {
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      return objectIdRegex.test(str);
    }
    const getCourseNameById=(id)=>{
        const course=allCourses?.find((course)=>course._id===id);
        return course?.title;
    }
    const getSubjectNameById=(id)=>{
        const subject=subjects?.find((subject)=>subject._id===id);
        return subject?.title;
    }
    const getTestSeriesNameById=(id)=>{
        const testSeries=allTestSeries?.find((testSeries)=>testSeries._id===id);
        return testSeries?.title;
    }
    const formatName=(name)=>{
      //if name has _ then replace it with space and first letter of each word should be capital
      if(name?.includes('_')){
        const words=name.split('_');
        return words.map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }
        return name?.charAt(0).toUpperCase() + name?.slice(1);
    }
    
    const paths = pathname.split('/').filter((path) => path);
    let dpath="";
    const data=paths.map((path,index)=>{
        //first letter of name should be capital
        dpath=dpath+'/'+path;
        if(isValidObjectId(path)){
            const courseName=getCourseNameById(path);
            const subjectName=getSubjectNameById(path);
            const testSeriesName=getTestSeriesNameById(path);
            const testName=searchParams.get('test');
            const name=courseName||subjectName || testSeriesName || testName;
            return {name:formatName(name),path:dpath};
        }
        return {name:formatName(path),path:dpath};
    });
  return (
    <Box sx={{px:'3rem',bgcolor:'white !important',py:'2rem'}}>
        <Typography variant='h4' sx={{color:'#4B4B4D',fontWeight:'bold',marginBottom:'1rem'}}>{data?.length>1?data[1].name:data[0].name}</Typography>
        <Breadcrumbs aria-label="breadcrumb"  separator={
          <IconCircle
            size='5'
            fill='#4B4B4D'
            fillOpacity={'0.6'}
            style={{ margin: '0 5px' }}
          />
        } sx={{fontSize:'1rem',bgcolor:'white'}}>
            {data.map((item,index)=>(
                <Link key={index} underline='hover' fontWeight='500' color='#4B4B4D' to={item?.path ||''}>
                  {item?.name}
                    </Link>
            ))}
      </Breadcrumbs>
    </Box>
  )
}

export default BreadCrumb;