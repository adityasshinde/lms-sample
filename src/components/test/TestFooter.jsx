import { ArrowLeft, ArrowRight, Star, TrashSimple } from '@phosphor-icons/react';
import { IconStar } from '@tabler/icons';
import React, { useEffect, useState } from 'react'
import GradientButton from '../form/GradientButton';
import { useTest } from '../../hooks/hooks';

const TestFooter = ({activeQuestion,markForReview,clearResponse,saveAndNext}) => {
  const {responses}=useTest();
 
  return (
    <div className='px-4 flex items-center justify-between py-4' style={{ borderTop: '1px solid #4B4B4D18' }}>
      <div className="flex items-center justify-center px-4">
        <button onClick={()=>markForReview(!activeQuestion?.markedForReview)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor:activeQuestion?.markedForReview?'#634C90':'white', padding: '5px 10px', border: '2px solid #634C90', fontWeight: 'bold', color: activeQuestion?.markedForReview?'white':"#634C90", borderRadius: '8px', margin: '0 10px' }}><IconStar fill='#634C90' stroke={1.5} style={{ marginRight: '5px' }} size={20} /> {activeQuestion?.markedForReview?"MARKED FOR REVIEW":"MARK FOR REVIEW"}</button>
        <button onClick={()=>clearResponse()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: '5px 10px', border: '2px solid #D94214', fontWeight: 'bold', color: '#D94214', borderRadius: '8px', margin: '0 10px' }}><TrashSimple fill='#D94214' stroke={1.5} style={{ marginRight: '5px' }} size={20} /> CLEAR</button>
      </div>
      {/* <div className="flex items-center justify-center px-4">
        <button onClick={()=>prevQuestion()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: '5px 10px', border: '1px solid #4B4B4D', fontWeight: 'bold', color: '#4B4B4D', borderRadius: '8px', margin: '0 5px' }}><ArrowLeft fill='#4B4B4D' stroke={1.5} size={16} /></button>
        <p className='font-bold mx-2'>40 OF 40</p>
        <button onClick={()=>nextQuestion()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: '5px 10px', border: '1px solid #4B4B4D', fontWeight: 'bold', color: '#4B4B4D', borderRadius: '8px', margin: '0 5px' }}><ArrowRight fill='#4B4B4D' stroke={1.5} size={16} /></button>
      </div> */}
      <div className="w-1/5 px-4 flex items-center justify-center px-4">
        <GradientButton onClick={()=>saveAndNext()} text='SAVE & NEXT' />
      </div>
    </div>
  )
}

export default TestFooter;