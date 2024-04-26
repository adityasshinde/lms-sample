import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, IconButton, Typography } from '@mui/material';
import { PictureAsPdf as PdfIcon, GetApp as DownloadIcon } from '@mui/icons-material';
import { IconFile } from '@tabler/icons';

const NotesList = ({ notes }) => {
    const notesData = [
        { name: 'firstname_lastname_pdf',size:'5MB', url: 'https://example.com/note1.pdf' },
        { name: 'firstname_lastname_pdf 2',size:'5MB', url: 'https://example.com/note2.pdf' },
        { name: 'firstname_lastname_pdf 2',size:'5MB', url: 'https://example.com/note2.pdf' },
        // Add more notes as needed
      ];
  return (
    <List>
      <Typography sx={{fontSize:'1.3rem',my:'2rem',fontWeight:'bold',color:'#207EB8'}}>Download Lecture Notes</Typography>
      {notesData.map((note, index) => (
        <ListItem key={index} sx={{cursor:'pointer',border:'1px solid #4B4B4D',my:'1rem',padding:'1rem', borderRadius:'15px'}}>
          <ListItemIcon>
            <IconFile size={40} color='#207EB8' />
          </ListItemIcon>
          <ListItemText primary={<Typography sx={{fontWeight:'bold',color:'#4B4B4D'}}>{note.name}</Typography>}/>
          <ListItemText primary={<Typography sx={{fontWeight:'bold',color:'#4B4B4D'}}>{note.size}</Typography>}/>
          <Typography sx={{fontWeight:'bold',color:'#207EB8'}}>download</Typography>
          {/* <IconFile aria-label="Download" onClick={() => handleDownload(note.url)}>
            <DownloadIcon />
          </IconFile> */}
        </ListItem>
      ))}
    </List>
  );
};

const handleDownload = (url) => {
  // Implement download logic here, e.g., using fetch or any other suitable method
  window.open(url, '_blank');
};

export default NotesList;
