import React from 'react'
import GradientButton from '../form/GradientButton';

const TestSubjects = ({sections,activeSection,setActiveSection}) => {
  return (
    <div className='my-8 mx-8 flex items-center justify-start gap-4'>
       {sections?.length>0 && sections.map((section,index)=>
          <button key={index} onClick={()=>setActiveSection(section._id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: activeSection===section._id?'#207EB8':'white', padding: '10px 2rem', border: '2px solid #207EB8', fontWeight: 'bold', color: activeSection===section._id?'white':'#207EB8', borderRadius: '8px', margin: '0' }}>{section?.title}</button>
        )}
        {/* <GradientButton text='Physics' />
        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: '10px 2rem', border: '2px solid #207EB8', fontWeight: 'bold', color: '#207EB8', borderRadius: '8px', margin: '0' }}>Physics</button>
        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: '10px 2rem', border: '2px solid #207EB8', fontWeight: 'bold', color: '#207EB8', borderRadius: '8px', margin: '0 ' }}>Physics</button> */}
      </div>
  )
}

export default TestSubjects;