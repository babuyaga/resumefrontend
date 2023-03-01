import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './stylesheets/texteditor.css';
import {useState} from "react";

function TextEditor({setValueo}){
  const [value, setValue] = useState('');

const putValue= (e) =>{setValue(e);
setValueo(value);}

     return (
       <ReactQuill  theme="snow" value={value} onChange={putValue} ></ReactQuill>
     );
}


export default TextEditor;
